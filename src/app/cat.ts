export interface IGetCatArray {
    getCatTable: IGetCatTable[];
}




export interface ICatServiceResponse {
    response: IGetGetCatService;
}

export interface IGetGetCatService {
    getCat: IGetCatService;
}

export interface IGetCatService {
    getCat: IGetCatTable[];
}

export interface IGetCatTable {
    Id: number;
    Colour: string;
    Name: string;
}


export class ICatServiceResponsePost {
    request: IGetCatTablePost;

    constructor(
        request: IGetCatTablePost) {
        this.request = request;
    }
}

export class IGetCatTablePost {
    catName: string;
    colour: string;

    constructor(
        catName: string,
        colour: string) {
        this.catName = catName;
        this.colour = colour;
    }
}
