export const WinScreen = () => {
    return (
        <div className="min-h-screen min-w-screen bg-black absolute z-99">
            <iframe src="/crimeadigital-project-2/win.mp4?autoplay=1"
                    className="min-w-screen min-h-screen"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
        </div>
    );
};