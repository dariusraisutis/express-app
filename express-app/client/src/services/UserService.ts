import axios from "axios";

interface IUserDto {
    _id?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    isAdmin?: boolean;
}

export interface IUserLoginDto {
    email: string;
    password: string;
}

interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
}

interface IUserService {
    signup: (userDto: IUserDto) => Promise<IUser>;
    login: (userDto: IUserLoginDto) => Promise<IUser>;
    // getById: (id: string) => Promise<IUser>;
    // update: (userDto: IUserDto) => Promise<IUser>;
    // delete: (userDto: IUserDto) => Promise<boolean>;

}

class UserService implements IUserService {

    public async signup (userDto: IUserDto): Promise<IUser> {
        try {
            const { data: { firstName, lastName, _id, isAdmin, email } } = await axios.post(`http://localhost:5000/api/users/create`, userDto);
            return { firstName, lastName, _id, isAdmin, email } as IUser;
        } catch (error: Error | unknown) {
            throw new Error(`${error instanceof Error ? error.message : error}`);
        }
    }

    public async login(userDto: IUserLoginDto): Promise<IUser> {
        try {
            const { data: { firstName, lastName, _id, isAdmin, email } } = await axios.post(`http://localhost:5000/api/users/login`, userDto);
            return { firstName, lastName, _id, isAdmin, email } as IUser;
        } catch (error: Error | unknown) {
            throw new Error(`${error instanceof Error ? error.message : error}`);
        }
    }

    // getById: (id: string) => Promise<IUser>;
    // update: (userDto: IUserDto) => Promise<IUser>;
    // delete: (userDto: IUserDto) => Promise<boolean>;
}

export default new UserService();