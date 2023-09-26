import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import tagFriends from "../assets/tagFriends.png";
import location from "../assets/location.png";
import addImg from "../assets/addImg.png";
import { useDarkMode } from '../contexts/DarkModeContext';
import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { makeRequest } from "../axios";
import userProfile from "../assets/user_profile.jpg"

export default function Share() {
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const { isLoading, error, data } = useQuery(['users'], async () => {
        return await makeRequest.get("/users?userId=" + currentUser.uid).then(async (res) => {
            return await res.data;
        });
    });

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/uploads", formData);
            return res.data;
        } catch (error) {
            alert(error);
        }
    }

    const { isDarkMode } = useDarkMode();
    const { currentUser } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts", newPost);
        }, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        }
    }
    )

    const handleShare = async () => {
        setDesc('');
        var imgURL = "";
        if (file) imgURL = await upload();
        setFile(null);
        await mutation.mutateAsync({ desc, pimg: imgURL });
    }

    return (
        <div className={`w-full h-auto ${isDarkMode ? 'dark' : 'bg-white'} flex flex-col mb-[20px] p-[20px] rounded-md`}>
            <div className="flex mb-[20px] h-auto">
                <img className='w-[50px] border-black border-[1px] h-[50px] mr-[20px] rounded-[50%] object-cover' src={(data) ? (data.profilepic) : (currentUser.profilepic)} alt='' />
                <input className={`w-5/6 p-[15px] ${isDarkMode ? 'dark' : 'bg-white'} focus:outline-none h-[50px]`} type="text" name="desc" onChange={(e) => { setDesc(e.target.value) }} value={desc} placeholder="Share your thoughts in your mind ..." />
            </div>
            {file && <img className="mb-[10px] object-cover" src={URL.createObjectURL(file)} alt="" />}
            <div className="flex justify-between my-[15px]">
                <div className="flex">
                    <div className="flex items-center mr-[15px]">
                        <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} className="w-[100px] absolute opacity-0" />
                        <img className="w-[25px] h-[25px] mr-[5px]" src={addImg} alt="" />
                        <span className="text-sm">Add Image</span>
                    </div>
                    <div className="flex items-center mr-[15px]">
                        <img className="w-[25px] h-[25px] mr-[5px]" src={location} alt="" />
                        <span className="text-sm">Place</span>
                    </div>
                    <div className="flex items-center">
                        <img className="w-[25px] h-[25px] mr-[5px]" src={tagFriends} alt="" />
                        <span className="text-sm">Tag Friends</span>
                    </div>
                </div>
                <button onClick={handleShare} className='w-[60px] h-[30px] bg-blue-light text-white'>Share</button>
            </div>
        </div>
    )
}