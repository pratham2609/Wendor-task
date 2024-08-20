import React from 'react'
import { FaPlus } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../utils/axiosInstance';
import ModalProvider from '../Provider/Modal';

export default function EditAvatarModal({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const { user, updateUser } = useAuthContext();
    const [avatar, setAvatar] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file.size > 3000000) {
            toast.error('File size should be less than 3MB')
            return;
        }
        setFileBase(file);
    };
    const setFileBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatar({
                file: file,
                base64: reader.result
            });
        };
    };

    const handleUpdateImage = async () => {
        if (!avatar) {
            setIsOpen(false);
            return;
        }
        setLoading(true);
        try {
            const formdata = new FormData();
            formdata.append("file", avatar?.file);
            const res = await axiosInstance.patch('/user/avatar', formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            updateUser(res.data.data)
            setAvatar(null);
            setIsOpen(false);
            toast.success('Avatar updated successfully');
        } catch (error) {
            console.log(error)
            toast.error("Error updating avatar!")
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalProvider full={false} loading={loading} action={handleUpdateImage} isOpen={isOpen} setIsOpen={setIsOpen} title={"Edit Avatar"}>
            <div className='w-full flex items-center gap-3'>
                {user?.avatar && <img src={user?.avatar} className='w-28 h-28 cursor-pointer rounded-full' alt="Avatar" />}
                <div>
                    <label htmlFor='avatar'>
                        {avatar ? <img src={avatar?.base64} className='w-28 h-28 cursor-pointer rounded-full' alt="Avatar" /> : <span className='w-28 h-28 cursor-pointer rounded-full bg-lightOrange flex items-center justify-center'>
                            <FaPlus className='text-5xl opacity-30' />
                        </span>}
                    </label>
                    <input name='avatar' id='avatar' onChange={handleFile} hidden type='file' accept='.png, .jpg, .jpeg' />
                </div>
            </div>
        </ModalProvider>
    )
}
