export default function Wallpaper() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/wallpaper.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
}