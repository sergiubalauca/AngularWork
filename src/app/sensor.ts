export interface ISensorServiceResponse{
    response: IGetGetSensorService;
}

export interface IGetGetSensorService{
    getSensor: IGetSensorService;
}

export interface IGetSensorService{
    getSensor: IGetSensorTable[];
}

export interface IGetSensorTable{
    Id: number,
    SensorName:string,
    SensorValue:number
}
