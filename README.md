# print-html-to-pdf

Print HTML to pdf using jsPDF &amp; dom-to-image.

## Install

```
npm i print-html-to-pdf
```

## simple example

```html
<button id="print-button">Print</button>
<div id="print-me">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit
    amet laoreet urna, eu convallis arcu. Etiam eget risus nec justo ultricies
    lobortis. Sed vehicula quam tellus, non porttitor felis pulvinar eget.
    Integer ac porttitor diam. Donec ultrices vel ex et scelerisque. Ut
    vulputate dolor nulla, vitae viverra tortor eleifend ut. Suspendisse
    potenti. In sagittis est non lectus blandit, non tempus erat maximus.
    Vestibulum id enim dignissim, viverra purus sed, finibus ex. Praesent quis
    consectetur est. Cras ac erat auctor, egestas magna et, gravida tellus.
    Phasellus non posuere tortor.
  </p>
</div>
```

```js
import printHtmlToPDF from "print-html-to-pdf";

const printButton = document.getElementById("print-button");
printButton.addEventListener("click", async (event) => {
  const node = document.getElementById("print-me");
  const pdfOption = {
     jsPDF: {
       unit: 'px',
       format: 'a4',
     },
      spin: false,
      fileName: 'default'
   }
  };
  await printHtmlToPDF.print(node, pdfOption);
});
```

## fit entire content in one page example

```html
<button id="print-button">Print</button>
<div id="print-me">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit
    amet laoreet urna, eu convallis arcu. Etiam eget risus nec justo ultricies
    lobortis. Sed vehicula quam tellus, non porttitor felis pulvinar eget.
    Integer ac porttitor diam. Donec ultrices vel ex et scelerisque. Ut
    vulputate dolor nulla, vitae viverra tortor eleifend ut. Suspendisse
    potenti. In sagittis est non lectus blandit, non tempus erat maximus.
    Vestibulum id enim dignissim, viverra purus sed, finibus ex. Praesent quis
    consectetur est. Cras ac erat auctor, egestas magna et, gravida tellus.
    Phasellus non posuere tortor.
  </p>
</div>
```

```js
import printHtmlToPDF from "print-html-to-pdf";

const printButton = document.getElementById("print-button");
printButton.addEventListener("click", async (event) => {
  const node = document.getElementById("print-me");
  const pdfOption = {
     jsPDF: {
       unit: 'px',
       format: 'a4',
     },
      spin: false,
      fileName: 'default',
      // If it is true the entire content will fit into one page with margin assigned
      // If false and content is bigger than one page than it will be printed to other pages
      fitToPage: true // default is false
   }
  };
  await printHtmlToPDF.print(node, pdfOption);
});
```

## set pdf margin example

```html
<button id="print-button">Print</button>
<div id="print-me">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit
    amet laoreet urna, eu convallis arcu. Etiam eget risus nec justo ultricies
    lobortis. Sed vehicula quam tellus, non porttitor felis pulvinar eget.
    Integer ac porttitor diam. Donec ultrices vel ex et scelerisque. Ut
    vulputate dolor nulla, vitae viverra tortor eleifend ut. Suspendisse
    potenti. In sagittis est non lectus blandit, non tempus erat maximus.
    Vestibulum id enim dignissim, viverra purus sed, finibus ex. Praesent quis
    consectetur est. Cras ac erat auctor, egestas magna et, gravida tellus.
    Phasellus non posuere tortor.
  </p>
</div>
```

```js
import printHtmlToPDF from "print-html-to-pdf";

const printButton = document.getElementById("print-button");
printButton.addEventListener("click", async (event) => {
  const node = document.getElementById("print-me");
  const pdfOption = {
     jsPDF: {
       unit: 'px',
       format: 'a4',
     },
      spin: false,
      fileName: 'default',
      // You can assign margin for the pdf content
      margin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
   }
  };
  await printHtmlToPDF.print(node, pdfOption);
});
```

## ignore dom element example

```html
<button id="print-button">Print</button>
<div id="print-me">
  <h2 class="header">Ignore me</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit
    amet laoreet urna, eu convallis arcu. Etiam eget risus nec justo ultricies
    lobortis. Sed vehicula quam tellus, non porttitor felis pulvinar eget.
    Integer ac porttitor diam. Donec ultrices vel ex et scelerisque. Ut
    vulputate dolor nulla, vitae viverra tortor eleifend ut. Suspendisse
    potenti. In sagittis est non lectus blandit, non tempus erat maximus.
    Vestibulum id enim dignissim, viverra purus sed, finibus ex. Praesent quis
    consectetur est. Cras ac erat auctor, egestas magna et, gravida tellus.
    Phasellus non posuere tortor.
  </p>
</div>
```

```js
import printHtmlToPDF from "print-html-to-pdf";

const printButton = document.getElementById("print-button");
printButton.addEventListener("click", async (event) => {
  const node = document.getElementById("print-me");
  const pdfOption = {
     jsPDF: {
       unit: 'px',
       format: 'a4',
     },
      spin: false,
      fileName: 'default',
      // You can hide element which you don't want to be part of pdf
      hideDomNodeUsingGivenSelectors: {
        id: [],
        class: ['header'],
        nodes: []
      },
   }
  };
  await printHtmlToPDF.print(node, jsPDFOption);
});
```

### - jsPDF

please ref to [JSPDF Documentation](http://raw.githack.com/MrRio/jsPDF/master/docs/) for more option
