
/**
 * Product 
 */
export class Product {
    id?: number;
    name?: string;
    price?: number;

    constructor(id?: number, name?: string, price?: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}