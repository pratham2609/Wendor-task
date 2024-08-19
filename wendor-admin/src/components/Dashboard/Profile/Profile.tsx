import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext';
import { HiMiniPencilSquare } from "react-icons/hi2";
import { axiosInstance } from '../../../utils/axiosInstance';
import toast from 'react-hot-toast';
import EditAvatarModal from '../../Modals/EditAvatarModal';


export default function ProfileView() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
    });
    const [editing, setEditing] = useState(false);
    const [editAvatarModal, setEditAvatarModal] = useState(false);

    const { user, updateUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setForm({
            fullName: user?.fullName,
            email: user?.email,
        })
    }, [user])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.put("/user", form);
            updateUser(res.data.data);
            toast.success("Updated successfully!");
        } catch (error) {
            console.log(error)
            toast.error("Error updating profile!")
        }
    };
    return (
        <>
            <div className="flex items-center w-full h-full px-2 flex-col ">
                <div className='lg:max-w-2xl w-full border border-zinc-400 rounded-lg flex flex-col gap-10 py-10 px-4 lg:p-4'>
                    <div className=' place-self-center  relative'>
                        <div className='w-40 h-40 rounded-full border overflow-hidden'>
                            <img src={user?.avatar} alt='User Profile' className='w-full h-full' />
                        </div>
                        <HiMiniPencilSquare onClick={() => setEditAvatarModal(true)} className='absolute bg-white rounded-lg h-8 w-8 cursor-pointer bottom-0 right-5 z-10' size={26} />
                    </div>
                    <form onSubmit={onSubmit} className="flex w-full items-center justify-center gap-2 flex-col  rounded-md">
                        <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                            <label className="flex w-full font-medium items-center justify-start">
                                Name
                            </label>
                            <input
                                type="text"
                                className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-black border border-zinc-300 rounded-[8px] focus:outline-none"
                                placeholder="Your name"
                                name="fullName"
                                readOnly={!editing}
                                onChange={handleInputChange}
                                value={form.fullName || ""}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                            <label className="flex w-full font-medium items-center justify-start">
                                Email
                            </label>
                            <input
                                type="email"
                                className="flex outline:none bg-transparent text-sm w-full pl-3 pr-3 py-3 text-black border border-zinc-300 rounded-[8px] focus:outline-none"
                                placeholder="Your Email"
                                name="email"
                                readOnly={!editing}
                                onChange={handleInputChange}
                                value={form.email || ""}
                                required
                            />
                        </div>
                        <div className="flex items-center mt-3 w-full justify-end">
                            {
                                editing ? <div className='flex items-center gap-3'>
                                    <button
                                        onClick={() => {
                                            setEditing(false)
                                            setForm({
                                                fullName: user?.fullName,
                                                email: user?.email,
                                            })
                                        }}
                                        disabled={loading}
                                        type="submit"
                                        className="flex items-center text-xs justify-center bg-red-700 text-white font-semibold px-6 rounded-md py-2 md:py-1 lg:py-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="flex items-center text-xs justify-center bg-black text-white font-semibold px-6 rounded-md py-2 md:py-1 lg:py-2"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                                    :
                                    <button
                                        onClick={() => setEditing(true)}
                                        type="button"
                                        className="flex items-center text-xs justify-center bg-black text-white font-semibold px-6 rounded-md py-2 md:py-1 lg:py-2"
                                    >
                                        Edit Profile
                                    </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <EditAvatarModal isOpen={editAvatarModal} setIsOpen={setEditAvatarModal} />
        </>
    )
}
