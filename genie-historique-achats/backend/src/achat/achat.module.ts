import { Module } from '@nestjs/common';
import { AchatsController } from './achat.controller';
import { AchatsService } from './achat.service';

@Module({
  controllers: [AchatsController],
  providers: [AchatsService]
})
export class AchatModule {}
