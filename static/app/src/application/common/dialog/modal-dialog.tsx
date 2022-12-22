import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-dialog.module.css';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style?: any;
}

/**
    Modal Dialog

    Stateless components and controlled component
    
const {isOpen, toggle} = useModalDialog();

<button onClick={toggle}>Show Modal</button>
<ModalDialog
        isOpen={isOpen}
        onClose={toggle}
      >
      <p>Contenido 1</p>
</ModalDialog>


 */
const ModalDialog: React.FC<Props> = ({ isOpen, onClose, children, style }) => {

    return isOpen ? ReactDOM.createPortal(
        <React.Fragment>
            <div className={styles.modalOverlay} />
            <div className={styles.modalWrapper} aria-modal aria-hidden tabIndex={-1} role="dialog" >
                <div className={styles.modalPaper} style={style ? style : {}}>
                    <div className={styles.modalHeader}>
                        <button className={styles.modalCloseButton} type="button"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}>
                            <span className={styles.modalCross} aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null
};

export default ModalDialog;
