import { Module } from '@nestjs/common';
import { WebController } from './controllers/controllers.controller';
import { WebToDomainMapper } from './mappers/web-to-domain.service';
import { WebService } from './services/web.service';
import { DomainModule } from '../domain/domain.module';
import { DatasourceModule } from '../datasource/datasource.module';

@Module({
  imports: [DomainModule, DatasourceModule],
  controllers: [WebController],
  providers: [WebToDomainMapper, WebService],
})
export class WebModule {}
