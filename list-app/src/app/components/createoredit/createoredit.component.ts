import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Item } from '../../models/item';
import { ItemResponse } from '../../models/itemResponse';
import { ItemService } from '../../services/item/item.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-createoredit',
  templateUrl: './createoredit.component.html',
  styleUrls: ['./createoredit.component.scss']
})
export class CreateOrEditComponent implements OnInit {

  @ViewChild('modal')
  private modalComponent: ModalComponent;

  @Input() editModel: Item = null;
  @Output() refreshList = new EventEmitter<boolean>();

  constructor(private itemService: ItemService, private toastr: ToastrService) {}

  model = new Item();

  submitted = false;
  editMode = false;

  onSubmit() {
     this.submitted = true;
     if (!this.editMode) {
      this.itemService.addItem(this.model).subscribe(
        (result: ItemResponse) => {
          this.toastr.success('Item "' + result.item.name + '" saved succesfully.', 'Item saved!');
          this.refreshList.emit(true);
        },
        (error: ItemResponse) => {
          this.toastr.error('Item "' + error.item.name + '" failed to save.');
        }
      );
     } else {
      this.itemService.updateItem(this.model).subscribe(
        (result: ItemResponse) => {
          this.toastr.success('Item "' + result.item.name + '" updated succesfully.', 'Item updated!');
          this.refreshList.emit(true);
        },
        (error: ItemResponse | any) => {
          if (error.item) {
            this.toastr.error('Item "' + error.item.name + '" failed to save.');
          } else {
            this.toastr.error('Item failed to save, unexpected error');
          }
        }
      );
     }
     this.close();
   }

   close() {
     this.modalComponent.close();
   }

  ngOnInit() {
    if (this.editModel) {
      this.editMode = true;
      this.model = this.editModel.clone();
    }
  }

  addKeyword(value: string) {
    this.model.keywords.push(value);
  }

  removeKeyword(keyword: string) {
    const index = this.model.keywords.indexOf(keyword);
    this.model.keywords.splice(index, 1);
  }
}
