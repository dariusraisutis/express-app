import { IUser, User, instanceOfUser } from "../models/User";
import { IProduct } from "./ProductService";
import Order, { IOrderItem } from "../models/Order";

export interface IOrder {
    id: string;
    user: string;
    items: IOrderItem[];
    deliveryAddress: IDeliveryAddress;
    status: string;
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
    user: string;
    items: IProduct[];
    deliveryAddress: IDeliveryAddress;
    status: string;
    isDelivered: boolean;
    totalPrice: number;
    createdAt: Date;
}

export interface IOrderService {
    create: (orderDto: IOrderDto)  => Promise<IOrder>;
    update: (orderDto: IOrderDto) => Promise<IOrder>;
    delete: (orderDto: IOrderDto) => Promise<void>;
    getOne: (orderDto: IOrderDto) => Promise<IOrder>;
}

class OrderService implements IOrderService {
    constructor() {}
    
    public async create(orderDto: IOrderDto): Promise<IOrder> {
        try {          
            const order = await Order.create(orderDto);
            const { _id, items, deliveryAddress, status, isDelivered, totalPrice, createdAt, user } = order;
            
            const orderToReturn: IOrder = {
                id: _id,
                user: instanceOfUser(user) ? user._id : user,
                items,
                deliveryAddress,
                status,
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
    getOne: (orderDto: IOrderDto) => Promise<IOrder>;


}

export default new OrderService();