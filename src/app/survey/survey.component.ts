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

  customer: Customer;
  public isPositive: Boolean;
  public survey: Survey;
  public opinion: Opinion;
  constructor(private service: SurveyService) { }

  ngOnInit() {
    this.survey = this.service.getSurvey();
  }

  validateNeg(myForm: NgForm) {

    this.service.create(this.opinion);
    myForm.resetForm(new Opinion(null, null));
  }

  validatePos(myForm: NgForm) {
    this.service.create(this.opinion);
    myForm.resetForm(new Opinion(null, null));
  }
  onAddNegative() {
    this.isPositive = false;
  }

  onAddPositive() {
    this.isPositive = true;
  }
}
