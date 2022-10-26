import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, updateTask } from "../store/reducers/tasksSlice"
import { categoriesSelector } from "../store/selectors"
import { Form, Input, Select } from "antd"
const { Option } = Select;

const Task = ({ taskInfo }) => {

  const [edit, setEdit] = useState(false)
  const [inputTitle, setInputTitle] = useState("")
  const [categorySelect, setCategorySelect] = useState([])
  const [completed, setCompleted] = useState(
    () => taskInfo.status === "COMPLETED" ? true : false
  )
  const categories = useSelector(categoriesSelector)

  const dispatch = useDispatch()

  const handleSave = () => {
    const newTask = {
      id: taskInfo.id,
      data: {
        title: inputTitle ? inputTitle : taskInfo.title,
        categoryIds: categorySelect.length === 0
          ? taskInfo.categories.map(item => item.id)
          : categorySelect,
        status: "IN_PROGRESS"
      }
    }
    dispatch(updateTask(newTask))
    setInputTitle("")
    setCategorySelect([])
    setEdit(false)
  }

  const handleComplete = () => {
    setCompleted(!completed)
    const completedTask = {
      id: taskInfo.id,
      data: {
        title: taskInfo.title,
        categoryIds: taskInfo.categories.map(item => item.id),
        status: !completed ? "COMPLETED" : "IN_PROGRESS"
      }
    }
    dispatch(updateTask(completedTask))
  }

  const handleDelete = id => {
    dispatch(deleteTask(id))
  }

  return (
    <div
      className="task-info"
    >
      {
        !edit ? (
          <>
            <h3 className="task-title">
              {taskInfo.title}
              <input
                className="task-checkbox"
                type="checkbox"
                checked={completed}
                onChange={() => handleComplete()}
              />
            </h3>
            <span>Categories: </span>
            {taskInfo.categories.map(item => (
              <span className="category" key={item.id}>
                {item.name}
              </span>
            ))}
            <p className="task-item">Status: {taskInfo.status}</p>
            <p className="task-item">Created At: {taskInfo.createdAt}</p>
            {taskInfo.updatedAt && (<p className="task-item">Updated At: {taskInfo.updatedAt}</p>)}
            {taskInfo.status === "IN_PROGRESS" &&
              <button
                className="task-btn"
                onClick={() => setEdit(true)}
              >Edit
              </button>}
            <button
              className="task-btn"
              onClick={() => handleDelete(taskInfo.id)}
            >Delete</button>
          </>
        ) : (
          <>
            <h3>You can edit these field for this Task:</h3>
            <Form>
              <Form.Item label="Title">
                <Input
                  type="text"
                  placeholder={taskInfo.title}
                  value={inputTitle}
                  onChange={e => setInputTitle(e.target.value)}
                  style={{width: "400px", marginLeft: "40px"}}
                />
              </Form.Item>
              <Form.Item label="Categories">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "400px" }}
                  placeholder={taskInfo.categories.map(cat => cat.name).join(', ')}
                  value={categorySelect}
                  onChange={item => setCategorySelect(item)}
                >
                  {categories.map(cat => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
            <button className="form-btn" onClick={handleSave}>Save</button>
            <button className="form-btn" onClick={() => setEdit(false)}>Cancel</button>
          </>
        )
      }
    </div>
  )
}

export default Task