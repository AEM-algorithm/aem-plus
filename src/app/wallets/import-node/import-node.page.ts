import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-node',
  templateUrl: './import-node.page.html',
  styleUrls: ['./import-node.page.scss'],
})
export class ImportNodePage implements OnInit {
  credentials = {
    description: '',
    port: '',
    curent_node: '',

  };
  error = false;
  messageError : any;
  constructor() { }

  ngOnInit() {
  }
  continue(){}
}
