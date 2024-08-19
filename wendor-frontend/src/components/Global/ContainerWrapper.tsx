import { ReactNode } from 'react'

export default function ContainerWrapper({ children }: { children: ReactNode }) {
    return (
        <div className='max-w-screen-xl pt-24 xl:px-0 lg:px-12 md:px-10 px-6 py-5 mx-auto w-full flex flex-col overflow-x-hidden'>
            {children}
        </div>
    )
}
