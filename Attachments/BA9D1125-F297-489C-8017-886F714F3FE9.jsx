#target indesign

if (app.documents.length < 2) {
    alert("Open BOTH documents. Activate the OLD document first.");
    exit();
}

// source = active document
var sourceDoc = app.activeDocument;

// target = the other open document
var targetDoc = null;
for (var d = 0; d < app.documents.length; d++) {
    if (app.documents[d] !== sourceDoc) {
        targetDoc = app.documents[d];
        break;
    }
}
if (!targetDoc) {
    alert("Could not determine target document.");
    exit();
}

// layer name
var layerName = "RESENI";

// source layer
var srcLayer = sourceDoc.layers.itemByName(layerName);
if (!srcLayer.isValid) {
    alert("Layer '" + layerName + "' not found in SOURCE document.");
    exit();
}

// target layer (create if missing)
var tgtLayer = targetDoc.layers.itemByName(layerName);
if (!tgtLayer.isValid) {
    tgtLayer = targetDoc.layers.add({ name: layerName });
}

// loop pages
var pageCount = Math.min(sourceDoc.pages.length, targetDoc.pages.length);

for (var p = 0; p < pageCount; p++) {

    var srcPage = sourceDoc.pages[p];
    var tgtPage = targetDoc.pages[p];

    for (var i = srcPage.pageItems.length - 1; i >= 0; i--) {
    var item = srcPage.pageItems[i];

    if (item.itemLayer === srcLayer) {
        var dup = item.duplicate(tgtPage);
        dup.itemLayer = tgtLayer;
    }
}
}

alert("Layer '" + layerName + "' copied page-by-page successfully.");