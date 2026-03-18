// ReplaceAllLineBreaksWithSpaces.jsx
// Replaces both paragraph returns (\r) and forced line breaks (\n) in the selected text with spaces.

(function () {
    if (app.documents.length === 0 || app.selection.length === 0) {
        alert("Please select some text in an open document.");
        return;
    }

    var sel = app.selection[0];

    function getTextTarget(s) {
        try {
            var cname = s.constructor.name;
            if (cname.match(/Text|Story|Paragraph|Character|Word|InsertionPoint|TextStyleRange/)) {
                return s;
            }
            if (s.hasOwnProperty("texts") && s.texts.length > 0) {
                return s.texts[0];
            }
            if (s.hasOwnProperty("parentStory") && s.parentStory) {
                return s.parentStory;
            }
        } catch (e) {}
        return null;
    }

    var target = getTextTarget(sel);
    if (!target) {
        alert("Please select text or place your cursor in text before running this script.");
        return;
    }

    // clear GREP preferences
    app.findGrepPreferences = NothingEnum.NOTHING;
    app.changeGrepPreferences = NothingEnum.NOTHING;

    var total = 0;
    try {
        var patterns = ["\\r", "\\n"]; // paragraph + forced line breaks

        for (var i = 0; i < patterns.length; i++) {
            app.findGrepPreferences.findWhat = patterns[i];
            app.changeGrepPreferences.changeTo = " ";
            var found = target.changeGrep();
            if (found) total += found.length;
        }
    } catch (e) {
        alert("Error: " + e.message);
        return;
    } finally {
        app.findGrepPreferences = NothingEnum.NOTHING;
        app.changeGrepPreferences = NothingEnum.NOTHING;
    }

/*    if (total > 0) {
        alert(total + " line break(s) replaced with spaces.");
    } else {
        alert("No line breaks found in the selection.");
    } */
})();