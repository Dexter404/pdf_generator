function downloadPDF() {
    fetch('http://localhost:5051/html_to_pdf', {
        headers: {
            'Accept': 'application/pdf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'url': 'https://dev.to/damcosset/generate-a-pdf-from-html-and-back-on-the-front-5ff5'
            // 'html': '<a href="www.google.com">click me</a>'
        }),
        method: 'POST'
    }).then(res => {
        return res
            .arrayBuffer()
            .then(res => {
                console.log("PDF buffer", res);
                const blob = new Blob([res], { type: 'application/pdf' });
                saveAs(blob, 'test.pdf');
            })
            .catch(e => console.log(e));
    });
}