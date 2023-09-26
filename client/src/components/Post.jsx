import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from "../contexts/DarkModeContext";
import { useAuth } from '../contexts/AuthContext';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import moment from "moment";
import Comments from './Comments';
import LightMenu from "../assets/lightMenu.png";
import DarkMenu from "../assets/darkMenu.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { makeRequest } from '../axios';
import userProfile from "../assets/user_profile.jpg";

export default function Post({ post }) {
    const { isDarkMode } = useDarkMode();
    const [comments, setComments] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const { currentUser } = useAuth();

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery(['likes', post.pid], async () => {
        return makeRequest.get('/likes?postId=' + post.pid).then((res) => {
            return res.data;
        });
    });

    let dataLength = 0;
    var liked;
    if (Array.isArray(data)) {
        dataLength = data.length;
        liked = data.includes(currentUser.uid);
    }

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postId=" + post.pid);
            return makeRequest.post("/likes?postId=" + post.pid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('likes');
            }
        }
    )

    const handleLike = async () => {
        if (liked) {
            await mutation.mutateAsync(true);
            handleActivity();
        }    else {
            await mutation.mutateAsync(false);
            handleActivity();
        }
    }

    const handleActivity = async () => {
        console.log("Inside Activity Function!");
        const aname = "liked a post!";
        let res;
        if (liked) res = await makeRequest.delete("/activities?aname=" + aname);
        else res = await makeRequest.post("/activities", { aname })
        console.log("Activity Response : ", res);
    }

    if (post.profilepic == null) post.profilepic = userProfile;

    const handleClick = () => {
        setIsDelete(!isDelete);
    }

    const handleDelete = async () => {
        setIsDelete(!isDelete);
        const res = await makeRequest.delete("/posts?postId=" + post.pid);
        console.log(res);
        queryClient.invalidateQueries('posts');
    }

    return (
        <div className={`flex flex-col mb-[20px] p-[20px] ${isDarkMode ? 'dark' : 'bg-white'} rounded-md`}>
            <div className='flex relative mb-[10px] items-center justify-between'>
                <div className='flex items-center'>
                    <Link to={`/profile/${post.puserid}`}>
                        <img className='w-[50px] h-[50px] rounded-[50%] border-black border-[1px] object-cover' src={post.profilepic} alt='' />
                    </Link>
                    <div className='flex flex-col ml-[15px]'>
                        <Link to={`/profile/${post.puserid}`}>
                            <span className='text-lg'>{post.username}</span>
                        </Link>
                        <span className='text-sm font-light'>{moment(post.pcreateat).fromNow()}</span>
                    </div>
                </div>
                <img onClick={handleClick} className='w-[30px] h-[30px] cursor-pointer rounded-[50%]' src={isDarkMode ? DarkMenu : LightMenu} alt='' />
                {(isDelete && (post.puserid === currentUser.uid)) ? <div onClick={handleDelete} className='absolute right-0 top-[45px] cursor-pointer bg-red-dark px-[10px] py-[3px]'>Delete</div> : <></>}
            </div>
            <div className='w-full flex flex-col mb-[15px]'>
                <span className='mb-3'>{post.pdesc}</span>
                <img className='w-full max-h-[500px] object-cover' src={"/uploads/" + post.pimg} alt='' />
            </div>
            <div className='flex items-center p-1'>
                <div>
                    {error ? "Something went wrong!" : isLoading ? "Loading Likes!" : (liked ? <FavoriteIcon onClick={handleLike} style={{ color: "red" }} /> : <FavoriteBorderIcon onClick={handleLike} />)}
                    <span className='ml-[8px]'>{dataLength} Likes</span>
                </div>
                <div className='mx-[30px]'>
                    <CommentIcon />
                    <span onClick={() => setComments(!comments)} className='ml-[8px] cursor-pointer'>Comments</span>
                </div>
                <div>
                    <ShareIcon />
                    <span className='ml-[8px] cursor-pointer'>Share</span>
                </div>
            </div>
            {comments ? <Comments postId={post.pid} /> : <div className='opacity-0' />}
        </div>
    )
}
