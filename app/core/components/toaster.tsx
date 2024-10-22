"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "~/core/components/toast";
import { VariantProps } from "class-variance-authority";
import { useToast } from "../hooks/use-toast";
import { toastViewportVariants } from "./toast";

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
