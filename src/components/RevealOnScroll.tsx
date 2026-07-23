"use client";

import { useRef, useEffect, type ReactNode } from "react";

type AnimationType = "up" | "left" | "right" | "scale" | "fade";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Animation direction/type: up (default), left, right, scale, fade */
  animation?: AnimationType;
  /** Base delay in ms before animation starts */
  delay?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Extra classes on the wrapper div */
  className?: string;
  /** Tag to render (default: div) */
  as?: "div" | "section";
  /** If true, applies stagger delays to direct children for sequential reveal */
  stagger?: boolean;
  /** Delay in ms between each staggered child */
  staggerDelay?: number;
}

const animationClassMap: Record<AnimationType, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  fade: "reveal-fade",
};

export default function RevealOnScroll({
  children,
  animation = "up",
  delay = 0,
  threshold = 0.1,
  className = "",
  as: Tag = "div",
  stagger = false,
  staggerDelay = 100,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animClass = animationClassMap[animation];

    if (stagger) {
      // Container itself is always visible; children get staggered reveal
      const children = Array.from(el.children) as HTMLElement[];
      children.forEach((child) => child.classList.add(animClass));

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              child.style.transitionDelay = `${delay + i * staggerDelay}ms`;
              child.classList.add("revealed");
            });
            observer.unobserve(el);
          }
        },
        { threshold }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    // Single element reveal
    el.classList.add(animClass);
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, threshold, stagger, staggerDelay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
