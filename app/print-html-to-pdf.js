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
      }
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
    const imgHeight = pdfWidth / imgProps.width * imgProps.height;
    pdf.addImage(dataUrl, imageType, 0, 0, pdfWidth, imgHeight);

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
      }
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

    if (nodes.length) {
      nodes.forEach(ele => {
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

    if (nodes.length) {
      nodes.forEach(ele => {
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