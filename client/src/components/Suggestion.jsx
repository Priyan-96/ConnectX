import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { makeRequest } from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function Suggestion({ user }) {

    const { currentUser } = useAuth();

    const userId = (user) ? user.uid : null;

    const { isLoading: rIsLoading, error: rError, data: rData } = useQuery(['relationships', userId], async () => {
        return await makeRequest.get("/relationships?followedid=" + userId).then(async (res) => {
            return res.data;
        });
    });

    var relationshipStatus;

    if (Array.isArray(rData)) {
        relationshipStatus = rData.includes(currentUser.uid);
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (relationshipStatus) => {
            if (relationshipStatus) return makeRequest.delete("/relationships?followedid=" + userId);
            return makeRequest.post("/relationships?followedid=" + userId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('relationships');
                queryClient.invalidateQueries('suggestions');
            }
        }
    )

    const handleFollow = () => {
        if (relationshipStatus) mutation.mutate(true);
        else mutation.mutate(false);
    }

    return (
        <div className='flex items-center m-[10px]'>
            <div className='w-[70%] flex items-center'>
                <Link to={`/profile/${user.uid}`}>
                    <img className='w-[40px] border-black border-[1px] h-[40px] rounded-[50%]' src={(user) ? (user.profilepic) : null} alt='' />
                </Link>
                <Link to={`/profile/${user.uid}`}>
                    <span className='w-auto ml-[15px] text-md'>{(user) ? (user.username) : null}</span>
                </Link>
            </div>
            <button onClick={handleFollow} className='text-white px-[15px] py-[4px] bg-blue-dark'>{relationshipStatus ? "Following" : "Follow"}</button>
        </div>
    )
}
