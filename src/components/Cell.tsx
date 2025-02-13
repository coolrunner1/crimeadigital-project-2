import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {incrementNumberOfRemovedCards, setSelectedCards} from "../slices/cardsSlice.ts";

export const Cell = (props: {id: number}) => {
    const [bgColor, setBgColor] = useState<string>();

    const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);

    const dispatch = useDispatch();

    const turnCard = async () => {
        if (bgColor !== "") {
            return;
        }
        if (selectedCards.length > 1) {
            return;
        }
        colorDistribution();
        if (selectedCards.length === 1) {
            setTimeout(() => dispatch(setSelectedCards([])), 1000);
        }
        dispatch(setSelectedCards([...selectedCards, props.id]));

    }

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
        if (selectedCards.length === 2
            && Math.floor(props.id / 2) === Math.floor(selectedCards[0] / 2)
            && Math.floor(props.id / 2) === Math.floor(selectedCards[1] / 2)
            && bgColor !== "") {
            setTimeout(() => {
                setBgColor("bg-blue-500");
                dispatch(incrementNumberOfRemovedCards());
            }, 1000);
        }
    }, [selectedCards]);

    useEffect(() => {
        if (selectedCards.length === 0 && bgColor !== "bg-blue-500") {
            setBgColor("");
        }
    }, [selectedCards, bgColor]);

    return (
        <div onClick={turnCard} className={`p-4 rounded-xl ${bgColor ? bgColor : "bg-gray-300"}`}></div>
    );
};