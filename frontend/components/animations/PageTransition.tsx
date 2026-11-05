"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type NavigateFn = (href: string) => Promise<void> | void;
let globalNavigate: NavigateFn | null = null;

/**
 * Reusable function to trigger the full-screen wipe page transition anywhere in the app.
 *
 * Usage:
 *   import { navigateWithTransition } from "@/components/animations/PageTransition";
 *   navigateWithTransition("/gallery");
 */
export const navigateWithTransition: NavigateFn = (href: string) => {
  if (globalNavigate) {
    return globalNavigate(href);
  } else if (typeof window !== "undefined") {
    window.location.href = href;
  }
};

// Expose globally on window for convenience
if (typeof window !== "undefined") {
  (window as unknown as { navigateWithTransition: NavigateFn }).navigateWithTransition =
    navigateWithTransition;
}

interface PageTransitionContextType {
  navigate: (href: string) => Promise<void> | void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigate: navigateWithTransition,
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const overlayRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Maintain displayed children so the outgoing page stays completely still underneath while the wipe plays
  const [displayChildren, setDisplayChildren] = useState(children);
  const pendingChildrenRef = useRef<React.ReactNode>(children);
  pendingChildrenRef.current = children;

  const currentPathRef = useRef(
    pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
  );
  useEffect(() => {
    currentPathRef.current =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
  }, [pathname, searchParams]);

  // Execute full-screen wipe transition
  const executeTransition = async (targetUrl: string) => {
    // 1. Block repeat clicks / multiple simultaneous transitions
    if (isTransitioningRef.current) return;

    // Check if target is same as current URL
    try {
      const parsed = new URL(targetUrl, window.location.href);
      const current = new URL(window.location.href);
      if (
        parsed.pathname === current.pathname &&
        parsed.search === current.search
      ) {
        return;
      }
    } catch {
      // ignore URL parse errors
    }

    // 2. Respect prefers-reduced-motion: skip animation and navigate immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      router.push(targetUrl);
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) {
      router.push(targetUrl);
      return;
    }

    isTransitioningRef.current = true;
    setIsTransitioning(true);

    // Prepare overlay at bottom of viewport
    overlay.style.display = "block";
    overlay.style.pointerEvents = "auto";
    overlay.style.transform = "translate3d(0, 100%, 0)";

