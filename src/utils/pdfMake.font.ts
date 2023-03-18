// pdf
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { environment } from '@environments/environment';

const isValidHttpUrl = (rawUrl: string): boolean => {
    try {
        const url = new URL(rawUrl);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
       return false;
    }
}

pdfMake.fonts = {
    jp: {
        normal: (isValidHttpUrl(environment.CDN_SERVER) ? environment.CDN_SERVER : window.origin + '/assets') + '/MPLUSRounded1c-Regular.ttf',
    },
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
};

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
