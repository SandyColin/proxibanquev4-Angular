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
  public number2: Number;

  constructor(private service: SurveyService) {
    this.number = 1;
    this.opinion = new Opinion(null, null);
    this.customer = new Customer(undefined);
    this.number2 = 0;
  }
  // Méthode qui est appelé au moment de la connexion à Angular lorsqu'un sondage est en cours
  // Pour savoir quel sondage est actuellement en cours
  ngOnInit() {
    this.survey = this.service.getSurvey();

  }
  // Méthode permettant de valider le formulaire lors d'un avis négatif et de créer un objet Opinion (avec facultativement un commentaire)
  validateNeg(myForm: NgForm) {
    this.opinion.survey = this.survey;
    this.service.create(this.opinion).subscribe(() => {
      console.log('Avis négatif, crée avec succès dans BDD !');
    });
    myForm.resetForm(new Opinion(null, null));
  }
  // Méthode permettant de valider le formulaire lors d'un avis positif et de créer un objet Opinion (avec facultativement un numéroClient)
  validatePos(myForm: NgForm) {
    if (this.customer.clientNumber === null) {

    } else {
      this.opinion.survey = this.survey;
      this.service.checkClient(this.customer.clientNumber).subscribe((customer) => {
        if (customer !== null) {
          this.opinion.customer = customer;
          this.service.create(this.opinion).subscribe(() => {
            console.log('Avis positif, créé avec succès sur BDD !');
          });
        } else {
          this.number2 = 3;
        }
      });
    }
    myForm.resetForm(new Opinion(null, null));
  }
  // Methode permettant d'afficher la template pour un avis négatif
  onAddNegative() {
    this.number = 3;
    this.opinion.isPositive = false;
  }
  // Methode permettant d'afficher la template pour un avis positif
  onAddPositive() {
    this.number = 2;
    this.opinion.isPositive = true;
  }
  // Methode permettant d'afficher la template de contact après la validation d'un avis positif
  // onNumberValidated() {
  //   this.isOK = true;
  // }

  // Methode permettant de calculer la difference de jour entre la date du jour et la date previsisonnelle de fin de sondage
  getDays() {
    const date = new Date(this.survey.provisionalDate[0], this.survey.provisionalDate[1] - 1, this.survey.provisionalDate[2]);
    const reste = date.getTime() - Date.now();
    this.calculJours = Math.ceil(reste / (1000 * 60 * 60 * 24));
    if (this.calculJours === 0) {
      this.number2 = 2;
    } else {
      this.number2 = 1;
    }
  }

  getThanks() {
    this.isOK = true;
  }
  
}

