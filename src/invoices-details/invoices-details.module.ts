import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetails } from './entities/invoiceDetails.entity';
import { InvoicesDetailsController } from './invoices-details.controller';
import { InvoicesDetailsService } from './invoices-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetails])],
  controllers: [InvoicesDetailsController],
  providers: [InvoicesDetailsService]
})
export class InvoicesDetailsModule {}
