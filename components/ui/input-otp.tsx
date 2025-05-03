"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
function InputOTP({
  className,
  containerClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  error?: string | null;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />;
}

function InputOTPSlot({
  index,
  className,
  placeholder,
  hasError = false,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  placeholder?: string;
  hasError?: boolean;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  const showPlaceholder = !char && placeholder;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:ring-ring data-[active=true]:aria-invalid:-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-7 w-6 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[2px]",
        className,
        hasError && "border-red-500 bg-red-50 text-red-600"
      )}
      {...props}>
      {showPlaceholder ? <span className={cn("text-gray-200", hasError && "text-red-300")}>{placeholder}</span> : char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className={cn("animate-caret-blink h-4 w-px duration-1000", hasError ? "bg-red-500" : "bg-foreground")} />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon size={16} />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
