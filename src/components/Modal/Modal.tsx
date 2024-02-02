import { FC, Component, ReactNode } from 'react'

import './modal.scss'

type HeaderProps = {
    children: React.ReactNode;
    hideModal: () => void;
};

const Header: FC<HeaderProps> = ({
    children,
    hideModal
}) => (
    <>
        <div className='modal--header'>
            <h4 className='modal--title'>{children}</h4>
            <button className='btn--close bg-close' onClick={hideModal}></button>
        </div>
        <div className='w-full h-px bg-gray-200 my-4'></div>
    </>
);

type BodyProps = {
    children: ReactNode;
};

const Body: FC<BodyProps> = ({
    children
}) => (<div className="modal--body">{children}</div>);

type FooterProps = {
    children: ReactNode;
};

const Footer: FC<FooterProps> = ({
    children
}) => (<div className="modal--footer">{children}</div>);

interface ModalProps {
    children: ReactNode;
}

class Modal extends Component<ModalProps> {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  render() {
    const { children } = this.props;
    return (
        <>
            <div className='fade modalback'></div>

            <div className="fade modal show" role="dialog">
                <div className="modal--dialog">
                    <div className="modal--content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
  }
}

export default Modal;
