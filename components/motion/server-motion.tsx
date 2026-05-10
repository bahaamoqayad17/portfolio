import { createElement, type CSSProperties, type ReactNode } from "react";

type ServerMotionProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
};

const motionOnlyProps = new Set([
  "animate",
  "exit",
  "initial",
  "layout",
  "onAnimationComplete",
  "onHoverEnd",
  "onHoverStart",
  "transition",
  "viewport",
  "whileHover",
  "whileInView",
  "whileTap",
]);

function createServerMotionElement(tag: string) {
  return function ServerMotionElement(props: ServerMotionProps) {
    const domProps: Record<string, unknown> = {};

    Object.entries(props).forEach(([key, value]) => {
      if (!motionOnlyProps.has(key)) {
        domProps[key] = value;
      }
    });

    return createElement(tag, domProps);
  };
}

export const motion = {
  div: createServerMotionElement("div"),
  p: createServerMotionElement("p"),
  span: createServerMotionElement("span"),
  li: createServerMotionElement("li"),
};
