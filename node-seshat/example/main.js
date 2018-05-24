"use strict";

var $ = require("jquery");
var seshat = require("../seshat-wrapper.js");

window.jQuery = $;
require("jquery-sketch");

function strokeArrToStr(strokes) {
	var result = "";
	result += strokes.length + " ";
    strokes.forEach(function(stroke, i) {
        result += stroke.length + " ";
        stroke.forEach(function(point, i) {
            result += point[0] + " " + point[1] + " ";
        });
    });
    return result;
}

function renderMath(actions) {
    var strokes = actions.map(function(strk) {
        if (!strk.events) {
            return [];
        }
        return strk.events.map(function(pt) {
            return [pt.x, pt.y];
        });
    });
    console.log(strokes);
    var strokesStr = strokeArrToStr(strokes);
    console.log(strokesStr);
    var mathML = seshat.recognizeSCGInk(strokesStr);
    console.log(mathML);
    var renderedDiv = document.getElementById("mathRendered");
    renderedDiv.innerHTML = mathML;
    $('#mathML').text(mathML.replace(/\n+/g, " "));
    MathJax.Hub.Queue(
      ["Typeset",MathJax.Hub, renderedDiv],
      ["PreviewDone",function() {
        console.log("mathjax done");
      }]
    );

}

$(function() {
    var $cv = $('#test');
    $('#test').sketch();
    var sketch = $cv.data('sketch');
  
    var renderTimer = null;
    var restartTimer = function() {
        clearTimeout(renderTimer);
        renderTimer = setTimeout(function() {
            renderMath(sketch.actions);
        }, 3000);
    }



    $('#clear').click(function() {
        sketch.actions = [];
        sketch.redraw();
        renderMath(sketch.actions);
    });
    $('#undo').click(function() {
        sketch.actions.pop();
        sketch.redraw();
        restartTimer();
    });

    seshat.onInitialized(function () {
        var superStartPainting = sketch.startPainting;
        var superStopPainting = sketch.stopPainting;
        sketch.set("startPainting", function() {
            clearTimeout(renderTimer);
            superStartPainting.apply(this);
        });

        sketch.set("stopPainting", function() {
            superStopPainting.apply(this);
            restartTimer();
        });
        $('#strokes').click(function() {
            renderMath(this.actions);
        });
    });

  });
