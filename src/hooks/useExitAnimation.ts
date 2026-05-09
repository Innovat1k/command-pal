import { useState, useRef, useEffect } from "react";

export type Toast = {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
};

// Manages toast notifications with auto-dismiss and configurable type/duration
export function useExitAnimation(isOpen: boolean, duration: number) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimationClass("animate-toast-enter");
    } else {
      setAnimationClass("animate-toast-exit");
      timerRef.current = setTimeout(() => setShouldRender(false), duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, duration]);

  return { shouldRender, animationClass };
}
