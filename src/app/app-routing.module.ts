import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinUsComponent } from './join-us/join-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


const routes: Routes = [
  {path: 'join-us', component: JoinUsComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: '', component: HomepageComponent},
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
