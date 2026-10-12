"use client";

import styles from "./MenuItem.module.css";

interface MenuItemProps {
    label: string;
    active?: boolean;
}

export default function MenuItem({
    label,
    active = false,
}: MenuItemProps) {
    return (
        <button
            className={`${styles.menuItem} ${
                active ? styles.active : ""
            }`}
        >
            {label}
        </button>
    );
}