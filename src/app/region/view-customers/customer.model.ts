import { AddressModel } from './address.model';
import { CardDetailModel} from './cardDetails.model';

export class RegModel {
    mobileNumber: number;
    emailId: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    location: string;
    gender: string;
    addressDetails: [AddressModel];
    cardDetails: [CardDetailModel]; 
    /* ProfileModels: [ProfileModel]; */
}
