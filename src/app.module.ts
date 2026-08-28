import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebModule } from './web/web.module';
import { DomainModule } from './domain/domain.module';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
  imports: [WebModule, DomainModule, DatasourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
