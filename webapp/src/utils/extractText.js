import * as pdfjsLib from 'pdfjs-dist';

const extractTextFromPdf = (file) => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = function () {
      const typedArray = new Uint8Array(this.result);
      pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
        let textContent = '';
        const totalPages = pdf.numPages;
        let currentPage = 1;

        const getPageText = async (pageNum) => {
          const page = await pdf.getPage(pageNum);
          const text = await page.getTextContent();
          textContent += text.items.map((item) => item.str).join(' ') + '\n';
          if (pageNum < totalPages) {
            getPageText(pageNum + 1);
          } else {
            resolve(textContent);  // Resolve the promise with the full text
          }
        };
        getPageText(currentPage);
      }).catch(reject);  // Reject the promise on error
    };
    fileReader.readAsArrayBuffer(file);
  });
};

export default extractTextFromPdf;