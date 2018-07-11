const fs = require("fs");
const parse = require("./parse");

fs.readFile("parse/cms_sample.txt", (readError, contentBuff) => {
	if( readError ){
		console.log(readError.toString());
	} else {
		const contents = contentBuff.toString();
		console.log(parse(contents));
	}
});
