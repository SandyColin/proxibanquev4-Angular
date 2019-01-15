export class Customer {
    id: number;
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
    clientNumber: string;


    constructor(clientNumber: string, id?: number) {
        this.clientNumber = clientNumber;
        this.id = id;

    }