/*
Copyright(c) 2011 Ylab, www.ylab.nl

YLAB.alert(mixed [,mixed])
YLAB.clear()
YLAB.devAlert([mixed [, mixed]])
YLAB.getMeta()
YLAB.getParams(string);
YLAB.serialize(mixed);
YLAB.log([mixed [, mixed]])


Array.indexOf < EcmaScript 5, not native in IE8-
Array.unique()
Date.now() < EcmaScript 5, not native in IE8-
Date.toLocaleString()
Number.toEuro()
Number.toTwoDec()
String.alphanumeric()
String.digits()
String.populate()
String.strtr()
String.sv()
String.toDate()
String.toTime()
String.toUpperWords()
String.trim() < EcmaScript 5

*/
var YLAB = YLAB || {};

YLAB.debugging = true;

YLAB.serialize = function(o){
	try{
		if(typeof(o) === 'object'){
			var a = [];
			for(sKey in o){
				a.push(sKey + ': ' + (typeof(o[sKey])=='function' ? '[function]' : o[sKey] ));
			}
			return '{' + a.join(', ') + '}';
		}
	}catch(e){}
	return o;
};

YLAB.alert = function(){
	if(!YLAB.debugging){return;}
	var i, sMessage = '';
	for(i=0; i < arguments.length; i++){
		//sMessage += YLAB.serialize(arguments[i]) + '\n';
		sMessage += arguments[i] + '\n';
	}
	YLAB.debugging = confirm(sMessage);
};

YLAB.clear = function(){
	if(!YLAB.debugging){return;}
	YLAB.debugtimer = Date.now();
	console.clear();
};

YLAB.devAlert = function(){
	if(!YLAB.debugging){return;}
	var i, sMessage = 'Deze functie is nog niet geïmplementeerd.\n';
	for(i=0; i < arguments.length; i++){
		sMessage += arguments[i] + '\n';
	}
	alert(sMessage);
};

YLAB.getMeta = function(){
	//parse <meta> elements
	//returns an object
	//if content contains CSV, then the property value will be an array
	var i, a, sName, sContent, oMeta = {};
	var aElements = document.getElementsByTagName('meta');
	for(i=0; i<aElements.length; i++){
		if( (sName = aElements[i].getAttribute('name') || aElements[i].getAttribute('itemprop')) && (sContent = aElements[i].getAttribute('content')) ){
			a = sContent.sv();//split csv
			oMeta[sName.toLowerCase()] = a.length == 1 ? a[0] : a;
		}
	}
	return oMeta;
};

YLAB.getParams = function(sSearch){
	var oParams = {}, oSet;
	var r = /([^&=]+)=?([^&]*)/g;
	var f = function(s){
		//replace + symbol with a space and decode special characters
		return decodeURIComponent(s.replace(/\+/g, " "));
	};

	if(sSearch.length && sSearch[0]=='?'){
		//remove question mark
		sSearch = sSearch.substring(1)
	}
	while(oSet = r.exec(sSearch)){
		oParams[ f(oSet[1]) ] = f(oSet[2]);
	}

	return oParams;
};

YLAB.log = function(){
	if(!YLAB.debugging){return;}
	if(!YLAB.debugtimer){YLAB.debugtimer = Date.now();}
	var i, sMessage = (Date.now() - YLAB.debugtimer) / 1000;
	for(i=0; i < arguments.length; i++){
		sMessage += ' ▪ ' + YLAB.serialize(arguments[i]);
		//sMessage += ' ▪ ' + arguments[i];
	}
	console.log(sMessage);
};

//==========

