import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getCategories } from '../store/reducers/categoriesSlice'
import { categoriesSelector } from "../store/selectors"
import Category from './Category'

const Categories = () => {

    const categories = useSelector(categoriesSelector)
    const [inputName, setInputName] = useState('')
    const [addClick, setAddClick] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const handleAddCategory = () => {
        try {
            const newCategory = {
                name: inputName
            }
            dispatch(addCategory(newCategory))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="categories">
            <div className="container">
                {!addClick ? (
                    <div className="display-center">
                        <button className="btn-add" onClick={() => setAddClick(true)}>
                            Add New
                        </button>
                    </div>
                ) : (
                    <div className="form">
                        <h3 className="heading">Create new category</h3>
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={inputName}
                                onChange={e => setInputName(e.target.value)}
                                placeholder="Enter new title here"

                            />
                        </div>
                        <button className='form-btn' onClick={handleAddCategory}>Add</button>
                        <button className='form-btn' onClick={() => setAddClick(false)}>Cancel</button>
                    </div>
                )}
                {categories.map(item =>
                    <Category
                        key={item.id}
                        categoryInfo={item}
                    />
                )}
                <div className="footer" />
            </div>
        </div>
    )
}

export default Categories