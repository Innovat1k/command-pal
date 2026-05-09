import { useState, useCallback, useEffect } from 'react';

// Manages toast notifications with auto-dismiss and configurable type/duration
export type Toast = {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
};

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const show = useCallback((message: string, options?: Partial<Toast>) => {
    const id = Math.random().toString(36).slice(2);
    setToast({ id, message, type: 'info', duration: 2000, ...options });
  }, []);

  const hide = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast?.duration) return;
    const timer = setTimeout(hide, toast.duration);
    return () => clearTimeout(timer);
  }, [toast, hide]);

  return { toast, show, hide };
}