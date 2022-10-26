import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";

export const getCategories = createAsyncThunk('categories/getCategories', async() => {
    const res = await axiosInstance.get('api/categories')

    return res.data.data
})

export const addCategory = createAsyncThunk('categories/addCategory', async newCategory => {
    const res = await axiosInstance.post('api/categories', newCategory)
    return res.data.data
})

export const updateCategory = createAsyncThunk('categories/updateCategory', async category => {
    const res = await axiosInstance.patch(`https://www.task-manager.api.mvn-training.com/api/categories/${category.id}`, category.data)
    return {
        id: category.id,
        data: res.data.data
    }
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async id => {
    await axiosInstance.delete(`https://www.task-manager.api.mvn-training.com/api/categories/${id}`)
    return id
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        listCategories: []
    },
    extraReducers: {
        [getCategories.fulfilled]: (state, action) => {
            console.log('Fetching categories done...')
            state.listCategories = action.payload
        },

        [addCategory.fulfilled]: (state, action) => {
            console.log('Adding new category done...')
            state.listCategories.unshift(action.payload)
        },

        [updateCategory.fulfilled]: (state, action) => {
            console.log('Update category done...')
            state.listCategories = state.listCategories.map( item => {
                if(item.id === action.payload.id){
                    item = {
                        ...item,
                        ...action.payload.data
                    }
                }
                return item
            })
        },

        [deleteCategory.fulfilled]: (state, action) => {
            console.log('Delete category done...')
            state.listCategories = state.listCategories.filter( cat => cat.id !== action.payload)
        }

    }
})

const categoriesReducer = categoriesSlice.reducer

export default categoriesReducer