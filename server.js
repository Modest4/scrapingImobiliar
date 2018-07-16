let express = require('express');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let app     = express();

const jsdom = require("jsdom")
const { JSDOM } = jsdom


let url = "https://www.storia.ro/oferta/comision-0-proiect-certificat-eco-habitat-2-camere-copou-zona-verde-IDb8Na.html#";

app.get("/scrape", (req, res) => {
	request({uri: url},
	function(err, response, body) {
		if(err) throw console.log(err);

		let title, price, priceCube, area, phone, floor, adress, description;
		let json = { title: "", price: "", priceCube: "", area: "", phone:"", floor: "", adress: "", description: ""}

		const dom = new JSDOM(body, {
			url: url,
			referrer: url,
			contentType: "text/html",
			includeNodeLocations: true,
			resources: "usable",
			runScripts: "dangerously"
		});
		const document = dom.window.document.documentElement;
		const window = dom.window

		let $ = cheerio.load(document);
		console.log("yo?")

		window.addEventListener("load", function() {
			console.log("ici ?")
			document.querySelector(".phone-spoiler-button").click()
			console.log(document.querySelector(".phone-number").textContent)
		})

		window.onModulesLoaded = () => {
			console.log("tout est loaded")
			document.querySelector(".phone-spoiler-button").click()
			console.log(document.querySelector(".phone-number").textContent)
		}



		// var xmlhttp = getXmlHttp();
		// var url = "https://www.storia.ro/ajax/misc/contact/phone/b8Na/";
		// xmlhttp.open("GET", url, true);
		// xmlhttp.onreadystatechange=function(){
		//     if (xmlhttp.readyState == 4){
		//         if (xmlhttp.status == 200){
		//             response=xmlhttp.responseText.split(':')
		//             console.log(response)
		//         }
		//     }       
		// }
		// xmlhttp.send(null);




		/*xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	            console.log(this.responseText);
	       }
	    };
	    xhttp.open("GET", "https://www.storia.ro/ajax/misc/contact/phone/b8Na/", true);
	    xhttp.send(); 
*/

		// http.post("https://www.storia.ro/ajax/misc/contact/phone/b8Na/", (tel) => {
		// 	tel.setEncoding("utf8")
		// 	let rawData = ""
		// 	console.log(tel)
		// 	tel.on("data", (chunk) => rawData += chunk)
		// 	tel.on("end", () => {
		// 		try {
		// 			console.log(rawData)
		// 		} catch (e) {
		// 			console.log(e)
		// 		}
		// 	})
		// })

			

		

		// json.title = document.querySelector("h1").textContent
		// json.price = document.querySelector(".param_price").children[0].children[0].textContent
		// json.price = document.querySelector(".param_price").childNodes[2].textContent
		// json.area = document.querySelector(".param_m").children[0].children[0].textContent
		// json.phone = document.querySelector("h1").textContent
		// json.floor = document.querySelector(".param_floor_no").children[0].children[0].textContent
		// json.adress = document.querySelector(".address-links").children[0].textContent + ", " + document.querySelector(".address-links").children[1].textContent + ", " + document.querySelector(".address-links").children[2].textContent
		// json.description = document.querySelector("h1").textContent

		// console.log(json)


		// console.log(document.querySelector("h1").textContent)
		

	})
})



/*app.get('/scrape', function(req, res){

	url = 'https://www.piata-az.ro/apartament-vanzare-4-sau-mai-multe-camere-cluj-napoca-manastur-299624';

	request(url, function(error, response, html){
	    if(!error){
	        let $ = cheerio.load(html);

		    let title, price, area;
			var json = { title : "", price : "", area : ""};

			console.log($("h1").text())
			// $(".h1").filter(() => json.title = $(this).text());
			json.title = $("h1").text()
			json.price = $(".sidebar--details__top__price").children("strong").text()

		}

		// To write to the system we will use the built in 'fs' library.
		// In this example we will pass 3 parameters to the writeFile function
		// Parameter 1 :  output.json - this is what the created filename will be called
		// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
		// Parameter 3 :  callback function - a callback function to let us know the status of our function

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

		    console.log('File successfully written! - Check your project directory for the output.json file');

		})

		fs.writeFile("test.html", JSON.stringify(html, null, 4), function(err) {
			console.log("on a test.html...");
		})

		// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
		res.send('Check your console!')

    }) ;
})*/

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;