(function () { "use strict";
var $hxClasses = {};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var adobe = {};
adobe.cep = {};
adobe.cep._CSEventScope = {};
adobe.cep._CSEventScope.CSEventScope_Impl_ = function() { };
$hxClasses["adobe.cep._CSEventScope.CSEventScope_Impl_"] = adobe.cep._CSEventScope.CSEventScope_Impl_;
adobe.cep._CSEventScope.CSEventScope_Impl_.__name__ = ["adobe","cep","_CSEventScope","CSEventScope_Impl_"];
adobe.cep._CSEventType = {};
adobe.cep._CSEventType.CSEventType_Impl_ = function() { };
$hxClasses["adobe.cep._CSEventType.CSEventType_Impl_"] = adobe.cep._CSEventType.CSEventType_Impl_;
adobe.cep._CSEventType.CSEventType_Impl_.__name__ = ["adobe","cep","_CSEventType","CSEventType_Impl_"];
adobe.cep._OpenURLInDefaultBrowserCode = {};
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_ = function() { };
$hxClasses["adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_"] = adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_;
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.__name__ = ["adobe","cep","_OpenURLInDefaultBrowserCode","OpenURLInDefaultBrowserCode_Impl_"];
adobe.cep._ScaleFactor = {};
adobe.cep._ScaleFactor.ScaleFactor_Impl_ = function() { };
$hxClasses["adobe.cep._ScaleFactor.ScaleFactor_Impl_"] = adobe.cep._ScaleFactor.ScaleFactor_Impl_;
adobe.cep._ScaleFactor.ScaleFactor_Impl_.__name__ = ["adobe","cep","_ScaleFactor","ScaleFactor_Impl_"];
adobe.cep._UIColorType = {};
adobe.cep._UIColorType.UIColorType_Impl_ = function() { };
$hxClasses["adobe.cep._UIColorType.UIColorType_Impl_"] = adobe.cep._UIColorType.UIColorType_Impl_;
adobe.cep._UIColorType.UIColorType_Impl_.__name__ = ["adobe","cep","_UIColorType","UIColorType_Impl_"];
var common = {};
common.ClassName = function() { };
$hxClasses["common.ClassName"] = common.ClassName;
common.ClassName.__name__ = ["common","ClassName"];
common.FrameAnimationExportInitialErrorEvent = $hxClasses["common.FrameAnimationExportInitialErrorEvent"] = { __ename__ : ["common","FrameAnimationExportInitialErrorEvent"], __constructs__ : ["NONE","ERROR"] };
common.FrameAnimationExportInitialErrorEvent.NONE = ["NONE",0];
common.FrameAnimationExportInitialErrorEvent.NONE.__enum__ = common.FrameAnimationExportInitialErrorEvent;
common.FrameAnimationExportInitialErrorEvent.ERROR = function(error) { var $x = ["ERROR",1,error]; $x.__enum__ = common.FrameAnimationExportInitialErrorEvent; return $x; };
common._FrameAnimationExportInitialErrorEvent = {};
common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_ = function() { };
$hxClasses["common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_"] = common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_;
common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_.__name__ = ["common","_FrameAnimationExportInitialErrorEvent","FrameAnimationExportInitialError_Impl_"];
common.JsxEvent = $hxClasses["common.JsxEvent"] = { __ename__ : ["common","JsxEvent"], __constructs__ : ["NONE","GOTTEN"] };
common.JsxEvent.NONE = ["NONE",0];
common.JsxEvent.NONE.__enum__ = common.JsxEvent;
common.JsxEvent.GOTTEN = function(serializedEvent) { var $x = ["GOTTEN",1,serializedEvent]; $x.__enum__ = common.JsxEvent; return $x; };
var extension = {};
extension.AbstractCSInterface = function(csInterface) {
	this.csInterface = csInterface;
};
$hxClasses["extension.AbstractCSInterface"] = extension.AbstractCSInterface;
extension.AbstractCSInterface.__name__ = ["extension","AbstractCSInterface"];
extension.AbstractCSInterface.create = function() {
	return new extension.AbstractCSInterface(new CSInterface());
};
extension.AbstractCSInterface.prototype = {
	getExtensionUri: function() {
		return "file:///" + this.csInterface.getSystemPath(SystemPath.EXTENSION);
	}
	,getExtensionSystemPath: function() {
		return this.csInterface.getSystemPath(SystemPath.EXTENSION);
	}
	,evalScript: function(script,callback) {
		this.csInterface.evalScript(script,callback);
	}
	,evalFile: function(filePath,callback) {
		this.csInterface.evalScript("$.evalFile(\"" + filePath + "\");",callback);
	}
	,showColorPicker: function(pickForeground,callback) {
		if(pickForeground == null) pickForeground = true;
		return this.csInterface.evalScript("app.showColorPicker(" + (pickForeground == null?"null":"" + pickForeground) + ");",callback);
	}
	,callColorPicker: function(callback) {
		return this.csInterface.evalScript("$.colorPicker();",callback);
	}
	,__class__: extension.AbstractCSInterface
};
extension.FrameAnimationExporterEvent = $hxClasses["extension.FrameAnimationExporterEvent"] = { __ename__ : ["extension","FrameAnimationExporterEvent"], __constructs__ : ["INITIAL_ERROR_EVENT","SUCCESS","NONE"] };
extension.FrameAnimationExporterEvent.INITIAL_ERROR_EVENT = function(error) { var $x = ["INITIAL_ERROR_EVENT",0,error]; $x.__enum__ = extension.FrameAnimationExporterEvent; return $x; };
extension.FrameAnimationExporterEvent.SUCCESS = ["SUCCESS",1];
extension.FrameAnimationExporterEvent.SUCCESS.__enum__ = extension.FrameAnimationExporterEvent;
extension.FrameAnimationExporterEvent.NONE = ["NONE",2];
extension.FrameAnimationExporterEvent.NONE.__enum__ = extension.FrameAnimationExporterEvent;
extension.FrameAnimationExporter = function() {
	this.csInterface = extension.AbstractCSInterface.create();
};
$hxClasses["extension.FrameAnimationExporter"] = extension.FrameAnimationExporter;
extension.FrameAnimationExporter.__name__ = ["extension","FrameAnimationExporter"];
extension.FrameAnimationExporter.prototype = {
	getEvent: function() {
		var n = this.event;
		this.event = extension.FrameAnimationExporterEvent.NONE;
		return n;
	}
	,run: function() {
		this.mainFunction();
	}
	,call: function(frame1offset,ignoredFrame1Output,sameNameLayerIsIdentical) {
		var _g = this;
		this.event = extension.FrameAnimationExporterEvent.NONE;
		this.jsxEvent = common.JsxEvent.NONE;
		var frame1offsetData = haxe.Serializer.run(frame1offset);
		var ignoredFrame1OutputData = haxe.Serializer.run(ignoredFrame1Output);
		var sameNameLayerIsIdenticalData = haxe.Serializer.run(sameNameLayerIsIdentical);
		this.csInterface.evalScript("var " + "frameAnimationExport" + " = new " + "FrameAnimationExport" + "(\"" + frame1offsetData + "\", \"" + ignoredFrame1OutputData + "\", \"" + sameNameLayerIsIdenticalData + "\");");
		this.csInterface.evalScript("" + "frameAnimationExport" + ".getInitialErrorEvent();",function(result) {
			_g.jsxEvent = common.JsxEvent.GOTTEN(result);
		});
		this.mainFunction = $bind(this,this.observeToRecieveInitialErrorEvent);
	}
	,observeToRecieveInitialErrorEvent: function() {
		{
			var _g = this.recieveJsxEvent();
			switch(_g[1]) {
			case 0:
				return;
			case 1:
				var serializedEvent = _g[2];
				var initialErrorEvent = haxe.Unserializer.run(serializedEvent);
				switch(initialErrorEvent[1]) {
				case 1:
					var error = initialErrorEvent[2];
					this.destroy(extension.FrameAnimationExporterEvent.INITIAL_ERROR_EVENT(error));
					break;
				case 0:
					this.execute();
					break;
				}
				break;
			}
		}
	}
	,execute: function() {
		this.csInterface.evalScript("" + "frameAnimationExport" + ".execute();");
		this.destroy(extension.FrameAnimationExporterEvent.SUCCESS);
	}
	,recieveJsxEvent: function() {
		var n = this.jsxEvent;
		this.jsxEvent = common.JsxEvent.NONE;
		return n;
	}
	,destroy: function(event) {
		this.event = event;
		this.mainFunction = $bind(this,this.finish);
	}
	,finish: function() {
	}
	,__class__: extension.FrameAnimationExporter
};
extension.JsxLoader = function() {
	this.csInterface = extension.AbstractCSInterface.create();
	this.loadIndex = 0;
	this.load();
};
$hxClasses["extension.JsxLoader"] = extension.JsxLoader;
extension.JsxLoader.__name__ = ["extension","JsxLoader"];
extension.JsxLoader.prototype = {
	getJsxPath: function(fileName) {
		return this.csInterface.getExtensionSystemPath() + "/jsx/" + fileName + ".jsx";
	}
	,run: function() {
		this.mainFunction();
	}
	,load: function() {
		var _g = this;
		var fileName = extension.JsxLoader.LOAD_JSX_SET[this.loadIndex];
		var filePath = this.csInterface.getExtensionSystemPath() + "/jsx/" + fileName + ".jsx";
		this.loaded = false;
		this.csInterface.evalFile(filePath,function(result) {
			_g.loaded = true;
		});
		this.mainFunction = $bind(this,this.observeToLoad);
	}
	,observeToLoad: function() {
		if(!this.loaded) return;
		if(++this.loadIndex < extension.JsxLoader.LOAD_JSX_SET.length) this.load(); else this.mainFunction = $bind(this,this.finish);
	}
	,finish: function() {
	}
	,isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,__class__: extension.JsxLoader
};
extension.Panel = function() {
	window.addEventListener("load",$bind(this,this.initialize));
};
$hxClasses["extension.Panel"] = extension.Panel;
extension.Panel.__name__ = ["extension","Panel"];
extension.Panel.main = function() {
	new extension.Panel();
};
extension.Panel.prototype = {
	initialize: function(event) {
		this.csInterface = extension.AbstractCSInterface.create();
		this.jsxLoader = new extension.JsxLoader();
		this.frameAnimationExporter = new extension.FrameAnimationExporter();
		if(extension.View.instance == null) this.view = extension.View.instance = new extension.View(); else this.view = extension.View.instance;
		this.startRunning($bind(this,this.loadJsx),50);
	}
	,startRunning: function(func,speed) {
		this.mainFunction = func;
		this.setTimer(speed);
	}
	,changeRunning: function(func,speed) {
		this.timer.stop();
		this.startRunning(func,speed);
	}
	,setTimer: function(speed) {
		this.timer = new haxe.Timer(speed);
		this.timer.run = $bind(this,this.run);
	}
	,run: function() {
		this.mainFunction();
	}
	,loadJsx: function() {
		this.jsxLoader.run();
		if(this.jsxLoader.isFinished()) this.initializeToClickUI();
	}
	,initializeToClickUI: function() {
		this.changeRunning($bind(this,this.observeToClickUI),250);
	}
	,observeToClickUI: function() {
		if(this.view.runButton.isClicked()) this.initializeToCallFrameAnimationExport(false); else if(this.view.runFrame1OffsetButton.isClicked()) this.initializeToCallFrameAnimationExport(true);
	}
	,initializeToCallFrameAnimationExport: function(frame1offset) {
		this.frameAnimationExporter.call(frame1offset,this.view.isIgnoredFrame1Output(),this.view.sameNameLayerIsIdentical());
		this.changeRunning($bind(this,this.callFrameAnimationExport),50);
	}
	,callFrameAnimationExport: function() {
		this.frameAnimationExporter.run();
		var event = this.frameAnimationExporter.getEvent();
		switch(event[1]) {
		case 2:
			return;
		case 0:
			var error = event[2];
			js.Lib.alert(js.Boot.__cast(error , String));
			this.initializeToClickUI();
			break;
		case 1:
			this.initializeToClickUI();
			break;
		}
	}
	,__class__: extension.Panel
};
extension.View = function() {
	this.element = new $("#container");
	this.runButton = new extension.parts.Button(this.element,"run_button");
	this.runFrame1OffsetButton = new extension.parts.Button(this.element,"run_frame1_offset_button");
};
$hxClasses["extension.View"] = extension.View;
extension.View.__name__ = ["extension","View"];
extension.View.get_instance = function() {
	if(extension.View.instance == null) return extension.View.instance = new extension.View(); else return extension.View.instance;
};
extension.View.prototype = {
	isIgnoredFrame1Output: function() {
		return this.isChecked("ignored_frame1_output");
	}
	,sameNameLayerIsIdentical: function() {
		return this.isChecked("same_name_layer_is_identical");
	}
	,isChecked: function(className) {
		return new $("." + className,this.element)["is"](":checked");
	}
	,__class__: extension.View
};
extension.parts = {};
extension.parts.Button = function(parentElement,className) {
	var _g = this;
	this.element = new $("." + className,parentElement);
	this.element.click(function(event) {
		_g.clicked = true;
	});
};
$hxClasses["extension.parts.Button"] = extension.parts.Button;
extension.parts.Button.__name__ = ["extension","parts","Button"];
extension.parts.Button.prototype = {
	isClicked: function() {
		var n = this.clicked;
		this.clicked = false;
		return n;
	}
	,disable: function() {
		this.element.attr("disabled","disabled");
	}
	,removeDisabled: function() {
		this.element.removeAttr("disabled");
	}
	,isDisabled: function() {
		return this.element.attr("disabled") != null;
	}
	,__class__: extension.parts.Button
};
var haxe = {};
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
};
haxe.Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(Math.isNaN(v2)) this.buf.b += "k"; else if(!Math.isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,__class__: haxe.Serializer
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
};
haxe.Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe.io.Bytes
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Lib = function() { };
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
adobe.cep._CSEventScope.CSEventScope_Impl_.GLOBAL = "GLOBAL";
adobe.cep._CSEventScope.CSEventScope_Impl_.APPLICATION = "APPLICATION";
adobe.cep._CSEventType.CSEventType_Impl_.PERSISTENT = "com.adobe.PhotoshopPersistent";
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.NO_ERROR = 0;
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.ERR_UNKNOWN = 1;
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.ERR_INVALID_PARAMS = 2;
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.ERR_INVALID_URL = 201;
adobe.cep._ScaleFactor.ScaleFactor_Impl_.FAIL = -1;
adobe.cep._ScaleFactor.ScaleFactor_Impl_.NORMAL = 1;
adobe.cep._ScaleFactor.ScaleFactor_Impl_.HiDPI = 2;
adobe.cep._UIColorType.UIColorType_Impl_.RGB = 1;
adobe.cep._UIColorType.UIColorType_Impl_.GRADATION = 2;
common.ClassName.FRAME_ANIMATION_EXPORT = "FrameAnimationExport";
common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_.UNOPENED_DOCUMENT = "Unopened document.";
extension.FrameAnimationExporter.INSTANCE_NAME = "frameAnimationExport";
extension.JsxLoader.JSX_DIRECTORY = "/jsx/";
extension.JsxLoader.JSX_EXTENSION = ".jsx";
extension.JsxLoader.LOAD_JSX_SET = ["FrameAnimationExport"];
extension.Panel.TIMER_SPEED_CALM = 250;
extension.Panel.TIMER_SPEED_RUNNING = 50;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
extension.Panel.main();
})();

//# sourceMappingURL=index.js.map