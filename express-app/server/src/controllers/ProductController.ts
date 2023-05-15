import { Router, Request, Response, NextFunction } from "express";
import IController from "../interfaces/IController";
import { IProduct, IProductService } from "../services/ProductService";
import HttpException from "../utils/exceptions/HttpExcepton";

class ProductController implements IController {
    public path: string;
    public router: Router;
    private productService: IProductService;

    constructor(productService: IProductService) {
        this.path = '/products';
        this.router = Router();
        this.productService = productService;
        this.registerRoutes();
    }

    private addNew = async(
        { body }: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, description, price, inStock, stock, brand, image, category } = body;
            const productProps: IProduct = { title, description, price, inStock, stock, brand, image, category };
            const product = await this.productService.addNew(productProps);
    
            return res.status(201).send(product);
        } catch (error) {
           return next(new HttpException(400, error.message));
        }
    }

    private update = async(
        { body }: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, title, description, price, inStock, stock, brand, image, category } = body;
            const productProps: IProduct = { _id, title, description, price, inStock, stock, brand, image, category };
            const product = await this.productService.update(productProps);
            res.status(201).send(product);
        } catch ({ message }) {
            next(new HttpException(400, message));
        }
    }

    private delete = async(
        { body }: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, title, description, price, inStock, stock, brand, image, category } = body;
            const productProps: IProduct = { _id, title, description, price, inStock, stock, brand, image, category };
            await this.productService.delete(productProps);    
            return res.status(201).send(`Prduct has been deleted. Product Id ${ _id }`);
        } catch ({ message }) {
            return next(new HttpException(400, message));
        }
    }

    private getAll = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const products = await this.productService.getAll();    
            return res.status(201).send(products);
        } catch ({ message }) {
            return next(new HttpException(400, message));
        }
    }

    private getById = async(
        { params }: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = params;
            const product = await this.productService.getById(id);    
            return res.status(201).send(product);
        } catch ({ message }) {
            return next(new HttpException(400, message));
        }
    }

    private registerRoutes(): void {
        this.router.post(`${this.path}/addnew`, this.addNew);
        this.router.put(`${this.path}/update`, this.update);
        this.router.delete(`${this.path}/delete`, this.delete);
        this.router.get(`${this.path}/getall`, this.getAll);
        this.router.get(`${this.path}/getbyid/:id`, this.getById);
    }
}

export default ProductController;