import { User } from "../models/User";
import argon2 from "argon2";
import OAuthService, { ITokenPayload } from "./OAuthService";

export interface IUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

interface IUserLoginDto {
    email: string;
    password: string;
}

export interface IUserService {
    signUp: (userDto: IUserDto) => Promise<IUser>;
    login: (userLoginDto: IUserLoginDto) => Promise<IUser>;
    update: (userDto: IUserDto)  => Promise<IUser>;
    delete: (userDto: IUserDto) => Promise<void>;
    getAll: () => Promise<IUser[]>;
}
class UserService implements IUserService {
   public async signUp(userDto: IUserDto): Promise<IUser> {
    const { email, password, firstName, lastName, isAdmin } = userDto;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User with same email already exist.');
        }

        const hashedPassword = await argon2.hash(password);
        const user = new User({ 
            email, 
            password: hashedPassword, 
            firstName, 
            lastName, 
            isAdmin 
        });
        await user.save();

        return { email, firstName, lastName, isAdmin } as IUser;
      } catch (err: Error | unknown) {
        console.error(err);
        throw new Error(err instanceof Error ? err.message : 'Server error.');
      }

   }
    public async login({ email, password }: IUserLoginDto): Promise<IUser> {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found.');

        const isPasswordCorrect = await argon2.verify(user.password, password);
        if (!isPasswordCorrect) throw new Error('Incorrect email or password.');
    
        const { _id, firstName, lastName, isAdmin } = user;

        const userId = _id.toString();
        const loggedUser: IUser = { _id: userId, email, firstName, lastName, isAdmin };
        return loggedUser;
      } catch (err: Error | unknown) {
        console.error(err);
        throw new Error(err instanceof Error ? err.message : 'Server error.');
      }
    }
    update: (userDto: IUserDto) => Promise<IUser>;
    delete: (userDto: IUserDto) => Promise<void>;

    public async getAll(): Promise<IUser[]> {
        try {
            const users = await User.find();
            return users.map(({ _id, email, firstName, lastName, isAdmin }) => {
                const userId = _id.toString();
                return { _id: userId, email, firstName, lastName, isAdmin } as IUser;
            });
        } catch(error: Error | unknown) {
            throw new Error(error instanceof Error 
                ? error.message 
                : 'Could not retrieve users.'
            );
        }
    }
}

export default new UserService();