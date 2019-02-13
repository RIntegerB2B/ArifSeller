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
    skuCodeVerify: boolean;
    productImageName: [string];
    mainCategory: string;
    region: [Region];
    moq: string;
    mfdQty: Number;
    mfdQtyEditing: Boolean;
    // size
    length: string;
    breadth: string;
    height: string;
    // details
    material: string;
    waterProof: string;
    laptopSize: string;
    closure: string;
    compartments: string;
    pockets: string;
}
