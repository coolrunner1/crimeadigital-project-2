import {Cell} from "./Cell.tsx";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {setNumberOfRemovedCards} from "../slices/cardsSlice.ts";
import {Overlay} from "./Overlay.tsx";
import {WinScreen} from "./WinScreen.tsx";
import {ColoredCell} from "../types/Cell.ts";
import {CASUAL, CHALLENGE, NONE} from "../constants/modes.ts";

export const MainContainer = () => {
    const [array, setArray] = useState<ColoredCell[]>([]);
    const [round, setRound] = useState<number>(0);
    const [allowRender, setAllowRender] = useState<boolean>(true);
    const [mode, setMode] = useState(NONE);
    const [gridSize, setGridSize] = useState<number>(2);
    const [completed, setCompleted] = useState<boolean>(false);
    const [longestStreak, setLongestStreak] = useState<number>(0);

    const dispatch = useDispatch();

    const numberOfRemovedCards = useSelector((state: RootState) => state.cards.numberOfRemovedCards);

    const emulateBackground = () => {
        const colorArray: ColoredCell[] = [];
        for (let i = 0; i < 4; i++) {
            colorArray.push({id: i, color: "f"});
        }
        setAllowRender(true);
        setArray(colorArray);
    }

    const startGame = () => {
        setDifficulty();
        dispatch(setNumberOfRemovedCards(0));
        setRound(round+1);
        setAllowRender(true);
    }

    const shuffle = (grid: number) => {
        if (grid < 2 || grid > 8 || grid % 2 !== 0) {
            console.error("Invalid grid size. Grid size must be either 2, 4 or 6. Using default value of 4.");
            setGridSize(4);
            grid = 4;
        }

        const colorArray: ColoredCell[] = [];
        const numberOfCells = grid * grid;

        for (let i = 0; i < numberOfCells; i+=2) {
            const randomColor = "#"+Math.floor(Math.random() * 0xFFF).toString(16).padStart(3, '0');
            colorArray.push({id: i, color: randomColor});
            colorArray.push({id: i+1, color: randomColor});
        }

        let currentIndex = colorArray.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [colorArray[currentIndex], colorArray[randomIndex]] = [colorArray[randomIndex], colorArray[currentIndex]];
        }
        return colorArray;
    };

    const setDifficulty = () => {
        if (mode === NONE) {
            return;
        }

        if (mode === CASUAL) {
            setGridSize(4);
            setArray(shuffle(4));
            return;
        }

        if (round >= 0 && round <= 3) {
            const grid = (round + 1) * 2;
            setGridSize(grid);
            setArray(shuffle(grid));
        } else {
            setCompleted(true);
        }
    };

    const getLongestStreak = useCallback((): number => {
        const greatestRound = localStorage.getItem("greatestRound");
        const previousRound = round-1;
        if (greatestRound === null || parseInt(greatestRound) < previousRound) {
            localStorage.setItem("greatestRound", previousRound.toString());
            return previousRound;
        } else {
            return parseInt(greatestRound);
        }
    }, [round]);

    const getPlayingFieldGridSize = () => {
        switch (gridSize) {
            case 2:
                return 'grid-small';
            case 4:
                return 'grid-medium';
            case 6:
                return 'grid-large';
            default:
                return 'grid-extra-large';
        }
    };

    const getPlayingFieldGap = () => {
        return gridSize >= 6 ? 'gap-2' : 'gap-6';
    };

    useEffect(() => {
        if (mode !== CASUAL) {
            return;
        }

        setLongestStreak(getLongestStreak())
    }, [round]);

    useEffect(() => {
        if (!mode) return;

        if (numberOfRemovedCards >= array.length) {
            setAllowRender(false);
            setTimeout(() => {
                startGame();
            }, 1500)
        }
    }, [numberOfRemovedCards]);

    useEffect(() => {
        if (!mode) {
            emulateBackground();
            return;
        }

        startGame();
    }, [mode]);

    return (
        <>
            {completed && <WinScreen/>}
            {mode === NONE &&
                <Overlay
                    onCasualClickHandle={() => setMode(CASUAL)}
                    onChallengeClickHandle={() => setMode(CHALLENGE)}
                />
            }
            <div className="h-screen w-screen [@media(max-height:400px)]:h-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="m-auto w-full md:min-h-[400px] md:max-w-[600px] xl:max-w-[700px] h-full md:h-[70%] pt-5 sm:p-10 bg-blue-500 text-center gap-3 text-white md:rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-bold">Find a Couple</h1>
                    <div className="text-xl font-light">Round {round}</div>
                    {mode === CASUAL &&
                        <div className="text-base font-light">Longest streak: {longestStreak} rounds</div>
                    }
                    {!allowRender && <span className="text-xl font-light">You won!</span>}
                    <div
                        className={`${getPlayingFieldGridSize()} ${getPlayingFieldGap()} h-[80%] lg:w-[70%] lg:mx-auto mt-2 mx-3 [@media(max-height:400px)]:h-[400px]`}
                    >
                        {allowRender && array.map((item) => (<Cell key={item.id} id={item.id} color={item.color} />))}
                    </div>
                </div>
            </div>
        </>

    );
};