import { colors, spacing } from "@ast/primitives";
import type { CSSProperties, ReactNode } from "react";
import "./button.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
};

export function Button({ children, variant = "primary" }: Readonly<ButtonProps>) {
  const classes = ["ast-button", `ast-button--${variant}`].join(" ");
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      color: colors.textInverse
    },
    secondary: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.secondary
    }
  } satisfies Record<ButtonVariant, CSSProperties>;

  return (
    <button
      className={classes}
      style={{
        borderRadius: spacing.sm,
        minHeight: spacing.xl + spacing.sm,
        padding: `${spacing.sm}px ${spacing.md}px`,
        ...variantStyles[variant]
      }}
      type="button"
    >
      {children}
    </button>
  );
}
