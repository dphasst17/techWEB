import "~/components/GlobalStyles/GlobalStyles.scss"

function Loading() {
    return <div className="loading">
        <div className="loadingOverlay"></div>
        <div className="isLoading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </div>;
}

export default Loading;