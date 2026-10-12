"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./DesktopIcon.module.css";

interface DesktopIconProps {
    title: string;
    icon: string;
    onOpen: () => void;
}

export default function DesktopIcon({
    title,
    icon,
    onOpen,
}: DesktopIconProps) {
    const [selected, setSelected] = useState(false);

    return (
        <button
            className={`${styles.icon} ${
                selected ? styles.selected : ""
            }`}
            onClick={() => setSelected(!selected)}
            onDoubleClick={() => {
                console.log(`${title} opened`);
                onOpen();
            }}
        >
            <Image
                src={icon}
                alt={title}
                width={64}
                height={64}
            />

            <span className={styles.label}>
                {title}
            </span>
        </button>
    );
}