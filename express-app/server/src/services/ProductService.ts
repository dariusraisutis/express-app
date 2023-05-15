import { Product } from "../models/Product";
export interface IProduct {
    _id?: string;
    title: string;
    description?: string;
    category: string;
    price: number;
    inStock: boolean;
    stock?: number;
    brand?: string;
    image: string;
}

interface IProductDto {
    _id?: string;
    title: string;
    description?: string;
    category: string;
    price: number;
    inStock: boolean;
    stock?: number;
    brand?: string;
    image: string;
}

export interface IProductService {
    addNew: (productDto: IProductDto) => Promise<IProduct>;
    update: (productDto: IProductDto) => Promise<IProduct>;
    delete: (productDto: IProductDto) => Promise<void>;
    getAll: () => Promise<IProduct[]>;
    getById: (id: string) => Promise<IProduct>;
}
class ProductService implements IProductService {

    constructor() { }
    
    public async addNew(productDto: IProductDto): Promise<IProduct> {
        try {
            const product = await Product.create(productDto);
            const { _id, title, description, price, inStock, stock, brand, image } = product;
            const productId = _id.toString();
            return { _id: productId, title, description, price, inStock, stock, brand, image } as IProduct;
        } catch (error: Error | unknown) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Server error.'
            );
        }
    }

    public async update(productDto: IProductDto): Promise<IProduct> {
        try {
            const { _id, ...rest } = productDto;

            const product = await Product.findByIdAndUpdate(_id, rest, { new: true });
            if (!product) throw new Error('Could not find product.');

            const { title, description, price, inStock, stock, brand, image } = product.toObject();
            return { _id, title, description, price, inStock, stock, brand, image } as IProduct;
        } catch (error: Error | unknown) {
            console.error(error);
            throw new Error(error instanceof Error 
                ? error.message 
                : 'Server error.'
            );
          }
    }

    public async delete({ _id }: IProductDto): Promise<void> {
        try {
            const product = await Product.findById(_id);
            if (!product) throw new Error('Could not find product.');

            await product.deleteOne({ _id });
        } catch (error: Error | unknown) {
            console.error(error);
            throw new Error(error instanceof Error
                ? error.message
                : 'Server error.'
            );
        }
    }

    public async getAll(): Promise<IProduct[]> {
        try {
            const products = await Product.find();
            return products.map((current) => {
                const { _id, title, description, price, inStock, stock, brand, image, category } = current;
                const productId = _id.toString();
                return { _id: productId, title, description, price, inStock, stock, brand, image, category } as IProduct;
            });
        } catch (err: Error | unknown) {
            console.error(err);
            throw new Error(err instanceof Error
                ? err.message
                : 'Server error.'
            );
        }
    }

    public async getById(id: string): Promise<IProduct> {
        try {
            const product = await Product.findById(id);
            if (!product) throw new Error('Could not find product');
            const { title, description, price, inStock, stock, brand, image, category } = product;
            return { _id: id, title, description, price, inStock, stock, brand, image, category } as IProduct;
        } catch (err: Error | unknown) {
            console.error(err);
            throw new Error(err instanceof Error
                ? err.message
                : 'Server error.'
            );
        }
    }
}

export default new ProductService();