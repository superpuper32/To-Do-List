import { FC, memo } from 'react';

interface ButtonProps {
    handleClick: () => void;
    title: string;
}

const Button: FC<ButtonProps> = memo(({
    handleClick,
    title
}) => {
    return (
        <div className="block my-3">
            <button className="btn--primary" onClick={handleClick}>{title}</button>
        </div>
    );
});

export default Button;
