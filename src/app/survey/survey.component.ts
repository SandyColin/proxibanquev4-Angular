import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { Opinion } from '../Opinion';
import { Survey } from '../survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  private survey: Survey;
  private opinion: Opinion;
  constructor(private service: SurveyService) { }

  ngOnInit() {
  }

  validateNeg(myForm: NgForm) {

    this.service.create(this.opinion);

    myForm.resetForm(new Survey('', ''));
  }

  validatePos(myForm: NgForm) {

  }
  onAddNegative() {

  }

  onAddPositive() {

  }
}
