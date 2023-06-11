import { Router, Request, Response, NextFunction } from "express";
import { IController } from "../interfaces/IController";
import { IOrderService } from "../services/OrderService";
import HttpException from "../utils/exceptions/HttpExcepton";

class OrderController implements IController {
    path: string;
    router: Router;
    private orderService: IOrderService;

    constructor(orderService: IOrderService) {
        this.path = '/orders';
        this.router = Router();
        this.orderService = orderService;
        this.registerRoutes();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { status, isDelivered, deliveryAddress, createdAt, items, user, totalPrice } = req.body;
            const order = await this.orderService.create(
                { status, isDelivered, createdAt, items, user, deliveryAddress, totalPrice }
            );

            return res.status(201).send(order);

        } catch (error) {
            return next(new HttpException(400, error.message));
        }
    }

    private registerRoutes(): void {
        this.router.post(`${this.path}/create`, this.create);
    }
}

export default OrderController;