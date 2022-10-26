import { Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCategory, updateCategory } from '../store/reducers/categoriesSlice'

const Category = ({ categoryInfo }) => {

  const [edit, setEdit] = useState(false)
  const [editName, setEditName] = useState('')
  const dispatch = useDispatch()

  const handleDelete = id => {
    dispatch(deleteCategory(id))
  }

  const handleSave = id => {
    const cat = {
      id: id,
      data: {
        name: editName
      }
    }
    dispatch(updateCategory(cat))
    setEdit(false)
    setEditName('')
  }

  return (
    <div className="category-info">
      {!edit ? (
        <>
          <span>{categoryInfo.name}</span>
          <div>
            <button
              className="category-btn"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              className="category-btn"
              onClick={() => handleDelete(categoryInfo.id)}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <Input
          style={{width: "50%", heigth: "18px"}}
          type="text"
          placeholder={categoryInfo.name}
          value={editName}
          onChange={e => setEditName(e.target.value)} 
          />
          <div>
            <button
              className="category-btn"
              onClick={() => handleSave(categoryInfo.id)}
            >
              Save
            </button>
            <button
              className="category-btn"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Category