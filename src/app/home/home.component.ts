import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
  
export class HomeComponent implements OnInit {

  public request = sessionStorage.getItem("key") === null? "популярности": (function(){
    return sessionStorage.getItem("key") === 'stars%3A%3E0'? "популярности": `запросу "${sessionStorage.getItem("key")}"`
  })();

  constructor(private operationsService: OperationsService) { }

  public changeHeader() {
    this.operationsService.inputRequest
        .subscribe((data: string) => {
      this.request = data === "stars%3A%3E0"? 'популярности':`запросу "${data}"`;  
    });  
  }

  ngOnInit(): void {
    this.changeHeader();
  }

}
