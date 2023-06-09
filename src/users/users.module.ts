import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ReportsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
