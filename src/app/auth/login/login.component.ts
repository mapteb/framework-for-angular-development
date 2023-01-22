import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { AppDataStoreService } from 'src/app/state-transitions-config/app-data-store.service';
import { AppData } from 'src/app/state-transitions-config/app-data.model';
import { AppEvent } from 'src/app/state-transitions-config/app-events.enum';
import { AppState } from 'src/app/state-transitions-config/app-states.enum';
import { User } from '../user.model';


/**
 * This Angular component loads the HOME view.
 * It extends the BaseComponent so it can delegate handling the events raised
 * on the HOME view. The BaseComponent in turn uses home.process.ts
 * to pre-fetch any data needed for this HomeComponent.
 */
@Component({
  selector: 'app-home',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(protected override location: Location, protected override router: Router, 
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void { }

  handleLoginEvent(loginId: string): void {
    const appData = new AppData();
    appData.user = new User(loginId, '', '', '');
    this.doTransition(this.appDataStore, AppEvent.login, AppState.LOGINVIEW, appData);
  }
}
