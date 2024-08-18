import { Spinner } from '@nextui-org/react'

export default function Fallback({ data, loading = false }: { data: string | number, loading: boolean }) {
    return (
        <>{!loading ? data : <Spinner color='warning' />}</>
    )
}
