import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data'
import { v4 as uuid } from 'uuid';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    let reportType = type === 'income' ? ReportType.Income : ReportType.Expense;
    return reportType;
  }

  getReportById(id: string, type: ReportType) {
    return data.report
      .filter(report => report.type === type)
      .find(report => report.id === id);
  }

  createReport(body: {
    source: string,
    amount: number
  }, type: ReportType) {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(id: string, body: {
    source: string,
    amount: number,
    updated_at: Date
  }) {
    const report = data.report.find(report => report.id === id);
    if (!report) {
      throw new HttpException('Report not found', 404);
    }
    report.source = body.source;
    report.amount = body.amount;
    report.updated_at = new Date();
    return report;
  }

  deleteReport(id: string) {
    const report = data.report.find(report => report.id === id);
    if (!report) {
      throw new HttpException('Report not found', 404);
    }
    data.report = data.report.filter(report => report.id !== id);
    return report;
  }

}