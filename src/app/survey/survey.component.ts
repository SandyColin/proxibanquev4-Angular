import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { Opinion } from '../Opinion';
import { Survey } from '../survey';
import { Customer } from '../customer';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  public number: Number;
  public isPositive: Boolean;
  public survey: Survey;
  public opinion: Opinion;
  public customer: Customer;
  public isOK: Boolean;
  public calculJours: Number;

  constructor(private service: SurveyService) {
    this.number = 1;
    this.opinion = new Opinion(null, null);
    this.customer = new Customer(undefined);
  }

  ngOnInit() {
    this.survey = this.service.getSurvey();

  }

  validateNeg(myForm: NgForm) {
    this.opinion.survey = this.survey;
    this.service.create(this.opinion).subscribe(() => {
      console.log('Avis négatif, crée avec succès dans BDD !');
    });
    myForm.resetForm(new Opinion(null, null));
  }

  validatePos(myForm: NgForm) {
    this.opinion.survey = this.survey;
    this.service.checkClient(this.customer.clientNumber).subscribe((customer) => {
      this.opinion.customer = customer;
      this.service.create(this.opinion).subscribe(() => {
        console.log('Avis positif, créé avec succès sur BDD !');
      });
      this.getDays();
    });

    myForm.resetForm(new Opinion(null, null));
  }
  onAddNegative() {
    this.number = 3;
    this.opinion.isPositive = false;
  }

  onAddPositive() {
    this.number = 2;
    this.opinion.isPositive = true;
  }

  onNumberValidated() {
    this.isOK = true;
  }
  getDays(): Number {
    console.log(this.survey);
    const date = new Date (this.survey.provisionalDate[0], this.survey.provisionalDate[1], this.survey.provisionalDate[2]);
    console.log(date.getTime());
    const reste = date.getTime() - Date.now();
    const calculJours = Math.ceil(reste / (1000 * 60 * 60 * 24));
    const calculDateNow = Math.ceil(Date.now() / (1000 * 60 * 60 * 24));
    console.log(calculDateNow);
    console.log(calculJours);
    return calculJours;

  }
}
