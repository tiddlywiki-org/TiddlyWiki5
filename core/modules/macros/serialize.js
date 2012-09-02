/*\
title: $:/core/modules/macros/serialize.js
type: application/javascript
module-type: macro

Serialize macro

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.info = {
	name: "serialize",
	params: {
		filter: {byPos: 0, type: "filter"},
		as: {byPos: 1, type: "text"},
		removePrefix: {byName: true, type: "text"}
	}
};

exports.executeMacro = function() {
	var as = this.params.as || "text/plain",
		t;
	if(this.hasParameter("filter")) {
		var titles = this.wiki.filterTiddlers(this.params.filter),
			tiddlers = [],
			result = [];
		if(this.hasParameter("removePrefix")) {
			for(t=0; t<titles.length; t++) {
				var originalTiddler = this.wiki.getTiddler(titles[t]),
					title = titles[t];
				if(title.indexOf(this.params.removePrefix) === 0) {
					title = title.substr(this.params.removePrefix.length);
					tiddlers.push(new $tw.Tiddler(originalTiddler,{title: title}));
				}
			}
		} else {
			for(t=0; t<titles.length; t++) {
				tiddlers.push(this.wiki.getTiddler(titles[t]));
			}
		}
		result.push(this.wiki.serializeTiddlers(tiddlers,as));
		return $tw.Tree.Element("pre",{},[
				$tw.Tree.Text(result.join("\n"))
			]);
	}
	return null;
};


})();
