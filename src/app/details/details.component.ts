import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from "../housing.service";
import {HousingLocation} from "../housing-location";
//////////////////////////////ReactiveFormsModule: gives access to template features for forms
import {FormControl,FormGroup,ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
   <article>
     <img class="listing-photo" [src]="housingLocation?.photo" alt="housing location img">
     <section class="listing-description">
       <h2 class="listing-heading">{{housingLocation?.name}}</h2>
       <p class="listing-location">{{housingLocation?.city}},{{housingLocation?.state}}</p>
     </section>
     <section class="listing-features">
       <h2 class="section-heading">About this Location</h2>
       <ul>
         <li>Units available : {{housingLocation?.availableUnits}}</li>
         <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
         <li>Does this location have laundry : {{housingLocation?.laundry}}</li>
       </ul>
     </section>
     <section class="listing-apply">
       <h2 class="section-heading">Apply now to live here</h2>
       <button class ="primary" type="button">Apply now</button>
     </section>
   </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route:ActivatedRoute = inject(ActivatedRoute);
  housingService= inject(HousingService) ;
  housingLocation : HousingLocation | undefined;
  applyForm = new FormGroup({
    FirstName : new FormControl(''),
    LastName : new FormControl(''),
    email: new FormControl(''),
  });


  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId)
  }
}
