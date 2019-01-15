export class Survey {
    id: number;
    startingDate: Date;
    provisionalDate: Date;
    endDate: Date;

    constructor(startingDate: Date, provisionalDate: Date, id?: number, endDate?: Date) {
        this.startingDate = startingDate;
        this.provisionalDate = provisionalDate;
        this.id = id;
        this.endDate = endDate;
    }
}
