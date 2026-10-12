"use client";

import Window from "../Window";
import type { AppWindow } from "@/types/window";

interface AboutWindowProps {
    window: AppWindow & { minimized: boolean };
    onClose: () => void;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
}

export default function AboutWindow({
    window,
    onClose,
    onMove,
    onFocus,
    onMinimize,
}: AboutWindowProps) {
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
                    maxWidth: 520,
                    margin: "0 auto",
                    color: "#292929",
                    fontFamily: '"Lucida Grande", Helvetica, Arial, sans-serif',
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        padding: "4px 0 22px",
                        borderBottom: "1px solid #d5d5d5",
                    }}
                >
                    <div
                        style={{
                            fontSize: 48,
                            lineHeight: 1.2,
                            textShadow: "0 2px 3px rgba(0,0,0,.2)",
                        }}
                    >
                        
                    </div>

                    <h1
                        style={{
                            fontSize: 25,
                            margin: "8px 0 4px",
                            fontWeight: 600,
                        }}
                    >
                        About This Mac
                    </h1>

                    <p style={{ margin: 0, fontSize: 12, color: "#666" }}>
                        A portfolio running on curiosity.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "100px 1fr",
                        gap: 20,
                        alignItems: "start",
                        padding: "22px 4px",
                    }}
                >
                    <div
                        style={{
                            height: 100,
                            borderRadius: 18,
                            background:
                                "linear-gradient(145deg, #8dc9f5, #2868ad 55%, #18366d)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 46,
                            boxShadow: "inset 0 1px 4px rgba(255,255,255,.6), 0 2px 5px rgba(0,0,0,.2)",
                        }}
                    >
                        AV
                    </div>

                    <div>
                        <h2
                            style={{
                                margin: "0 0 7px",
                                fontSize: 19,
                                fontWeight: 600,
                            }}
                        >
                            Aidan Vazquez
                        </h2>

                        <p
                            style={{
                                margin: "0 0 12px",
                                fontSize: 12,
                                lineHeight: 1.6,
                                color: "#444",
                            }}
                        >
                            Computer Science graduate from Valparaiso
                            University, with minors in Computer Engineering
                            and Mathematics.
                        </p>

                        <p
                            style={{
                                margin: 0,
                                fontSize: 12,
                                lineHeight: 1.6,
                                color: "#444",
                            }}
                        >
                            Interested in software development, web
                            technologies, device support, and building useful
                            applications.
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        border: "1px solid #c8c8c8",
                        borderRadius: 6,
                        overflow: "hidden",
                        background: "linear-gradient(#fafafa, #eeeeee)",
                    }}
                >
                    <div
                        style={{
                            padding: "8px 12px",
                            background: "linear-gradient(#e9e9e9, #d9d9d9)",
                            borderBottom: "1px solid #c8c8c8",
                            fontSize: 12,
                            fontWeight: 700,
                        }}
                    >
                        System Information
                    </div>

                    {[
                        ["Education", "B.S. Computer Science"],
                        ["University", "Valparaiso University"],
                        ["Graduated", "May 2026"],
                        ["Focus", "Software Development & IT"],
                        ["Portfolio", "Tiger-inspired desktop"],
                    ].map(([label, value], index) => (
                        <div
                            key={label}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "115px 1fr",
                                gap: 10,
                                padding: "8px 12px",
                                fontSize: 12,
                                background:
                                    index % 2 === 0 ? "#f9f9f9" : "#eeeeee",
                                borderBottom:
                                    index === 4 ? "none" : "1px solid #dedede",
                            }}
                        >
                            <span style={{ color: "#666" }}>{label}</span>
                            <span style={{ fontWeight: 500 }}>{value}</span>
                        </div>
                    ))}
                </div>

                <p
                    style={{
                        margin: "18px 0 0",
                        textAlign: "center",
                        fontSize: 11,
                        color: "#777",
                    }}
                >
                    Designed with a little nostalgia for Mac OS X Tiger.
                </p>
            </div>
        </Window>
    );
}