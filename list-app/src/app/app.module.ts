import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { CreateOrEditComponent } from './components/createoredit/createoredit.component';
import { ItemService } from './services/item/item.service';
import { ModalComponent } from './components/modal/modal.component';
import { SafePipe } from './pipes/safe.pipe';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

const routes: Routes = [
  { path: 'list', component: ListTableComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListTableComponent,
    CreateOrEditComponent,
    ModalComponent,
    SafePipe,
    SvgIconComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
  entryComponents: [CreateOrEditComponent, ConfirmComponent]
})
export class AppModule { }
