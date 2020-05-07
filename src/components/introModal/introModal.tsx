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
        <h1 className="header">Louwman demo</h1>
        <p>
          Er kan van alles gebeuren in het distributiecentrum. 
        </p>
      </div>
    </ReactModal>  
    )
}

export default IntroModal;
