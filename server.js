let express = require('express');
let fs 		= require('fs');
let request = require('request');
let cheerio = require('cheerio');
let app     = express();

const PORT = process.env.PORT || 5000

let link = [
	{
		"name": "storia"
	}
]

app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
	res.render("home.ejs", {
		links: link
	})
})


app.get("/storia", (req, res) => {
	let listUrl = [], recentPost = "https://www.storia.ro/vanzare/apartament/?search%5Border%5D=created_at_first%3Adesc", listOfAds = []

	request(recentPost, function(err, response, page) {
		if(!err) {
			let $ = cheerio.load(page)
			let group = ""
			let b =""

			group = $("h3").children("a")

			for(i = 0; i < group.length; i++) {
				b = $(group)[i]
				listUrl.push($(b).attr("href"));
			}

			listUrl.forEach((el, index) => {
				request(el, (error, response, html) => {
					if(!error) {
				        let $ = cheerio.load(html);
						json = { title: "", price: "", priceCube: "", area: "", phone:"", floor: "", adress: "", description: "", picture: ""}

						json.title = $("h1").text()
						json.price = $(".param_price").children("span").children("strong").text()
						json.priceCube = $(".param_price").contents()[2].nodeValue
						json.area = $(".param_m").children("span").children("strong").text()
						json.phone = $("phone-spoiler-number").text()
						json.floor = $(".param_floor_no").children("span").text()
						json.adress = $(".address-links").text()
						json.description = $(".text-contents").text()
						json.picture = $("a img").prop("src")
					}
					listOfAds.push(json)

					if (parseInt(index) + 1 === parseInt(listUrl.length)) {

						// fs.writeFile('output.json', JSON.stringify(listOfAds, null, 4), function(err){
						//     console.log('File successfully written! - Check your project directory for the output.json file');
						// })

						res.render("scrape.ejs", {
							results : listOfAds,
							name: "Storia"
						})
					}
				})

			})

		}	
	})
})

app.listen(PORT)
console.log('Magic happens on port 8082');
exports = module.exports = app;