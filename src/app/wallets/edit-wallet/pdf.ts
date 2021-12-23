function writeRotatedText(text,color) {
  var ctx,
    canvas = document.createElement("canvas");
  // I am using predefined dimensions so either make this part of the arguments or change at will
  canvas.width = 50;
  canvas.height = 200;
  ctx = canvas.getContext("2d");
  ctx.font = "bold 12pt Arial";
  ctx.save();
  ctx.translate(10, 0);
  ctx.rotate(0.5 * Math.PI);
  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0); 
  ctx.restore();
  return canvas.toDataURL();
}

function writeSquare() {
  var ctx,
    canvas = document.createElement("canvas");
  // I am using predefined dimensions so either make this part of the arguments or change at will
  canvas.width = 118;
  canvas.height = 118;
  ctx = canvas.getContext("2d");
  ctx.beginPath();
ctx.rect(0, 0, 118, 118);
ctx.stroke();
  return canvas.toDataURL();
}

var dd = {
  watermark: {
    text: "AEM Algorithm",
    color: "#0F4B73",
    opacity: 0.1,
    bold: true,
  },

  pageSize: {
    width: 294,
    height: 928,
  },
  pageMargins: 0,

  content: [
    {
      layout: "noBorders",
      table: {
        widths: [294],
        heights:[300, 300, 300],
        body: [
          [
            {
              stack: [
                {
                  text: "AEM+ Paper wallet",
                  style: "header",
                },
                {
                  alignment: "center",
                  margin: [70, 0, 0, 0],
                  columnGap: 0,
                  columns: [
                    {
                      width: "10%",
                      text: "btc",
                      style: "image",
                    },
                    {
                      width: "80%",
                      alignment: "left",
                      text: "Wallet name - my saving",
                      style: "subHeader",
                    },
                  ],
                },
                {
                  alignment: "center",
                  width:'auto',
                  margin: [70, 30, 0, 0], 
                columnGap:-30,
                  columns: [
                    {
                        margin:[0,20,0,0],
                      image: writeSquare(),
                    },
                    {
                  margin: [0, 0, 0, 0],
                      image: writeRotatedText("Balance on DATE / Note",'#F9FAFC'),
                      //   style: "rotate",
                    },
                  ],
                },
              ],
              fillColor: "#0F4B73",
            },
          ],
          //  ---------- image & name

          [
            // ------------  balance on Date row
            {
              stack: [
                {
                  text: "Your Private Key",
                  style: "privateKeyTitle",
                },
                {
                  text: `0xebf7kljaddnaoek48djfjawoeirnl02kfhasdkfhlseg009slek`,
                  style: ["privateKey"],
                },
                 {
                  alignment: "center",
                  width:'auto',
                  margin: [70, 50, 0, 0], 
                columnGap:-30,
                  columns: [
                    {
                        margin:[0,10,0,0],
                      image: writeSquare(),
                    },
                    {
                  margin: [0, 10, 0, 0], 
                      image: writeRotatedText("Your Private Key","#000000"),
                      //   style: "rotate",
                    },
                  ],
                },
              ],
              fillColor: "white",
            },
          ],
          [
            // ------------  balance on Date row
            {
              stack: [
                {
                  text: "Your Private Key",
                  style: "privateKeyTitle",
                },
                {
                  text: `0xebf7kljaddnaoek48djfjawoeirnl02kfhasdkfhlseg009slek`,
                  style: ["privateKey"],
                },
                 {
                  alignment: "center",
                  width:'auto',
                  margin: [70, 50, 0, 0], 
                columnGap:-30,
                  columns: [
                    {
                        margin:[0,10,0,0],
                      image: writeSquare(),
                    },
                    {
                  margin: [0, 10, 0, 0], 
                      image: writeRotatedText("Your Private Key","#000000"),
                      //   style: "rotate",
                    },
                  ],
                },
              ],
              fillColor: "#F7F7F7",
            },
          ],
        ],
      },
    },
  ],
  defaultStyle: {
    alignment: "center",
  },
  styles: {
    header: {
      fontSize: 22,
      bold: true,
      alignment: "center",
      color: "#F9FAFC",
    },
    subHeader: {
      fontSize: 12,
      alignment: "center",
      color: "#F9FAFC",
    },
    privateKeyTitle: {
      fontSize: 16,
      bold: true,
      margin: [19, 0, 19, 0],
      alignment: "left",
    },
    privateKey: {
      margin: [19, 0, 19, 0],
      alignment: "left",
      fontSize: 12,
    },
    name: {
      fontSize: 12,
      color: "#F9FAFC",
    },
    image: {
      fontSize: 10,
    },
    info: {
      fontSize: 12,
      margin: [0, 5, 0, 5],
    },
    title: {
      fontSize: 16,
      bold: true,
    },
  },
};



