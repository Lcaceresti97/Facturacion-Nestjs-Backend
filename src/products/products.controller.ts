import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageRequest } from 'src/common/pagination/page-request.model';
import { Page } from 'src/common/pagination/page.model';
import { SortDirection } from 'src/common/pagination/sort-direction.enum';
import { productDto } from './dtos/productDto';
import { ProductsService } from './products.service';

@ApiTags('Products-Apis')
@Controller('/api/v1/products')
export class ProductsController {

    constructor(private readonly productService: ProductsService, private readonly _logger: Logger) { }

    @Get(':productId')
    async getById(@Param('productId', ParseIntPipe) productId: number) {
        const data = await this.productService.getById(productId);
        return { data };
    }

    @Get()
    public async getAllByPage(
        @Query('pageNumber') pageNumber: number = 1,
        @Query('pageSize') pageSize: number = 5,
        @Query('sortCol') sortCol: string = 'productId',
        @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING): Promise<Page<productDto>> {
        try {
            const pageRequest: PageRequest = PageRequest.from(pageNumber, pageSize, sortCol, sortDir);
            return this.productService.getAllByPage(pageRequest);
        } catch (error) {
            this._logger.error(error);
        }
    }

    @Post()
    async createPost(@Body() dto: productDto) {
        const data = await this.productService.createOne(dto);
        return { message: 'Product created successfully', data };
    }

    @Delete(':productId')
    async deleteOne(@Param('productId') productId: number) {
        let data;

        data = await this.productService.deleteOne(productId);

        return { message: 'Product deleted', data };
    }
}
