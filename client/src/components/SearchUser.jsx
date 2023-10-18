import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchUser({ data, closeSearch }) {

    const handleClick = () => {
        closeSearch();
    }

    return (
        <div className='w-full p-[10px] dark'>
            <Link to={`/profile/${data.uid}`}>
                <div className='flex p-[2px]'>
                    <img className='w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] rounded-[50%] mr-[10px]' src={data.profilepic} alt='' />
                    <span className='text-sm md:text-md lg:text-lg' onClick={handleClick}>{data.username}</span>
                </div>
            </Link>
        </div>
    )
}
