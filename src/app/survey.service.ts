import { Opinion } from './Opinion';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { Survey } from './survey';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from './../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  survey: Survey;
  wsUrlSurvey: string;
  wsUrlCustomer: string;
  wsUrlOpinion: string;
  opinions: Array<Opinion>;


  // private survey: Survey;
  // private surveys: Array<Survey>;

  constructor(private httpClient: HttpClient) {
    this.opinions = new Array();
    this.wsUrlSurvey = ENV.apiUrl + '/survey';
    this.wsUrlCustomer = ENV.apiUrl + '/customer';
    this.wsUrlOpinion = ENV.apiUrl + '/opinion';
  }



  public checkSurvey(): Observable<Survey> {
    return this.httpClient.get<Survey>(this.wsUrlSurvey);
  }

  public checkClient(): Observable<Customer> {
    return this.httpClient.get<Customer>(this.wsUrlCustomer);
  }

  public getSurvey(): Survey {
    return this.survey;
  }
  public create(opinion: Opinion) {
    const newOpinion = new Opinion(opinion.isPositive);
    // tslint:disable-next-line:max-line-length
    this.httpClient.post<Opinion>(this.wsUrlOpinion, newOpinion).subscribe((opinionfromJEE) =>
      this.opinions.push(new Opinion(opinionfromJEE.isPositive, opinionfromJEE.comment, opinionfromJEE.clientNumber)));
  }

  // public getAll(): Array<Survey> {
  //   this.httpClient.get(this.wsUrl).subscribe((list: Array<Survey>) => this.surveys.push(...list));
  //   return this.surveys;
  // }



  // public read(id: number): Survey {
  //   const index = this.getIndex(id);
  //   if (index >= 0) {
  //     return this.surveys[index];
  //   }
  // }

  // public update(survey: Survey) {
  //   const editSurvey = new Survey(survey.beginningDate, survey.provisionnalDate);
  //   this.httpClient.put<Survey>(this.wsUrl + `/${survey.id}`, editSurvey).subscribe((surveyFromJEE) => {
  //     const index = this.getIndex(survey.id);
  //     if (index >= 0) {
  //       // tslint:disable-next-line:max-line-length
  //       this.surveys.splice(index, 1, new Survey(surveyFromJEE.beginningDate, surveyFromJEE.provisionnalDate, surveyFromJEE.id, surveyFromJEE.endDate));
  //     }
  //   });
  // }

  // private getIndex(id: number): number {
  //   return this.surveys.findIndex(
  //     (survey) => survey.id === id
  //   );
  // }
}
