import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { axiosInstance } from '../../utils/axiosInstance';
import Fallback from '../../components/Dashboard/Fallback';

interface DashboardData {
  totalProducts: number;
  totalUsers: number;
  totalSales: number;
  totalRevenue: number;
}

export default function Home() {
  const { user } = useAuthContext();
  const [data, setData] = React.useState<DashboardData>({
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = "Wendor | Dashboard"
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/dashboard')
        if (res.data?.data) {
          setData(res.data?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <section className='w-full h-full pb-5 xl:px-7 px-5 2xl:pt-7 xl:pt-6 pt-5 flex flex-col gap-5 items-center'>
      <div className='flex items-center w-full justify-between'>
        <h2 className='urbanist font-medium xl:text-4xl lg:text-3xl text-2xl'>
          Welcome, {user?.fullName} 👋🏻
        </h2>
      </div>

      {/* Cards */}
      <div className='grid md:h-[50%] h-[40%] lg:gap-5 gap-3 w-full md:grid-cols-2 grid-cols-1'>
        <div className='bg-pink rounded-2xl bg-opacity-10 md:p-5 p-3 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-pink urbanist xl:text-3xl lg:text-2xl md:text-xl text-lg'>
              No. Of Products
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-pink urbanist xl:text-8xl lg:text-7xl md:text-6xl text-4xl font-bold'>
              <Fallback data={data?.totalProducts} loading={loading} />
            </p>
          </div>
        </div>
        <div className='bg-teal rounded-2xl bg-opacity-10 md:p-5 p-3 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-teal urbanist xl:text-3xl lg:text-2xl md:text-xl text-lg'>
              No. Of Customers
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-teal urbanist xl:text-8xl lg:text-7xl md:text-6xl text-4xl font-bold'>
              <Fallback data={data?.totalUsers} loading={loading} />
            </p>
          </div>
        </div>
        <div className='bg-purple rounded-2xl bg-opacity-10 md:p-5 p-3 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-purple urbanist xl:text-3xl lg:text-2xl md:text-xl text-lg'>
              Total Sales done
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-purple urbanist xl:text-8xl lg:text-7xl md:text-6xl text-4xl font-bold'>
              <Fallback data={data?.totalSales} loading={loading} />
            </p>
          </div>
        </div>
        <div className='bg-blue rounded-2xl bg-opacity-10 md:p-5 p-3 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-blue urbanist xl:text-3xl lg:text-2xl md:text-xl text-lg'>
              Total Revenue generated
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-blue urbanist xl:text-8xl lg:text-7xl md:text-6xl text-4xl font-bold'>
              <Fallback data={data?.totalRevenue} loading={loading} />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
