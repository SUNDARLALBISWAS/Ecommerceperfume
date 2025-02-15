import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Slice/Slice';

const Store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default Store;