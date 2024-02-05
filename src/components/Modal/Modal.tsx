import { FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';

import { ModalProps } from './Modal.types';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import './modal.scss';

export interface ModalSubComponents {
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
}

const modalRoot = document.getElementById("root") as HTMLElement;

const Modal: FC<ModalProps> & ModalSubComponents  = ({
    children
}): ReactElement => {
    return createPortal(
        <>
            <div className="fade modalback show"></div>
            <div className="fade modal show" role="dialog">
                <div className="modal__dialog">
                    <div className="modal__content">
                        {children}
                    </div>
                </div>
            </div>
        </>,
        modalRoot
    );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
