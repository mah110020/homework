const http = require("http");
const url = require("url");
const fs = require("fs");
const formidable = require("formidable");
const parse = require("./parse");

http.createServer((req, res) => {
	const {url, method} = req;

	if( url === "/api/sample" && method === "GET"){

		fs.readFile("api/sample.json", (readError, contentBuff) => {

			if( readError ){
				res.statusCode = 500;
				res.end( readError.toString() );
				return;
			}

			const returnObj = {
				data: JSON.parse( contentBuff.toString() ),
				metadata: {
					generated: new Date().toLocaleString()
				}
			};

			res.statusCode = 200;
			res.end( JSON.stringify(returnObj) );

		});

	} else if( url === "/api/parse" && method === "GET" ){

		res.writeHead(200, {"content-type": "text/html"});
		res.end(`
			<form action="/api/parse" method="post" enctype="multipart/form-data">
				<input type="file" name="uploadfile">
				<input type="submit">
			</form>
		`);

	} else if( url === "/api/parse" && method === "POST" ){

		new formidable.IncomingForm().parse(req, (formError, fields, files) => {

			if( formError ){
				res.statusCode = 500;
				res.end( formError.toString() );
				return;
			}

			fs.readFile( files.uploadfile.path, (readError, contentBuff) => {

				if( readError ){
					res.statusCode = 500;
					res.end( readError.toString() );
					return;
				}

				const parsedContents = parse( contentBuff.toString() );

				fs.writeFile("post.json", parsedContents, writeError => {
					res.statusCode = 500;
					res.end( writeError ? writeError.toString() : "success" );
				});

			});

		});

	} else {

		res.statusCode = 404;
		res.end("404: Not found.");

	}

}).listen(4000);
