import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.productId === item.productId);
            if (existItem) {
                existItem.qty += 1;
            } else {
                state.cartItems = [...state.cartItems, { ...item, qty: 1 }];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQty: (state, action) => {
            const { productId, qty } = action.payload;
            const existItem = state.cartItems.find((x) => x.productId === productId);
            if (existItem) {
                existItem.qty = qty;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.productId !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;