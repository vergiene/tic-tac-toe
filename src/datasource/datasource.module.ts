import { Module } from '@nestjs/common';
import { GameRepository } from './repositories/repositories.service';
import { DomainToDatasourceMapper } from './mappers/domain-to-datasource.service';
import { GameStorage } from './storage/datasource.storage';

@Module({
  imports: [DatasourceModule],
  providers: [GameRepository, DomainToDatasourceMapper, GameStorage],
  exports: [GameRepository],
})
export class DatasourceModule {}
