import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cat.module';
@Module({
  imports: [CatsModule],
})
export class AppModule {}
