export interface IGetCatArray{
    getCatTable:IGetCatTable[];
}


export interface ICatServiceResponse{
    response: IGetGetCatService;
}

export interface IGetGetCatService{
    getCat: IGetCatService;
}

export interface IGetCatService{
    getCat: IGetCatTable[];
}

export interface IGetCatTable{
    Id: number,
    Colour:string,
    Name:string
}
