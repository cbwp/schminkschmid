/* DOCUMENT READY, WE NEEDA START SOME THINGS */
var tmpwidth;
$(document).ready(function(){
	$("img.resize").each(function(){
		var _this = $(this);
		var _par = $(this).parent();
		var elestyle;
		var elewidth;
		// WENN DIE WEITE NICHT GROESSER ALS 200 IST, IST DAS BILD WAHRSCHEINLICH DISPLAY NONE
		// WIR NEHMEN DAHER DIE VORAN GEHENDE GRÖSSE UND ZEIGEN DEN LAYER NICHT
		if (_this.width() <= 200){
			elewidth = tmpwidth;
		} else {
			tmpwidth = _this.width();
			elewidth = _this.width();
			layer = $("<aside class='layer'></aside>").css({
				width: _this.width() + "px",
				height: _this.height() + "px",
				marginTop: _this.offset().top - _par.offset().top,
				marginLeft: _this.offset().left - _par.offset().left
			});
			_par.append(layer);
		}
		
		console.log("ele " + elewidth);
		console.log("tmp " + tmpwidth);
		resImage($(this).attr("data-src"),elewidth, function(res){
			$(res).preloadImages(function(){
				setTimeout(function(){
					$("aside.layer", _par).remove();
				}, 1000);
				_this.attr("src", res.src).addClass("show");
			});
		});
	});
})
/* *************************************************************************************
// IMAGE RESIZE
// INPUT: IMAGE SRC (OR C5 IMG ID), imgwidth
// OUTPUT: PATH TO RESIZED IMAGE
************************************************************************************* */
var resImage = function(img,imgwidth,callback){
	$.post(baseUrl + "/index.php/helper/imgresize/", {img: escape(img), imgwidth: imgwidth}, "json")
  	.done(function(res) {
  		callback(JSON.parse(res));
  	}).error(function(e){
  		console.log("fail ");
  		console.log(e);
  	});
}


/* *************************************************************************************
// ARRAY EXTENDING FUNCTIONALITY. REMOVE ELEMENT
************************************************************************************* */
Array.prototype.remove = function(element) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == element) { this.splice(i,1); }
  }
};

/* *************************************************************************************
// IMAGES PRELOADING
// INPUT: ARRAY WITH IMAGE SRC
// CALLBACK WILL BE CALLED WHEN THE IMAGES ARE LOADED
// extends normal JQUERY functionality
************************************************************************************* */
$.fn.preloadImages = function(callback) {
	if (this.constructor === Array) {
		var checklist = this.toArray();
		this.each(function() {
		$('<img>').attr({ src: this }).load(function() {
			checklist.remove($(this).attr('src'));
				if (checklist.length == 0) { callback(); }
			});
		});
	}else {
		$('<img>').attr({ src: this[0].src }).load(function() {
			callback();
		});
	}
	
};

/* *************************************************************************************
// SIMPLE CONTENT SLIDER
// INPUT: CLASS NAME OF THE ELEMENTS TO SLIDE
// OUTPUT: PATH TO RESIZED IMAGE
************************************************************************************* */
$.fn.slide = function(dir){
	var slides = $(this);
	var isVis;
	slides.each(function(){
		if ($(this).is(":visible")){
			isVis = $(this);
		}
	});
	isVis.fadeOut().promise().done(function(){
		if (dir){
			if (isVis.next().length){
				isVis.next().fadeIn();
			} else {
				slides.first().fadeIn();
			}
			
		} else {
			if (isVis.prev().length){
				isVis.prev().fadeIn();
			} else{
				slides.last().fadeIn();
			}
			
		}
	})
};


/* *************************************************************************************
// SCROLLTO SLIDER
// INPUT: CLASS NAME OF THE ELEMENTS TO scroll to
************************************************************************************* */
var scrollTo = function(ele,speed){
	$('html, body').animate({
        scrollTop: $("" + ele).offset().top
    }, speed);
}