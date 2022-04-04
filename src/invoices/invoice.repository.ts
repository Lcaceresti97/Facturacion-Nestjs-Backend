import { EntityRepository, Repository } from "typeorm";
import { Invoice } from "./entities/envoice.entity";


@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {}