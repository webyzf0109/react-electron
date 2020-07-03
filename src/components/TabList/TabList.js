import React from "react"
import PropTypes from 'prop-types'
import { CloseCircleOutlined } from '@ant-design/icons';
import classnames from "classnames";
import "./TabList.scss"
const TabList = ({ files, activeId, unsaveIds, onTabClcik, onCloseTab }) => {
    return (
        <ul className="TabList">
            {
                files.map(file => {
                    const widthUnsavedMark=unsaveIds.includes(file.id)
                    return (
                        <li key={file.id}
                            className={classnames({
                                'nav-link': true,
                                'active': file.id === activeId,
                                'widthUnsavedMark':widthUnsavedMark
                            })} onClick={() => { onTabClcik(file.id) }}>
                            <span>{file.title} </span>
                            <CloseCircleOutlined className="close" onClick={(e) => { e.stopPropagation(); onCloseTab(file.id) }} />
                            {
                                widthUnsavedMark &&
                                <div className="circle"></div>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}
TabList.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.number,
    unsaveIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func,
}
TabList.defaultProps = {
    unsaveIds: []
}
export default TabList;