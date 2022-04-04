import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { invoiceDto } from './dtos/invoiceDto';
import { InvoicesService } from './invoices.service';

@ApiTags('Invoices-Apis')
@Controller('/api/v1/invoices')
export class InvoicesController {

    constructor(private readonly invoiceService: InvoicesService) { }

    @Get(':invoiceId')
    async getById(@Param('invoiceId', ParseIntPipe) invoiceId: number) {
        const data = await this.invoiceService.getById(invoiceId);
        return { data };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedResponse(invoiceDto)
    async getMany(@Query() pageOptionsDto: PageOptionsDto,): Promise<PageDto<invoiceDto>> {
        return this.invoiceService.getMany(pageOptionsDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getInvoiceByDate(@Query() pageOptionsDto: PageOptionsDto, @Query('entre') after: string, @Query('hasta') before: string): Promise<PageDto<invoiceDto>> {
        return this.invoiceService.getInvoiceByDate(pageOptionsDto, after, before);
    }


    @Post()
    async createPost(@Body() dto: invoiceDto) {
        const data = await this.invoiceService.createOne(dto);
        return { message: 'Invoice created successfully', data };
    }

    @Delete(':invoiceId')
    async deleteOne(@Param('invoiceId') invoiceId: number) {
        let data;

        data = await this.invoiceService.deleteOne(invoiceId);

        return { message: 'Invoice deleted', data };
    }
}
