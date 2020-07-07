import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import FileSearch from './components/FileSearch/FileSearch'
import FileList from './components/FileList/FileList'
import TabList from './components/TabList/TabList'
import './App.scss';
import './assets/styles/common.scss';
import defaultFiles from './utils/defaultFiles'
import { FolderAddOutlined, ImportOutlined } from '@ant-design/icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios"
const { ipcRenderer } = window.require('electron')


const App = () => {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState(null)
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const activeFile = files[activeFileID]
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  })
  const handleChange = (value) => {
    console.log(value, 'value')
  }
  const fileClick = (fileId) => {
    setActiveFileID(fileId);
    if (!openedFileIDs.includes(fileId)) {
      setOpenedFileIDs([...openedFileIDs, fileId])
    }
  }
  const exportExcel = () => {
    axios.get('/crawler/disabled/export').then(res => {
      console.log(res)
      let excelModel = new Blob([res.data], { type: "application/octet-stream" })
      // 创建一个FileReader的实例
      let reader = new FileReader()
      // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容。
      reader.readAsDataURL(excelModel)
      // 处理 load 事件。该事件在读取操作完成时触发
      reader.addEventListener("loadend", function () {
        console.log(reader.result)
        // let dataBuffer = Buffer.from(reader.result.split('base64,')[1], 'base64')
        // console.log(dataBuffer,'dataBuffer')
        // reader.result 包含被转化为类型数组 typed array 的 blob
        // 向主进程发送下载excel消息
        ipcRenderer.send("saveDialog", {
          baseCode: reader.result,
          fileType: 'excel',
          fileName: '封神榜'
        })
        // // 接收主进程发送回来的下载成功回调
        ipcRenderer.once('succeedDialog', event => {
          // 成功回调
        })
        // // 接收主进程发送回来的下载失败回调
        ipcRenderer.once('defeatedDialog', event => {
          // 失败回调
        })
      })
    })
  }
  return (
    <div className="App">
      <Row>
        <Col className="left-box" span={6}>
          <FileSearch title="To do List" onFileSearch={(value) => { console.log(value, 'value') }}></FileSearch>
          <FileList
            files={files}
            onFileClick={fileClick}
            onFileDelete={(id) => { console.log(id, 'file.id delete') }}
            onSaveEdit={() => { }}>
          </FileList>
          <div className="bottomBox">
            <Button icon={<FolderAddOutlined />} onClick={() => { console.log('add') }} type="primary">
              新建
            </Button>
            <Button icon={<ImportOutlined />} onClick={exportExcel} type="primary" >
              导出
            </Button>
          </div>
        </Col>
        <Col className="right-box" span={18}>
          {!activeFile &&
            <div className="start-page">
              选择或者创建新的 Markdown 文档
            </div>
          }
          {
            activeFile &&
            <>
              <TabList
                files={openedFiles}
                unsaveIds={unsavedFileIDs}
                onTabClcik={(id) => { setActiveFileID(id); console.log(2) }}
                onCloseTab={() => { console.log(111) }}
                activeId={activeFileID}></TabList>
              <SimpleMDE value={activeFile.body} options={{ minHeight: '450px' }} onChange={(value) => { handleChange(value) }} />;
            </>
          }

        </Col>

      </Row>
    </div>
  );
}

export default App;
