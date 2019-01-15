export class Opinion {
    id: number;
    isPositive: Boolean;
    comment: string;
    clientNumber: number;


    constructor(isPositive: Boolean, comment?: string, clientNumber?: number, id?: number) {
        this.isPositive = isPositive;
        this.comment = comment;
        this.id = id;
        this.clientNumber = clientNumber;

    }
}
