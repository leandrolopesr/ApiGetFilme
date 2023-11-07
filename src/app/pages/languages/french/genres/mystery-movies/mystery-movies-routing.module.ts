import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysteryMoviesPage } from './mystery-movies.page';

const routes: Routes = [
  {
    path: '',
    component: MysteryMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysteryMoviesPageRoutingModule {}
