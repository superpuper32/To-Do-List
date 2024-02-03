export interface ButtonProps {
    type: "button" | "submit";
    children: string;
    className: string;
    handleClick?: () => void;
}