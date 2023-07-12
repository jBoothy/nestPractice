import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { data, ReportType } from 'src/data';

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
    return data.report.filter((report) => 
      report.type === reportType)
        .find((report) => report.id === id);
  }

  @Post()
  createIncomeReport() {
    return 'Income report created';
  }

  @Put(':id')
  updateIncomeReport(){
    return 'Income report updated';
  }

  @Delete(':id')
  deleteIncomeReport(){
    return 'Income report deleted';
  }
}
