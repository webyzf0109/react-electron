import React from 'react';
import { Row, Button } from 'antd';
import './App.scss';
import './assets/styles/common.scss';
import axios from "axios"
const { ipcRenderer } = window.require('electron')


const App = () => {
  const exportExcel = () => {
    axios.get('/crawler/disabled/export',{responseType:'blob'}).then(res => {
      console.log(res)
      // 创建一个FileReader的实例
      let reader = new FileReader()
      // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容。
      reader.readAsDataURL(res.data)
      // 处理 load 事件。该事件在读取操作完成时触发
      reader.addEventListener("loadend", function () {
        console.log(reader.result)
        // let dataBuffer = Buffer.from(reader.result.split('base64,')[1], 'base64')
        // console.log(dataBuffer,'dataBuffer')
        // reader.result 包含被转化为类型数组 typed array 的 blob
        // 向主进程发送下载excel消息
        let fileName=res.headers['content-disposition'];
        console.log(fileName,'fileName')
        ipcRenderer.send("saveDialog", {
          baseCode: reader.result,
          fileType: 'excel',
          fileName: '残疾人基础信息'+fileName.substring(fileName.lastIndexOf('.')-8,fileName.lastIndexOf('.'))
        })
        // // 接收主进程发送回来的下载成功回调
        ipcRenderer.once('succeedDialog', event => {
          alert('导出成功');
          // 成功回调
        })
        // // 接收主进程发送回来的下载失败回调
        ipcRenderer.once('defeatedDialog', event => {
          // 失败回调
          alert('导出出错');
        })
      })
    })
  }
  return (
    <div className="App">
      <header className="App-header">
          点击下方按钮进行数据导出
      </header>
      <Row> 
          <Button className="button" onClick={exportExcel} type="primary" >
            导出
          </Button>
      </Row>
    </div>
  );
}

export default App;
