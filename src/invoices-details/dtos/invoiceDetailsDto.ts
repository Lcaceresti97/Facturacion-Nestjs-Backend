import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsInt, IsNumber, IsObject, IsString } from "class-validator";
import { Product } from "src/products/entities/product.entity";


export class invoiceDetailsDto {

    @IsInt()
    invoiceDetailAmount: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    invoiceDetailTotalParcial: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    invoiceDetailIsv: number;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    invoiceDetailDiscount: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    invoiceDetailTotal: number;

    @IsInt()
    invoiceDetailStatus: number;

    @ApiProperty()
    @IsObject()
    products: Product[];
}