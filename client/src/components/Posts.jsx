import React from 'react';
import { useNavigate } from 'react-router';
import Post from "../components/Post";
import { useQuery } from 'react-query';
import { makeRequest } from '../axios.js';

export default function Posts({ userId }) {

  const { isLoading, error, data } = useQuery(['posts'], () => {
    return makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    });
  })

  return (
    <div className='w-full h-full flex flex-col'>
      {error ? "Something went wrong!" : (
        isLoading ? (<div>Loading Posts!</div>) :
          (data.map(post => (
            <Post post={post} key={post.pid} />
          )))
      )}
      <div className='mb-[10px] opacity-0'>Hello</div>
    </div>
  )
}
