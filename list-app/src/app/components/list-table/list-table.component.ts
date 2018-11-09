import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import * as octicons from 'octicons';

import { ItemService } from '../../services/item/item.service';
import { CreateOrEditComponent } from '../createoredit/createoredit.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Item, IItem } from '../../models/item';
import { ItemResponse } from '../../models/itemResponse';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {

  // Our array of items
  items: Item[] = [];

  dataTable: any;

  constructor(private itemService: ItemService,
     private modalService: NgbModal,
     private chRef: ChangeDetectorRef,
     private toastr: ToastrService) {}

  ngOnInit() {
    this.refreshData();
  }

  edit(item: Item) {
    const modalRef = this.modalService.open(CreateOrEditComponent, { centered: true });

    modalRef.componentInstance.editModel = item.clone();
    modalRef.componentInstance.refreshList.subscribe(($event) => {
      this.refreshData();
    });
  }

  delete(item: Item) {
    const confirmDeleteModalRef = this.modalService.open(ConfirmComponent, {centered: true});

    confirmDeleteModalRef.componentInstance.item = item.clone();
    confirmDeleteModalRef.result.then((result) => {
      this.itemService.deleteItem(item._id).subscribe(
        (response: ItemResponse) => {
          this.toastr.success('Item "' + response.item.name + '" updated succesfully.', 'Item updated!');
          this.refreshData();
        },
        (error: ItemResponse | any) => {
          if (error.item) {
            this.toastr.error('Item "' + error.item.name + '" could not be deleted.');
          } else {
            this.toastr.error('Item could not be deleted, unexpected error');
          }
        }
      );
    });
  }

  refreshData() {
    this.items = [];
    this.itemService.getItems()
    .subscribe((data: IItem[]) => {
      data.forEach(iitem => {
        this.items.push(new Item(iitem));
      });

      // You'll have to wait that changeDetection occurs and projects data into
      // the HTML template, you can ask Angular to that for you ;-)
      this.chRef.detectChanges();

      // Now you can use jQuery DataTables :
      const table: any = $('table');
      if (!(<any>$.fn).dataTable.isDataTable(table)) {
        this.dataTable = table.DataTable({
          'columns': [
            null,
            null,
            null,
            { 'orderable': false }
          ]
        });
      } else {
        this.dataTable.draw('full-hold');
      }
    });
  }

}
