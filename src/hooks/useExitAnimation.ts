import { useState, useRef, useEffect } from "react";

export type Toast = {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
};

// Manages toast notifications with auto-dismiss and configurable type/duration
export function useExitAnimation(isOpen: boolean, duration: number) {
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
  const [animationClass, setAnimationClass] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Legitimate pattern: this hook orchestrates a CSS animation cycle.
    // The synchronous setStates here control the input/output timing,
    // without creating a cascade because they only depend on `isOpen`.
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
