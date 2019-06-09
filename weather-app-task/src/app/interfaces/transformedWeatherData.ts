export interface transformedWeatherData {
    dt_txt: string,
    main: {
        grnd_level: number,
        humidity: number,
        pressure: number,
        sea_level: number,
        temp: number,
        temp_kf: number,
        temp_max: number,
        temp_min: number
    },
    src: string,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    wind: {
        speed: number,
        deg: number
    }
}