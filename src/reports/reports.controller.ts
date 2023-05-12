import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateReportDto } from './reports.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/create')
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.createReport(
      body.title,
      body.content,
      body.userId,
    );
  }

  //   @Get()
  //   findAll() {
  //     return this.reportsService.findAll();
  //   }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.reportsService.findOne(+id);
  }

  @Get()
  async getReports(
    @Query('title') title?: string,
    @Query('userId') userId?: number,
    @Query('idGreaterThan') idGreaterThan?: number,
    @Query('idLessThan') idLessThan?: number,
  ) {
    return this.reportsService.getReports(
      title,
      userId,
      idGreaterThan,
      idLessThan,
    );
  }
}
