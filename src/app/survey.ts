export class Survey {
    id: number;
    beginningDate: Date;
    provisionnalDate: Date;
    endDate: Date;

    constructor(beginningDate: Date, provisionnalDate: Date, id?: number, endDate?: Date) {
        this.beginningDate = beginningDate;
        this.provisionnalDate = provisionnalDate;
        this.id = id;
        this.endDate = endDate;
    }
}
