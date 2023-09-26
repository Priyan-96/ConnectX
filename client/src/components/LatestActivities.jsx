import React from 'react';
import LatestActivity from './LatestActivity';
import { useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';

export default function LatestActivities() {

    var { isLoading, error, data } = useQuery(['activities'], async() => {
        return makeRequest.get("/activities").then((res) => {
            return res.data;
        })
    });

    if (data) data = data.slice(0,5);

    const queryClient = useQueryClient();

    queryClient.invalidateQueries('activities');

    return (
        <div className='flex flex-col'>
            {data ? data.map((activity => (
                <LatestActivity activity={activity}/>
            ))) : <></>}
        </div>
    )
}
