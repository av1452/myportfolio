
"use client";

import Dock from "./Dock";

import { useState } from "react";

import MenuBar from "./MenuBar";
import Wallpaper from "./Wallpaper";
import DesktopIcon from "./DesktopIcon";

import AboutWindow from "./windows/AboutWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ResumeWindow from "./windows/ResumeWindow";
import TerminalWindow from "./windows/TerminalWindow";
import SafariWindow from "./windows/SafariWindow";

import { desktopIcons } from "@/data/desktopIcons";
import type { AppWindow } from "@/types/window";

type WindowKey = "about" | "projects" | "experience" | "resume" | "terminal" | "safari";
type WindowState = Record<WindowKey, AppWindow & { minimized: boolean }>;

export default function Desktop() {
    const [windows, setWindows] = useState<WindowState>({
        about: {
            id: "about",
            title: "About Me",
            open: false,
            minimized: false,
            x: 120,
            y: 80,
            width: 650,
            height: 450,
            zIndex: 1,
        },
        projects: {
            id: "projects",
            title: "Projects",
            open: false,
            minimized: false,
            x: 140,
            y: 100,
            width: 650,
            height: 450,
            zIndex: 2,
        },
        experience: {
            id: "experience",
            title: "Experience",
            open: false,
            minimized: false,
            x: 180,
            y: 100,
            width: 720,
            height: 500,
            zIndex: 6,
        },
        resume: {
            id: "resume",
            title: "Resume",
            open: false,
            minimized: false,
            x: 160,
            y: 120,
            width: 650,
            height: 450,
            zIndex: 3,
        },
        terminal: {
            id: "terminal",
            title: "Terminal",
            open: false,
            minimized: false,
            x: 180,
            y: 140,
            width: 650,
            height: 450,
            zIndex: 4,
        },
        safari: {
            id: "safari",
            title: "Safari",
            open: false,
            minimized: false,
            x: 200,
            y: 160,
            width: 650,
            height: 450,
            zIndex: 5,
        },
    });

    function nextZIndex(state: WindowState) {
        return Math.max(0, ...Object.values(state).map((w) => w.zIndex)) + 1;
    }

    function openWindow(key: WindowKey) {
        setWindows((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                open: true,
                minimized: false,
                zIndex: nextZIndex(prev),
            },
        }));
    }

    function closeWindow(key: WindowKey) {
        setWindows((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                open: false,
                minimized: false,
            },
        }));
    }

    function moveWindow(key: WindowKey, x: number, y: number) {
        setWindows((prev) => ({
            ...prev,
            [key]: { ...prev[key], x, y },
        }));
    }

    function focusWindow(key: WindowKey) {
        setWindows((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                zIndex: nextZIndex(prev),
            },
        }));
    }

    function minimizeWindow(key: WindowKey) {
        setWindows((prev) => ({
            ...prev,
            [key]: { ...prev[key], minimized: true },
        }));
    }

    const activeWindow = Object.entries(windows)
    .filter(([, window]) => window.open && !window.minimized)
    .sort((a, b) => b[1].zIndex - a[1].zIndex)[0];

    const sharedProps = (key: WindowKey) => ({
        window: windows[key],
        onClose: () => closeWindow(key),
        onMove: (x: number, y: number) => moveWindow(key, x, y),
        onFocus: () => focusWindow(key),
        onMinimize: () => minimizeWindow(key),
    });

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Wallpaper />
            <MenuBar
                    activeTitle={activeWindow?.[1].title ?? "Finder"}
                    onOpenWindow={openWindow}
                    onCloseActiveWindow={() => {
                if (activeWindow) {
                    closeWindow(activeWindow[0] as WindowKey);
                }
                    }}
            />

            <div
                style={{
                    position: "absolute",
                    top: 40,
                    right: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                }}
            >
                {desktopIcons.map((icon) => (
                    <DesktopIcon
                        key={icon.id}
                        title={icon.title}
                        icon={icon.icon}
                        onOpen={() => openWindow(icon.window as WindowKey)}
                    />
                ))}
            </div>

            {windows.about.open && (
                <AboutWindow {...sharedProps("about")} />
            )}

            {windows.projects.open && (
                <ProjectsWindow {...sharedProps("projects")} />
            )}

            {windows.experience.open && (
                <ExperienceWindow {...sharedProps("experience")} />
            )}

            {windows.resume.open && (
                <ResumeWindow {...sharedProps("resume")} />
            )}

            {windows.terminal.open && (
                <TerminalWindow {...sharedProps("terminal")} onOpenWindow={openWindow} />
            )}

            {windows.safari.open && (
                <SafariWindow {...sharedProps("safari")} />
            )}

            <Dock
                windows={windows}
                onOpenWindow={openWindow}
                />
        </div>
    );
}