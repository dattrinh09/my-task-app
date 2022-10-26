import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../requests/axiosInstance"

export const getTasks = createAsyncThunk('tasks/getTasks', async filter => {

    const filterParams = {
        limit: 10,
        page: filter.searchPage
    }

    if(filter.searchStatus !== "ALL") filterParams.status = filter.searchStatus

    if(filter.searchTitle !== "") filterParams.title = filter.searchTitle

    const res = await axiosInstance.get('api/tasks', {
        params: filterParams
    })

    return res.data.data
})

export const addTask = createAsyncThunk('tasks/addTask', async newTask => {
    const res = await axiosInstance.post('api/tasks', newTask)
    return res.data.data
})

export const updateTask = createAsyncThunk('tasks/updateTask', async task => {
    const res = await axiosInstance.patch(`https://www.task-manager.api.mvn-training.com/api/tasks/${task.id}`, task.data)
    return {
        id: task.id,
        data: res.data.data
    }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async id => {
    await axiosInstance.delete(`https://www.task-manager.api.mvn-training.com/api/tasks/${id}`)
    return id
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        listTasks: []
    },

    extraReducers: {
        [getTasks.fulfilled]: (state, action) => {
            console.log('Fetching task done....')
            state.listTasks = action.payload
        },

        [addTask.fulfilled]: (state, action) => {
            console.log('Add new task done...')
            state.listTasks.unshift(action.payload)
        },

        [updateTask.fulfilled]: (state, action) => {
            console.log('Update task done...')
            state.listTasks = state.listTasks.map(item => {
                if(item.id === action.payload.id) {
                    item = {
                        ...item,
                        ...action.payload.data
                    }
                }
                return item
            })
        },

        [deleteTask.fulfilled]: (state, action) => {
            console.log('Delete task done...')
            state.listTasks = state.listTasks.filter( item => item.id !== action.payload )
        }
    }
})

//Reducer
const tasksReducer = tasksSlice.reducer

export default tasksReducer