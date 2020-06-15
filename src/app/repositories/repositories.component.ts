import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.less']
})
export class RepositoriesComponent implements OnInit {

  public users: object[];
  public inputRequest: string = sessionStorage.getItem('key') === null? 'stars%3A%3E0':sessionStorage.getItem('key');
  public page: string = sessionStorage.getItem('page') || '1';
  public date: string[];

  constructor(private operationsService: OperationsService, private http: HttpClient) { }

  public todoRequest() {
    this.operationsService.getRepositories(this.inputRequest, this.page)
        .subscribe(
          (data: JSON) => {
            this.users=data["items"]; 
            this.date = this.users.map(
              (value) => {
              let date = new Date(value["updated_at"]);  
              return `${date.getDate()<10?'0'+(date.getDate()):date.getDate()} -
                      ${date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1} -
                      ${date.getFullYear()}`
              }
            );
          },
          () => { alert(`API Github ограничивает отправку запросов: не более 10 в минуту. 
          https://developer.github.com/v3/search/#search-repositories`)} 
        )
  }

  public newRequest() {
    this.operationsService.inputRequest
        .subscribe((data: string) => {
          this.inputRequest = data; 
          this.page = '1';
          this.todoRequest();  
        });  
  }

  public changePage() {
    this.operationsService.page
        .subscribe((data: string) => {
          this.page = data; 
          this.todoRequest();
        });  
  }

  ngOnInit(): void {
    this.todoRequest();
    this.newRequest();
    this.changePage();
  }

}
