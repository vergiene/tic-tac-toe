import { Module } from '@nestjs/common';
import { DomainService } from './services/services.service';
import { DatasourceModule } from '../datasource/datasource.module';

@Module({
  imports: [DatasourceModule],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
