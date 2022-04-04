import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { QueryBuilder, Repository } from 'typeorm';
import { invoiceDto } from './dtos/invoiceDto';
import { Invoice } from './entities/envoice.entity';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoicesService {

    constructor(

        private readonly invoiceRepository: InvoiceRepository,
    ) { }

    async getMany(pageOptionsDto: PageOptionsDto,): Promise<PageDto<invoiceDto>> {
        const queryBuilder = this.invoiceRepository.createQueryBuilder('t_invoice')
            .innerJoinAndSelect("t_invoice.InvoiceDetails", "invoicesDetails")
            .innerJoinAndSelect("invoicesDetails.product", "products");

        queryBuilder
            .orderBy('t_invoice.createdAt', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }

    async getById(invoiceId: number) {
        const invoice = this.invoiceRepository.createQueryBuilder("invoice")
            .innerJoinAndSelect("invoice.InvoiceDetails", "invoicesDetails")
            .innerJoinAndSelect("invoicesDetails.product", "products")
            .where("invoice.invoiceId = :invoiceId", { invoiceId: invoiceId })
            .getOne();

        if (!invoice)
            throw new NotFoundException('Invoice does not exist');
        return invoice;
    }

    public async getInvoiceByDate(pageOptionsDto: PageOptionsDto, after: string, before: string): Promise<PageDto<invoiceDto>> {

        const queryBuilder = this.invoiceRepository.createQueryBuilder('invoices')
            .innerJoinAndSelect("invoices.InvoiceDetails", "invoicesDetails")
            .innerJoinAndSelect("invoicesDetails.product", "products");

        queryBuilder.andWhere('invoices.createdAt >= :entre', { entre: after })
            .andWhere('invoices.createdAt >= :antes', { antes: before })
            .orderBy("invoices.invoiceCode", pageOptionsDto.order)

            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);


    }

    async createOne(dto: invoiceDto) {
        const invoice = this.invoiceRepository.create({ ...dto });
        return await this.invoiceRepository.save(invoice);
    }

    async deleteOne(invoiceId: number) {
        const invoice = await this.getById(invoiceId);
        return await this.invoiceRepository.remove(invoice);
    }


}
