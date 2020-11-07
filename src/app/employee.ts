/* Used for casting the response from the Observable in the service class into
 * a suitable format for our templates
 */
export interface IEmployee {
    id: number,
    name: string,
    email: number
}

export class Employee {
    id: number
    name: string;
    email: string;
    birthdate: string;
    groupId: number;
    constructor(id: number, name: string, email: string, birthdate: string, groupId: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.groupId = groupId;
    }
}
