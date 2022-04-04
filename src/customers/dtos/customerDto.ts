import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Invoice } from "src/invoices/entities/envoice.entity";

export class customerDto {

    @ApiProperty()
    @IsString()
    customerName: string;

    @ApiProperty()
    @IsString()
    customerAddress: string;

    @ApiProperty()
    @IsInt()
    customerPhone: number;

    @ApiProperty()
    @IsInt()
    customerStatus: number;

    @ApiProperty()
    @IsObject()
    @IsOptional()
    invoices: Invoice[];


}