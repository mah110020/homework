const fs = require("fs");
const parse = require("./parse");

fs.readFile("parse/cms_sample.txt", (error, contentBuff) => {
	if( error ){
		console.log(error.toString());
	} else {
		const contents = contentBuff.toString();
		console.log(parse(contents));
	}
});
