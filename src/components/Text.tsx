import type { ReactNode } from "react";

type TextVariant =
  | "body1"
  | "body2"
  | "body3"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

interface Props {
  size?: number | string;
  variant?: TextVariant;
  extrabold?: boolean;
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  className?: string;
  children?: ReactNode;
}
function Text({
  variant,
  extrabold,
  bold,
  semibold,
  medium,
  className,
  children,
}: Props) {
  const classes: string[] = [];
  const customStyle: React.CSSProperties = {};

  // Font Weight
  if (bold) {
    classes.push("font-bold");
  } else if (semibold) {
    classes.push("font-semibold");
  } else if (extrabold) {
    classes.push("font-extrabold");
  } else if (medium) {
    classes.push("font-medium");
  } else {
    classes.push("font-normal");
  }

  // Font Variant
  if (variant) {
    if (variant == "body1") {
      classes.push("text-base"); // 16px
    } else if (variant == "body2") {
      classes.push("text-sm"); // 14px
    } else if (variant == "body3") {
      classes.push("text-xs"); // 12px
    } else if (variant == "h1") {
      classes.push("text-5xl"); // 48px
    } else if (variant == "h2") {
      classes.push("text-4xl"); // 36px
    } else if (variant == "h3") {
      classes.push("text-3xl"); // 30px
    } else if (variant == "h4") {
      classes.push("text-2xl"); // 24px
    } else if (variant == "h5") {
      classes.push("text-xl"); // 20px
    } else if (variant == "h6") {
      classes.push("text-lg"); // 18px
    }
  } else {
    classes.push("text-base");
  }

  const allClasses = classes.join(" ") + (className ? ` ${className}` : "");

  return (
    <p className={allClasses} style={customStyle}>
      {children}
    </p>
  );
}

export default Text;
