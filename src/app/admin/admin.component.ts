import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component'; 
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends BaseComponent {

  constructor(protected override location: Location, protected override router: Router, 
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void {
    console.log(">> Loading admin: ");
  }
}
