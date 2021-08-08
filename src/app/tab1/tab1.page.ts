import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  information: any[];
  startEnd = this.getFirstDayOfWeek();

  constructor(private http: HttpClient) {
    const localData = this.http.get('assets/information.json');
    localData.subscribe((data) => {
      this.information = data["items"];
    });
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].open;
  }

  getFirstDayOfWeek()
  {
    const startDate = new Date();
    let diff = startDate.getDate() - startDate.getDay();;
    startDate.setDate(diff);

    const endDate = new Date();
    diff = startDate.getDate() + 6;
    endDate.setDate(diff);

    return [startDate, endDate];
  }

}

