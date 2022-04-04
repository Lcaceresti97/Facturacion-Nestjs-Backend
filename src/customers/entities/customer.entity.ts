import { Invoice } from "src/invoices/entities/envoice.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_customers')
export class Customer {

    @PrimaryGeneratedColumn({ name: 'id_customer' })
    customerId: number;

    @Column({ name: 'customer_name', type: 'varchar', length: 255, nullable: true })
    customerName!: string;

    @Column({ name: 'address', type: 'varchar', length: 255, nullable: true })
    customerAddress!: string;

    @Column({ name: 'phone', type: 'int', nullable: true })
    customerPhone!: number;

    @Column({ name: 'status', type: 'int', nullable: true })
    customerStatus!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => Invoice, invoice => invoice.customer)
    invoices: Invoice[];

}