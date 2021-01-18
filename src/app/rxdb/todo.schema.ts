import { RxJsonSchema } from "rxdb";

const toDoSchema: RxJsonSchema = {
    version: 0,
    title: 'todo schema no compression',
    keyCompression: true,
    type: 'object',
    properties: {
        id: {
            type: 'string',
            primary: true,
        },
        employeeID: {
            type: 'number'
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        status: {
            type: 'string'
        }
    },
    required: ['id', 'employeeID', 'title', 'description', 'status'],
    indexes: [
        'id', // <- this will create a simple index for the `firstName` field
        ['id', 'title'] // <- this will create a compound-index for these two fields
    ]
};

export default toDoSchema;
