import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NameDrawComponent} from './name-draw/name-draw.component';


const routes: Routes = [
  {
    path: '',
    component: NameDrawComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
