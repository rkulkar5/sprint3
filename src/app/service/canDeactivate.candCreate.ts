import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CandidateCreateComponent } from './../components/candidate-create/candidate-create.component';
import { Observable } from 'rxjs';

@Injectable()
export class DeactivateGuard implements CanDeactivate<CandidateCreateComponent>
{
    component: Object;
    route: ActivatedRouteSnapshot;

    constructor(){
    }

    canDeactivate(component: CandidateCreateComponent, 
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot,
                  nextState: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean{
                      return component.canExit();
                  }
}
