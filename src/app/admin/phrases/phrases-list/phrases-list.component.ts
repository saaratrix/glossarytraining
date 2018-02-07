import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";

@Component({
  selector: 'app-admin-phrases-list',
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.less']
})
export class PhrasesListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
