import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ExportConfirmComponent } from './export-confirm/export-confirm.component';

@Component({
  selector: 'app-export-unlocked',
  templateUrl: './export-unlocked.component.html',
  styleUrls: ['./export-unlocked.component.scss'],
})
export class ExportUnlockedComponent implements OnInit {
  exportForm: FormGroup;

  exportFee = 0.1;
  exportFeeDollor = 1.5;
  // TODO: get  those info from the form:
  exportCurrencies = ['btc', 'nem'];
  dateFrom = '10/09/2019';
  dateTo = '10/12/2019';

  constructor(private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.exportForm = new FormGroup({
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      currenciesSelect: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      currencyPayment: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      // option:
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.maxLength(180)],
      }),
    });
  }

  onConfirm() {
    // using modal:
    this.modalCtrl
      .create({
        component: ExportConfirmComponent,
        cssClass: 'export-confrim-modal',
        componentProps: {
          exportFee: this.exportFee,
          exportFeeD: this.exportFeeDollor,
          exportCurrencies: this.exportCurrencies,
          selectedStartDate: this.dateFrom,
          selectedEndDate: this.dateTo,
        },
      })
      .then((modalEl) => modalEl.present());

    // using action sheet:  not convinent to show the list of  export info:
    //   this.actionSheetCtrl
    //     .create({
    //       header: 'Confirm this export',
    //       subHeader: 'the inof about this export: fee, export transaction info',
    //       // cssClass: '',
    //       buttons: [
    //         {
    //           text: 'Export now',
    //           // icon: '',
    //           handler: () => {
    //             console.log('Exporting....');
    //           },
    //         },
    //         {
    //           text: 'Cancel',
    //           // icon: '',
    //           role: 'cancel',
    //           handler: () => {
    //             console.log('Cancel....');
    //           },
    //         },
    //       ],
    //     })
    //     .then((actionSheetEl) => actionSheetEl.present());
  }
}
