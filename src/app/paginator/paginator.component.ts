import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service'

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.less']
})
export class PaginatorComponent implements OnInit {

  public pages: object[];
  public toBegin: boolean = false;

  constructor(private operationsService: OperationsService) { }

  public returnPages() {
    this.pages = this.operationsService.returnPages();
  }

  public refreshPaginator() {  
    this.operationsService.refreshPaginator()
  }

  
  public changePaginator(page, i) {
    this.operationsService.changePaginator(page, i);
    if(page > Math.floor(this.pages.length/2) + 1) {
      this.toBegin = true;
    } else {
      this.toBegin = false;
    }
  }

  public goToBegin() {
    this.toBegin = false;
    this.operationsService.gotoBegin();
  }

  public changeIsRefreshed() {
    this.operationsService.isRefreshed
        .subscribe(() => {
          this.refreshPaginator();
          this.toBegin = false;
        });
  }

  ngOnInit(): void {
    this.returnPages();
    this.changeIsRefreshed();
    if(this.pages[0]["number"]>1) {
      this.toBegin = true
    }
  }

}
