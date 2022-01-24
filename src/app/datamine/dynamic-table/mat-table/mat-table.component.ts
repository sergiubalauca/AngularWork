import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { QuestionBase } from '../../dynamic-form/question-base';
import { QuestionService } from '../../dynamic-form/services/question.service';
import { ReadJsonService } from '../services/read-json.service';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit {
  tableDataSrc: any;
  tableCols: string[] = ['name', 'role', 'skillset'];

  questions$: Observable<QuestionBase<any>[]>;

  tableCols1: QuestionBase<any>[] = [];

  tableData: {}[] = [
    {
      name: 'Sergiu',
      role: 'dev',
      skillset: 'none'
    },
    {
      name: 'Test',
      role: 'dev',
      skillset: 'JS'
    }
  ];

  constructor(
    service: QuestionService,
    private readJsonService: ReadJsonService) {
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {
    this.readJsonService.fillTableData();

    this.questions$.subscribe(res => res.forEach((elem) => {
      //console.log(elem.key);
      //this.tableCols.push(elem.key);
      this.tableCols1.push(new QuestionBase({ key: elem.key }));

      this.tableDataSrc = new MatTableDataSource([...this.tableData, { name: elem.key, role: 'empty', skillset: 'no skill' }]);
    })
    );

    this.tableCols1.forEach((elem) => {
      this.tableCols.push(elem.key);
    });
  }
}
