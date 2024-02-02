import { FC, memo } from 'react';

interface ButtonProps {
    handleClick: () => void
}

const Button: FC<ButtonProps> = memo(({
    handleClick
}) => {
    return (
        <div className="block my-3">
            <button className="btn--primary" onClick={handleClick}>Add Task</button>
        </div>
    );
});

export default Button;
