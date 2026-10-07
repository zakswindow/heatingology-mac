import Animation from "@/components/Animation";

export default function Loading () {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center"
            }}>
            <div
                style={{
                    width: "10vw",
                    height: "10vw",
                    margin: "auto"
                }}
            >
                <Animation src="/animations/loading.json" />
            </div>
        </div>
    );
}