import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useQuery } from 'react-query';
import Comment from './Comment';
import { makeRequest } from '../axios';
import { useMutation, useQueryClient } from 'react-query';

export default function Comments({ postId }) {
  const [desc, setDesc] = useState("");

  const { currentUser } = useAuth();
  const { isDarkMode } = useDarkMode();

  const { isLoading, error, data } = useQuery(['comments'], () => {
    return makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    });
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComments) => {
      return makeRequest.post("/comments?postId=" + postId, newComments);
    }, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  }
  )

  const handleSend = () => {
    setDesc('');
    mutation.mutate({ desc });
    const aname = "commented on a post!";
    const res = makeRequest.post("/activities", { aname });
    console.log(res);
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex pt-3 mb-2'>
        <img className='w-[40px] h-[40px] rounded-[50%] object-cover' src={currentUser.profilepic} alt='' />
        <input value={desc} className={`ml-2 outline-none border border-gray-light px-2 py-[5px] flex-grow ${isDarkMode ? 'dark' : ''}`} onChange={(e) => setDesc(e.target.value)} type='text' placeholder='Write a messgae' />
        <button onClick={handleSend} className='w-[80px] bg-blue-light text-white ml-[10px]'>Send</button>
      </div>
      {error ? "Something went wrong!" : (isLoading ? <div className=''>Loading Comments...</div> : data.map(comment => (
        <Comment comment={comment} key={comment.id} />
      )))}
    </div>
  )
}
