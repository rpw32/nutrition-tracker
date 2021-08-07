import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  information: any[];
  startEnd = this.getFirstDayOfWeek();

  constructor(public datepipe: DatePipe, private http: HttpClient) {
    this.http.get('assets/information.json').subscribe((data) => {
      this.information = data['items'];
    });
  }


  getFirstDayOfWeek()
  {
    const startDate = new Date();
    let diff = startDate.getDate() - startDate.getDay();;
    startDate.setDate(diff);

    const endDate = new Date();
    diff = startDate.getDate() + 6;
    endDate.setDate(diff);

    console.log(this.information);

    return [startDate, endDate];
  }

}
