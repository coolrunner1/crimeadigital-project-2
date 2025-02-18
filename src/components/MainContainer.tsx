import {Cell} from "./Cell.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {setNumberOfRemovedCards} from "../slices/cardsSlice.ts";
import {Overlay} from "./Overlay.tsx";
import {WinScreen} from "./WinScreen.tsx";

export const MainContainer = () => {
    const [array, setArray] = useState<{key: number, value: string}[]>([]);
    const [round, setRound] = useState<number>(0);
    const [render, setRender] = useState<boolean>(true);
    const [mode, setMode] = useState<string>("");
    const [gridSize, setGridSize] = useState<number>(2);
    const [completed, setCompleted] = useState<boolean>(false);
    const [longestStreak, setLongestStreak] = useState<number>(0);


    const dispatch = useDispatch();

    const numberOfRemovedCards = useSelector((state: RootState) => state.cards.numberOfRemovedCards);

    const emulateBackground = () => {
        const colorArray: {key: number, value: string}[] = [];
        for (let i = 0; i < 4; i++) {
            colorArray.push({key: i, value: "f"});
        }
        setRender(true);
        return colorArray;
    }

    const shuffle = (grid: number) => {
        if (grid < 2 || grid >8 || grid % 2 !== 0) {
            console.error("Invalid grid size. Grid size must be either 2, 4 or 6. Using default value of 4.");
            setGridSize(4);
            grid = 4;
        }

        const colorArray: {key: number, value: string}[] = [];
        const numberOfCells = grid * grid;

        for (let i = 0; i < numberOfCells; i+=2) {
            const randomColor = "#"+Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
            colorArray.push({key: i, value: randomColor});
            colorArray.push({key: i+1, value: randomColor});
        }

        let currentIndex = colorArray.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [colorArray[currentIndex], colorArray[randomIndex]] = [
                colorArray[randomIndex], colorArray[currentIndex]];
        }
        dispatch(setNumberOfRemovedCards(0));
        setRound(round+1)
        return colorArray;
    };

    const setDifficulty = () => {
        if (mode === "") {
            return;
        }

        if (mode === "casual") {
            setGridSize(4);
            setArray(shuffle(4));
            return;
        }

        if (round === 0) {
            setGridSize(2);
            setArray(shuffle(2));
            return;
        } else if (round === 1) {
            setGridSize(4);
            setArray(shuffle(4));
            return;
        } else if (round === 2) {
            setGridSize(6);
            setArray(shuffle(6));
            return;
        } else if (round === 3) {
            setGridSize(8);
            setArray(shuffle(8));
            return;
        } else {
            setCompleted(true);
        }
    };

    const getLongestStreak = (): number => {
        const greatestRound = localStorage.getItem("greatestRound");
        if (greatestRound === null || parseInt(greatestRound) < round) {
            localStorage.setItem("greatestRound", round.toString());
            return round;
        } else {
            return parseInt(greatestRound);
        }
    };

    useEffect(() => {
        if (mode !== "casual") {
            return;
        }

        setLongestStreak(getLongestStreak())
    }, [round]);

    useEffect(() => {
        if (numberOfRemovedCards >= array.length) {
            setRender(false);
            setTimeout(() => {
                setDifficulty();
                setRender(true);
            }, 1500)
        }
    }, [numberOfRemovedCards]);

    useEffect(() => {
        setDifficulty();
    }, [mode]);

    useEffect(() => {
        if (array.length === 0) {
            setArray(emulateBackground);
        }
    }, []);

    return (
        <>
            {completed && <WinScreen/>}
            {mode === "" &&
                <Overlay
                    onCasualClickHandle={() => setMode("casual")}
                    onChallengeClickHandle={() => setMode("challenge")}
                />
            }
            <div className="h-screen w-screen [@media(max-height:400px)]:h-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="m-auto w-full md:min-h-[400px] md:max-w-[600px] xl:max-w-[700px] h-full md:h-[70%] pt-5 sm:p-10 bg-blue-500 text-center gap-3 text-white md:rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-bold">Find a Couple</h1>
                    <div className="text-xl font-light">Round {round}</div>
                    {mode === "casual" &&
                        <div className="text-base font-light">Longest streak: {longestStreak} rounds</div>}
                    {!render && <span className="text-xl font-light">You won!</span>}
                    <div className={`${gridSize == 2 ? 'grid-small' : gridSize == 4 ? 'grid-medium' : gridSize == 6 ? 'grid-large' : 'grid-extra-large'}
                            ${gridSize >= 6 ? 'gap-2' : 'gap-6'} h-[80%] lg:w-[70%] lg:mx-auto mt-2 mx-3 [@media(max-height:400px)]:h-[400px]`}
                    >
                        {render && array.map((item, key) => (<Cell key={key} id={item.key} color={item.value} />))}
                    </div>
                </div>
            </div>
        </>

    );
};