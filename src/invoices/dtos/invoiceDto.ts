import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsObject, IsString } from "class-validator";
import { Customer } from "src/customers/entities/customer.entity";

export class invoiceDto {

    @ApiProperty()
    @IsString()
    invoiceCode: string;

    @ApiProperty()
    @IsInt()
    invoiceStatus: number;

    @ApiProperty({ type: () => Customer })
    @IsObject()
    customer: Customer;
}