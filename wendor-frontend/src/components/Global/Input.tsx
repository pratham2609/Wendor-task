interface InputProps {
    type?: string;
    placeholder: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean
}
export default function Input(
    { type = "text", placeholder, required, value, name, onChange, className }: InputProps
) {
    return (
        <input name={name} id={name} value={value} required={required ? true : false} onChange={onChange}
            placeholder={placeholder} className={"px-2.5 py-3 bg-transparent border rounded-lg focus:outline-none " + className} type={type} />
    )
}
