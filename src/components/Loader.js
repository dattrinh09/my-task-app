import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'

const Loader = () => {

    const [isLoader, setIsLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false)
        }, 1000)
    }, [])

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoader && <Spin></Spin>}
        </div>
    )
}

export default Loader