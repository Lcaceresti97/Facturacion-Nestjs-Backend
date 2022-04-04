import { InvoiceDetails } from "src/invoices-details/entities/invoiceDetails.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_products')
export class Product {

    @PrimaryGeneratedColumn({ name: 'id_product' })
    productId: number;

    @Column({ name: 'product_name', type: 'varchar', length: 255, nullable: true })
    productName!: string;

    @Column({ name: 'price', type: 'double', nullable: true })
    productPrice!: number;

    @Column({ name: 'stock', type: 'int', nullable: true })
    productStock!: number;

    @Column({ name: 'status', type: 'int', nullable: true })
    productStatus!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => InvoiceDetails, InvoiceDetails => InvoiceDetails.product)
    invoiceDetails: InvoiceDetails[];
}