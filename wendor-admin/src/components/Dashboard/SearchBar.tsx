import { IoSearch } from 'react-icons/io5'

export default function SearchBar() {
    return (
        <div className='h-full rounded-xl bg-[#F7F7F7] px-5 flex gap-2 items-center'>
            <IoSearch className="xl:text-base text-sm" />
            <input className='bg-transparent xl:w-[250px] w-[200px] 2xl:text-base xl:text-sm text-xs focus:outline-none' placeholder='Search by name' />
        </div>
    )
}
