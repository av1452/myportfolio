"use client";

import { useState } from "react";
import Window from "../Window";
import type { AppWindow } from "@/types/window";

interface ExperienceWindowProps {
    window: AppWindow & { minimized: boolean };
    onClose: () => void;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
}

const experiences = [
    {
        company: "Homewood School District 153",
        role: "Technology Intern",
        period: "May – September",
        category: "IT Support",
        icon: "💻",
        details: [
            "Provided Level 1 technical support for Windows laptops and iPadOS devices.",
            "Troubleshot hardware, operating systems, and user profiles for faculty and staff.",
            "Helped provision, configure, update, and reset devices using Windows Autopilot, Microsoft Intune, and Cisco Meraki.",
        ],
        technologies: ["Windows", "iPadOS", "Intune", "Autopilot", "Cisco Meraki"],
    },
    {
        company: "Sensit Technologies",
        role: "Manufacturing Engineering / Quality Control Intern",
        period: "May – August 2025",
        category: "Software Development",
        icon: "⚙️",
        details: [
            "Developed a C# WPF tablet interface integrating industrial hardware, PCB firmware, and SQL.",
            "Contributed to automation improvements that reduced labor by approximately 15%.",
        ],
        technologies: ["C#", "WPF", "SQL", "Hardware Integration", "Automation"],
    },
    {
        company: "First Tee",
        role: "Coach",
        period: "Since 2021",
        category: "Coaching & Mentoring",
        icon: "⛳",
        details: [
            "Coach and mentor young people through golf and character-development activities.",
            "Build communication, patience, and leadership skills through hands-on instruction.",
        ],
        technologies: ["Coaching", "Mentoring", "Communication", "Leadership"],
    },
];

export default function ExperienceWindow({
    window,
    onClose,
    onMove,
    onFocus,
    onMinimize,
}: ExperienceWindowProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = experiences[selectedIndex];

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
                    minHeight: "100%",
                    margin: -24,
                    color: "#292929",
                    fontFamily: '"Lucida Grande", Helvetica, Arial, sans-serif',
                    fontSize: 12,
                }}
            >
                <header
                    style={{
                        padding: "12px 16px",
                        background: "linear-gradient(#fafafa, #e3e3e3)",
                        borderBottom: "1px solid #bbb",
                    }}
                >
                    <div style={{ fontSize: 16, fontWeight: 700 }}>
                        Experience
                    </div>
                    <div style={{ color: "#666", marginTop: 4 }}>
                        Technical work, coaching, and professional growth
                    </div>
                </header>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(145px, 34%) minmax(0, 1fr)",
                        flex: 1,
                        minHeight: 280,
                    }}
                >
                    <aside
                        style={{
                            padding: 10,
                            background: "linear-gradient(90deg, #e8e8e8, #f2f2f2)",
                            borderRight: "1px solid #ccc",
                        }}
                    >
                        <div
                            style={{
                                padding: "4px 8px 10px",
                                color: "#777",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: 0.6,
                            }}
                        >
                            EXPERIENCE
                        </div>

                        {experiences.map((experience, index) => (
                            <button
                                key={experience.company}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                aria-pressed={selectedIndex === index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    width: "100%",
                                    padding: "10px 8px",
                                    marginBottom: 4,
                                    border: selectedIndex === index
                                        ? "1px solid #9bbbe4"
                                        : "1px solid transparent",
                                    borderRadius: 5,
                                    background: selectedIndex === index
                                        ? "linear-gradient(#e5f0ff, #c9defa)"
                                        : "transparent",
                                    color: "#222",
                                    textAlign: "left",
                                    font: "inherit",
                                    cursor: "pointer",
                                }}
                            >
                                <span style={{ fontSize: 22 }}>
                                    {experience.icon}
                                </span>
                                <span style={{ minWidth: 0, lineHeight: 1.4 }}>
                                    <span style={{ display: "block", fontWeight: 600 }}>
                                        {experience.company}
                                    </span>
                                    <span style={{ display: "block", color: "#666", fontSize: 10 }}>
                                        {experience.category}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </aside>

                    <main style={{ padding: 18, minWidth: 0 }}>
                        <div style={{ fontSize: 34, marginBottom: 8 }}>
                            {selected.icon}
                        </div>

                        <div
                            style={{
                                color: "#777",
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 0.6,
                            }}
                        >
                            {selected.category}
                        </div>

                        <h2
                            style={{
                                margin: "6px 0",
                                fontSize: 19,
                                lineHeight: 1.35,
                            }}
                        >
                            {selected.company}
                        </h2>

                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                            {selected.role}
                        </div>

                        <div style={{ marginTop: 5, color: "#777" }}>
                            {selected.period}
                        </div>

                        <div
                            style={{
                                height: 1,
                                background: "#ddd",
                                margin: "16px 0",
                            }}
                        />

                        <h3 style={{ fontSize: 12, margin: "0 0 10px" }}>
                            Highlights
                        </h3>

                        <ul
                            style={{
                                paddingLeft: 18,
                                margin: 0,
                                lineHeight: 1.65,
                            }}
                        >
                            {selected.details.map((detail) => (
                                <li key={detail} style={{ marginBottom: 8 }}>
                                    {detail}
                                </li>
                            ))}
                        </ul>

                        <h3 style={{ fontSize: 12, margin: "20px 0 9px" }}>
                            Skills & Tools
                        </h3>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {selected.technologies.map((technology) => (
                                <span
                                    key={technology}
                                    style={{
                                        padding: "5px 8px",
                                        border: "1px solid #ccc",
                                        borderRadius: 4,
                                        background: "linear-gradient(#fff, #eee)",
                                        fontSize: 10,
                                    }}
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </main>
                </div>

                <footer
                    style={{
                        padding: "7px 12px",
                        background: "linear-gradient(#f5f5f5, #e3e3e3)",
                        borderTop: "1px solid #ccc",
                        color: "#666",
                        fontSize: 10,
                    }}
                >
                    {selectedIndex + 1} of {experiences.length} experiences
                </footer>
            </div>
        </Window>
    );
}
