import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '../../models/item';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  uri = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(`${this.uri}/items`);
  }
  getItemById(id) {
    return this.http.get(`${this.uri}/items/${id}`);
  }

  addItem(item: Item) {
    return this.http.post(`${this.uri}/items/add`, item);
  }

  updateItem(item: Item) {
    return this.http.post(`${this.uri}/items/update/${item._id}`, item);
  }

  deleteItem(id) {
    return this.http.delete(`${this.uri}/items/delete/${id}`);
  }
}
