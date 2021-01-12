export interface ToDoInterface {
    title: string;
    description: string;
    header?: string;
}

export class ToDo implements ToDoInterface {
    toDoID?: number
    employeeID: number;
    title: string;
    description: string;
    status: string;

    constructor(employeeID: number, title: string, description: string, status: string) {
        this.employeeID = employeeID;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

export enum ToDoStatus {
    OPEN = 'open',
    PROGRESS = 'progress',
    COMPLETED = 'completed'
}