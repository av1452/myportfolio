"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Window from "../Window";
import type { AppWindow } from "@/types/window";

type Command = "about" | "projects" | "experience" | "resume" | "contact";
type WindowCommand = "about" | "projects" | "experience" | "resume" | "safari";

interface TerminalWindowProps {
    window: AppWindow & { minimized: boolean };
    onClose: () => void;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
    onOpenWindow?: (key: WindowCommand) => void;
}

interface TerminalLine {
    text: string;
    kind: "input" | "output" | "error" | "success";
}

const helpText = [
    "Available commands:",
    "  help        Show available commands",
    "  about       Open About Me",
    "  projects    Open Projects",
    "  experience  Open Experience",
    "  resume      Open Resume",
    "  contact     Open Contact (Safari)",
    "  date        Show today's date",
    "  whoami      Show the current user",
    "  clear       Clear the terminal",
];

const commandWindows: Record<Command, WindowCommand> = {
    about: "about",
    projects: "projects",
    experience: "experience",
    resume: "resume",
    contact: "safari",
};

export default function TerminalWindow({
    window,
    onClose,
    onMove,
    onFocus,
    onMinimize,
    onOpenWindow,
}: TerminalWindowProps) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [lines, setLines] = useState<TerminalLine[]>([
        { text: "Last login: Today", kind: "output" },
        { text: "Welcome to Aidan's portfolio terminal.", kind: "success" },
        { text: 'Type "help" to see available commands.', kind: "output" },
        { text: "", kind: "output" },
    ]);

    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        outputRef.current?.scrollTo({
            top: outputRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [lines]);

    function runCommand(rawCommand: string) {
        const command = rawCommand.trim().toLowerCase() as Command | string;
        if (!command) return;

        setHistory((previous) => [rawCommand, ...previous]);
        setHistoryIndex(-1);

        const newLines: TerminalLine[] = [
            { text: `aidan@portfolio ~ % ${rawCommand}`, kind: "input" },
        ];

        const addOutput = (
            text: string,
            kind: TerminalLine["kind"] = "output",
        ) => {
            newLines.push({ text, kind });
        };

        if (command === "clear") {
            setLines([]);
            setInput("");
            return;
        }

        if (command === "help") {
            helpText.forEach((text) => addOutput(text));
        } else if (command === "whoami") {
            addOutput("aidan");
        } else if (command === "date") {
            addOutput(new Date().toString());
        } else if (
            command === "about" ||
            command === "projects" ||
            command === "experience" ||
            command === "resume" ||
            command === "contact"
        ) {
            const key = commandWindows[command];

            if (onOpenWindow) {
                onOpenWindow(key);
                addOutput(
                    `Opening ${command === "contact" ? "Safari / Contact" : command}...`,
                    "success",
                );
            } else {
                addOutput("Window navigation is not connected yet.", "error");
            }
        } else {
            addOutput(`command not found: ${rawCommand}`, "error");
            addOutput('Type "help" to see available commands.');
        }

        setLines((previous) => [...previous, ...newLines]);
        setInput("");
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            runCommand(input);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();

            if (history.length > 0) {
                const nextIndex = Math.min(historyIndex + 1, history.length - 1);
                setHistoryIndex(nextIndex);
                setInput(history[nextIndex]);
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            const nextIndex = historyIndex - 1;

            if (nextIndex < 0) {
                setHistoryIndex(-1);
                setInput("");
            } else {
                setHistoryIndex(nextIndex);
                setInput(history[nextIndex]);
            }
        }
    }

    const colors: Record<TerminalLine["kind"], string> = {
        input: "#f0f0f0",
        output: "#d7d7d7",
        error: "#ff7777",
        success: "#7ee787",
    };

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
                onClick={() => inputRef.current?.focus()}
                style={{
                    height: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    padding: "12px 14px",
                    background: "#171717",
                    color: "#d7d7d7",
                    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                    fontSize: 12,
                    lineHeight: 1.6,
                    cursor: "text",
                }}
            >
                <div
                    ref={outputRef}
                    style={{
                        height: "calc(100% - 25px)",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                    }}
                >
                    {lines.map((line, index) => (
                        <div
                            key={`${index}-${line.text}`}
                            style={{ color: colors[line.kind] }}
                        >
                            {line.text || "\u00a0"}
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        runCommand(input);
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                >
                    <span style={{ color: "#7ee787", flexShrink: 0 }}>
                        aidan@portfolio ~ %
                    </span>
                    <input
                        ref={inputRef}
                        aria-label="Terminal command"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            border: 0,
                            outline: 0,
                            padding: 0,
                            background: "transparent",
                            color: "#fff",
                            font: "inherit",
                            caretColor: "#7ee787",
                        } satisfies CSSProperties}
                    />
                </form>
            </div>
        </Window>
    );
}
