import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWeatherComponent } from './main-weather/main-weather.component';

const routes: Routes = [

  {path: '', component: MainWeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
