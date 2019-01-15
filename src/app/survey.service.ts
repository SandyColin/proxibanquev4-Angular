import { Opinion } from './Opinion';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { Survey } from './survey';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from './../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  survey: Survey;
  wsUrlSurvey: string;
  wsUrlCustomer: string;
  wsUrlOpinion: string;


  // private survey: Survey;
  // private surveys: Array<Survey>;

  constructor(private httpClient: HttpClient) {
    this.wsUrlSurvey = ENV.apiUrl + '/survey';
    this.wsUrlCustomer = ENV.apiUrl + '/customer';
    this.wsUrlOpinion = ENV.apiUrl + '/opinion';
  }



  public checkSurvey(): Observable<Survey> {
    return this.httpClient.get<Survey>(this.wsUrlSurvey).pipe(
      // Tap est un opérateur qui permet d'écouter les données
      // qui passent dans l'Observable et les utiliser.
      // La fonction ci-dessous écoute l'article récupéré et le stock
      // en attribut du service pour mémorisation.
      tap((survey) => this.survey = survey)
    );
  }

  public checkClient(clientNumber: string): Observable<Customer> {
    return this.httpClient.get<Customer>(this.wsUrlCustomer + `/${clientNumber}`);
  }

  public getSurvey(): Survey {
    return this.survey;
  }
  public create(opinion: Opinion): Observable<Opinion> {
    const newOpinion = new Opinion(opinion.isPositive, opinion.survey, opinion.comment, opinion.customer);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Opinion>(this.wsUrlOpinion, newOpinion);
  }
}
