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



$(function() {
    var $cv = $('#test');
    $('#test').sketch();
    var sketch = $cv.data('sketch');
  
    $('#clear').click(function() {
        $('#test').get(0).width = 300;
    });
  
    $('#redraw').click(function() {
        sketch.redraw();
    });
    seshat.onInitialized(function () {

        $('#strokes').click(function() {
        	var strokes = sketch.actions.map(function(strk) {
                if (!strk.events) {ß
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

        });
    });

  });
