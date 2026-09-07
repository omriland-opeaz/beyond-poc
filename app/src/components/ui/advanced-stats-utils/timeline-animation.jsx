import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TimelineAnimation({ animationNum = 0, timelineRef, className, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = timelineRef?.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );

    io.observe(root);
    return () => io.disconnect();
  }, [timelineRef]);

  return (
    <div
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${animationNum * 80}ms` }}
    >
      {children}
    </div>
  );
}
