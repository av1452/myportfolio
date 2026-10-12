"use client";

import { useState } from "react";

import { AppWindow } from "@/types/window";

export default function useWindowManager() {
    const [windows, setWindows] = useState<AppWindow[]>([]);

    function openWindow(id: string, title: string) {
        setWindows((previous) => {
            const exists = previous.find(
                (window) => window.id === id
            );

            if (exists) {
                return previous.map((window) =>
                    window.id === id
                        ? {
                              ...window,
                              open: true,
                              zIndex: previous.length + 1,
                          }
                        : window
                );
            }

            return [
                ...previous,
                {
                    id,
                    title,

                    open: true,

                    x: 120,
                    y: 80,

                    width: 700,
                    height: 500,

                    zIndex: previous.length + 1,
                },
            ];
        });
    }

    function closeWindow(id: string) {
        setWindows((previous) =>
            previous.map((window) =>
                window.id === id
                    ? {
                          ...window,
                          open: false,
                      }
                    : window
            )
        );
    }

    return {
        windows,
        openWindow,
        closeWindow,
    };
}