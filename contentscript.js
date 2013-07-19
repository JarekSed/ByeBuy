// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var regexes = { "number" : /number|card.?#|card.?no|ccnum/gi, "name" : /card.?holder|name.?on.?card|ccname|owner/gi}
var found_all = true;
for( var regex in regexes) {
    matches = document.body.innerText.match(regexes[regex]);
    if (!matches){
        console.log("couldn't find the regex for " + regex);
        found_all = false;
        break;
    }
    console.log("Found " + regex);
}

if(found_all){
    console.log("looks like we found everything");
    alert("Looks like you are buying things");
    alert("Are you sure you want to buy things?");
    alert("Buying things costs money!");
    var payload = {
        count: matches.count()
    };
    chrome.extension.sendRequest(payload, function(response) {});
}

