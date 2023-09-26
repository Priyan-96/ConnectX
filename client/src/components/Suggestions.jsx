import React from 'react'
import Suggestion from './Suggestion';
import { useQuery } from 'react-query';
import { makeRequest } from '../axios';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function Suggestions() {

    const { isDarkMode } = useDarkMode();

    const { isLoading, error, data } = useQuery(['suggestions'], async () => {
        return await makeRequest.post("/suggestions").then((res) => {
            return res.data;
        })
    });

    console.log("Data : ", data);

    const getRandomUsers = () => {
        let shuffledUsers = data;
        let currentIndex = (data) ? data.length : 0;
        let randomIndex, tempValue;
        let selectedUsers;

        while ( currentIndex > 0 ) {
            randomIndex = Math.floor(Math.random() * currentIndex);

            currentIndex--;

            tempValue = shuffledUsers[currentIndex];
            shuffledUsers[currentIndex] = shuffledUsers[randomIndex];
            shuffledUsers[randomIndex] = tempValue;
        }

        selectedUsers = (shuffledUsers) ? shuffledUsers.slice(0,3) : null;

        return selectedUsers;
    }

    const randomUsers = getRandomUsers();


    return (
        <div className={`flex flex-col w-full mt-[5px] p-2`}>
            {data ? randomUsers.map(user => (
                <Suggestion user={user} />
            )) : <></>}
        </div>
    )
}
