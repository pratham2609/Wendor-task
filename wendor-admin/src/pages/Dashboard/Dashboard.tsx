import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { axiosInstance } from '../../utils/axiosInstance';

export default function Home() {
  const { user } = useAuthContext();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = "Wendor | Dashboard"
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/admin/dashboard')
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
        <h2 className='urbanist font-medium text-4xl'>
          Welcome, {user?.fullName}
        </h2>
      </div>

      {/* Cards */}
      <div className='grid h-[50%] gap-5 w-full grid-cols-2'>
        <div className='bg-pink rounded-2xl bg-opacity-10 p-5 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-pink urbanist text-3xl'>
              No. Of Products
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-pink urbanist text-8xl font-bold'>
              {/* <Fallback data={data?.products} loading={loading} /> */}
            </p>
          </div>
        </div>
        <div className='bg-teal rounded-2xl bg-opacity-10 p-5 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-teal urbanist text-3xl'>
              No. Of Customers
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-teal urbanist text-8xl font-bold'>
              {/* <Fallback data={data?.customers} loading={loading} /> */}
            </p>
          </div>
        </div>
        <div className='bg-purple rounded-2xl bg-opacity-10 p-5 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-purple urbanist text-3xl'>
              Total Sales done
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-purple urbanist text-8xl font-bold'>
              {/* <Fallback data={data?.sales} loading={loading} /> */}
            </p>
          </div>
        </div>
        <div className='bg-blue rounded-2xl bg-opacity-10 p-5 flex flex-col justify-between'>
          <div className='w-full flex justify-start items-center'>
            <p className='capitalize text-blue urbanist text-3xl'>
              Total Revenue generated
            </p>
          </div>
          <div className='w-full flex justify-end items-center'>
            <p className='capitalize text-blue urbanist text-8xl font-bold'>
              {/* <Fallback data={data?.revenue} loading={loading} /> */}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
