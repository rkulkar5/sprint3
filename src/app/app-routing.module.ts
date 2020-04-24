import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateCreateComponent } from './components/candidate-create/candidate-create.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateEditComponent } from './components/candidate-edit/candidate-edit.component';
import { BandCreateComponent } from './components/band-create/band-create.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { ChangePasswordComponent } from  './components/change-password/change-password.component';
import { TestInstructionComponent } from './components/test-instruction/test-instruction.component';
import {LoginComponent } from './components/login/login.component'
import { BandEditComponent } from './components/band-edit/band-edit.component';
import { AdminhomepageComponent } from './components/adminhomepage/adminhomepage.component';
import { QuestionsAddComponent } from './components/questions-add/questions-add.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login-component' },
  //{ path: '', component: CandidateCreateComponent, canActivate: [AuthGuard] },
  { path: 'create-band', component: BandCreateComponent },
  { path: 'take-quiz', component: QuizComponent },
  { path: 'result-page', component: ResultPageComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'quizInstructions', component: TestInstructionComponent },  
  { path: 'edit-band/:id', component: BandEditComponent },
  { path: 'create-candidate', component: CandidateCreateComponent },
  { path: 'edit-candidate/:id/:user_id', component: CandidateEditComponent },
  { path: 'candidates-list', component: CandidateListComponent },
  { path: 'login-component', component: LoginComponent },
    { path: 'adminhomepage', component: AdminhomepageComponent },
    {path: 'manage-questionbank', component:QuestionsAddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
