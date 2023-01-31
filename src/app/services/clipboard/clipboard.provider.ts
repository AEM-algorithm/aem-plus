import { Injectable } from '@angular/core';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {Platform} from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ClipboardProvider {
	constructor(
		private clipboard: Clipboard,
		private platform: Platform,
	) {}

	async copy(text: string) {
		try {
			if (this.platform.is('cordova')) {
				await this.clipboard.copy(text);
				return;
			}
			const aux = document.createElement('input');
			aux.setAttribute('value', text);
			document.body.appendChild(aux);
			aux.select();
			document.execCommand('copy');
			document.body.removeChild(aux);
		}catch (e) {
			console.log('ClipboardProvider', 'copy', e);
		}
	}
}
