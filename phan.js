const phantom = require('phantom');

(async function() {
	const instance = await phantom.create();
	const page = await instance.createPage();


	page.open('https://www.storia.ro/oferta/comision-0-proiect-certificat-eco-habitat-2-camere-copou-zona-verde-IDb8Na.html', function() {
	  page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
	    page.evaluate(function() {
	    	console.log("yo")
	      // $("button").click();
	    });
	    console.log("yi");
	    phantom.exit()
	  });
	});



	// await page.on('onResourceRequested', function(requestData) {
	// 	//console.info('Requesting', requestData.url);
	// });


	// const status = await page.open('https://www.storia.ro/oferta/comision-0-proiect-certificat-eco-habitat-2-camere-copou-zona-verde-IDb8Na.html#');
	// // const content = await page.property('content');
	// // console.log("pic");
	// // page.render("test.jpeg", {format: "jpeg", quality:"200"})

	// page.evaluate(function() {
	// 	console.log(document.getElementsByTagName("h1")[0].textContent);
	// })

	// await instance.exit();
})();