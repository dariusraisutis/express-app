import { Request, NextFunction, Router, Response } from "express";
import { IUserDto, IUserService } from "../services/UserService";
import HttpException from "../utils/exceptions/HttpExcepton";
import { IController } from "../interfaces/IController";
import OAuthService, { ITokenPayload } from "../services/OAuthService";

class UserController implements IController {
    public path: string;
    public router: Router;
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService; 
        this.path = '/users';
        this.router = Router();
        this.registerRoutes();
    }

    private signUp = async(
        { body }: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<Response | void> => {
        const { email, password, firstName, lastName, isAdmin } = body as IUserDto;
        try {
            const user = await this.userService.signUp({ email, password, firstName, lastName, isAdmin });
            return res.status(201).json(user);
        } catch (error: Error | unknown) {
            const message = error instanceof Error 
                ? error.message 
                : 'Server error.';
            console.error(message, error);
            return next(new HttpException(400, message));
        }
    }

    private login = async(
        { body }: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<Response | void> => {
        const { email, password } = body;
        try {
            const user = await this.userService.login({ email, password });
            const { _id } = user;
            const tokenPayload: ITokenPayload = {
                id: _id,
                email: email,
            };
            const token = OAuthService.generateToken(tokenPayload);
            console.log(token);
            res.cookie('token', token, { maxAge: 60000 });

            return res.status(201).send(user);
        } catch(error: Error | unknown) {
            return next(new HttpException(400, error instanceof Error
                ? error.message
                : 'Server error.'
            ));
        }
    }

    private getAll = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const users = await this.userService.getAll();
            return res.status(201).send(users);
        } catch (error: Error | unknown) {
            return next(new HttpException(500, error instanceof Error 
                ? error.message 
                : 'Server error.'
            ));
        }
    }

    private registerRoutes(): void {
        this.router.post(`${this.path}/signup`, this.signUp);
        this.router.post(`${this.path}/login`, this.login);
        this.router.get(`${this.path}`, this.getAll);
    }
}

export default UserController;