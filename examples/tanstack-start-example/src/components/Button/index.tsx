import { cx } from "@morph-css/kit";
import { baseButton, primaryButton, secondaryButton } from "./style";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        baseButton,
        variant === "primary" ? primaryButton : secondaryButton,
        className
      ).className}
      {...props}
    >
      {children}
    </button>
  );
}
