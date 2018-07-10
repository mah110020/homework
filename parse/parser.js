const fs = require("fs");

const demoRegEx = /Demographic[\r\n]*\-{32}([\s\S]*)\-{32}[\r\n]*Emergency/;
const fieldRegEx = /(.*): (.*)/g;

function parse( contents ){
	const data = demoRegEx.exec(contents)[1];
	const demoObj = {};

	let match;
	while( match = fieldRegEx.exec(data) ){
		demoObj[ match[1] ] = match[2];
	}

	return JSON.stringify( format(demoObj) );
}

function format( demoObj ){
	return {
		name: {
			first_name: demoObj["Name"].split(" ")[0],
			last_name: demoObj["Name"].split(" ")[1],
		},
		dob: demoObj["Date of Birth"],
		address: [ demoObj["Address Line 1"], demoObj["Address Line 2"] ].filter(Boolean),
		city: demoObj["City"],
		state: demoObj["State"],
		zip: demoObj["Zip"],
		phone: demoObj["Phone Number"],
		email: demoObj["Email"],
		coverage: [{
			type: "Part A",
			effective_date: demoObj["Part A Effective Date"],
		}, {
			type: "Part B",
			effective_date: demoObj["Part B Effective Date"],
		}]
	};
}

fs.readFile("cms_sample.txt", (error, contentBuff) => {
	if( error ){
		console.log(error.toString());
	} else {
		const contents = contentBuff.toString();
		console.log(parse(contents));
	}
});
