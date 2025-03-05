import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        increment(state, item) {
            const existingItem = state.items.find((i) => i._id === item.payload._id);
            if (existingItem) {
                state.items.find((i) => i._id === item.payload._id).quantity++
            } else {
                state.items.push({ ...item.payload, quantity: 1 });
            }
        },
        decrement(state, item) {
            const quantity = state.items.find((i) => i._id === item.payload._id).quantity;
            if (quantity > 1) {
                state.items.find((i) => i._id === item.payload._id).quantity--
            } else {
                state.items = state.items.filter((i) => i._id !== item.payload._id);
            }
        },
    },
});

export const counterActions = counterSlice.actions;

export default counterSlice;