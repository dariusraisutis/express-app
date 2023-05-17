interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

interface IUserTableProps {
    users: IUser[];
}
export const UserTable = ({ users }: IUserTableProps) => {  
    return (
        <div>
            {   
                users.length && 
                users.map(({ _id, email, firstName, lastName, isAdmin }: IUser, key: number) => (
                    <ul>
                        <div key={key}>
                            <li>{_id}</li>
                            <li>{email}</li>
                            <li>{firstName}</li>
                            <li>{lastName}</li>
                            <li>{isAdmin}</li>
                        </div>
                    </ul>
                ))
            }  
        </div>
    ); 
  }