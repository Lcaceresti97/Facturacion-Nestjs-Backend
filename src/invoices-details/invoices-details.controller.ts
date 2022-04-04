import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice-Details-Apis')
@Controller('/api/v1/invoices-details')
export class InvoicesDetailsController {}
