import {useEffect, useState} from "react";

export const Cell = (props: {id: number}) => {
    const [bgColor, setBgColor] = useState<string>();

    const colorDistribution = () => {
        switch (Math.floor(props.id/2)){
            case 0:
                setBgColor("bg-green-400");
                break;
            case 1:
                setBgColor("bg-red-400");
                break;
            case 2:
                setBgColor("bg-yellow-400");
                break;
            case 3:
                setBgColor("bg-purple-400");
                break;
            case 4:
                setBgColor("bg-amber-600");
                break;
            case 5:
                setBgColor("bg-cyan-400");
                break;
            case 6:
                setBgColor("bg-emerald-700");
                break;
            case 7:
                setBgColor("bg-gray-700");
                break;
        }
    }

    useEffect(() => {

    }, [props.id]);

    return (
        <>
            <div onClick={colorDistribution} id={`cell-${props.id}`} className={`p-4 rounded-xl ${bgColor ? bgColor : "bg-gray-300"}`}></div>
        </>
    );
};