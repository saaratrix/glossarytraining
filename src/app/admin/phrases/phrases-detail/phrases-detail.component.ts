import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";

@Component({
  selector: 'app-admin-phrases-detail',
  templateUrl: './phrases-detail.component.html',
  styleUrls: ['./phrases-detail.component.less']
})
export class PhrasesDetailComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
