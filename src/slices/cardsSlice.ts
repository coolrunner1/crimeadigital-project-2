import {createSlice} from "@reduxjs/toolkit"

const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        selectedCards: [],
    },
    reducers: {
        setSelectedCards: (state, action) => {
            state.selectedCards = action.payload
        }
    }
});

export const {setSelectedCards} = cardsSlice.actions;
export default cardsSlice.reducer;