const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((req, res) => {
	const {url} = req;

	if( url === "/api/sample" ){

		fs.readFile("api/sample.json", (error, contentBuff) => {
			if( error ){

				res.statusCode = 200;
				res.write( error.toString() );
				res.end();

			} else {

				const returnObj = {
					data: JSON.parse( contentBuff.toString() ),
					metadata: {
						generated: new Date().toLocaleString()
					}
				};

				res.statusCode = 200;
				res.write( JSON.stringify(returnObj) );
				res.end();

			}
		});

	} else {
		res.statusCode = 404;
		res.write("404: Not found.");
		res.end();
	}

}).listen(4000);
