import React from 'react';
import { Row, Col } from 'antd';
import FileSearch from './components/FileSearch/FileSearch'
import FileList from './components/FileList/FileList'
import './App.css';
import './assets/styles/common.scss';
import defaultFiles from './utils/defaultFiles'
function App() {
  return (
    <div className="App">
      <Row>
        <Col className="left-box" span={6}>
          <FileSearch title="我的云文档" onFileSearch={(value) => { console.log(value, 'value') }}></FileSearch>
          <FileList 
            files={defaultFiles} 
            onFileClick={(id) => { console.log(id, 'file.id click') }} 
            onFileDelete={(id) => { console.log(id, 'file.id delete')}} 
            onSaveEdit={() => { }}>
          </FileList>
        </Col>
        <Col className="right-box" span={18}>
          右边
        </Col>
      </Row>
    </div>
  );
}

export default App;
