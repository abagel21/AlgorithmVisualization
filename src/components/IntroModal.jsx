/* eslint-disable */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import $ from "jquery";

const IntroModal = props => {
    const [modalVisible, setModalVisible] = useState("visible")
    return (
        <div className="modalWrapper" data-status={modalVisible} onClick={e => setModalVisible("hidden")}>
            <div className="innerModal" onClick={e => e.stopPropagation()}>
                <p className="modalClose" onClick={e => setModalVisible("hidden")}>x</p>
                <h3 className="modalTitle">Algorithm Visualizer</h3>
                <div className="modalImage"></div>
                <p className="modalContent">
                    Welcome to my algorithm visualizer! The visualizer currently contains sorting and graph algorithms, with trees and string searching algorithms planned for the future. If you need help navigating and using the website, see the "Help" tab at the top of the screen for more information.
                </p>
            </div>
        </div>
    )
}

IntroModal.propTypes = {

}

export default IntroModal
