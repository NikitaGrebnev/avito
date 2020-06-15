import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  //paginator Funcs&Vars

  public pages: object[] = sessionStorage.getItem('pagesArray') === null?
  [
    {number: 1, isActive: true},
    {number: 2, isActive: false},
    {number: 3, isActive: false},
    {number: 4, isActive: false},
    {number: 5, isActive: false}
  ]: JSON.parse(sessionStorage.getItem('pagesArray'));

  public returnPages(): object[] {
    return this.pages
  }

  public refreshPaginator(): void {
    let length = this.pages.length;
      this.pages.splice(0, length);
      for (let i = 1; i <= length; i++) {
        this.pages.push({number: i, isActive: false});
      }
      this.pages[0]["isActive"] = true;
      sessionStorage.setItem('pagesArray', JSON.stringify(this.pages));
  }

  public gotoBegin(): void {
    this.refreshPaginator();
    this.pages.forEach((value, index) => {
      value["isActive"] = false;
    });
    this.pages[0]["isActive"] = true;
    this.getPage("1");
    sessionStorage.setItem('pagesArray', JSON.stringify(this.pages));
  }

  public changePaginator(page, i) {
    let paginatorMiddle = Math.floor(this.pages.length/2);
    this.getPage(page);
    this.pages.forEach((value, index) => {
      value["isActive"] = false;
      this.pages[index]["number"] = index + page - paginatorMiddle;
      if(this.pages[0]["number"] <= 1) {
        this.pages[index]["number"] = 1 + index;
      }
    })
    if(i >= paginatorMiddle + 1 || page >= paginatorMiddle + 1) {
      this.pages[paginatorMiddle]["isActive"] = true;
    } else {
      this.pages[i]["isActive"] = true;
    }
    sessionStorage.setItem('pagesArray', JSON.stringify(this.pages));
  }

  //Requests

  public inputRequest = new Subject();
  public page = new Subject();
  public isRefreshed = new Subject();

  public getInputRequest(data: string) {
    sessionStorage.setItem('key', data);
    sessionStorage.setItem('page', "1");
    this.inputRequest.next(data);
  }

  public getPage(data: string) {
    sessionStorage.setItem('page', data);
    this.page.next(data);
  }

  public getIsRefreshed() {
    this.isRefreshed.next();
  }

  public getRepositories(param, page) {
    return this.http
               .get(`https://api.github.com/search/repositories?q=${param}&sort=stars&order=desc&per_page=10&page=${page}`)
  }
}
