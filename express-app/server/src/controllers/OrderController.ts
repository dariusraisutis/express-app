import { Router, Request, Response, NextFunction } from "express";
import { IController } from "interfaces/IController";
import { IOrderService } from "services/OrderService";
import HttpException from "utils/exceptions/HttpExcepton";

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
            const { orderStatus, isDelivered, deliveryAddress, createdAt, items, userId, totalPrice } = req.body;
            const order = this.orderService.create(
                { orderStatus, isDelivered, createdAt, items, userId: '', deliveryAddress, totalPrice}
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