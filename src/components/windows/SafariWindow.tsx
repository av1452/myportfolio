import type { CSSProperties } from "react";
import Window from "../Window";
import type { AppWindow } from "@/types/window";

interface SafariWindowProps {
    window: AppWindow & { minimized: boolean };
    onClose: () => void;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
}

const linkStyle: CSSProperties = {
    color: "#0000ee",
    textDecoration: "underline",
};

const sectionStyle: CSSProperties = {
    padding: "12px 0 16px",
    borderBottom: "1px dotted #888",
    scrollMarginTop: 12,
};

const sections = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
];

export default function SafariWindow({
    window,
    onClose,
    onMove,
    onFocus,
    onMinimize,
}: SafariWindowProps) {
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
                    height: "100%",
                    overflowY: "auto",
                    background: "#fff",
                    color: "#222",
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: 16,
                    lineHeight: 1.45,
                }}
            >
                {/* Classic Safari-style address bar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 10px",
                        background: "linear-gradient(#f7f7f7, #ddd)",
                        borderBottom: "1px solid #aaa",
                        fontFamily: "Arial, sans-serif",
                        fontSize: 11,
                        color: "#555",
                    }}
                >
                    <span>◀</span>
                    <span style={{ color: "#999" }}>▶</span>
                    <span>↻</span>
                    <div
                        style={{
                            flex: 1,
                            padding: "4px 8px",
                            background: "#fff",
                            border: "1px solid #aaa",
                            borderRadius: 2,
                        }}
                    >
                        http://www.aidanvazquez.com/
                    </div>
                </div>

                <div style={{ maxWidth: 760, margin: "0 auto", padding: "16px 22px 28px" }}>
                    <header
                        style={{
                            padding: "16px 18px",
                            color: "#fff",
                            background: "#336699",
                            border: "1px solid #20496f",
                        }}
                    >
                        <div style={{ fontSize: 28, fontWeight: "bold", lineHeight: 1.1 }}>
                            Aidan Vazquez
                        </div>
                        <div style={{ marginTop: 5, fontSize: 14 }}>
                            Computer Science Graduate · Software &amp; IT
                        </div>
                    </header>

                    <nav
                        aria-label="Page sections"
                        style={{
                            padding: "9px 10px",
                            background: "#eaf1f7",
                            border: "1px solid #b8c9d8",
                            borderTop: 0,
                            fontSize: 14,
                        }}
                    >
                        {sections.map((section, index) => (
                            <span key={section.id}>
                                {index > 0 && (
                                    <span style={{ color: "#777", padding: "0 8px" }}>|</span>
                                )}
                                <a href={`#${section.id}`} style={linkStyle}>
                                    {section.label}
                                </a>
                            </span>
                        ))}
                    </nav>

                    <main>
                        <section id="about" style={sectionStyle}>
                            <h1 style={{ color: "#234f78", fontSize: 25, margin: "4px 0 8px" }}>
                                Welcome to my homepage!
                            </h1>
                            <p>
                                Hello, and thanks for stopping by. I&apos;m Aidan, a Valparaiso
                                University Computer Science graduate interested in software
                                development, technology, and IT support.
                            </p>
                            <p>
                                I enjoy building useful applications, learning how technology
                                works, and helping people solve technical problems.
                            </p>
                        </section>

                        <section id="projects" style={sectionStyle}>
                            <h2 style={{ color: "#234f78", fontSize: 22 }}>Projects</h2>
                            <h3>CarDex</h3>
                            <p>
                                An Android app for collecting and cataloging cars, with saved
                                vehicles, rarity categories, experience points, and achievements.
                            </p>
                            <h3>This Portfolio</h3>
                            <p>
                                A personal portfolio inspired by classic Mac OS X Tiger, built
                                with Next.js, React, and TypeScript.
                            </p>
                            <p>
                                <a href="https://github.com/av1452" target="_blank" rel="noreferrer" style={linkStyle}>
                                    Visit my GitHub for code and projects
                                </a>
                            </p>
                        </section>

                        <section id="experience" style={sectionStyle}>
                            <h2 style={{ color: "#234f78", fontSize: 22 }}>Experience</h2>
                            <h3>Homewood School District 153 — Technology Intern</h3>
                            <p>
                                Provided Level 1 Windows and iPadOS support, troubleshot hardware,
                                operating-system and user-profile issues, and worked with Windows
                                Autopilot, Intune, and Cisco Meraki.
                            </p>
                            <h3>Sensit Technologies — Manufacturing Engineering / Quality Control Intern</h3>
                            <p>
                                Developed a C# WPF tablet interface integrating industrial hardware,
                                PCB firmware, and SQL, contributing to a reported 15% reduction in labor.
                            </p>
                            <h3>First Tee — Coach</h3>
                            <p>
                                Coach and mentor young golfers, helping them build skills,
                                confidence, and sportsmanship.
                            </p>
                        </section>

                        <section id="resume" style={sectionStyle}>
                            <h2 style={{ color: "#234f78", fontSize: 22 }}>Resume</h2>
                            <p>Want a closer look at my background and skills?</p>
                            <p>
                                <a href="/resume.pdf" target="_blank" rel="noreferrer" style={linkStyle}>
                                    View my resume (PDF)
                                </a>
                                {" · "}
                                <a href="/resume.pdf" download style={linkStyle}>
                                    Download a copy
                                </a>
                            </p>
                        </section>

                        <section id="contact" style={{ ...sectionStyle, borderBottom: 0 }}>
                            <h2 style={{ color: "#234f78", fontSize: 22 }}>Contact</h2>
                            <p>
                                I&apos;d be happy to connect about entry-level software, web
                                development, or IT support opportunities.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://github.com/av1452" target="_blank" rel="noreferrer" style={linkStyle}>
                                        GitHub — av1452
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={linkStyle}>
                                        LinkedIn
                                    </a>
                                    {" — update with your profile URL"}
                                </li>
                            </ul>
                        </section>
                    </main>

                    <footer
                        style={{
                            borderTop: "1px dotted #888",
                            paddingTop: 10,
                            color: "#666",
                            fontSize: 12,
                            textAlign: "center",
                        }}
                    >
                        <div>Thanks for visiting!</div>
                        <div>Made with HTML nostalgia and a little Mac OS X Tiger spirit.</div>
                        <p><a href="#about" style={linkStyle}>Back to top</a></p>
                    </footer>
                </div>
            </div>
        </Window>
    );
}
