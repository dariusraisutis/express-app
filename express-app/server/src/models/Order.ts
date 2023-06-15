import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';

export interface IOrderItem {
  product: string;
  quantity: number;
}

interface IOrder extends Document {
  user: string | IUser;
  items: IOrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    region: string;
    country: string;
    zipCode: string;
  };
  status: string;
  totalPrice: number;
  createdAt: Date;
  isDelivered: boolean;
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  status: { type: String, required: true, default: 'pending' },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  isDelivered: { type: Boolean, required: true }
});

export default model<IOrder>('Order', orderSchema);