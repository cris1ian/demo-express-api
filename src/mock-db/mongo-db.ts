import { IProduct } from "../models/product";

export class MongoDb {
    public products: IProduct[] = [];
    private idCounter: number = 1;
}