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

  ngOnInit() {
    // this.service.checkSurvey().subscribe((survey) => {
      this.isActive = true;
    //   if (survey) {
    //     this.isActive = true;
    //   } else {
    //     this.isActive = false;
    //   }
    // });
  }




}
