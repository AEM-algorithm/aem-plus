import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-send-request-multisig',
  templateUrl: './send-request-multisig.page.html',
  styleUrls: ['./send-request-multisig.page.scss'],
})
export class SendRequestMultisigPage implements OnInit {
  address:any;
  constructor(   
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.address = params.get('id')
    })
  }

  send(){
    this.router.navigate(['/tabnav','wallets', 'add-signer', this.address], { relativeTo: this.route });
  } 

}
