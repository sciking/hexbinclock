// "binclock.js"
function initialize()
{
  UpdateClock(); // start clock
}

function UpdateClock() 
{
  var now = new Date(); // current date & time from computer clock
  var hrs = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  var hstr = "";
  var mstr = "";
  var sstr = "";
  var d = 128;
  for (i = 7; i>=0; i--) {
    hstr = hstr + String.fromCharCode(48 + ((hrs & d) > 0));
    mstr = mstr + String.fromCharCode(48 + ((min & d) > 0));
    sstr = sstr + String.fromCharCode(48 + ((sec & d) > 0));
    d >>= 1;
  }
  document.getElementById( "clock" ).innerHTML = hstr + "<br>" + mstr + "<br>" + sstr;
  newtime = window.setTimeout("UpdateClock();", 1000); // update clock display once per second
}
//hexclock

function Hex_Clock(config){
    "use strict";

    ////////////////////////////
    //On Object Instantiation //
    ////////////////////////////

        //Internal Config Object
    var _config = {},
        //body node
        _body = document.getElementsByTagName('body')[0],
        //Object that the public method is attached to
        exports = {};


    //Settings values of internal config object depending on config values passed in
    _config = {
        //Main Element
        element: config.element,

        //Render time bool, defaults to true is not passed in
        render_time: ((config.render_time !== undefined) ? config.render_time : true ),

        //clock custom element, defaults to false is no passed in
        clock_element: ((config.clock_element !== undefined) ? config.clock_element : false )
    };

    ////////////////////
    //Private Methods //
    ////////////////////

    function _render_time(){
        var html = [],
            date = new Date(),
            hour = (date.getHours() <= 9) ? '0' + date.getHours() : date.getHours(),
            mins = (date.getMinutes() <= 9) ? '0' + date.getMinutes() : date.getMinutes(),
            seconds = (date.getSeconds() <= 9) ? '0' + date.getSeconds() : date.getSeconds(),
            milliseconds = date.getMilliseconds(),
            hex = '#' + hour + mins + seconds;

        //Build HTML
        html.push('<div id="hex-clock-time" class="hex-clock-colour">');
        html.push('<span class="hex-symbol">#</span>');
        html.push('<span class="hex-section hex-hours">' + hour + '</span>');
        html.push('<span class="hex-section hex-mins">' + mins + '</span>');
        html.push('<span class="hex-section hex-seconds">' + seconds + '</span>');
        html.push('</div>');

        //If render_time == true, add time html
        if(_config.render_time){
            html.push(_set_clock_html(hour, mins, seconds));
        }

        //Join html array, add clock html to element
        _config.element.innerHTML = html.join('');

        //Change body background colour to be that of the hex colour
        _body.style.backgroundColor = hex;

        //timeout to call itself every 1 second
        //takes away current millseconds passed so it always starts on the actual second on the first hit
        setTimeout(_render_time, 1000 - milliseconds);
    }

    function _set_clock_html(hour, mins, seconds) {
        //Check if custom time element has been set
        if(_config.clock_element){
            //If custom element has been set change it's html to the current time
            _config.clock_element.innerHTML = (hour + ':' + mins + ':' + seconds);
        } else {
            //If custom element has NOT been set, return hex clock html to be added to html array
            return '<div id="hex-clock-colour" class="hex-clock-time">' + (hour + ':' + mins + ':' + seconds) + '</div>';
        }
    }

    function _add_class_to_wrap_element(){
        //Add class to main element
        _config.element.className += _config.element.className ? ' hex-clock-wrap' : 'hex-clock-wrap';
    }

    /////////////////////
    //Public Method(s) //
    /////////////////////

    exports.init = function(){
        _add_class_to_wrap_element();
        _render_time();
    };

    //Return public methods object
    return exports;
}
