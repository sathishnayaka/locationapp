import { combineReducers } from '@reduxjs/toolkit';
import PrevLocationListSlice from './arrayReducer';

const rootReducer = combineReducers({
    prevLocationList: PrevLocationListSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;