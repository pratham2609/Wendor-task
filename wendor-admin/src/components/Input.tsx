interface InputProps {
    type?: string;
    placeholder: string;
    value: string | number;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
export default function Input(
    { type = "text", placeholder, value, name, onChange, className }: InputProps
) {
    return (
        <input name={name} id={name} value={value} onChange={onChange} placeholder={placeholder} className={"px-2.5 py-3 bg-transparent xl:text-base text-sm focus:outline-none " + className} type={type} />
    )
}
