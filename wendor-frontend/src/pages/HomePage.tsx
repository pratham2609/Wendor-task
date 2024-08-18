import BestSellers from '../components/Home/BestSellers'
import Beverages from '../components/Home/Beverages'
import CategoryAndProducts from '../components/Home/CategoryAndProducts'
import Hero from '../components/Home/Hero'
import Snacks from '../components/Home/Snacks'

export default function HomePage() {
    return (
        <main className='flex flex-col w-full h-full gap-20'>
            <Hero />
            <CategoryAndProducts />
            <BestSellers />
            <Beverages />
            <Snacks />
        </main>
    )
}
