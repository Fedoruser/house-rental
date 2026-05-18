import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { HousesModule } from './houses/houses.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HousesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
