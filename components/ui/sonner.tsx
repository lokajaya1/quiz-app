"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { useEffect, useRef, useCallback } from "react";

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  timeoutDuration?: number;
  timeoutMessage?: string;
};

const Toaster = ({
  timeoutDuration = 150000,
  timeoutMessage = "Waktu habis!",
  ...props
}: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const timeoutShownRef = useRef(false);

  const showTimeoutToast = useCallback(() => {
    if (!timeoutShownRef.current) {
      toast(timeoutMessage, {
        id: "timeout-toast",
        duration: Infinity,
        onDismiss: () => {
          timeoutShownRef.current = false;
        },
      });
      timeoutShownRef.current = true;
    }
  }, [timeoutMessage]);

  useEffect(() => {
    const timeoutId = setTimeout(showTimeoutToast, timeoutDuration);

    return () => clearTimeout(timeoutId);
  }, [timeoutDuration, showTimeoutToast]);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toaster]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toaster]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
