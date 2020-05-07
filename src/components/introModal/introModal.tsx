import React from 'react';
import ReactModal from 'react-modal';
import './introModal.css';

interface Props {
  onClose: () => void;
}

const IntroModal = (props: Props) => {
  return (
    <ReactModal
      isOpen={true}
      ariaHideApp={false}
      overlayClassName="modal-overlay modal-intro-overlay"
      className="modal modal-intro"
      onRequestClose={props.onClose}
    >
      <div onClick={props.onClose}>
        <h1 className="header">Conflict situations</h1>
        <p>
          Conflicts can appear in every area of the warehouse.
        </p>
        <p> 
          Investigate each situation and choose the correct way to proceed. 
        </p>
      </div>
    </ReactModal>  
    )
}

export default IntroModal;
