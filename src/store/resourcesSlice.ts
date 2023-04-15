import { createSlice } from "@reduxjs/toolkit";

export interface IResourcesState {
	water: number;
	air: number;
	food: number;
	overall: number;
}

const resourcesState: IResourcesState = {
	water: 100,
	air: 100,
	food: 100,
	overall: 100,
};

const resourcesSlice = createSlice({
	name: "resources",
	initialState: resourcesState,
	reducers: {
		addWater(state, action) {
			state.water += action.payload;
		},
		removeWater(state, action) {
			state.water -= action.payload;
		},
		addAir(state, action) {
			state.air += action.payload;
		},
		removeAir(state, action) {
			state.air -= action.payload;
		},
		addFood(state, action) {
			state.food += action.payload;
		},
		removeFood(state, action) {
			state.food -= action.payload;
		},
		addOverall(state, action) {
			state.overall = Math.floor(state.overall + action.payload);
		},
		removeOverall(state, action) {
			state.overall =
				state.overall - action.payload < 0
					? 1
					: Math.floor(state.overall - action.payload);
		},
	},
});

export const {
	addWater,
	removeWater,
	addAir,
	removeAir,
	addFood,
	removeFood,
	addOverall,
	removeOverall,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
