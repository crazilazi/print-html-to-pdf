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
     },
      spin: false,
      fileName: 'default',
      hideDomNodeUsingGivenSelectors: {
        id: [],
        class: []
      },
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      fitToPage: false
   };
 */
  print = async (node, option = {}) => {
    option = _.merge(this.defaultOption, option);
    if (option.fileName === '') {
      option.fileName = "default";
    }
    const imageType = 'image/png';
    if (option.spin) {
      this.spinner.spin();
    }

    this.__hideNodesUsingGivenSelector(node, option.hideDomNodeUsingGivenSelectors);

    const dataUrl = await this.__htmlToImageDataUrl(node, option);
    const pdf = new jsPDF(option.jsPDF);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(dataUrl);

    if (option.fitToPage) {
      pdf.addImage(dataUrl, imageType, option.margin.left, option.margin.top,
        pdfWidth - option.margin.left - option.margin.right, pdfHeight - option.margin.top - option.margin.bottom);
    } else {
      const imgHeight = pdfWidth / imgProps.width * imgProps.height;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(dataUrl, imageType, option.margin.left, option.margin.top,
        pdfWidth - option.margin.left - option.margin.right, imgHeight - option.margin.top - option.margin.bottom);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, imageType, option.margin.left, position,
          pdfWidth - option.margin.left - option.margin.right, imgHeight - option.margin.top - option.margin.bottom);
        heightLeft -= pdfHeight;
      }

    }

    try {
      await pdf.save(option.fileName, { returnPromise: true });
    } catch (e) {
      console.error(e);
    }

    this.__showNodesUsingGivenSelector(node, option.hideDomNodeUsingGivenSelectors);

    if (option.spin) {
      this.spinner.stop();
    }
  }

  // Initialize the basic needs
  __init = () => {
    this.defaultOption = {
      jsPDF: {
        unit: 'px',
        format: 'a4',
      },
      spin: false,
      fileName: 'default',
      hideDomNodeUsingGivenSelectors: {
        id: [],
        class: [],
        nodes: []
      },
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      fitToPage: false
    };
    this.spinner = spinner;
  };


  /*
  Hide dom node using given selectors
  @params:
        : node is dom element
        : selectors is array of selectors {
          id: [],
          class: []
        }
*/
  __hideNodesUsingGivenSelector = (node, selectors) => {
    const idSelectors = selectors.id;
    const classSelectors = selectors.class;
    const elementSelectors = selectors.nodes;

    if (idSelectors.length) {
      idSelectors.forEach(s => {
        const ele = node.getElementById(s);
        ele.style.display = 'none';
      });
    }

    if (classSelectors.length) {
      classSelectors.forEach(s => {
        const elements = node.getElementsByClassName(s);
        [...elements].forEach(
          (ele, index, array) => {
            ele.style.display = 'none';
          }
        );
      });
    }

    if (elementSelectors && elementSelectors.length) {
      elementSelectors.forEach(ele => {
        ele.style.display = 'none';
      });
    }

  };

  /*
 Show dom node using given selectors
 @params:
       : node is dom element
       : selectors is array of selectors {
         id: [],
         class: []
       }
*/
  __showNodesUsingGivenSelector = (node, selectors) => {
    const idSelectors = selectors.id;
    const classSelectors = selectors.class;
    const elementSelectors = selectors.nodes;

    if (idSelectors.length) {
      idSelectors.forEach(s => {
        const ele = node.getElementById(s);
        ele.style.display = '';
      });
    }

    if (classSelectors.length) {
      classSelectors.forEach(s => {
        const elements = node.getElementsByClassName(s);
        [...elements].forEach(
          (ele, index, array) => {
            ele.style.display = '';
          }
        );
      });
    }


    if (elementSelectors && elementSelectors.length) {
      elementSelectors.forEach(ele => {
        ele.style.display = '';
      });
    }
  };

  // Convert html to png image
  __htmlToImageDataUrl = async (node, option) => {
    return new Promise((resolve, reject) => {
      domtoimage.toPng(node)
        .then((dataUrl) => {
          resolve(dataUrl);
        })
        .catch((error) => {
          console.error('printHtmlToPDF', error);
          if (option.spin) {
            this.spinner.stop();
          }
          reject(error);
        });
    });
  }

};

export default new PrintHtmlToPDF();