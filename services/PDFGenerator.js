const puppeteer = require('puppeteer');

class PDFGenerator {
    static async generatePDF(param, type) {
        // create browser instance
        const browser = await puppeteer.launch({ headless: true });
        
        // create page and set content
        const page = await browser.newPage();
        switch(type) {
            case 'url' : {
                await page.goto(param);
                break;
            }
            case 'html': {
                await page.setContent(param);
                break;
            }
        }

        // generate PDF
        const buffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                left: '0px',
                top: '0px',
                right: '0px',
                bottom: '0px'
            },
            // path: '/Users/rahularora/Desktop/test.pdf'
        });

        // close browser instance
        await browser.close();

        return buffer;
    }

    static async generatePDFFromHTML(html) {
        return PDFGenerator.generatePDF(html, 'html');
    }

    static async generatePDFFromUrl(url) {
        return PDFGenerator.generatePDF(url, 'url');
    }
}

module.exports = PDFGenerator;