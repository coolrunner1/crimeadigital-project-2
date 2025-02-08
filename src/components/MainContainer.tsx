import {Cell} from "./Cell.tsx";
import {useEffect, useState} from "react";

export const MainContainer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [round, setRound] = useState(0);

    const shuffle = () => {
        const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        let currentIndex = array.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        setRound(round+1)
        return array;
    }

    useEffect(() => {
        setArray(shuffle());
        console.log(array);
    }, [])

    return (
        <>
            <div className="h-screen w-screen bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="margin-auto w-full md:min-h-[400px] md:max-w-[500px] xl:max-w-[700px] h-full md:h-[70%] p-10 bg-blue-500 text-center m-auto gap-3 text-white md:rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-bold">Find a Couple</h1>
                    <div className="text-xl font-light">Round {round}</div>
                    <div className="grid grid-cols-4 grid-rows-5 gap-6 h-full m-10">
                        {array.map((item, key) => (<Cell key={key} id={item} />))}
                    </div>
                </div>
            </div>
        </>
    );
};