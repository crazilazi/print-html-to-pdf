# print-html-to-pdf

Print HTML to pdf using jsPDF &amp; dom-to-image.

## Install

```
npm i print-html-to-pdf
```

## print html to pdf example

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
  const jsPDFOption = {
    jsPDF: {
      format: "a4",
    },
  };
  await printHtmlToPDF.print(node, jsPDFOption);
});
```

### - jsPDF

please ref to [JSPDF Documentation](http://raw.githack.com/MrRio/jsPDF/master/docs/) for more option
