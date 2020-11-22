import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewEntryComponent } from './new-entry/new-entry.component';


const routes: Routes = [
  {path:'NewEntry',component:NewEntryComponent},
  {path:'Home',component:HomeComponent},
 
  {path:'',redirectTo:'/Home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

