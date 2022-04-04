import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoicesService } from 'src/invoices/invoices.service';
import { Repository } from 'typeorm';
import { invoiceDetailsDto } from './dtos/invoiceDetailsDto';
import { InvoiceDetails } from './entities/invoiceDetails.entity';

@Injectable()
export class InvoicesDetailsService {

    constructor(
        @InjectRepository(InvoiceDetails)
        private readonly invoiceDetailsRepository: Repository<InvoiceDetails>
    ) { }

    async getMany() {
        return await this.invoiceDetailsRepository.find();
    }

    async getById(id_invoice_detail: number) {
        const invoiceDetails = await this.invoiceDetailsRepository.findOne(id_invoice_detail)

        if (!invoiceDetails)
            throw new NotFoundException('Customer does not exist');
        return invoiceDetails;
    }

    async createOne(dto: invoiceDetailsDto) {
        // const invoiceDetails = this.invoiceDetailsRepository.create({ ...dto });
        //return await this.invoiceDetailsRepository.save(invoiceDetails);

        
    }
}
