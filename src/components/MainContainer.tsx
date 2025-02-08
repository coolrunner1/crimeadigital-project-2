import {Cell} from "./Cell.tsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";

export const MainContainer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [round, setRound] = useState(0);
    const [render, setRender] = useState(true);

    const [numberOfCards, setNumberOfCards] = useState(16);

    const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);

    const shuffle = () => {
        const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        let currentIndex = array.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        setNumberOfCards(16);
        setRound(round+1)
        return array;
    }

    useEffect(() => {
        if (selectedCards.length < 2) {
            return;
        }
        if (Math.floor(selectedCards[0] / 2) === Math.floor(selectedCards[1] / 2)) {
            if (numberOfCards-2 === 0) {
                setRender(false);
                setTimeout(() => {
                    setArray([]);
                    setArray(shuffle());
                    setRender(true)
                }, 1500)
                return;
            }
            setNumberOfCards(numberOfCards-2);
        }
    }, [selectedCards]);

    useEffect(() => {
        setArray(shuffle());
    }, [])

    return (
        <>
            <div className="h-screen w-screen bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="m-auto w-full md:min-h-[400px] md:max-w-[600px] xl:max-w-[700px] h-full md:h-[70%] pt-5 sm:p-10 bg-blue-500 text-center gap-3 text-white md:rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-bold">Find a Couple</h1>
                    <div className="text-xl font-light">Round {round}</div>
                    {!render && <span className="text-xl font-light">You won!</span>}
                    <div className="grid grid-cols-4 grid-rows-4 gap-6 h-[80%] lg:w-[70%] lg:mx-auto mt-5 mx-3 sm:m-10">
                        {render && array.map((item, key) => (<Cell key={key} id={item} />))}
                    </div>
                </div>
            </div>
        </>
    );
};