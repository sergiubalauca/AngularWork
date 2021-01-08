export class ToDo{
    toDoID: number
    employeeID: number;
    title: string;
    description: string;
    
    constructor(toDoID:number, employeeID:number, title:string, description:string) {
        this.toDoID = toDoID;
        this.employeeID = employeeID;
        this.title = title;
        this.description = description;
    }
}
