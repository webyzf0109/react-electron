import React, { useState } from "react"
import PropTypes from 'prop-types'
import { List, Row, Col, Input } from 'antd';
import { FileMarkdownOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import "./FileList.scss"
const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    const closeSearch = () => {
        setEditStatus(false);
    }
    return (
        <div className="FileList">
            <List
                bordered
                dataSource={files}
                renderItem={item => (
                    <List.Item>
                        {
                            item.id !== editStatus &&
                            <Row>
                                <Col span={20} onClick={() => { onFileClick(item.id) }}>
                                    <div onClick={() => { setEditStatus(item.id); setValue(item.body) }}>
                                        <FileMarkdownOutlined />
                                        <span className="title"> {item.body}</span>
                                    </div>
                                </Col>
                                <Col className="right-icon" span={4}>
                                    <EditOutlined onClick={() => { setEditStatus(item.id); }} />
                                    <DeleteOutlined onClick={() => { onFileDelete(item.id) }} />
                                </Col>
                            </Row>
                        }
                        {
                            item.id === editStatus &&
                            <Row justify="space-between">
                                <Col span={18}>
                                    <Input value={value} autoFocus placeholder="请输入文档名称" onPressEnter={(e) => { onSaveEdit(e.target.value) }} onChange={(e) => { setValue(e.target.value) }} />
                                </Col>
                                <Col className="right-icon" span={4}>
                                    <CloseCircleOutlined onClick={() => { closeSearch(item) }} />
                                </Col>
                            </Row>
                        }
                    </List.Item>
                )}
            />
        </div>
    )
}
FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func,
}
export default FileList;
