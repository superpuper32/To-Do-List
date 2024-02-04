/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputType = "text" | "date";

export type InputProps = {
    required: boolean;
    type: InputType;
    name: string;
    label: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: any) => void;
    value: string;
};

export type Ref = HTMLInputElement;
