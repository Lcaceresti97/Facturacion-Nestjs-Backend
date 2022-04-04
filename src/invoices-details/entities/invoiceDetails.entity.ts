import { Invoice } from "src/invoices/entities/envoice.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_invoice_details')
export class InvoiceDetails {

    @PrimaryGeneratedColumn({ name: 'id_invoice_detail' })
    invoiceDetailId: number;

    @Column({ name: 'amount', type: 'int', nullable: true })
    invoiceDetailAmount!: number;

    @Column({ name: 'total_parcial', type: 'double', nullable: true })
    invoiceDetailTotalParcial!: number;

    @Column({ name: 'isv', type: 'double', nullable: true })
    invoiceDetailIsv!: number;

    @Column({ name: 'discount', type: 'double', nullable: true })
    invoiceDetailDiscount!: number;

    @Column({ name: 'total', type: 'double', nullable: true })
    invoiceDetailTotal!: number;

    @Column({ name: 'status', type: 'int', nullable: true })
    invoiceDetailStatus!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => Invoice, invoce => invoce.InvoiceDetails,
        { eager: true },
    )
    @JoinColumn({ name: 'id_invoice' })
    id_invoice: Invoice;

    @ManyToOne(() => Product, product => product.invoiceDetails, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'id_product' })
    product: Product;

}