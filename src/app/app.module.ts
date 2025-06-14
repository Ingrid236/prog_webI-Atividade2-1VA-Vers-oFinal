import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {NgOptimizedImage} from '@angular/common';

import { HomeComponentComponent } from './produto/home-component/home-component.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ProdutoFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatButton,
    MatDivider,
    NgOptimizedImage,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatFormField,
    MatLabel,
    MatSlideToggle,
    ReactiveFormsModule,
    MatInput,
    MatError,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
