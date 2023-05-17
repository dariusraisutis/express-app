import React, { useEffect, useState } from 'react';
import './App.css';
import { UserTable } from './UserTable';
export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

function App() {
  const [userDetails, setUserDetails] = useState<User[]>([]);
  useEffect(() => {
    console.log('i fire once');
    const fetchData = async (): Promise<void> => {
      const response = await fetch('http://localhost:5000/api/users');
      const result = await response.json();
      try {
        let userResult: User[] = result.map((current: any) => {
          const { _id, email, firstName, lastName, isAdmin } = current;
          const convertToUser = (): User => {
            return {
              _id, email, firstName, lastName, isAdmin
            }
          }
          convertToUser();          
        })

        setUserDetails(userResult);
      } catch (error) {
        
      }
      setUserDetails(result);
    }
    fetchData()
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="App">
        <UserTable users={userDetails}/>
      </div>
    </>
  );
}

export default App;
