import { IUser } from "models/User";
import { IProduct } from "./ProductService";
import Order from "models/Order";

export interface IOrder {
    id: string;
    user: IUser;
    items: IProduct[];
    deliveryAddress: IDeliveryAddress;
    orderStatus: string;
    isDelivered: boolean;
    totalPrice: number;
    createdAt: Date;
}

export interface IDeliveryAddress {
    street: string;
    city: string;
    region: string;
    country: string;
    zipCode: string;
}

export interface IOrderDto {
    id?: string;
    userId: string;
    items: IProduct[];
    deliveryAddress: IDeliveryAddress;
    orderStatus: string;
    isDelivered: boolean;
    totalPrice: number;
    createdAt: Date;
}

export interface IOrderService {
    create: (orderDto: IOrderDto)  => Promise<IOrder>;
    update: (orderDto: IOrderDto) => Promise<IOrder>;
    delete: (orderDto: IOrderDto) => Promise<void>;
    get: (orderDto: IOrderDto) => Promise<IOrder>;
}

class OrderService implements IOrderService {
    constructor() {}
    
    public async create(orderDto: IOrderDto): Promise<IOrder> {
        try {
            const order = await Order.create(orderDto);
            const { _id, items, deliveryAddress, orderStatus, isDelivered, totalPrice, createdAt, } = order;
            const orderToReturn: IOrder = {
                id: _id,
                user: { firstName: '', lastName: '', isAdmin: false, email: '', password: ''},
                items: [],
                deliveryAddress: { street: '', city: '', region: '', country: '', zipCode: '0' },
                orderStatus,
                isDelivered,
                totalPrice,
                createdAt
            };

            return orderToReturn;
        } catch (error: Error | unknown) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Server error.'
            );
        }
    }
    update: (orderDto: IOrderDto) => Promise<IOrder>;
    delete: (orderDto: IOrderDto) => Promise<void>;
    get: (orderDto: IOrderDto) => Promise<IOrder>;


}

export default new OrderService();