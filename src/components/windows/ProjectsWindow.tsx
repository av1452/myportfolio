"use client";

import { useState } from "react";
import Window from "../Window";
import type { AppWindow } from "@/types/window";

interface ProjectsWindowProps {
    window: AppWindow & { minimized: boolean };
    onClose: () => void;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
}

const projects = [
    {
        name: "CarDex",
        description:
            "An Android app for collecting and cataloging cars, with photos, achievements, XP, and progression.",
        technologies: ["Kotlin", "Jetpack Compose", "Firebase"],
        status: "In development",
        icon: "🚘",
        type: "Android Application",
        github: "",
    },
    {
        name: "macOS Tiger Portfolio",
        description:
            "A personal portfolio inspired by the classic Mac OS X Tiger desktop, featuring desktop icons and interactive application windows.",
        technologies: ["Next.js", "React", "TypeScript", "CSS"],
        status: "In development",
        icon: "🖥️",
        type: "Web Application",
        github: "",
    },
];

export default function ProjectsWindow({
    window,
    onClose,
    onMove,
    onFocus,
    onMinimize,
}: ProjectsWindowProps) {
    const [selectedProject, setSelectedProject] = useState(0);
    const [view, setView] = useState<"icons" | "list">("icons");

    const selected = projects[selectedProject];

    return (
        <Window
            title={window.title}
            x={window.x}
            y={window.y}
            zIndex={window.zIndex}
            width={window.width}
            height={window.height}
            minimized={window.minimized}
            onClose={onClose}
            onMove={onMove}
            onFocus={onFocus}
            onMinimize={onMinimize}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    minHeight: "100%",
                    margin: -24,
                    color: "#292929",
                    fontFamily: '"Lucida Grande", Helvetica, Arial, sans-serif',
                    fontSize: 12,
                }}
            >
                {/* Finder toolbar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "10px 14px",
                        background: "linear-gradient(#f9f9f9, #e3e3e3)",
                        borderBottom: "1px solid #bcbcbc",
                    }}
                >
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>
                            Projects
                        </div>
                        <div style={{ color: "#777", fontSize: 11 }}>
                            {projects.length} items
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 4 }}>
                        <button
                            type="button"
                            aria-pressed={view === "icons"}
                            onClick={() => setView("icons")}
                            title="Icon view"
                            style={toolbarButton(view === "icons")}
                        >
                            ▦
                        </button>
                        <button
                            type="button"
                            aria-pressed={view === "list"}
                            onClick={() => setView("list")}
                            title="List view"
                            style={toolbarButton(view === "list")}
                        >
                            ☷
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "125px minmax(0, 1fr)",
                        flex: 1,
                        minHeight: 250,
                    }}
                >
                    {/* Finder sidebar */}
                    <aside
                        style={{
                            padding: "12px 8px",
                            background: "linear-gradient(90deg, #e8e8e8, #f0f0f0)",
                            borderRight: "1px solid #ccc",
                        }}
                    >
                        <div style={sidebarHeading}>FAVORITES</div>
                        <button
                            type="button"
                            onClick={() => setSelectedProject(0)}
                            style={sidebarButton(selectedProject === 0)}
                        >
                            🚘 CarDex
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedProject(1)}
                            style={sidebarButton(selectedProject === 1)}
                        >
                            🖥️ Portfolio
                        </button>

                        <div style={{ ...sidebarHeading, marginTop: 20 }}>
                            PROJECTS
                        </div>
                        <div style={{ padding: "5px 8px", color: "#666" }}>
                            In Development
                        </div>
                    </aside>

                    {/* Project browser */}
                    <div style={{ padding: 16, minWidth: 0 }}>
                        {view === "icons" ? (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit, minmax(110px, 1fr))",
                                    gap: 12,
                                    alignContent: "start",
                                }}
                            >
                                {projects.map((project, index) => (
                                    <button
                                        key={project.name}
                                        type="button"
                                        onClick={() => setSelectedProject(index)}
                                        onDoubleClick={() =>
                                            setSelectedProject(index)
                                        }
                                        aria-pressed={selectedProject === index}
                                        style={{
                                            minHeight: 112,
                                            padding: 10,
                                            border:
                                                selectedProject === index
                                                    ? "1px solid #7298ce"
                                                    : "1px solid transparent",
                                            borderRadius: 6,
                                            background:
                                                selectedProject === index
                                                    ? "linear-gradient(#e4efff, #c8dcf8)"
                                                    : "transparent",
                                            color: "#222",
                                            cursor: "pointer",
                                            font: "inherit",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 38,
                                                marginBottom: 8,
                                                filter:
                                                    "drop-shadow(0 2px 1px rgba(0,0,0,.12))",
                                            }}
                                        >
                                            {project.icon}
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {project.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div style={listHeader}>
                                    <span>Kind</span>
                                    <span>Name</span>
                                    <span>Status</span>
                                </div>
                                {projects.map((project, index) => (
                                    <button
                                        key={project.name}
                                        type="button"
                                        onClick={() => setSelectedProject(index)}
                                        aria-pressed={selectedProject === index}
                                        style={{
                                            ...listRow,
                                            background:
                                                selectedProject === index
                                                    ? "#d7e7fc"
                                                    : index % 2 === 0
                                                      ? "#fff"
                                                      : "#f4f4f4",
                                        }}
                                    >
                                        <span>{project.icon}</span>
                                        <span>{project.name}</span>
                                        <span>{project.status}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected project details */}
                <section
                    style={{
                        padding: "14px 18px 18px",
                        background: "linear-gradient(#f7f7f7, #e9e9e9)",
                        borderTop: "1px solid #ccc",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <span style={{ fontSize: 30 }}>{selected.icon}</span>
                        <div>
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    fontWeight: 700,
                                }}
                            >
                                {selected.name}
                            </h2>
                            <div style={{ color: "#777", marginTop: 3 }}>
                                {selected.type} · {selected.status}
                            </div>
                        </div>
                    </div>

                    <p style={{ lineHeight: 1.6, margin: "8px 0 12px" }}>
                        {selected.description}
                    </p>

                    <div style={{ fontWeight: 700, marginBottom: 7 }}>
                        Technologies
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                        }}
                    >
                        {selected.technologies.map((technology) => (
                            <span
                                key={technology}
                                style={{
                                    padding: "4px 8px",
                                    borderRadius: 10,
                                    border: "1px solid #c5c5c5",
                                    background: "#fff",
                                    color: "#444",
                                    fontSize: 11,
                                }}
                            >
                                {technology}
                            </span>
                        ))}
                    </div>

                    {selected.github && (
                        <p style={{ margin: "12px 0 0" }}>
                            <a
                                href={selected.github}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#245c9b" }}
                            >
                                View on GitHub ↗
                            </a>
                        </p>
                    )}
                </section>
            </div>
        </Window>
    );
}

function toolbarButton(active: boolean): React.CSSProperties {
    return {
        width: 30,
        height: 26,
        border: "1px solid #aaa",
        borderRadius: 4,
        background: active
            ? "linear-gradient(#d5d5d5, #f5f5f5)"
            : "linear-gradient(#fff, #e5e5e5)",
        boxShadow: active ? "inset 0 1px 2px #bbb" : "0 1px 1px #fff",
        color: "#333",
        fontSize: 16,
        cursor: "pointer",
    };
}

const sidebarHeading: React.CSSProperties = {
    padding: "4px 8px",
    color: "#777",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.5,
};

function sidebarButton(active: boolean): React.CSSProperties {
    return {
        display: "block",
        width: "100%",
        marginTop: 3,
        padding: "7px 8px",
        border: active ? "1px solid #b2c9e7" : "1px solid transparent",
        borderRadius: 4,
        background: active ? "#d3e4fa" : "transparent",
        color: "#333",
        font: "inherit",
        textAlign: "left",
        cursor: "pointer",
    };
}

const listHeader: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "38px minmax(0, 1fr) 90px",
    gap: 8,
    padding: "7px 8px",
    color: "#666",
    fontWeight: 700,
    borderBottom: "1px solid #ccc",
};

const listRow: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "38px minmax(0, 1fr) 90px",
    gap: 8,
    alignItems: "center",
    width: "100%",
    padding: "9px 8px",
    border: 0,
    color: "#333",
    font: "inherit",
    textAlign: "left",
    cursor: "pointer",
};