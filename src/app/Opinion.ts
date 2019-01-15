export class Opinion {
    id: number;
    isPositive: Boolean;
    comment: string;


    constructor(isPositive: Boolean, comment?: string, id?: number) {
        this.isPositive = isPositive;
        this.comment = comment;
        this.id = id;

    }