import { Survey } from './survey';
import { Customer } from './customer';

export class Opinion {
    survey: Survey;
    isPositive: Boolean;
    comment: string;
    customer: Customer;


    constructor(isPositive: Boolean, survey: Survey, comment?: string, customer?: Customer) {
        this.isPositive = isPositive;
        this.comment = comment;
        this.survey = survey;
        this.customer = customer;

    }
}
