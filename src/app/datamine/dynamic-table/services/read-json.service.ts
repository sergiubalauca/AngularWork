import { Injectable } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import config from '../../json-files/fusion_mobile_config.json';

@Injectable({
  providedIn: 'root'
})
export class ReadJsonService {
  public jsonData: {}[] = config;
  constructor() { }

  private fillTables$(): Observable<any> {
    // console.log('JSON data: ' + JSON.stringify(this.countryList['FusionConfigHeader']));
    // console.log('JSON data: ' + JSON.stringify(this.countryList['FusionDataTables'][0]));
    // console.log('TABLES: ' + JSON.stringify(this.jsonData['FusionDataTables']));
    // console.log(this.jsonData.map(x => x[0][0]['table_name']));
    return of(this.jsonData).pipe(map((x) => x['FusionDataTables']));
  }

  private fillCols$(data: any): Observable<any> {
    // console.log('COLUMNS: ' + JSON.stringify(this.jsonData['FusionDataColumns'][0]));
    const tables: string[][] = [];

    // keys = Object.keys(data);

    for (let i = 1; i < data.length; i++) {
      // console.log('tableData: ' + Object.keys(data[i]));
      tables.push(Object.keys(data[i]));
    }

    // console.log('tableData: ' + JSON.stringify(data[0][keys[0]]));
    console.log('Tables: ' + tables);
    return of(this.jsonData).pipe(map((x) => x['FusionDataColumns']));
  }

  public fillTableData() {
    this.fillTables$().pipe(
      switchMap(tab => this.fillCols$(tab))
    ).subscribe(res => {
      console.log(res);
    });

    // this.fillTables$().subscribe(res => console.log(res));
    // this.fillCols$().subscribe(res => console.log(res));
  }
}
