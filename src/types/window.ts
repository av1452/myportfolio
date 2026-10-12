export interface AppWindow {
    id: string;
    title: string;

    open: boolean;

    x: number;
    y: number;

    width: number;
    height: number;

    zIndex: number;
}