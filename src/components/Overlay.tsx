import {Button} from "./Button.tsx";
import {MouseEventHandler} from "react";

export const Overlay = (
    props: {
        onCasualClickHandle: MouseEventHandler<HTMLButtonElement>,
        onChallengeClickHandle: MouseEventHandler<HTMLButtonElement>,
    }
) => {
    return (
        <>
            <div className="min-h-screen min-w-screen backdrop-blur-2xl absolute flex items-center justify-center">
                <div className="flex flex-col justify-between absolute m-auto w-80 h-60 px-10 py-15 bg-blue-500 text-center gap-3 text-white rounded-2xl">
                    <span className={"text-xl font-bold"}>Choose game mode</span>
                    <div className="grid grid-cols-2 gap-4">
                        <Button label={"Casual"} onClick={props.onCasualClickHandle} />
                        <Button label={"Challenge"} onClick={props.onChallengeClickHandle} />
                    </div>
                </div>
            </div>
        </>
    );
};