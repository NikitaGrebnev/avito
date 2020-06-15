import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface RepoData {
  name: string;
  starsAmount: string;
  lastCommit: string;
  picture: string;
  login: string; 
  loginUrl: string; 
  progLang: string; 
  description: string; 
  contributorsUrl: string;
};

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.less']
})

export class RepoInfoComponent implements OnInit {

  public repoData: RepoData;
  public contributorsUrl: string;
  public users: Array<any>;
  public date: any;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient) {
      this.route.queryParams.subscribe((params: RepoData) => {
      this.repoData = params;
      this.contributorsUrl = params.contributorsUrl;
      this.date = new Date(params.lastCommit);
    });
  }

  public returnDate(date) {
    return this.date = `${date.getDate()<10?'0'+(date.getDate()):date.getDate()}.${date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1}.${date.getFullYear()}
                      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  public getRepoData() {
    this.http.get(this.contributorsUrl).subscribe((data: Array<any>) => {
      this.users=data.splice(0,10);
    });  
  }

  ngOnInit(): void {
    this.getRepoData();  
    this.returnDate(this.date);
  }
}
