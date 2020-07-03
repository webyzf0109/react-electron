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
  const fileClick=(fileId)=>{
    setActiveFileID(fileId);
    setOpenedFileIDs([...openedFileIDs,fileId])
  }
  return (
    <div className="App">
      <Row>
        <Col className="left-box" span={6}>
          <FileSearch title="To do List" onFileSearch={(value) => { console.log(value, 'value') }}></FileSearch>
          <FileList
            files={files}
            onFileClick={ fileClick }
            onFileDelete={(id) => { console.log(id, 'file.id delete') }}
            onSaveEdit={() => { }}>
          </FileList>
          <div className="bottomBox">
            <Button icon={<FolderAddOutlined />} onClick={() => { console.log('add') }} type="primary">
              新建
            </Button>
            <Button icon={<ImportOutlined />} onClick={() => { console.log('important') }} type="primary" >
              导入
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
