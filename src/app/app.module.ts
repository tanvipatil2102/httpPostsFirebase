import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PostsDashboardComponent } from './shared/components/posts-dashboard/posts-dashboard.component';
import { PostsDetailsComponent } from './shared/components/posts-details/posts-details.component';
import { PostsFormComponent } from './shared/components/posts-form/posts-form.component';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BackBtnComponent } from './shared/components/back-btn/back-btn.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PostsDashboardComponent,
    PostsDetailsComponent,
    PostsFormComponent,
    GetConfirmComponent,
    PageNotFoundComponent,
    NavbarComponent,
    BackBtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
