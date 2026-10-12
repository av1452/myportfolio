"use client";

import Window from "../Window";
import type { AppWindow } from "@/types/window";

interface ResumeWindowProps {
    window: AppWindow & { minimized: boolean };
    onClose: () => void;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
}

export default function ResumeWindow({
    window,
    onClose,
    onMove,
    onFocus,
    onMinimize,
}: ResumeWindowProps) {
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
                    height: "100%",
                    margin: -24,
                    overflow: "hidden",
                    background: "#d6d6d6",
                    fontFamily:
                        '"Lucida Grande", Helvetica, Arial, sans-serif',
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 8,
                        padding: "8px 12px",
                        background:
                            "linear-gradient(to bottom, #f9f9f9, #dedede)",
                        borderBottom: "1px solid #aaa",
                    }}
                >
                    <span
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#333",
                        }}
                    >
                        Resume.pdf
                    </span>

                    <div style={{ display: "flex", gap: 8 }}>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            style={buttonStyle}
                        >
                            Open in New Tab ↗
                        </a>

                        <a
                            href="/resume.pdf"
                            download="Aidan-Vazquez-Resume.pdf"
                            style={buttonStyle}
                        >
                            ↓ Download
                        </a>
                    </div>
                </div>

                <iframe
                    src="/resume.pdf"
                    title="Aidan Vazquez Resume"
                    style={{
                        display: "block",
                        flex: 1,
                        width: "100%",
                        minHeight: 0,
                        border: 0,
                        background: "#fff",
                    }}
                />
            </div>
        </Window>
    );
}

const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 10px",
    border: "1px solid #aaa",
    borderRadius: 4,
    background: "linear-gradient(#fff, #e5e5e5)",
    color: "#333",
    fontSize: 11,
    textDecoration: "none",
    whiteSpace: "nowrap",
};