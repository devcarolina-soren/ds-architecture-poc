import { colors, spacing } from "@ast/tokens";
import type { CSSProperties } from "react";
import "./icon-button.css";

type IconButtonVariant = "primary" | "secondary";

type IconButtonProps = {
  icon: string;
  label: string;
  variant?: IconButtonVariant;
};

export function IconButton({ icon, label, variant = "primary" }: Readonly<IconButtonProps>) {
  const classes = ["ast-icon-button", `ast-icon-button--${variant}`].join(" ");
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
  } satisfies Record<IconButtonVariant, CSSProperties>;

  return (
    <button
      aria-label={label}
      className={classes}
      style={{
        borderRadius: spacing.sm,
        height: spacing.xl + spacing.sm,
        padding: spacing.sm,
        width: spacing.xl + spacing.sm,
        ...variantStyles[variant]
      }}
      type="button"
    >
      <img alt="" aria-hidden="true" className="ast-icon-button__icon" src={icon} />
    </button>
  );
}
