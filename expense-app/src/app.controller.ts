import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports(
    @Param('type') type: string
  ) {
    const reportType = type === 'income' ? 'income' : 'expense';
    return data.report.filter(report => {
      return report.type === reportType;
    });
  }

  @Get(':id')
  getIncomeReportById(
    @Param('id') id: string,
    @Param('type') type: string
  ) {
    const reportType = type === 'income' ? ReportType.Income : ReportType.Expense;
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createIncomeReport(
    @Body() body: {
      source: string,
      amount: number
    },
    @Param('type') type: string
  ) {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.Income : ReportType.Expense
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateIncomeReport(
    @Param('id') id: string,
    @Body() body: {
      source: string,
      amount: number
    }
  ){
    const report = data.report.find(report => report.id === id);
    report.source = body.source;
    report.amount = body.amount;
    report.updated_at = new Date();
    return 'Income report updated';
  }

  @Delete(':id')
  deleteIncomeReport(
    @Param('id') id: string
  ){
    const reportIndex = data.report.findIndex(report => report.id === id);
    data.report.splice(reportIndex, 1);
    return 'Income report deleted';
  }
}
