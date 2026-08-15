"use client";
import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Cursor.module.scss";

type CProps = {
  color: string;
  size: number;
};
interface Style {
  x: number;
  y: number;
  opacity: number;
  rotate: number;
}

const Cursor = ({ color, size }: CProps) => {
  const [css, setCss] = useState<Style>({ x: 0, y: 0, opacity: 0, rotate: 0 });
  const [isAnchorOrButton, setIsAnchorOrButton] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.add("has-custom-cursor");
    return () => document.body.classList.remove("has-custom-cursor");
  }, []);

  const _getIsAnchorOrButton = (target: Element) => {
    return (
      target.tagName.toLowerCase() === "a" ||
      target.tagName.toLowerCase() === "button" ||
      target.classList.contains("button") ||
      target.classList.contains("btn") ||
      target.classList.contains("pointer") ||
      target.classList.contains("cursor-pointer") ||
      target.role === "button"
    );
  };

  const _onMouseMove = useCallback((e: MouseEvent) => {
    const isTouch = typeof window !== undefined && window.innerWidth < 1080;
    if (isTouch) return;

    setIsAnchorOrButton(_getIsAnchorOrButton(e.target as Element));

    setCss((css) => ({
      ...css,
      x: e.clientX - size / 2,
      y: e.clientY - size / 2,
      opacity: 1,
    }));
  }, [size]);

  const _onMouseDown = () => setIsMouseDown(true);
  const _onMouseUp = () => setIsMouseDown(false);

  useEffect(() => {
    document.addEventListener("mousemove", _onMouseMove);
    document.addEventListener("mousedown", _onMouseDown);
    document.addEventListener("mouseup", _onMouseUp);

    return () => {
      document.removeEventListener("mousemove", _onMouseMove);
      document.removeEventListener("mousedown", _onMouseDown);
      document.removeEventListener("mouseup", _onMouseUp);
    };
  }, [_onMouseMove]);

  return (
    <div
      className={clsx(
        styles.wrapper,
        "cursor",
        isAnchorOrButton && styles.isAnchorOrButton,
        isMouseDown && styles.isMouseDown,
        isInput && styles.isInput,
      )}
      style={{
        transform: `translate(${css.x}px, ${css.y}px)`,
        opacity: css.opacity,
      }}>
      <div
        className={styles.dot}
        style={{ width: size, height: size, backgroundColor: color }}
      />
    </div>
  );
};

export default Cursor;