if(!Date.now){
	Date.now = function(){
		return (new Date()).getTime();
	};
}

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(searchElement /*, fromIndex */ ){
		"use strict";
		if(this == null){
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if(len === 0){
			return -1;
		}
		var n = 0;
		if(arguments.length > 0){
			n = Number(arguments[1]);
			if(n != n){ // shortcut for verifying if it's NaN
				n = 0;
			} else if(n != 0 && n != Infinity && n != -Infinity){
				n =(n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if(n >= len){
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for(; k < len; k++){
			if(k in t && t[k] === searchElement){
				return k;
			}
		}
		return -1;
	}
}

Array.prototype.unique = function(){
	//returns a new array without duplicate values.
	var i, o = {}, a=[];

	for(i=0; i < this.length; i++){
		o[this[i]] = 1;
	}
	for(key in o){
		a.push(key);
	}
	return a;
};

Date.prototype.toLocaleString = function(){
	//removes 'day of week' part from toLocaleDateString
	var s = this.toLocaleDateString();
	var a = s.split(/\s/);
	a = a.splice(1);
	return a.join(' ');
};

String.prototype.alphanumeric = function(iMaxlen){
	var sResult;
	//replace special characters
	sResult = this.trim().strtr('ÁÉÍÓÚÄËÏÖÜÀÈÌÒÙáéíóúäëïöüàèìòùÿ ', 'AEIOUAEIOUAEIOUaeiouaeiouaeiouy-');
	//remove all non word characters and replace whitespace by a single '-'
	//	The string 'wmwmw' is used as temporary placeholder
	sResult = sResult.replace(/(-|\s)+/g, 'wmwmw').replace(/\W+/g,'').replace(/wmwmw/g, '-');

	//reduce length if iMaxlen is provided
	return iMaxlen && !isNaN(iMaxlen) ? sResult.substring(0, iMaxlen) : sResult;
};

String.prototype.digits = function(sPrefix){
	//returns the first digits (directly after the optional sPrefix) in a string
	// returns false in the case of no match
	// 'folder72'.digits() -> 72
	// 'folder72'.digits('folder') -> 72
	// 'folder72'.digits('older7') -> 2
	var oResult, r = new RegExp((sPrefix || '') + '(\\d+)');

	if(oResult = this.match(r) ){
		return oResult[1];
	}
	return false;
};

String.prototype.populate = function(){
	//simple sprintf fucntion
	//example: alert('There are{1} monkeys in the [0]!'.populate('tree', 2));
	var i, sSource = this;
	for(i=0; i<arguments.length; i++){
		sSource = sSource.replace(new RegExp('\\{' + i + '\\}|\\[' + i + '\\]', 'g'), arguments[i]);
	}
	return sSource;
};

String.prototype.strtr = function(aFrom, aTo){
	//Translate characters or replace substrings
	// http://php.net/manual/en/function.strtr.php
	var fr, i, j;
	var tmpFrom = [];
	var sNewstring = '';
	var bMatch = false;

	//Received replace_pairs?
	//Convert to aFrom->aTo arrays
	if(typeof(aFrom) === 'object'){
		aTo = [];
		for(fr in aFrom){
			if(aFrom.hasOwnProperty(fr)){
				tmpFrom.push(fr);
				aTo.push(aFrom[fr]);
			}
		}
		aFrom = tmpFrom;
	}

	//Walk through subject and replace chars when needed
	for(i = 0; i < this.length; i++){
		bMatch = false;
		for(j = 0; j < aFrom.length; j++){
			if(this.substr(i, aFrom[j].length) == aFrom[j]){
				bMatch = true;
				//Fast forward
				i = (i + aFrom[j].length) - 1;
				break;//j
			}
		}//for j
		if(bMatch){
			sNewstring += aTo[j];
		} else{
			sNewstring += this.charAt(i);
		}
	}//for i
	return sNewstring;
};

String.prototype.sv = function(){
	//split csv, remove extra whitespace
	return this.trim().split(/\s*,+\s*/);
};

String.prototype.toDate = function(){
	//dates are expected as dd-mm-yyyy or yyyy-dd-mm
	//returns a JavaScript date
	var dmY = new RegExp("([0-3]?[0-9]{1})[^[0-9]]*([0-1]?[0-9]{1})[^[0-9]]*([0-9]{4})");
	var Ymd = new RegExp("([0-9]{4})[^[0-9]]*([0-1]?[0-9]{1})[^[0-9]]*([0-3]?[0-9]{1})");

	if(result = this.match(dmY)){
		if(result[1] > 31){return false;}
		if(result[2] > 12){return false;}
		return(new Date(result[3], result[2]-1, result[1]));
	}
	else if(result = this.match(Ymd)){
		if(result[3] > 31){return false;}
		if(result[2] > 12){return false;}
		return(new Date(result[1], result[2]-1, result[3]));
	}
	return false;
};

String.prototype.toTime = function(){
	//time is expected as hh:mm
	//returns a JavaScript date
	if(!this){
		return new Date();
	}
	if(!isNaN(this) && this >= 0 && this <= 24){
		return(new Date(0,0,0,this,0));
	}
	var r = new RegExp("([0-2]?[0-9]{1})[^[0-9]]*([0-5]?[0-9]{1})");
	var result = this.match(r);
	if(!result){
		var r = new RegExp("([0-2]?[0-9]{1})([0-5]?[0-9]{1})");
		var result = this.match(r);
	}
	if(!result){return false;}
	if(result[1] > 23){return false;}
	if(result[2] > 59){return false;}
	return(new Date(0,0,0,result[1], result[2]));
};

String.prototype.toUpperWords = function(){
	//returns a string with the first character of each word capitalized
	return this.replace(/^([a-z])|[\s_]+([a-z])/g, function(sMatch){
		return sMatch.toUpperCase();
	});
};

if(!String.prototype.trim){
	String.prototype.trim = function(){
		//removes whitespace from begin and end of string
		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};
};

Number.prototype.toTwoDec = function(){
	//returns a JavaScript string
	var n;
	if(isNaN(this)){
		return '-,--';
	}
	number =(Math.round(100 * this));
	if(number < 10){
		number = '0,0' + number;
	}else if(number < 100){
		number = '0,' + number;
	}else{
		number = number.toString()
		n = number.length;
		number = number.slice(0, n-2) + ',' + number.slice(n-2, n);
	}
	return number;
};

Number.prototype.toEuro = function(){
	return '&euro;&nbsp;' + this.toTwoDec();
};
