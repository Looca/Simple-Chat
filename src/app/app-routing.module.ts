import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
import { InsertUserComponent } from './insert-user/insert-user.component';


const routes: Routes = [
  { path: '', component: InsertUserComponent },
  { path: 'chat', component: ChatInboxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
