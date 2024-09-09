"use client";

import { useToast } from "~/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastViewportVariants,
} from "~/components/toast";
import { ToastViewportProps } from "@radix-ui/react-toast";
import { VariantProps } from "class-variance-authority";

export function Toaster() {
  const { toasts } = useToast();
  let viewportPosition: VariantProps<typeof toastViewportVariants>["position"];

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        position,
        ...props
      }) {
        viewportPosition = position;

        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport position={viewportPosition} />
    </ToastProvider>
  );
}
