import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { customerDto } from './dtos/customerDto';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { PageRequest } from 'src/common/pagination/page-request.model';
import { Page } from 'src/common/pagination/page.model';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }

    public async getAllByPage(pageRequest: PageRequest): Promise<Page<Customer>> {
        const sort: { [key: string]: string } = pageRequest.sort.asKeyValue();
        const result = await this.customerRepository.findAndCount({
            order: sort,
            skip: ((pageRequest.page - 1) * pageRequest.size),
            take: pageRequest.size
        });
        return Page.from(result[0], result[1], pageRequest);
    }

    async getById(customerId: number) {

        const customer: Customer = await this.customerRepository.createQueryBuilder("customer")
            .innerJoinAndSelect("customer.invoices", "invoices")
            .where("customer.customerId = :customerId", { customerId: customerId })
            .getOne();

        if (!customer)
            throw new NotFoundException('Customer does not exist');
        return await customer;
    }

    async createOne(dto: customerDto) {
        const customer: Customer = await this.customerRepository.create({ ...dto });
        return await this.customerRepository.save(customer);
    }

    async deleteOne(customerId: number) {
        const customer: Customer = await this.getById(customerId);
        return await this.customerRepository.remove(customer);
    }
}
