import {createSlice} from "@reduxjs/toolkit"

const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        selectedCards: [],
        numberOfRemovedCards: 0,
    },
    reducers: {
        setSelectedCards: (state, action) => {
            state.selectedCards = action.payload;
        },
        setNumberOfRemovedCards: (state, action) => {
            state.numberOfRemovedCards = action.payload;
        },
        incrementNumberOfRemovedCards: (state) => {
            state.numberOfRemovedCards++;
        }
    }
});

export const {setSelectedCards, setNumberOfRemovedCards, incrementNumberOfRemovedCards} = cardsSlice.actions;
export default cardsSlice.reducer;