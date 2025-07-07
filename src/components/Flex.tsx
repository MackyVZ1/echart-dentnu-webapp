import type { ReactNode } from "react";
import { colors } from "../theme/theme";

type ThemeColor = keyof typeof colors;

interface Props {
  justifyContent?: "start" | "end" | "center" | "between" | "around";
  alignItems?: "stretch" | "start" | "end" | "center";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  textAlign?: "center" | "left" | "right";
  backgroundColor?: ThemeColor;
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
function Flex({
  justifyContent,
  alignItems,
  direction,
  textAlign,
  backgroundColor,
  className,
  children,
  style,
  onClick,
}: Props) {
  const classes: string[] = ["flex"];
  const customStyle: React.CSSProperties = {};

  // justify
  if (justifyContent) {
    if (justifyContent === "around") {
      classes.push("justify-around");
    } else if (justifyContent === "between") {
      classes.push("justify-between");
    } else if (justifyContent === "center") {
      classes.push("justify-center");
    } else if (justifyContent === "end") {
      classes.push("justify-end");
    }
  } else {
    classes.push("justify-start");
  }

  // align-items
  if (alignItems) {
    if (alignItems === "start") {
      classes.push("items-start");
    } else if (alignItems === "center") {
      classes.push("items-center");
    } else if (alignItems === "end") {
      classes.push("items-end");
    }
  } else {
    classes.push("items-stretch");
  }

  // text-align
  if (textAlign) {
    if (textAlign === "center") {
      classes.push("text-center");
    } else if (textAlign === "right") {
      classes.push("text-right");
    }
  } else {
    classes.push("text-left");
  }

  // flex-direction
  if (direction) {
    if (direction === "column") {
      classes.push("flex-col");
    } else if (direction === "column-reverse") {
      classes.push("flex-col-reverse");
    } else if (direction === "row-reverse") {
      classes.push("flex-row-reverse");
    }
  } else {
    classes.push("flex-row");
  }

  // backgroundColor
  if (backgroundColor) {
    if (
      typeof backgroundColor === "string" &&
      colors.hasOwnProperty(backgroundColor)
    ) {
      customStyle.backgroundColor = colors[backgroundColor as ThemeColor];
    } else if (typeof backgroundColor === "string") {
      customStyle.backgroundColor = backgroundColor;
    }
  }

  const allClasses = classes.join(" ") + (className ? ` ${className}` : "");

  return (
    <div
      className={allClasses}
      style={{ ...customStyle, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Flex;
