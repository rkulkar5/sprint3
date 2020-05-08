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
import { LoginComponent } from './components/login/login.component'
import { BandEditComponent } from './components/band-edit/band-edit.component';
import { AdminhomepageComponent } from './components/adminhomepage/adminhomepage.component';
import { QuestionsAddComponent } from './components/questions-add/questions-add.component';
import { TestConfigAddComponent } from './components/test-config-add/test-config-add.component';
import { TestConfigEditComponent } from './components/test-config-edit/test-config-edit.component'
import { DeactivateGuard } from './service/canDeactivate.candCreate';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login-component' },
  { path: 'create-band', component: BandCreateComponent },
  { path: 'take-quiz', component: QuizComponent },
  { path: 'result-page', component: ResultPageComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'quizInstructions', component: TestInstructionComponent },  
  { path: 'edit-band/:id', component: BandEditComponent },
  { path: 'create-candidate', component: CandidateCreateComponent, canDeactivate:[DeactivateGuard] },
  { path: 'edit-candidate/:id/:user_id', component: CandidateEditComponent, canDeactivate:[DeactivateGuard] },
  { path: 'candidates-list', component: CandidateListComponent },
  { path: 'login-component', component: LoginComponent },
  { path: 'adminhomepage', component: AdminhomepageComponent },
  { path: 'manage-questionbank', component:QuestionsAddComponent},
  { path: 'testconfig-add', component:TestConfigAddComponent},
  { path: 'testconfig-edit/:id', component:TestConfigEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [DeactivateGuard]
})

export class AppRoutingModule { }
