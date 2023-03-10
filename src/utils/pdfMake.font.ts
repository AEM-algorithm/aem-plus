// pdf
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.fonts = {
	jp: {
		normal: 'https://firebasestorage.googleapis.com/v0/b/aem-plus.appspot.com/o/MPLUSRounded1c-Regular.ttf?alt=media&token=faecd63e-f021-4ee6-94bc-406eca258bae',
	},
	Roboto: {
		normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
		bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
		italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
		bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
	},
};

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
