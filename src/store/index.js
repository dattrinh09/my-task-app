import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./reducers/tasksSlice"
import categoriesReducer from "./reducers/categoriesSlice"

const store = configureStore({
    reducer: {
        tasksReducer,
        categoriesReducer      
    }
})

export default store