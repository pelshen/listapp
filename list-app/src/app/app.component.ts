import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditComponent } from './components/createoredit/createoredit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'list-app';

  constructor(private modalService: NgbModal) {}

  openCreateModal() {
    this.modalService.open(CreateOrEditComponent, { centered: true });
  }
}
