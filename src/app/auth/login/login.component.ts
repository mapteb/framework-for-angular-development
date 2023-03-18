import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { AppDataStoreService } from '../../state-transitions-config/app-data-store.service';
import { AppData } from '../../state-transitions-config/app-data.model';
import { AppEvent } from '../../state-transitions-config/app-events.enum';
import { AppState } from '../../state-transitions-config/app-states.enum';
import { User } from '../user.model';
import { Observable } from 'rxjs';


/**
 * This Angular component loads the HOME view.
 * It extends the BaseComponent so it can delegate handling the events raised
 * on the HOME view. The BaseComponent in turn uses home.process.ts
 * to pre-fetch any data needed for this HomeComponent.
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-home',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent implements OnInit {

  errorMsg$: Observable<string>;

  constructor(protected override location: Location, protected override router: Router, 
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void {
    console.log(">> Loading login: ");
    // if (this.appDataStore.getCurrentState() === AppState.ERRORSTATE) {
    //   this.errorMsg$ = this.appDataStore.message$;
    // }
  }

  handleLoginEvent(loginId: string): void {
    const appData = new AppData();
    appData.user = new User(loginId, '', '', '');
    this.doTransition(this.appDataStore, AppEvent.login, AppState.LOGINVIEW, appData);
  }
}
