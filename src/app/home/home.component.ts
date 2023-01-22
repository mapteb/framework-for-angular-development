import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';

/**
 * This Angular component loads the HOME view.
 * It extends the BaseComponent so it can delegate handling the events raised
 * on the HOME view. The BaseComponent in turn uses home.process.ts
 * to pre-fetch any data needed for this HomeComponent.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(protected override location: Location, protected override router: Router, 
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void { }
}
