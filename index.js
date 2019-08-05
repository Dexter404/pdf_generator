const express = require('express');
const path = require('path');
const PDFGenerator = require('./services/PDFGenerator');

const app = express();

const PORT = 5051;

app.use(express.static('public'));
app.use(express.json());

app.get('/', function (req, res) {
    res.send("HTML to PDF Generator");
});

app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.post('/html_to_pdf', function (req, res) {
    if (req.body.url != null) {
        PDFGenerator.generatePDFFromUrl(req.body.url)
            .catch((err) => {
                console.error("Unable to generate for url: " + req.body.url, err);
                res.send('PDF not generated');
            })
            .then((pdf) => {
                console.log('PDF successfully generated.');
                res.end(pdf);
            });
    } else if (req.body.html != null) {
        PDFGenerator.generatePDFFromHTML(req.body.html)
            .catch((err) => {
                console.error("Unable to generate for html: " + req.body.html, err);
                res.send('PDF not generated');
            })
            .then((pdf) => {
                console.log('PDF successfully generated.');
                res.end(pdf);
            });
    } else {
        res.send("URL or content not specified.");
    }
});

app.listen(PORT, console.log(`App started at port: ${PORT}`));