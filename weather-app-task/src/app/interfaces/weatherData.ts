export interface WeatherData {
    cod: string, 
    message: number, 
    cnt: number, 
    list: Array<any>, 
    city: object
}