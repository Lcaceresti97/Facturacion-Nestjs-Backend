import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageRequest } from 'src/common/pagination/page-request.model';
import { Page } from 'src/common/pagination/page.model';
import { SortDirection } from 'src/common/pagination/sort-direction.enum';
import { CustomerService } from './customers.service';
import { customerDto } from './dtos/customerDto';

@ApiTags('Customers-Apis')
@Controller('/api/v1/customers')
export class CustomersController {

    constructor(private readonly _logger: Logger, private readonly customerService: CustomerService) { this._logger.error(this.constructor.name); }

    @Get(':customerId')
    async getById(@Param('customerId', ParseIntPipe) customerId: number) {
        const data = await this.customerService.getById(customerId);
        return { data };
    }

    @Get()
    public async getAllByPage(
        @Query('pageNumber') pageNumber: number = 1,
        @Query('pageSize') pageSize: number = 5,
        @Query('sortCol') sortCol: string = 'customerId',
        @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING): Promise<Page<customerDto>> {
        try {
            const pageRequest: PageRequest = PageRequest.from(pageNumber, pageSize, sortCol, sortDir);
            return this.customerService.getAllByPage(pageRequest);
        } catch (error) {
            this._logger.error(error);
        }
    }


    @Post()
    async createPost(@Body() dto: customerDto) {
        const data = await this.customerService.createOne(dto);
        return { message: 'Customer created successfully', data };
    }

    @Delete(':customerId')
    async deleteOne(@Param('customerId') customerId: number) {
        let data;

        data = await this.customerService.deleteOne(customerId);

        return { message: 'Customer deleted', data };
    }
}
