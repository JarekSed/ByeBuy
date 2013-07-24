// These are the regexes used to identify if a given element is relevant to credit cards or payment.
// The key is just a description, the value is the regex used to match.
var regexes = { "number" : /card.?#|card.?no|ccnum/gi,
    "name" : /card.?holder|name.?on.?card|ccname/gi,
    "order" : /place.*order|cart/gi,
    "payment" : /payment.?method|payment.?instrument|payment.?type|payment.*name/gi,
    "checkout" : /checkout|check.?out/gi};

// This variable controls how many of the regexes are allowed to miss, and still consider
// the page overall to be a hit.
var NUM_ACCEPTABLE_MISSES = 2;

// These are the HTML elements we will examine to see if they match any of the regexes. (Searching the whole page would have a ton of false positives).
var tags = ["form", "input"];
var num_found = 0;
for (var regex in regexes) {
    rawHTML = getRawElements(tags);
    matches = rawHTML.match(regexes[regex]);
    if (matches){
        console.log("Found " + regex + ": '" + matches[0] + "'");
        num_found++;
    } else {
        console.log("couldn't find the regex for " + regex);
    }
}

if (Object.keys(regexes).length - num_found <= NUM_ACCEPTABLE_MISSES){
    console.log("looks like we found enough to determine this is a purchase page");
    var NewDialog = $('<div id="MenuDialog"><center><img src="' + getRandomImageURL() + '" /></center></div>');
    NewDialog.dialog({
        modal: true,
        title: "Really?",
        width: "600px",
        buttons: [
    {text: "Cancel", click: function() {$(this).dialog("close")}}
    ]
    });
    NewDialog.dialog("open");
    alert("Hooman........ WUT R U DOOIN");
    alert("...Seriously, is this worth giving up an annual trip to Atlantis and a home theater?");
    alert("IT'S NOT WORTH IT");
    var payload = {
        count: 1
    };
//    chrome.extension.sendRequest(payload, function(response) {});
}

// This function returns a string containing the raw HTML for all elements matching the given tags
function getRawElements(tags) {
    rawHTML = "";
    for (var i = 0; i < tags.length; i++) {
        tag = tags[i];
        elements = document.getElementsByTagName(tag);
            for (var j =0; j < elements.length; j++) {
                var wrap = document.createElement('div');
                wrap.appendChild(elements[j].cloneNode(true));
                rawHTML += wrap.innerHTML;
            }
    }
    return rawHTML;
}

function getRandomImageURL(){
    //TODO(jarek): This is horrible, we shouldn't have # of images hardcoded, fix this
    var img_index = Math.floor(Math.random()*26)
    return "http://jsedlacek.info/byebuy/imgs/random.php";

}
