"use client";

import { useState } from "react";
import Image from "next/image";
import type { AppWindow } from "@/types/window";
import { desktopIcons } from "@/data/desktopIcons";
import styles from "./Dock.module.css";

type WindowKey = "about" | "projects" | "experience" | "resume" | "terminal" | "safari";

type WindowState = Record<
    WindowKey,
    AppWindow & { minimized: boolean }
>;

interface DockProps {
    windows: WindowState;
    onOpenWindow: (key: WindowKey) => void;
}

export default function Dock({ windows, onOpenWindow }: DockProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const minimizedWindows = desktopIcons.filter((icon) => {
        const key = icon.window as WindowKey;
        return windows[key].open && windows[key].minimized;
    });

    function getMagnificationClass(index: number) {
        if (hoveredIndex === null) return "";

        const distance = Math.abs(index - hoveredIndex);

        if (distance === 0) return styles.magnified;
        if (distance === 1) return styles.neighbor;
        if (distance === 2) return styles.nearNeighbor;

        return "";
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 999999,
            }}
        >
            <nav
                className={styles.dock}
                aria-label="Application Dock"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {desktopIcons.map((icon, index) => {
                    const key = icon.window as WindowKey;
                    const window = windows[key];

                    return (
                        <button
                            key={icon.id}
                            type="button"
                            className={`${styles.dockItem} ${getMagnificationClass(index)}`}
                            aria-label={`Open ${icon.title}`}
                            title={icon.title}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onFocus={() => setHoveredIndex(index)}
                            onBlur={() => setHoveredIndex(null)}
                            onClick={() => onOpenWindow(key)}
                        >
                            <Image
                                src={icon.icon}
                                alt={icon.title}
                                width={48}
                                height={48}
                                className={styles.icon}
                            />

                            <span className={styles.label}>
                                {icon.title}
                            </span>

                            {window.open && !window.minimized && (
                                <span className={styles.indicator} />
                            )}
                        </button>
                    );
                })}

                {minimizedWindows.length > 0 && (
                    <>
                        <div
                            className={styles.separator}
                            aria-hidden="true"
                        />

                        {minimizedWindows.map((icon, index) => {
                            const dockIndex = desktopIcons.length + index;

                            return (
                                <button
                                    key={`minimized-${icon.id}`}
                                    type="button"
                                    className={`${styles.dockItem} ${styles.minimizedItem} ${getMagnificationClass(dockIndex)}`}
                                    aria-label={`Restore ${icon.title}`}
                                    title={`Restore ${icon.title}`}
                                    onMouseEnter={() =>
                                        setHoveredIndex(dockIndex)
                                    }
                                    onFocus={() =>
                                        setHoveredIndex(dockIndex)
                                    }
                                    onBlur={() => setHoveredIndex(null)}
                                    onClick={() =>
                                        onOpenWindow(icon.window as WindowKey)
                                    }
                                >
                                    <Image
                                        src={icon.icon}
                                        alt={icon.title}
                                        width={42}
                                        height={42}
                                        className={`${styles.icon} ${styles.minimizedIcon}`}
                                    />

                                    <span className={styles.label}>
                                        {icon.title}
                                    </span>
                                </button>
                            );
                        })}
                    </>
                )}
            </nav>
        </div>
    );
}