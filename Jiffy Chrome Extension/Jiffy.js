// Much thanks to http://stackoverflow.com/questions/179713/how-to-change-the-href-for-a-hyperlink-using-jquery/28016553#28016553 and http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp

function GIFtoGIFV(source) {
	/*var links = source.querySelectorAll('img[src$=".gif"]');
	Array.prototype.forEach.call(links, function(element, index) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(request.readyState == 4 && request.status == 200) {
				console.log(element.src);
				element.src = element.src + "v";
				console.log("GIF was updated to " + element.src);
			} else if (request.readyState == 4 && request.status != 200) {
				console.log(element.src + "v is not a valid URL, not updating GIF");
			}
		}
		request.open("GET", element.src + "v", true);
		request.send();
	});*/

	var links = source.querySelectorAll('a[href$=".gif"]');
	Array.prototype.forEach.call(links, function(element, index) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(request.readyState == 4 && request.status == 200) {
				element.href = element.href + "v";
				//console.log("updated \"" + element.innerHTML + "\" to link to " + element.href);
			} else if (request.readyState == 4 && request.status != 200) {
				//console.log(element.href + "v is not a valid URL, not updating link");
			}
		}
		var link = element.href + "v";
		if (window.location.protocol == "https:" && link.substr(0,5) == "http:") {
			link = "https:" + link.substr(5);
		}
		request.open("GET", link, true);
		request.send();
	});
}

var observer = new MutationObserver(function(records) {
	records.forEach(function(record) {
		if (!record.target) GIFtoGIFV(record.target);
		/*if (record.addedNodes.length == 0) return;
		Array.prototype.forEach.call(record.addedNodes, function (element, index) {
			GIFtoGIFV(element);
		});*/
		
	})
});

observer.observe(document, {childList: true, attributes: true, characterData: true,  subtree: true});

GIFtoGIFV(document)