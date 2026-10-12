"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationEvent, PointerEvent, ReactNode } from "react";
import styles from "./Window.module.css";

type AnimationState =
    | "opening"
    | "open"
    | "closing"
    | "minimizing"
    | "minimized"
    | "restoring";

interface WindowProps {
    title: string;
    x: number;
    y: number;
    zIndex: number;
    width?: number;
    height?: number;
    minimized?: boolean;
    onClose: () => void;
    onMove?: (x: number, y: number) => void;
    onFocus?: () => void;
    onMinimize?: () => void;
    children: ReactNode;
}

export default function Window({
    title,
    x,
    y,
    zIndex,
    width = 650,
    height = 450,
    minimized = false,
    onClose,
    onMove,
    onFocus,
    onMinimize,
    children,
}: WindowProps) {
    const [zoomed, setZoomed] = useState(false);
    const [animationState, setAnimationState] =
        useState<AnimationState>("opening");

    const previousMinimized = useRef(minimized);

    const dragStart = useRef({
        pointerX: 0,
        pointerY: 0,
        windowX: x,
        windowY: y,
    });

    useEffect(() => {
        if (minimized) {
            setAnimationState("minimized");
        } else if (previousMinimized.current) {
            setAnimationState("restoring");
        }

        previousMinimized.current = minimized;
    }, [minimized]);

    function startDrag(event: PointerEvent<HTMLDivElement>) {
        if (event.button !== 0) return;
        if ((event.target as HTMLElement).closest("button")) return;

        onFocus?.();

        dragStart.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            windowX: x,
            windowY: y,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function drag(event: PointerEvent<HTMLDivElement>) {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

        const nextX =
            dragStart.current.windowX +
            event.clientX -
            dragStart.current.pointerX;

        const nextY =
            dragStart.current.windowY +
            event.clientY -
            dragStart.current.pointerY;

        onMove?.(nextX, nextY);
    }

    function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
        if (event.target !== event.currentTarget) return;

        switch (animationState) {
            case "opening":
            case "restoring":
                setAnimationState("open");
                break;

            case "closing":
                onClose();
                break;

            case "minimizing":
                setAnimationState("minimized");
                onMinimize?.();
                break;
        }
    }

    return (
        <div
            className={`${styles.window} ${styles[animationState]}`}
            style={{
                left: zoomed ? 10 : x,
                top: zoomed ? 45 : y,
                width: zoomed ? "calc(100vw - 20px)" : width,
                height: zoomed ? "calc(100vh - 100px)" : height,
                zIndex,
                display: minimized ? "none" : "block",
            }}
            onPointerDown={onFocus}
            onAnimationEnd={handleAnimationEnd}
        >
            <div
                className={styles.titleBar}
                onPointerDown={startDrag}
                onPointerMove={drag}
                onPointerUp={(event) => {
                    if (
                        event.currentTarget.hasPointerCapture(event.pointerId)
                    ) {
                        event.currentTarget.releasePointerCapture(
                            event.pointerId
                        );
                    }
                }}
            >
                <div className={styles.buttons}>
                    <button
                        type="button"
                        aria-label={`Close ${title}`}
                        className={`${styles.button} ${styles.close}`}
                        onClick={() => setAnimationState("closing")}
                    />

                    <button
                        type="button"
                        aria-label={`Minimize ${title}`}
                        className={`${styles.button} ${styles.minimize}`}
                        onClick={() => setAnimationState("minimizing")}
                    />

                    <button
                        type="button"
                        aria-label={`Zoom ${title}`}
                        className={`${styles.button} ${styles.zoom}`}
                        onClick={() => setZoomed((value) => !value)}
                    />
                </div>

                <span className={styles.title}>{title}</span>
            </div>

            <div className={styles.content}>{children}</div>
        </div>
    );
}