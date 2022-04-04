import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesDetailsModule } from './invoices-details/invoices-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Cargo@2021',
      database: 'db_facturacion_node',
      entities: [__dirname + './*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomersModule,
    ProductsModule,
    InvoicesModule,
    InvoicesDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
