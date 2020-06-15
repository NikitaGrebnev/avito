import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  public onSubmit(request){
    this.operationsService.getInputRequest(request.value);
    this.operationsService.getIsRefreshed();
    request.value = ""; 
    request.blur();
  }
  
  constructor(private operationsService: OperationsService) { }

  ngOnInit(): void {
    
  }

}
