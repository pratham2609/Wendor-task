import { Spinner } from "@nextui-org/react";

export default function Loader() {
    return (
        <div className="w-full h-screen flex items-center justify-center"><Spinner color="danger" size="md" /></div>
    )
}
