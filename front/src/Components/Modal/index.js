import React from 'react';
import Manager from './Manager';

const Modal = ({ modalName, children }) => {
    const [ show, setShow ] = React.useState(false);
    const [ args, setArgs ] = React.useState(null);
    const modalBox = React.createRef();

    const onDocumentClick = (event) => {
        if (!modalBox.current.contains(event.target))
            setShow(false);
    }

    Manager.register(modalName, setShow, setArgs);
    const newChildren = React.Children.map(children, (child) => React.cloneElement(child, typeof(child.type) === 'object' ? { modalArgs: args } : null));
    return (
        <div hidden={!show} className="modal-background" onClick={onDocumentClick}>
            <div ref={modalBox} className="modal-box">
                {newChildren}
            </div>
        </div>
    );
};

export default Modal;