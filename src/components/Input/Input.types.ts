/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputProps = {
    required: boolean;
    type: "text" | "date";
    name: string;
    label: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: any) => void;
    value: string;
};

export type Ref = HTMLInputElement;
