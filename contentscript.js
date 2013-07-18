// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//var regex = /number|card.?#|card.?no|ccnum/gi;
var regex = /number/gi;
matches = document.body.innerHTML.match(regex);
if (matches) {
  console.log("looks like we found 'number'");
  var payload = {
    count: matches.count()
  };
  chrome.extension.sendRequest(payload, function(response) {});
} else {
    console.log("it looks like 'number' is not in the html for the body...");
}
