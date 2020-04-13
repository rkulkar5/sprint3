import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateCreateComponent } from './components/candidate-create/candidate-create.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateEditComponent } from './components/candidate-edit/candidate-edit.component';
import { BandCreateComponent } from './components/band-create/band-create.component';
import { BandEditComponent } from './components/band-edit/band-edit.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { TestInstructionComponent } from './components/test-instruction/test-instruction.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { DatePipe } from '@angular/common'


@NgModule({
  declarations: [
    AppComponent,
    CandidateCreateComponent,
    CandidateListComponent,
    CandidateEditComponent,
    BandCreateComponent,
    BandEditComponent,
    TestInstructionComponent,
    QuizComponent,
    ResultPageComponent,
    LoginComponent,
    ChangePasswordComponent,
    ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
	  FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })

  ],
  providers: [ApiService, DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
