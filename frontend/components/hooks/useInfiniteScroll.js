import { useState, useRef, useCallback, useEffect, useMemo } from "react";

export function useInfiniteScroll({
  items = [],
  defaultSelected = 0,
  onChange,
  smoothing = 200,
  loop = true,
  visibleItems = 9,
}) {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const posRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);
  const selectedRef = useRef(defaultSelected);
  const dragRef = useRef(null);
  const dragMovedRef = useRef(false);
  const containerHeightRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  onChangeRef.current = onChange;

  const repeatCount = loop ? Math.max(1, Math.ceil((visibleItems + 6) / items.length)) : 1;
  const renderItems = useMemo(
    () => Array(repeatCount).fill(items).flat(),
    [items, repeatCount, visibleItems],
  );

  cfgRef.current = {
    count: renderItems.length,
    originalCount: items.length,
    items: renderItems,
    originalItems: items,
    loop,
    smoothing,
    visibleItems,
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    containerHeightRef.current = el.clientHeight;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerHeightRef.current = entry.contentRect.height;
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const runFrame = useCallback((now) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const cfg = cfgRef.current;
    const n = cfg.count;
    const tau = Math.max(cfg.smoothing, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    const target = targetRef.current;
    const cur = posRef.current;
    let next = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.001;
    if (settled) next = target;
    posRef.current = next;

    let safeVisible = cfg.visibleItems;
    if (safeVisible % 2 === 0) safeVisible -= 1;

    let effectiveRowH = 80;
    if (containerHeightRef.current > 0) {
      effectiveRowH = containerHeightRef.current / Math.max(safeVisible - 1, 1);
    }

    const els = itemRefs.current;

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      let d = i - next;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }
      
      const dist = Math.abs(d);
      let y = d * effectiveRowH;

      el.style.transform = `translateY(calc(${y.toFixed(2)}px - 50%))`;
      el.style.height = `${effectiveRowH}px`;
      el.style.setProperty("--ow-p", Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
    }

    if (settled) {
      rafRef.current = null;
    } else {
      rafRef.current = requestAnimationFrame(runFrame);
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current === null) {
      lastRef.current = performance.now();
      rafRef.current = requestAnimationFrame(runFrame);
    }
  }, [runFrame]);

  const applyTarget = useCallback(
    (value, snap) => {
      const cfg = cfgRef.current;
      let v = value;
      if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
      if (snap) v = Math.round(v);
      targetRef.current = v;

      const domIdx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count;
      const originalIdx = ((Math.round(v) % cfg.originalCount) + cfg.originalCount) % cfg.originalCount;

      if (domIdx !== selectedRef.current) {
        selectedRef.current = domIdx;
        setSelectedIndex(domIdx);
        onChangeRef.current?.(originalIdx, cfg.originalItems[originalIdx]);
      }
      startLoop();
    },
    [startLoop],
  );

  const handlePointerDown = useCallback((e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    dragRef.current = {
      startY: e.clientY,
      startTarget: targetRef.current,
      lastY: e.clientY,
      lastTime: performance.now(),
      velocity: 0,
      id: e.pointerId,
    };
    dragMovedRef.current = false;
    setIsDragging(true);
  }, []);

  const handlePointerEnd = useCallback(
    (e) => {
      if (!dragRef.current) return;
      const drag = dragRef.current;
      dragRef.current = null;
      setIsDragging(false);

      if (dragMovedRef.current) {
        if (e && e.pointerId) rootRef.current?.releasePointerCapture(e.pointerId);

        let finalTarget = targetRef.current;
        const now = performance.now();

        if (now - drag.lastTime < 100) {
          const cfg = cfgRef.current;
          let safeVisible = cfg.visibleItems;
          if (safeVisible % 2 === 0) safeVisible -= 1;

          let effectiveRowH = 80;
          if (containerHeightRef.current > 0) {
            effectiveRowH = containerHeightRef.current / Math.max(safeVisible - 1, 1);
          }
          const velocityInItems = drag.velocity / effectiveRowH;
          finalTarget = targetRef.current - velocityInItems * 180;
        }
        applyTarget(finalTarget, true);
      }
    },
    [applyTarget],
  );

  const handlePointerMove = useCallback(
    (e) => {
      const drag = dragRef.current;
      if (!drag) return;
      if (e.pointerType === "mouse" && e.buttons === 0) {
        handlePointerEnd(e);
        return;
      }

      const dy = e.clientY - drag.startY;

      if (!dragMovedRef.current && Math.abs(dy) > 4) {
        dragMovedRef.current = true;
        rootRef.current?.setPointerCapture(drag.id);
      }

      if (dragMovedRef.current) {
        const now = performance.now();
        const dt = now - drag.lastTime;

        if (dt > 5) {
          const v = (e.clientY - drag.lastY) / dt;
          drag.velocity = drag.velocity === 0 ? v : drag.velocity * 0.4 + v * 0.6;
          drag.lastY = e.clientY;
          drag.lastTime = now;
        }

        const cfg = cfgRef.current;
        let safeVisible = cfg.visibleItems;
        if (safeVisible % 2 === 0) safeVisible -= 1;

        let effectiveRowH = 80;
        if (containerHeightRef.current > 0) {
          effectiveRowH = containerHeightRef.current / Math.max(safeVisible - 1, 1);
        }

        applyTarget(drag.startTarget - dy / effectiveRowH, false);
      }
    },
    [applyTarget, handlePointerEnd],
  );

  const handleItemClick = useCallback(
    (index) => {
      if (dragMovedRef.current) return;
      const cfg = cfgRef.current;
      const cur = targetRef.current;
      let d = index - (((Math.round(cur) % cfg.count) + cfg.count) % cfg.count);
      if (cfg.loop && cfg.count > 1) {
        if (d > cfg.count / 2) d -= cfg.count;
        else if (d < -cfg.count / 2) d += cfg.count;
      }
      applyTarget(Math.round(cur) + d, true);
    },
    [applyTarget],
  );

  useEffect(() => {
    applyTarget(targetRef.current, false);
  }, [items, visibleItems, renderItems, applyTarget]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    [],
  );

  return {
    rootRef,
    itemRefs,
    selectedIndex,
    isDragging,
    renderItems,
    handleItemClick,
    events: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    }
  };
}