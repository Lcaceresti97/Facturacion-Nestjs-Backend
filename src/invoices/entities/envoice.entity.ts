import { Customer } from "src/customers/entities/customer.entity";
import { InvoiceDetails } from "src/invoices-details/entities/invoiceDetails.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_invoice')
export class Invoice {

  @PrimaryGeneratedColumn({ name: 'id_invoice' })
  invoiceId: number;

  @Column({ name: 'invoice_code', type: 'varchar', length: 255, nullable: true })
  invoiceCode!: string;

  @Column({ name: 'status', type: 'int', nullable: true })
  invoiceStatus!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Customer, customer => customer.invoices, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'id_customer' })
  customer: Customer;

  @OneToMany(() => InvoiceDetails, InvoiceDetails => InvoiceDetails.id_invoice)
  InvoiceDetails: InvoiceDetails[];
}