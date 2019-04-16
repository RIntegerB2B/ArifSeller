export class Order {
    orderDate: Date;
    customerId: string;
    orderId: string;
    products: [{
        productId: string,
        qty: number
    }];
    total: number;
    orderStatus: string;
    addressDetails: [{
        streetAddress: string;
        building: string;
        landmark: string;
        city: string;
        state: string;
        pincode: string;
        name: string;
        mobileNumber: string;
     }];
}
