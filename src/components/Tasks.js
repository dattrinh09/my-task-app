import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../store/reducers/categoriesSlice"
import { addTask, getTasks } from "../store/reducers/tasksSlice"
import Task from "./Task"
import { categoriesSelector, tasksSelector } from "../store/selectors"
import { Form, Pagination, Radio, Select, Input } from "antd"
import 'antd/dist/antd.css'
const { Option } = Select;

const Tasks = () => {

    const tasks = useSelector(tasksSelector)
    const categories = useSelector(categoriesSelector)
    const [page, setPage] = useState(1)
    //Add new task
    const [inputTitle, setInputTitle] = useState('')
    const [selectCategory, setSelectCategory] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [addClick, setAddClick] = useState(false)
    //Filter
    const [titleSearch, setTitleSearch] = useState('')
    const [statusSelected, setStatusSelected] = useState('ALL')

    const dispatch = useDispatch()

    useEffect(() => {
        const filterSearch = {
            searchPage: page,
            searchTitle: titleSearch,
            searchStatus: statusSelected
        }
        dispatch(getTasks(filterSearch))
        dispatch(getCategories())
    }, [dispatch, page, statusSelected, titleSearch])

    const handlePageChange = pageNumber => {
        setPage(pageNumber)
    }

    const handleAddTask = () => {
        if (inputTitle === '' || selectCategory.length === 0) {
            setErrorMessage("Error")
        } else {
            const newTask = {
                title: inputTitle,
                categoryIds: selectCategory
            }
            dispatch(addTask(newTask))
            setInputTitle('')
            setSelectCategory([])
            setAddClick(false)
        }
    }

    return (
        <div
            className="tasks"
        >
            <div className='container'>
                <div className="task-filter">
                    <div className="task-filter__item">
                        <input
                            className='input-form'
                            type="text"
                            name="search"
                            value={titleSearch}
                            placeholder='Sreach by title...'
                            onChange={e => setTitleSearch(e.target.value)}
                        />
                    </div>
                    <div className="task-filter__item">
                        <Radio.Group
                            value={statusSelected}
                            onChange={e => setStatusSelected(e.target.value)}
                        >
                            <Radio value={"ALL"}>ALL</Radio>
                            <Radio value={"COMPLETED"}>COMPLETED</Radio>
                            <Radio value={"IN_PROGRESS"}>IN_PROGRESS</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>
            {!addClick ? (
                <div className="display-center">
                    <button className="btn-add" onClick={() => setAddClick(true)}>
                        Add New Task
                    </button>
                </div>
            ) : (
                <div className="form">
                    <h3 className="heading">Create a new task here:</h3>
                    <Form>
                        <Form.Item label="Title">
                            <Input
                                type="text"
                                value={inputTitle}
                                style={{ marginLeft: "40px", width: "380px" }}
                                onChange={e => setInputTitle(e.target.value)}
                                placeholder="Enter new title here"
                            />
                        </Form.Item>
                        <Form.Item label="Categories">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select categories"
                                value={selectCategory}
                                onChange={item => setSelectCategory(item)}
                            >
                                {categories.map(cat => (
                                    <Option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                    <span className="form-message">{errorMessage}</span>
                    <button className='form-btn' onClick={handleAddTask}>Add</button>
                    <button className='form-btn' onClick={() => setAddClick(false)}>Cancel</button>
                </div>
            )}
            {tasks.map(task => (
                <Task
                    key={task.id}
                    taskInfo={task}
                />
            ))}
            <div className="display-center">
                <Pagination
                    total={25}
                    pageSize={5}
                    defaultCurrent={page}
                    onChange={handlePageChange}
                />
            </div>
            <div className="footer" />
        </div>
    )
}

export default Tasks