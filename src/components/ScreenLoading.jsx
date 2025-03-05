import ReactLoading from "react-loading";

function ScreenLoading() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.3)",
                zIndex: 999,
            }}
        >
            <ReactLoading
                type="spokes"
                color="gray"
                width="4rem"
                height="4rem"
            />
        </div>
    );
}

export default ScreenLoading;
