var _ = require("ramda");
require("./support.js");

var str = "<hello> config = {a,b,c,d} = require('whatever')</hello> module.exports= CMSBuildEnable(Slider, wtv, duu);\n"

var safeProp = _.curry(function (x, o) { return Maybe.of(o[x]); });

var exec = _.curry(function exec(regex, str) {
    return Maybe.of(regex.exec(str));
});

var exportRegEx = /module\.exports\s*=\s*CMSBuildEnable\((\w*)\,.*/igm;
var configRegex = /<hello>.*config\s*=\s*\{(.*)\}.*<\/hello>/igm;

var getExport =  _.compose(chain(safeProp(1)), exec(exportRegEx));

console.log(getExport(str));