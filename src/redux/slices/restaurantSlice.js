import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    restaurants: undefined,
    restaurant: undefined,
    hasSearched: false,
    booking: undefined,
    hasBooked: false,
    bookings: [],
    allRestaurants: [],
    isRestaurantCreated: false,
    isRestaurantUpdated: false,
    allBookings: []
}

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setRestaurants: (state, action) => {
            state.restaurants = action.payload;

        },
       
        setHasSearched: (state, action) => {
            state.hasSearched = action.payload;
        },
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
            state.isAuthenticated = true;
        },
        logoutUser: (state, action) => {
            state.restaurant = undefined;
            state.isAuthenticated = false;
        },
        setBookings: (state, action) => {
            state.bookings = action.payload;
        },
        setHasBooked: (state, action) => {
            state.hasBooked = action.payload;
        },
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        setAllRestaurants: (state, action) => {
            state.allRestaurants = action.payload;
        },
        setIsRestaurantCreated: (state, action) => {
            state.isRestaurantCreated = action.payload;
        },
        setIsRestaurantUPdated: (state, action) => {
            state.isRestaurantUpdated = action.payload;
        },
        setAllBookings: (state, action) => {
            state.allBookings = action.payload;
        }
    }
});

export const { setLoader, setRestaurants, setHasSearched , logoutUser, setRestaurant, setBookings, setHasBooked, setBooking, setAllRestaurants, setIsRestaurantCreated, setIsRestaurantUPdated, setAllBookings} = restaurantSlice.actions;

export default restaurantSlice.reducer;