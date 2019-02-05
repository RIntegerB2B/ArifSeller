import { Region } from './region.model';
export class Product {
    _id: string;
    productTitle: string;
    productName: string;
    productDescription: string;
    shortDescription: string;
    price: string;
    color: string;
    styleCode: string;
    skuCode: string;
    productImageName: [string];
    mainCategory: string;
    region: [Region];
    moq: string;
    // size
    length: Number;
    breadth: Number;
    height: Number;
    // details
    material: string;
    waterProof: string;
    laptopSize: string;
    closure: string;
    compartments: string;
    pockets: string;
}
