import { IoReload } from "react-icons/io5";

export default function ReloadBtn({ action = () => { } }) {
    return (
        <button className="px-4 py-1.5 font-medium rounded-md flex items-center gap-2 bg-black text-white" onClick={action} ><IoReload />Reload</button>
    )
}
