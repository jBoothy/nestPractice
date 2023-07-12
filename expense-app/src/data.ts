export enum ReportType {
    Income = 'income',
    Expense = 'expense'
}

interface Data {
    report: {
        id: string,
        source: string,
        amount: number,
        created_at: Date,
        updated_at: Date,
        type: ReportType
    }[]
}

export const data: Data = {
    report: [
        {
            id: 'uuid1',
            source: 'Salary',
            amount: 1000,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Income
        },
        {
            id: 'uuid2',
            source: 'Something',
            amount: 7550,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Income
        },
        {
            id: 'uuid3',
            source: 'Something else',
            amount: 2000,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Expense
        },
        {
            id: 'uuid4',
            source: 'Not Salary',
            amount: 25.20,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Expense
        }
    ]
}
