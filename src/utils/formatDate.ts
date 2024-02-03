type Options = {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "narrow" | "short" | "long";
    day: "numeric" | "2-digit";
};

export const formatDate = (date: string): string => {
    const currentDate = new Date(date);
    const options: Options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    return formatter.format(currentDate);
}