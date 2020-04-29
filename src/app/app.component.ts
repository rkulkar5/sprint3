import { Component, OnDestroy, HostListener} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'TECHNICAL ASSESSMENT TEST';
  subscription: Subscription;

  constructor(private router: Router) {
      //Get Browser Refresh buttton click
       this.subscription = router.events.subscribe((event) => {
           if (event instanceof NavigationStart) {
             browserRefresh = !router.navigated;
           }
       });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  //Disable Right Click on application
  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
      event.preventDefault();
  }
//Commented to allow paste in question tab
   //Disable Paste on application
//   @HostListener('paste', ['$event'])
//   blockPaste(e: KeyboardEvent) {
//       e.preventDefault();
//   }

  //Disable Copy on application
  @HostListener('copy', ['$event'])
  blockCopy(e: KeyboardEvent) {
      e.preventDefault();
  }

  //Disable Cut on application
  @HostListener('cut', ['$event'])
  blockCut(e: KeyboardEvent) {
      e.preventDefault();
  }

  //Confirm from user if they want to close the window
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
         $event.returnValue = "Please confirm before closing the browser";
  }

}
