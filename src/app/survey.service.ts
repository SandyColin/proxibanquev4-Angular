import { Opinion } from './Opinion';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { Survey } from './survey';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from './../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Webservice Angular permettant la liaison avec le back-end. Cette classe regroupe les services pour Customer, Survey et Opinion
@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  survey: Survey;
  wsUrlSurvey: string;
  wsUrlCustomer: string;
  wsUrlOpinion: string;




  constructor(private httpClient: HttpClient) {
    this.wsUrlSurvey = ENV.apiUrl + '/survey';
    this.wsUrlCustomer = ENV.apiUrl + '/customer';
    this.wsUrlOpinion = ENV.apiUrl + '/opinion';
  }


// Méthode permettant de vérifier si un sondage est actuellement en cours ou non grâce à une requête asynchrone
  public checkSurvey(): Observable<Survey> {
    return this.httpClient.get<Survey>(this.wsUrlSurvey).pipe(
      // Tap est un opérateur qui permet d'écouter les données
      // qui passent dans l'Observable et les utiliser.
      // La fonction ci-dessous écoute l'article récupéré et le stock
      // en attribut du service pour mémorisation.
      tap((survey) => this.survey = survey)
    );
  }
// Méthode permettant de vérifier si le clientNUmber correspond bien à un client en BDD grâce à une requête asynchrone
  public checkClient(clientNumber: string): Observable<Customer> {
    return this.httpClient.get<Customer>(this.wsUrlCustomer + `/${clientNumber}`);
  }
// Methode permettant de récuprer le sondage en cours
  public getSurvey(): Survey {
    return this.survey;
  }
  // Méthode permettant de créer un nouvel avis en BDD grace à une requete grâce à une requête asynchrone
  public create(opinion: Opinion): Observable<Opinion> {
    const newOpinion = new Opinion(opinion.isPositive, opinion.survey, opinion.comment, opinion.customer);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Opinion>(this.wsUrlOpinion, newOpinion);
  }
}
