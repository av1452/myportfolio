export interface DesktopIconData {
    id: number;
    title: string;
    icon: string;
    window: string;
}

export const desktopIcons: DesktopIconData[] = [
    { id: 1, title: "About Me", icon: "/icons/about.png", window: "about" },
    { id: 2, title: "Projects", icon: "/icons/projects.png", window: "projects" },
    { id: 6, title: "Experience", icon: "/icons/experience.png", window: "experience" },
    { id: 3, title: "Resume", icon: "/icons/resume.png", window: "resume" },
    { id: 4, title: "Terminal", icon: "/icons/terminal.png", window: "terminal" },
    { id: 5, title: "Safari", icon: "/icons/safari.png", window: "safari" },
];
