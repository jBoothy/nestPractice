import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpException } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) {}
  @HttpCode(200)
  @Get()
  getAllIncomeReports(@Param('type') type: string) {
    const reportType = type === 'income' ? ReportType.Income : ReportType.Expense;
    if (reportType === ReportType.Income) {
      return data.report.filter(report => report.type === reportType);
    }
  }

  @HttpCode(200)
  @Get(':id')
  getIncomeReportById(
    @Param('id') id: string,
    @Param('type') type: string
  ) {
    const reportType = type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getReportById(id, reportType);
  }

  @HttpCode(201)
  @Post()
  createIncomeReport(
    @Body() body: {
      source: string,
      amount: number
    },
    @Param('type') type: string
  ) {
    const reportType = type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.createReport(body, reportType);
  }

  @HttpCode(204)
  @Put(':id')
  updateIncomeReport(
    @Param('id') id: string,
    @Body() body: {
      source: string,
      amount: number,
      updated_at: Date
    }
  ){
    return this.appService.updateReport(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(
    @Param('id') id: string
  ){
    return this.appService.deleteReport(id);
  }
}
