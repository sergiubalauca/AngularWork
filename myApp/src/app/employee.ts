/* Used for casting the response from the Observable in the service class into
 * a suitable format for our templates
 */
export interface IEmployee {
    id: number,
    name: string,
    email: string
}

export class Employee implements IEmployee{
    id: number
    name: string;
    email: string;
    birthdate: string;
    groupId: string;
    addressID: number;
    
    constructor(id: number, name: string, email: string, birthdate: string, groupId: string, addressID:number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.groupId = groupId;
        this.addressID = addressID;
    }
}
