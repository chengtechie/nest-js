import {IsLatitude, IsLongitude, IsNumber, IsString, Max, Min} from "class-validator";

export class CreateReportDto {
    @IsNumber()
    @Min(1)
    @Max(1000000)
    price: number
    @IsString()
    make: string
    @IsString()
    model: string
    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number
    @IsLongitude()
    lng: number
    @IsLatitude()
    lat: number
    @IsNumber()
    @Min(1)
    @Max(500000)
    mileage: number
}