import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from './redux/peopleSlice'
import heroReducer from './redux/heroSlice'

const store = configureStore({
    reducer: {
        people: peopleReducer,
        hero: heroReducer
    }
})

export default store;