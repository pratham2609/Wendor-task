import { Spinner } from '@nextui-org/react'

export default function Fallback({ data, loading = false }: { data: string, loading: boolean }) {
    return (
        <>{!loading ? data : <Spinner color='warning' />}</>
    )
}
