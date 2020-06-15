import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {

  public users: JSON;

  constructor(private operationsService: OperationsService) { }

  public defaultRequest(){
    this.operationsService.getInputRequest("stars%3A%3E0");
    this.operationsService.getIsRefreshed();
  }

  ngOnInit(): void {
  }

} 