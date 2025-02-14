export const WinScreen = () => {
    return (
        <>
            <iframe src="/crimeadigital-project-2/win.mp4?autoplay=1"
                    className="min-w-screen min-h-screen absolute z-99"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
        </>
    );
};