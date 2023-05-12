import { Injectable, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './reports.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  async createReport(title: string, content: string, userId: number) {
    const report = new Report();
    report.title = title;
    report.content = content;
    report.user = userId;
    return this.reportRepo.save(report);
  }

  async findAll() {
    return this.reportRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return this.reportRepo.findOne({ where: { id } });
  }

  async getReports(
    @Query('title') title?: string,
    @Query('userId') userId?: number,
    @Query('idGreaterThan') idGreaterThan?: number,
    @Query('idLessThan') idLessThan?: number,
  ): Promise<Report[]> {
    const queryBuilder = this.reportRepo.createQueryBuilder('report');

    if (title) {
      queryBuilder.andWhere('report.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (userId) {
      queryBuilder.andWhere('report.user = :userId', { userId });
    }

    if (idGreaterThan !== undefined) {
      queryBuilder.andWhere('report.id > :id', { id: idGreaterThan });
    }

    if (idLessThan !== undefined) {
      queryBuilder.andWhere('report.id < :id', { id: idLessThan });
    }

    return queryBuilder.getMany();
  }
}
