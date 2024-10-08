import { IoReload } from "react-icons/io5";

export default function ReloadBtn({ action = () => { } }) {
    return (
        <button className="xl:px-4 md:px-3 px-2 lg:py-1.5 py-1 xl:text-base md:text-sm text-xs font-medium rounded-md flex items-center gap-2 bg-black text-white" onClick={action} ><IoReload />Reload</button>
    )
}
