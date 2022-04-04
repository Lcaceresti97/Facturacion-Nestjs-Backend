import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageRequest } from 'src/common/pagination/page-request.model';
import { Page } from 'src/common/pagination/page.model';
import { Repository } from 'typeorm';
import { productDto } from './dtos/productDto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,) { }

    public async getAllByPage(pageRequest: PageRequest): Promise<Page<Product>> {
        const sort: { [key: string]: string } = pageRequest.sort.asKeyValue();
        const result = await this.productRepository.findAndCount({
            order: sort,
            skip: ((pageRequest.page - 1) * pageRequest.size),
            take: pageRequest.size
        });
        return Page.from(result[0], result[1], pageRequest);
    }

    async getById(productId: number) {
        const product = await this.productRepository.findOne(productId)

        if (!product)
            throw new NotFoundException('Product does not exis');
        return product;
    }

    async createOne(dto: productDto) {
        const product = this.productRepository.create({ ...dto });
        return await this.productRepository.save(product);

    }

    async deleteOne(productId: number) {
        const product = await this.getById(productId);
        return await this.productRepository.remove(product);
    }
}
