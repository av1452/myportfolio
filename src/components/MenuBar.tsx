"use client";

import { useEffect, useState } from "react";
import styles from "./MenuBar.module.css";

type WindowKey = "about" | "projects" | "experience" | "resume" | "terminal" | "safari";

interface MenuBarProps {
    activeTitle: string;
    onOpenWindow: (key: WindowKey) => void;
    onCloseActiveWindow: () => void;
}

interface MenuAction {
    label: string;
    action: () => void;
}

export default function MenuBar({
    activeTitle,
    onOpenWindow,
    onCloseActiveWindow,
}: MenuBarProps) {
    const [time, setTime] = useState("");
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    useEffect(() => {
        const updateClock = () => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                })
            );
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);

    const menus: { label: string; items: MenuAction[] }[] = [
        {
            label: "File",
            items: [
                {
                    label: "Open Safari",
                    action: () => onOpenWindow("safari"),
                },
                {
                    label: "Open Terminal",
                    action: () => onOpenWindow("terminal"),
                },
                {
                    label: "Close Active Window",
                    action: onCloseActiveWindow,
                },
            ],
        },
        {
            label: "Edit",
            items: [
                {
                    label: "About Me",
                    action: () => onOpenWindow("about"),
                },
                {
                    label: "Projects",
                    action: () => onOpenWindow("projects"),
                },
                {
                    label: "Experience",
                    action: () => onOpenWindow("experience"),
                },
                {
                    label: "Experience",
                    action: () => onOpenWindow("experience"),
                },
                {
                    label: "Resume",
                    action: () => onOpenWindow("resume"),
                },
            ],
        },
        {
            label: "View",
            items: [
                {
                    label: "Show About Me",
                    action: () => onOpenWindow("about"),
                },
                {
                    label: "Show Projects",
                    action: () => onOpenWindow("projects"),
                },
                {
                    label: "Show Experience",
                    action: () => onOpenWindow("experience"),
                },
                {
                    label: "Show Resume",
                    action: () => onOpenWindow("resume"),
                },
            ],
        },
        {
            label: "Go",
            items: [
                {
                    label: "About Me",
                    action: () => onOpenWindow("about"),
                },
                {
                    label: "Projects",
                    action: () => onOpenWindow("projects"),
                },
                {
                    label: "Experience",
                    action: () => onOpenWindow("experience"),
                },
                {
                    label: "Resume",
                    action: () => onOpenWindow("resume"),
                },
                {
                    label: "Terminal",
                    action: () => onOpenWindow("terminal"),
                },
                {
                    label: "Safari",
                    action: () => onOpenWindow("safari"),
                },
            ],
        },
        {
            label: "Window",
            items: [
                {
                    label: "About Me",
                    action: () => onOpenWindow("about"),
                },
                {
                    label: "Projects",
                    action: () => onOpenWindow("projects"),
                },
                {
                    label: "Resume",
                    action: () => onOpenWindow("resume"),
                },
                {
                    label: "Terminal",
                    action: () => onOpenWindow("terminal"),
                },
                {
                    label: "Safari",
                    action: () => onOpenWindow("safari"),
                },
            ],
        },
        {
            label: "Help",
            items: [
                {
                    label: "About This Portfolio",
                    action: () => onOpenWindow("about"),
                },
                {
                    label: "View Resume",
                    action: () => onOpenWindow("resume"),
                },
            ],
        },
    ];

    function runAction(action: () => void) {
        action();
        setOpenMenu(null);
    }

    return (
        <header
            className={styles.menuBar}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setOpenMenu(null);
                }
            }}
        >
            <div className={styles.leftSide}>
                <div className={styles.menuGroup}>
                    <button
                        type="button"
                        className={`${styles.menuButton} ${styles.appleButton}`}
                        aria-label="Apple menu"
                        aria-expanded={openMenu === "Apple"}
                        onClick={() =>
                            setOpenMenu(openMenu === "Apple" ? null : "Apple")
                        }
                    >
                        
                    </button>

                    {openMenu === "Apple" && (
                        <div className={styles.dropdown}>
                            <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() =>
                                    runAction(() => onOpenWindow("about"))
                                }
                            >
                                About This Mac
                            </button>

                            <div className={styles.separator} />

                            <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() =>
                                    runAction(() => onOpenWindow("projects"))
                                }
                            >
                                Projects
                            </button>

                            <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() =>
                                    runAction(() => onOpenWindow("resume"))
                                }
                            >
                                Resume
                            </button>
                        </div>
                    )}
                </div>

                <span className={styles.activeApp}>{activeTitle}</span>

                {menus.map((menu) => (
                    <div className={styles.menuGroup} key={menu.label}>
                        <button
                            type="button"
                            className={`${styles.menuButton} ${
                                openMenu === menu.label ? styles.selected : ""
                            }`}
                            aria-expanded={openMenu === menu.label}
                            onClick={() =>
                                setOpenMenu(
                                    openMenu === menu.label ? null : menu.label
                                )
                            }
                        >
                            {menu.label}
                        </button>

                        {openMenu === menu.label && (
                            <div className={styles.dropdown}>
                                {menu.items.map((item) => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className={styles.dropdownItem}
                                        onClick={() => runAction(item.action)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.rightSide}>
                <span className={styles.icon} aria-label="Wi-Fi">
                    📶
                </span>
                <span className={styles.icon} aria-label="Sound">
                    🔊
                </span>
                <span className={styles.icon} aria-label="Battery">
                    🔋
                </span>
                <span className={styles.clock}>{time}</span>
            </div>

            {openMenu !== null && (
                <button
                    type="button"
                    className={styles.dismissLayer}
                    aria-label="Close menu"
                    onClick={() => setOpenMenu(null)}
                    tabIndex={-1}
                />
            )}
        </header>
    );
}