// 
watermark: {
  text: "AEM Algorithm",
  color: "#0F4B73",
  opacity: 0.1,
  bold: true,
},

pageSize: {
  width: 295,
  height: 715,
},

pageMargins: 0,

content: [
  {
    layout: "noBorders",
    table: {
      widths: [295],
      heights: ["*", "*", 150, 230, 230],

      body: [
        [
          {
            text: "AEM+ Paper wallet",
            style: "header",
            fillColor: "#0F4B73",
          },
        ],
        //  ---------- image & name
        [
          {
            stack: [
              { image: `${this.walletImgData}`, width: 20 }, //image loaded are not correct
              {
                text: walletData.walletName,
                style: "name",
              },
            ],
            fillColor: "#0F4B73",
          },
        ],
        [
          // ------------  balance on Date row
          {
            stack: [
              {
                text: "Balance on DATE / Note",
                style: ["title"],
              },
              {
                text: `${new Date().toLocaleDateString()}`,
                style: {
                  margin: [0, 50, 0, 5],
                },
              },
              {
                text: [
                  {
                    text: `${walletData.walletBalance[0]}`,
                    style: { fontSize: 14, italics: true },
                  },
                  { text: " AUD", style: { fontSize: 9, italics: true } },
                ],
                style: {
                  margin: [0, 30, 0, 5],
                },
              },
              {
                text: [
                  {
                    text: `${walletData.walletBalance[1]}`,
                    style: { fontSize: 14, italics: true },
                  },
                  {
                    text: ` ${walletData.walletType}`,
                    style: { fontSize: 9, italics: true },
                  },
                ],
              },
              {
                text: `${this.walletPaperNote}`,
                style: {
                  italics: true,
                },
              },
            ],
            fillColor: "#F7F7F7",
          },
        ],
        [
          // ------------ Private key row
          {
            stack: [
              {
                text: "Your Private Key",
                style: "title",
              },
              {
                text: `${walletData.privateKey}`,
                style: "info",
              },
              { qr: walletData.privateKey, fit: "130", style: "qrcode" },
            ],
          },
        ],
        [
          // ------------ address row
          {
            stack: [
              {
                text: "Your address",
                margin: [0, 20, 0, 5],
                style: "title",
              },
              {
                text: `${walletData.walletAddress}`,
                style: "info",
                margin: [0, 5, 0, 5],
              },
              {
                qr: walletData.walletAddress,
                fit: "130",
                style: "qrcode",
              },
            ],
            fillColor: "#F7F7F7",
          },
        ],
      ],
    },
  },
],
defaultStyle: {
  alignment: "center",
},
styles: {
  header: {
    fontSize: 20,
    bold: true,
    alignment: "center",
    color: "#F9FAFC",
    margin: [0, 10, 0, 10],
  },
  name: {
    fontSize: 14,
    lineHeight: 2,
    margin: [0, 10, 0, 0],
    color: "#F9FAFC",
  },
  info: {
    fontSize: 12,
    margin: [0, 5, 0, 5],
  },
  title: {
    fontSize: 16,
    bold: true,
    margin: [0, 30, 0, 0],
  },
},
// 