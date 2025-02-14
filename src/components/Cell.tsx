import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {incrementNumberOfRemovedCards, setSelectedCards} from "../slices/cardsSlice.ts";

export const Cell = (
    props: {
        id: number;
        color: string;
    }) => {
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
        setBgColor(`${props.color}`);
        if (selectedCards.length === 1) {
            setTimeout(() => dispatch(setSelectedCards([])), 1000);
        }
        dispatch(setSelectedCards([...selectedCards, props.id]));

    }

    useEffect(() => {
        if (selectedCards.length === 2
            && Math.floor(props.id / 2) === Math.floor(selectedCards[0] / 2)
            && Math.floor(props.id / 2) === Math.floor(selectedCards[1] / 2)
            && bgColor !== "") {
            setTimeout(() => {
                setBgColor("#2b7fff");
                dispatch(incrementNumberOfRemovedCards());
            }, 1000);
        }
    }, [selectedCards]);

    useEffect(() => {
        if (selectedCards.length === 0 && bgColor !== "#2b7fff") {
            setBgColor("");
        }
    }, [selectedCards, bgColor]);

    return (
        <div onClick={turnCard} className={`p-4 rounded-xl bg-gray-300`} style={{backgroundColor: bgColor}}></div>
    );
};