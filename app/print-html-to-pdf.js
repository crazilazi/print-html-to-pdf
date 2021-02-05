'use strict';

import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import _ from 'lodash';
import spinner from './spinner';
class PrintHtmlToPDF {

  // Constructor
  constructor() {
    this.__init();
  };

  /*
   Print give html node to pdf
   @params:
         : node is dom element
         : default option is defaultOption = {
     jsPDF: {
       unit: 'px',
       format: 'a4',
     }
   };
 */
  print = async (node, option = {}) => {
    option = _.merge(this.defaultOption, option);
    const fileName = "default";
    if (fileName === 'closed') {
      return;
    }
    spinner.spin();

    const dataUrl = await this.__htmlToImageDataUrl(node, spinner);
    const pdf = new jsPDF(option.jsPDF);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(dataUrl);
    const imgHeight = pdfWidth / imgProps.width * imgProps.height;
    pdf.addImage(dataUrl, option.imageType, 0, 0, pdfWidth, imgHeight);
    await pdf.save(fileName, { returnPromise: true });
    spinner.stop();

  }

  // Initialize the basic needs
  __init = () => {
    this.defaultOption = {
      jsPDF: {
        unit: 'px',
        format: 'a4',
      },
      imageType: 'image/png',
      filename: 'print-html-to-pdf.pdf',
    };
  };

  // Initialize the modal
  __initializePrintModalPopup = async () => {

  };

  // Convert html to png image
  __htmlToImageDataUrl = async (node, spinner) => {
    return new Promise((resolve, reject) => {
      domtoimage.toPng(node)
        .then(function (dataUrl) {
          resolve(dataUrl);
        })
        .catch(function (error) {
          console.error('printHtmlToPDF', error);
          spinner.stop();
          reject(error);
        });
    });
  }

};

export default new PrintHtmlToPDF();