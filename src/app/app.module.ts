import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchComponent } from './search/search.component';
import { LogoComponent } from './logo/logo.component';
import { RepoInfoComponent } from './repo-info/repo-info.component';
import { HomeComponent } from './home/home.component';

const appRoutes = [
  { path: '', component: HomeComponent},
  { path: 'repo-info', component: RepoInfoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    PaginatorComponent,
    SearchComponent,
    LogoComponent,
    RepoInfoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
