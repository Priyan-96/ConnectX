import { useEffect, useState } from 'react';

export function useLocalStorage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('users')));
    console.log(JSON.parse(localStorage.getItem('users')));
    localStorage.setItem('users', JSON.stringify(currentUser));
  }, []);

  return currentUser;
}
