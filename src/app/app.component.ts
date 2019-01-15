import { Component, OnInit } from '@angular/core';
import { SurveyService } from './survey.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  isActive: boolean;


  constructor(private service: SurveyService) {

  }
  // Méthode qui est appelée au moment de la connexion à Angular
  // Elle permet d'aller vérifier directement si un sondage est en cours ou non
  // Pour savoir quelle template afficher grâce à une requête asynchrone
  ngOnInit() {
    this.service.checkSurvey().subscribe((survey) => {

      if (survey) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });

  }




}
