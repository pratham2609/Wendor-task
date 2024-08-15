import { IoReload } from "react-icons/io5";

export default function ReloadBtn({ action = () => { } }) {
    return (
        <button type='button' onClick={action}>
            <IoReload size={25} />
        </button>
    )
}
