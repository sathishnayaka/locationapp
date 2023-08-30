import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface prevLocation {
    name:string;
    latitude:string;
    longitude:string;
    time:string;
    icon:string;
}
interface prevLocationList {
    items : prevLocation[];
}

const initialState : prevLocationList = {
    items:[]
}

const PrevLocationListSlice = createSlice({
    name:'prevLocationList',
    initialState,
    reducers:{
        AddItemsToPrevLocation: ( state, action: PayloadAction<prevLocation[]>) => {
            return {
                ...state,
                items: action.payload,
              };
        }
    }
})

export const {AddItemsToPrevLocation} = PrevLocationListSlice.actions;
export default PrevLocationListSlice.reducer;