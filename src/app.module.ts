import { Module } from '@nestjs/common';
import { ConnectionModule } from './db/connection.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ConnectionModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
