export class Address {
    addressID: number;
    city: string;
    state: string;
    postalCode: string;

    constructor(
        addressID: number,
        city: string,
        state: string,
        postalCode: string) {
        this.addressID = addressID;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }
}