    // Run upward wipe: bottom to top
    // Easing: cubic-bezier(0.7, 0, 0.1, 1) — quick start, fast middle, long soft ease-out
    // Duration: 600ms (~0.6s)
    // Leading edge: flat, straight horizontal line
    const wipeAnimation = overlay.animate(
      [
        { transform: "translate3d(0, 100%, 0)" },
        { transform: "translate3d(0, 0%, 0)" },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.7, 0, 0.1, 1)",
        fill: "forwards",
      }
    );

    try {
      await wipeAnimation.finished;
    } catch {
      // animation aborted or finished
    }

    // Overlay is now 100% covering the viewport below the fixed navbar.
    // Swap the route while covered!
    router.push(targetUrl);

    // Reset scroll position to top
    window.scrollTo(0, 0);
    const htmlLenis = (
      window as unknown as {
        lenis?: {
          scrollTo: (y: number, opts?: { immediate: boolean }) => void;
        };
      }
    ).lenis;
    if (htmlLenis && typeof htmlLenis.scrollTo === "function") {
      htmlLenis.scrollTo(0, { immediate: true });
    }

    // Wait for the new route content to be delivered by Next.js
    await new Promise<void>((resolve) => {
      let timeoutId: NodeJS.Timeout;
      const checkInterval = setInterval(() => {
        const currentPath = window.location.pathname;
        const targetPath = new URL(targetUrl, window.location.href).pathname;
        if (currentPath === targetPath || !isTransitioningRef.current) {
          clearInterval(checkInterval);
          clearTimeout(timeoutId);
          resolve();
        }
      }, 25);

      // Fallback safety timeout (600ms max)
      timeoutId = setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 600);
    });

    // Update the displayed children to the new page content while still covered
    setDisplayChildren(pendingChildrenRef.current);

    // Wait for browser paint so the new page renders cleanly underneath
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });

    // Remove the overlay and show the new page in its final state
    wipeAnimation.cancel();
    overlay.style.transform = "translate3d(0, 100%, 0)";
    overlay.style.display = "none";
    overlay.style.pointerEvents = "none";

    isTransitioningRef.current = false;
    setIsTransitioning(false);
  };

  // Register global navigate function
  useEffect(() => {
    globalNavigate = executeTransition;
    return () => {
      globalNavigate = null;
    };
  }, [router]);

  // Synchronize displayChildren when not transitioning
  useEffect(() => {
    if (!isTransitioningRef.current) {
      setDisplayChildren(children);
    }
  }, [children]);

  // Hook into delegated link clicks across the site
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only handle left clicks without modifier keys
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      // Opt-out attribute
      if (target.hasAttribute("data-no-transition")) return;

      // Ignore external or download links
      if (target.target && target.target !== "_self") return;
      if (target.hasAttribute("download")) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      // Origin check
      let targetUrl: URL;
      try {
        targetUrl = new URL(target.href, window.location.href);
      } catch {
        return;
      }
      if (targetUrl.origin !== window.location.origin) return;

      // Hash jump on current page (e.g. #gallery-content): let browser/Lenis handle scroll
      if (
        targetUrl.pathname === window.location.pathname &&
        targetUrl.search === window.location.search &&
        targetUrl.hash
      ) {
        return;
      }

      // Same URL click: prevent default and do nothing
      if (
        targetUrl.pathname === window.location.pathname &&
        targetUrl.search === window.location.search
      ) {
        e.preventDefault();
        return;
      }

      // Internal page route change: run wipe transition!
      e.preventDefault();
      executeTransition(target.href);
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  // Hook into browser back/forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (isTransitioningRef.current) return;

      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const overlay = overlayRef.current;
      if (!overlay) return;

      isTransitioningRef.current = true;
      setIsTransitioning(true);

      overlay.style.display = "block";
      overlay.style.pointerEvents = "auto";
      overlay.style.transform = "translate3d(0, 100%, 0)";

      const wipeAnimation = overlay.animate(
        [
          { transform: "translate3d(0, 100%, 0)" },
          { transform: "translate3d(0, 0%, 0)" },
        ],
        {
          duration: 600,
          easing: "cubic-bezier(0.7, 0, 0.1, 1)",
          fill: "forwards",
        }
      );

      wipeAnimation.finished
        .then(() => {
          window.scrollTo(0, 0);
          setDisplayChildren(pendingChildrenRef.current);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              wipeAnimation.cancel();
              overlay.style.transform = "translate3d(0, 100%, 0)";
              overlay.style.display = "none";
              overlay.style.pointerEvents = "none";
              isTransitioningRef.current = false;
              setIsTransitioning(false);
            });
          });
        })
        .catch(() => {
          overlay.style.display = "none";
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{ navigate: executeTransition, isTransitioning }}
    >
      {/* 
        Full-viewport overlay for page transition:
        - Fixed full viewport
        - z-index 40: strictly below the fixed top navbar (z-50), above all page content (z-0 to z-30)
        - Background: var(--background) (#F3F3EC)
        - Leading edge: completely flat horizontal straight line (no curve, no rounded corners, no shadow)
        - 60fps GPU acceleration via transform translate3d
      */}
      <div
        ref={overlayRef}
        id="page-transition-overlay"
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "var(--background)",
          zIndex: 40,
          transform: "translate3d(0, 100%, 0)",
          display: "none",
          willChange: "transform",
          boxShadow: "none",
          borderRadius: 0,
        }}
      />
      {displayChildren}
    </PageTransitionContext.Provider>
  );
}
