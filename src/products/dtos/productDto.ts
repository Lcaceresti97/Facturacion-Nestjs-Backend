import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsInt, IsNumber, IsString } from "class-validator";


export class productDto {

    @ApiProperty()
    @IsString()
    productName: string;

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2 })
    productPrice: number;

    @ApiProperty()
    @IsInt()
    productStock: number;

    @ApiProperty()
    @IsInt()
    productStatus: number;
}