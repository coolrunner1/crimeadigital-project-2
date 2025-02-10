import {Cell} from "./Cell.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {setNumberOfRemovedCards} from "../slices/cardsSlice.ts";

export const MainContainer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [round, setRound] = useState<number>(0);
    const [render, setRender] = useState<boolean>(true);

    const dispatch = useDispatch();

    const numberOfRemovedCards = useSelector((state: RootState) => state.cards.numberOfRemovedCards);

    const shuffle = () => {
        const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        let currentIndex = array.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        dispatch(setNumberOfRemovedCards(0));
        setRound(round+1)
        return array;
    }

    useEffect(() => {
        if (numberOfRemovedCards >= 16) {
            setRender(false);
            setTimeout(() => {
                setArray([]);
                setArray(shuffle());
                setRender(true)
            }, 1500)
        }
    }, [numberOfRemovedCards]);

    useEffect(() => {
        setArray(shuffle());
    }, [])

    return (
        <>
            <div className="h-screen w-screen [@media(max-height:400px)]:h-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="m-auto w-full md:min-h-[400px] md:max-w-[600px] xl:max-w-[700px] h-full md:h-[70%] pt-5 sm:p-10 bg-blue-500 text-center gap-3 text-white md:rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-bold">Find a Couple</h1>
                    <div className="text-xl font-light">Round {round}</div>
                    {!render && <span className="text-xl font-light">You won!</span>}
                    <div className="grid grid-cols-4 grid-rows-4 gap-6 h-[80%] lg:w-[70%] lg:mx-auto mt-5 mx-3 sm:m-10 [@media(max-height:400px)]:h-[400px] ">
                        {render && array.map((item, key) => (<Cell key={key} id={item} />))}
                    </div>
                </div>
            </div>
        </>
    );
};