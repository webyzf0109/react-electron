import React, { useState, useEffect } from "react"
import { Layout, Button, Input } from "antd"
import "./FileSearch.scss"
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
const { Header } = Layout;
const FileSearch = ({ title, onFileSearch }) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    useEffect(() => {

    })
    return (
        <div className="fileSearch">
            <Header>
                {!inputActive &&
                    <>
                        <span>{title}</span>
                        <Button icon={<SearchOutlined />} onClick={() => { setInputActive(true) }} type="primary" size="small">

                        </Button>
                    </>
                }
                {inputActive &&
                    <>
                        <Input value={value} autoFocus placeholder="请输入文档名称" onPressEnter={(e) => { onFileSearch(e.target.value) }} onChange={(e) => { setValue(e.target.value) }} />
                        <Button onClick={() => { setInputActive(false) }} type="primary" size="small">关闭</Button>
                    </>
                }
            </Header>
        </div>
    )
}
FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired,
}
FileSearch.defaultProps={
    title:'我的云文档'
}
export default FileSearch;