import "~/components/GlobalStyles/GlobalStyles.scss"

function Loading() {
    return <div className="loading">
        <div className="overlay"></div>
        <div className="imgLoad">
            <div className="loadChild">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>;
}

export default Loading;