var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = $hxClasses["HxOverrides"] = function() { };
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
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
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
var IMap = $hxClasses["IMap"] = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = $hxClasses["Reflect"] = function() { };
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
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = $hxClasses["Std"] = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = $hxClasses["StringTools"] = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { };
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
var adobe = adobe || {};
if(!adobe._FileOpenMode) adobe._FileOpenMode = {};
adobe._FileOpenMode.FileOpenMode_Impl_ = $hxClasses["adobe._FileOpenMode.FileOpenMode_Impl_"] = function() { };
adobe._FileOpenMode.FileOpenMode_Impl_.__name__ = ["adobe","_FileOpenMode","FileOpenMode_Impl_"];
var common = common || {};
common.FrameAnimationExportInitialErrorEvent = $hxClasses["common.FrameAnimationExportInitialErrorEvent"] = { __ename__ : ["common","FrameAnimationExportInitialErrorEvent"], __constructs__ : ["NONE","ERROR"] };
common.FrameAnimationExportInitialErrorEvent.NONE = ["NONE",0];
common.FrameAnimationExportInitialErrorEvent.NONE.toString = $estr;
common.FrameAnimationExportInitialErrorEvent.NONE.__enum__ = common.FrameAnimationExportInitialErrorEvent;
common.FrameAnimationExportInitialErrorEvent.ERROR = function(error) { var $x = ["ERROR",1,error]; $x.__enum__ = common.FrameAnimationExportInitialErrorEvent; $x.toString = $estr; return $x; };
if(!common._FrameAnimationExportInitialErrorEvent) common._FrameAnimationExportInitialErrorEvent = {};
common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_ = $hxClasses["common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_"] = function() { };
common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_.__name__ = ["common","_FrameAnimationExportInitialErrorEvent","FrameAnimationExportInitialError_Impl_"];
var haxe = haxe || {};
haxe.Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
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
if(!haxe._Template) haxe._Template = {};
haxe._Template.TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] };
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe.Template = $hxClasses["haxe.Template"] = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + Std.string(tokens.first().s) + "'";
};
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype = {
	execute: function(context,macros) {
		if(macros == null) this.macros = { }; else this.macros = macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,resolve: function(v) {
		if(Object.prototype.hasOwnProperty.call(this.context,v)) return Reflect.field(this.context,v);
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Object.prototype.hasOwnProperty.call(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe.Template.globals,v);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			var params = [];
			var part = "";
			while(true) {
				var c = HxOverrides.cca(data,parp);
				parp++;
				if(c == 40) npar++; else if(c == 41) {
					npar--;
					if(npar <= 0) break;
				} else if(c == null) throw "Unclosed macro parenthesis";
				if(c == 44 && npar == 1) {
					params.push(part);
					part = "";
				} else part += String.fromCharCode(c);
			}
			params.push(part);
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e1 = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t2 = tokens.pop();
			if(t2 == null || t2.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e1,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		var _g = p.p;
		switch(_g) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
			var _g1 = p1.p;
			switch(_g1) {
			case "+":
				return function() {
					return e1() + e2();
				};
			case "-":
				return function() {
					return e1() - e2();
				};
			case "*":
				return function() {
					return e1() * e2();
				};
			case "/":
				return function() {
					return e1() / e2();
				};
			case ">":
				return function() {
					return e1() > e2();
				};
			case "<":
				return function() {
					return e1() < e2();
				};
			case ">=":
				return function() {
					return e1() >= e2();
				};
			case "<=":
				return function() {
					return e1() <= e2();
				};
			case "==":
				return function() {
					return e1() == e2();
				};
			case "!=":
				return function() {
					return e1() != e2();
				};
			case "&&":
				return function() {
					return e1() && e2();
				};
			case "||":
				return function() {
					return e1() || e2();
				};
			default:
				throw "Unknown operation " + p1.p;
			}
			break;
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw p.p;
	}
	,run: function(e) {
		switch(e[1]) {
		case 0:
			var v = e[2];
			this.buf.add(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = e[2];
			this.buf.add(Std.string(e1()));
			break;
		case 2:
			var eelse = e[4];
			var eif = e[3];
			var e2 = e[2];
			var v1 = e2();
			if(v1 == null || v1 == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = e[2];
			if(str == null) this.buf.b += "null"; else this.buf.b += "" + str;
			break;
		case 4:
			var l = e[2];
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e3 = $it0.next();
				this.run(e3);
			}
			break;
		case 5:
			var loop = e[3];
			var e4 = e[2];
			var v2 = e4();
			try {
				var x = $iterator(v2)();
				if(x.hasNext == null) throw null;
				v2 = x;
			} catch( e5 ) {
				try {
					if(v2.hasNext == null) throw null;
				} catch( e6 ) {
					throw "Cannot iter on " + Std.string(v2);
				}
			}
			this.stack.push(this.context);
			var v3 = v2;
			while( v3.hasNext() ) {
				var ctx = v3.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = e[3];
			var m = e[2];
			var v4 = Reflect.field(this.macros,m);
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				switch(p[1]) {
				case 0:
					var v5 = p[2];
					pl.push(this.resolve(v5));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.add(Std.string(v4.apply(this.macros,pl)));
			} catch( e7 ) {
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( e8 ) {
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e7) + ")";
				throw msg;
			}
			break;
		}
	}
	,__class__: haxe.Template
};
haxe.Unserializer = $hxClasses["haxe.Unserializer"] = function(buf) {
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
if(!haxe.ds) haxe.ds = {};
haxe.ds.IntMap = $hxClasses["haxe.ds.IntMap"] = function() {
	this.h = { };
};
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
haxe.ds.ObjectMap = $hxClasses["haxe.ds.ObjectMap"] = function() {
	this.h = { };
	this.h.__keys__ = { };
};
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
haxe.ds.StringMap = $hxClasses["haxe.ds.StringMap"] = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
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
if(!haxe.io) haxe.io = {};
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
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
haxe.io.Eof = $hxClasses["haxe.io.Eof"] = function() { };
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
var js = js || {};
js.Boot = $hxClasses["js.Boot"] = function() { };
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
js.Lib = $hxClasses["js.Lib"] = function() { };
js.Lib.__name__ = ["js","Lib"];
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
var FrameAnimationExport = $hxClasses["FrameAnimationExport"] = function(frame1offsetData,ignoredFrame1OutputData,sameNameLayerIsIdenticalData) {
	var ignoredFrame1Output = haxe.Unserializer.run(ignoredFrame1OutputData);
	var frame1offset = haxe.Unserializer.run(frame1offsetData);
	var sameNameLayerIsIdentical = haxe.Unserializer.run(sameNameLayerIsIdenticalData);
	(jsx.OptionalParameter.instance == null?jsx.OptionalParameter.instance = new jsx.OptionalParameter():jsx.OptionalParameter.instance).set(frame1offset,ignoredFrame1Output,sameNameLayerIsIdentical);
	this.application = psd.Lib.app;
};
FrameAnimationExport.__name__ = ["FrameAnimationExport"];
FrameAnimationExport.main = function() {
	jsx._FrameAnimationExport.FrameAnimationExportJSXRunner.execute(true,false,false);
};
FrameAnimationExport.prototype = {
	getInitialErrorEvent: function() {
		var error;
		if(this.application.documents.length == 0) error = "Unopened document."; else error = null;
		var event;
		if(error == null) event = common.FrameAnimationExportInitialErrorEvent.NONE; else event = common.FrameAnimationExportInitialErrorEvent.ERROR(error);
		return haxe.Serializer.run(event);
	}
	,execute: function() {
		this.activeDocument = this.application.activeDocument;
		this.createDirectory();
	}
	,createDirectory: function() {
		{
			var _g = jsx.output.DirectoryCreation.execute();
			switch(_g[1]) {
			case 0:
				var error = _g[2];
				switch(error) {
				case "Folder selection error.":
					return;
				default:
					js.Lib.alert(error);
				}
				break;
			case 1:
				this.parse();
				break;
			}
		}
	}
	,parse: function() {
		this.layerStructures = new jsx.parser.layer.LayerStructures(this.activeDocument);
		this.layerStructures.parse();
		this.directoryStructure = new jsx.parser.directory.DirectoryStructure();
		this.directoryStructure.parse(this.layerStructures.imagePathMap);
		var arr = this.activeDocument.name.split(".");
		if(arr.length > 1) arr.pop();
		this.information = { filename : arr.join(".")};
		this.output();
	}
	,output: function() {
		var result = this.outputJson();
		if(!result) js.Lib.alert("Json output error."); else this.outputImage();
		js.Lib.alert("finish");
	}
	,outputJson: function() {
		var jsonExport = new jsx.output.JsonExport(this.layerStructures,this.directoryStructure.rootDirectoryData,this.information);
		return jsonExport.execute();
	}
	,outputImage: function() {
		psd.Lib.preferences.rulerUnits = Units.PIXELS;
		var $it0 = this.layerStructures.imagePathMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var layerProperty = this.layerStructures.imagePathMap.get(key);
			var outputImage = new jsx.output.ImageExport(this.application,layerProperty);
			outputImage.execute();
		}
		this.activeDocument.selection.deselect();
	}
	,__class__: FrameAnimationExport
};
var jsx = jsx || {};
if(!jsx._FrameAnimationExport) jsx._FrameAnimationExport = {};
jsx._FrameAnimationExport.FrameAnimationExportJSXRunner = $hxClasses["jsx._FrameAnimationExport.FrameAnimationExportJSXRunner"] = function() { };
jsx._FrameAnimationExport.FrameAnimationExportJSXRunner.__name__ = ["jsx","_FrameAnimationExport","FrameAnimationExportJSXRunner"];
jsx._FrameAnimationExport.FrameAnimationExportJSXRunner.execute = function(frame1offset,ignoredFrame1Output,sameNameLayerIsIdentical) {
	var frame1offsetData = haxe.Serializer.run(frame1offset);
	var ignoredFrame1OutputData = haxe.Serializer.run(ignoredFrame1Output);
	var sameNameLayerIsIdenticalData = haxe.Serializer.run(sameNameLayerIsIdentical);
	var frameAnimationExport = new FrameAnimationExport(frame1offsetData,ignoredFrame1OutputData,sameNameLayerIsIdenticalData);
	var errorEvent = haxe.Unserializer.run(frameAnimationExport.getInitialErrorEvent());
	switch(errorEvent[1]) {
	case 1:
		var error = errorEvent[2];
		js.Lib.alert(js.Boot.__cast(error , String));
		break;
	case 0:
		frameAnimationExport.execute();
		break;
	}
};
jsx.OptionalParameter = $hxClasses["jsx.OptionalParameter"] = function() {
};
jsx.OptionalParameter.__name__ = ["jsx","OptionalParameter"];
jsx.OptionalParameter.get_instance = function() {
	if(jsx.OptionalParameter.instance == null) return jsx.OptionalParameter.instance = new jsx.OptionalParameter(); else return jsx.OptionalParameter.instance;
};
jsx.OptionalParameter.prototype = {
	set: function(frame1offset,ignoredFrame1Output,sameNameLayerIsIdentical) {
		this.frame1offset = frame1offset;
		this.ignoredFrame1Output = ignoredFrame1Output;
		this.sameNameLayerIsIdentical = sameNameLayerIsIdentical;
	}
	,__class__: jsx.OptionalParameter
};
if(!jsx.json_convertion) jsx.json_convertion = {};
jsx.json_convertion.JsonStructure = $hxClasses["jsx.json_convertion.JsonStructure"] = function() { };
jsx.json_convertion.JsonStructure.__name__ = ["jsx","json_convertion","JsonStructure"];
if(!jsx.json_convertion.directory) jsx.json_convertion.directory = {};
jsx.json_convertion.directory.DirectoryStructureToJsonConverter = $hxClasses["jsx.json_convertion.directory.DirectoryStructureToJsonConverter"] = function() { };
jsx.json_convertion.directory.DirectoryStructureToJsonConverter.__name__ = ["jsx","json_convertion","directory","DirectoryStructureToJsonConverter"];
jsx.json_convertion.directory.DirectoryStructureToJsonConverter.execute = function(directoryData) {
	var directory = directoryData.toDirectory();
	return jsx.json_convertion.directory.DirectoryStructureToJsonConverter.executeRoop(directory);
};
jsx.json_convertion.directory.DirectoryStructureToJsonConverter.executeRoop = function(directory,nest) {
	if(nest == null) nest = 0;
	var tab = "";
	var _g = 0;
	while(_g < nest) {
		var i = _g++;
		tab += "\t";
	}
	var template = new haxe.Template("::tab::{\r\n::tab::\t\"name\":\"::name::\",\r\n::tab::\t\"files\":[\r\n::files::\r\n::tab::\t],\r\n::tab::\t\"directories\":[\r\n::directories::\r\n::tab::\t]\r\n::tab::}");
	var json = template.execute({ tab : tab, name : directory.name, files : jsx.json_convertion.directory.DirectoryStructureToJsonConverter.filesToJson(directory.files,tab), directories : jsx.json_convertion.directory.DirectoryStructureToJsonConverter.childDirectoriesToJson(directory.directories,++nest)});
	return json;
};
jsx.json_convertion.directory.DirectoryStructureToJsonConverter.filesToJson = function(files,tab) {
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		tab += "\t";
	}
	var json = "";
	var _g1 = 0;
	var _g2 = files.length;
	while(_g1 < _g2) {
		var i1 = _g1++;
		var file = files[i1];
		json += "" + tab + "\"" + file + "\"";
		if(i1 < files.length - 1) json += "," + "\n";
	}
	return json;
};
jsx.json_convertion.directory.DirectoryStructureToJsonConverter.childDirectoriesToJson = function(directories,nest) {
	var json = "";
	var _g1 = 0;
	var _g = directories.length;
	while(_g1 < _g) {
		var i = _g1++;
		var childDirectory = directories[i];
		json += jsx.json_convertion.directory.DirectoryStructureToJsonConverter.executeRoop(childDirectory,nest + 1);
		if(i < directories.length - 1) json += "," + "\n";
	}
	return json;
};
if(!jsx.json_convertion.info) jsx.json_convertion.info = {};
jsx.json_convertion.info.PhotoshopInfomationToJsonConverter = $hxClasses["jsx.json_convertion.info.PhotoshopInfomationToJsonConverter"] = function() { };
jsx.json_convertion.info.PhotoshopInfomationToJsonConverter.__name__ = ["jsx","json_convertion","info","PhotoshopInfomationToJsonConverter"];
jsx.json_convertion.info.PhotoshopInfomationToJsonConverter.toJson = function(infomation) {
	var template = new haxe.Template("{\r\n\t\"filename\":\"::filename::\"\r\n}");
	return template.execute({ filename : infomation.filename});
};
if(!jsx.json_convertion.layer) jsx.json_convertion.layer = {};
jsx.json_convertion.layer.LayerStructueToJsonConverter = $hxClasses["jsx.json_convertion.layer.LayerStructueToJsonConverter"] = function() { };
jsx.json_convertion.layer.LayerStructueToJsonConverter.__name__ = ["jsx","json_convertion","layer","LayerStructueToJsonConverter"];
jsx.json_convertion.layer.LayerStructueToJsonConverter.execute = function(photoshopLayerSets) {
	return jsx.json_convertion.layer.LayerStructueToJsonConverter.toJson(photoshopLayerSets,jsx.json_convertion.layer.LayerToJsonConverter.toJson);
};
jsx.json_convertion.layer.LayerStructueToJsonConverter.toJson = function(photoshopLayerSets,toFunction) {
	var json = "[" + "\n";
	var _g1 = 0;
	var _g = photoshopLayerSets.length;
	while(_g1 < _g) {
		var i = _g1++;
		var photoshopLayerSet = photoshopLayerSets[i];
		var setLines = "\t" + "[" + "\n";
		var _g3 = 0;
		var _g2 = photoshopLayerSet.length;
		while(_g3 < _g2) {
			var j = _g3++;
			var photoshopLayer = photoshopLayerSet[j];
			var lines = toFunction(photoshopLayer);
			if(j < photoshopLayerSet.length - 1) lines += ",";
			lines += "\n";
			setLines += lines;
		}
		setLines += "\t" + "]";
		if(i < photoshopLayerSets.length - 1) setLines += ",";
		setLines += "\n";
		json += setLines;
	}
	json += "]";
	return json;
};
jsx.json_convertion.layer.LayerStructueToJsonConverter.executeIndex = function(pathSet) {
	var json = "[" + "\n";
	var _g1 = 0;
	var _g = pathSet.length;
	while(_g1 < _g) {
		var i = _g1++;
		var line = "" + "\t" + "\"" + pathSet[i] + "\"";
		if(i < pathSet.length - 1) line += ",";
		line += "\n";
		json += line;
	}
	json += "]";
	return json;
};
jsx.json_convertion.layer.LayerToJsonConverter = $hxClasses["jsx.json_convertion.layer.LayerToJsonConverter"] = function() { };
jsx.json_convertion.layer.LayerToJsonConverter.__name__ = ["jsx","json_convertion","layer","LayerToJsonConverter"];
jsx.json_convertion.layer.LayerToJsonConverter.toJson = function(photoshopLayer) {
	return jsx.json_convertion.layer.LayerToJsonConverter.toCommon(photoshopLayer,"\t\t{\r\n\t\t\t\"name\":\"::name::\",\r\n\t\t\t\"directory\":\"::directory::\",\r\n\t\t\t\"path\":\"::path::\",\r\n\t\t\t\"x\":::x::,\r\n\t\t\t\"y\":::y::,\r\n\t\t\t\"opacity\":::opacity::\r\n\t\t}");
};
jsx.json_convertion.layer.LayerToJsonConverter.toCommon = function(photoshopLayer,templateString) {
	var template = new haxe.Template(templateString);
	return template.execute({ name : photoshopLayer.name, directory : photoshopLayer.directory, path : photoshopLayer.path, x : photoshopLayer.x, y : photoshopLayer.y, opacity : photoshopLayer.opacity});
};
if(!jsx.output) jsx.output = {};
jsx.output.DirectoryCreationEvent = $hxClasses["jsx.output.DirectoryCreationEvent"] = { __ename__ : ["jsx","output","DirectoryCreationEvent"], __constructs__ : ["ERROR","SUCCESS"] };
jsx.output.DirectoryCreationEvent.ERROR = function(error) { var $x = ["ERROR",0,error]; $x.__enum__ = jsx.output.DirectoryCreationEvent; $x.toString = $estr; return $x; };
jsx.output.DirectoryCreationEvent.SUCCESS = ["SUCCESS",1];
jsx.output.DirectoryCreationEvent.SUCCESS.toString = $estr;
jsx.output.DirectoryCreationEvent.SUCCESS.__enum__ = jsx.output.DirectoryCreationEvent;
if(!jsx.output._DirectoryCreation) jsx.output._DirectoryCreation = {};
jsx.output._DirectoryCreation.DirectoryCreationError_Impl_ = $hxClasses["jsx.output._DirectoryCreation.DirectoryCreationError_Impl_"] = function() { };
jsx.output._DirectoryCreation.DirectoryCreationError_Impl_.__name__ = ["jsx","output","_DirectoryCreation","DirectoryCreationError_Impl_"];
jsx.output.DirectoryCreation = $hxClasses["jsx.output.DirectoryCreation"] = function() { };
jsx.output.DirectoryCreation.__name__ = ["jsx","output","DirectoryCreation"];
jsx.output.DirectoryCreation.execute = function() {
	var selectedFolder = Folder.selectDialog();
	if(selectedFolder == null) return jsx.output.DirectoryCreationEvent.ERROR("Folder selection error.");
	var outputDirectoryPath = [selectedFolder.relativeURI,"frame_animation_export"].join("/");
	var outputFolder = new Folder(outputDirectoryPath);
	if(!outputFolder.create()) return jsx.output.DirectoryCreationEvent.ERROR("Output folder creation error.");
	var assetsDirectoryPath = [outputDirectoryPath,"assets"].join("/");
	var outputAssetsFolder = new Folder(assetsDirectoryPath);
	if(!outputAssetsFolder.create()) return jsx.output.DirectoryCreationEvent.ERROR("Output assets folder creation error.");
	var jsonLayerPath = [outputDirectoryPath,"json","layer"].join("/");
	var jsonLayerFolder = new Folder(jsonLayerPath);
	if(!jsonLayerFolder.create()) return jsx.output.DirectoryCreationEvent.ERROR("Output json layer folder creation error.");
	var jsonDirectoryPath = [outputDirectoryPath,"json","directory"].join("/");
	var jsonDirectoryFolder = new Folder(jsonDirectoryPath);
	if(!jsonDirectoryFolder.create()) return jsx.output.DirectoryCreationEvent.ERROR("Output json assets folder creation error.");
	(jsx.output.OutputPath.instance == null?jsx.output.OutputPath.instance = new jsx.output.OutputPath():jsx.output.OutputPath.instance).setData(outputDirectoryPath,assetsDirectoryPath,jsonLayerPath,jsonDirectoryPath);
	return jsx.output.DirectoryCreationEvent.SUCCESS;
};
jsx.output.ImageExport = $hxClasses["jsx.output.ImageExport"] = function(application,layerProperty) {
	this.application = application;
	this.layerProperty = layerProperty;
};
jsx.output.ImageExport.__name__ = ["jsx","output","ImageExport"];
jsx.output.ImageExport.prototype = {
	execute: function() {
		var defaultVisible = this.layerProperty.layer.visible;
		this.layerProperty.layer.visible = true;
		this.createDirectory();
		this.prepare();
		this.executeInNewDocument();
		this.layerProperty.layer.visible = defaultVisible;
	}
	,createDirectory: function() {
		var imageDirectoryPath = [(jsx.output.OutputPath.instance == null?jsx.output.OutputPath.instance = new jsx.output.OutputPath():jsx.output.OutputPath.instance).outputAssetsDirectoryPath,this.layerProperty.getDirectoryPathString()].join("/");
		var folder = new Folder(imageDirectoryPath);
		if(!folder.exists) folder.create();
	}
	,prepare: function() {
		var document = this.application.activeDocument;
		document.activeLayer = this.layerProperty.layer;
		jsx.util.PrivateAPI.selectShapeBorder(this.layerProperty.layer);
		document.selection.copy(false);
	}
	,executeInNewDocument: function() {
		var newDocument = this.application.documents.add(Std["int"](this.layerProperty.bounds.get_width()),Std["int"](this.layerProperty.bounds.get_height()),72,null,null,DocumentFill.TRANSPARENT);
		newDocument.paste();
		var exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();
		exportOptionsSaveForWeb.format = SaveDocumentType.PNG;
		exportOptionsSaveForWeb.PNG8 = false;
		var outputPath = [(jsx.output.OutputPath.instance == null?jsx.output.OutputPath.instance = new jsx.output.OutputPath():jsx.output.OutputPath.instance).outputDirectoryPath,"assets",this.layerProperty.path].join("/");
		newDocument.exportDocument(new File(outputPath + ".png"),ExportType.SAVEFORWEB,exportOptionsSaveForWeb);
		newDocument.close(SaveOptions.DONOTSAVECHANGES);
	}
	,__class__: jsx.output.ImageExport
};
jsx.output.JsonExport = $hxClasses["jsx.output.JsonExport"] = function(layerStructures,directoryData,information) {
	this.layerStructures = layerStructures;
	this.directoryData = directoryData;
	this.information = information;
};
jsx.output.JsonExport.__name__ = ["jsx","output","JsonExport"];
jsx.output.JsonExport.prototype = {
	execute: function() {
		var result = this.executeLayer();
		if(!result) return false;
		result = this.executeDirectory();
		if(!result) return false;
		result = this.executeInformation();
		if(!result) return false;
		return true;
	}
	,executeLayer: function() {
		var jsonOutputDirectory = (jsx.output.OutputPath.instance == null?jsx.output.OutputPath.instance = new jsx.output.OutputPath():jsx.output.OutputPath.instance).jsonLayerPath + "/";
		var result = this.write(jsx.json_convertion.layer.LayerStructueToJsonConverter.execute(this.layerStructures.photoshopLayerSets),jsonOutputDirectory,"structure" + ".json");
		if(!result) return false;
		return this.write(jsx.json_convertion.layer.LayerStructueToJsonConverter.executeIndex(this.layerStructures.usedPathSet),jsonOutputDirectory,"index" + ".json");
		return true;
	}
	,executeDirectory: function() {
		var jsonOutputDirectory = (jsx.output.OutputPath.instance == null?jsx.output.OutputPath.instance = new jsx.output.OutputPath():jsx.output.OutputPath.instance).jsonDirectoryPath + "/";
		return this.write(jsx.json_convertion.directory.DirectoryStructureToJsonConverter.execute(this.directoryData),jsonOutputDirectory,"structure" + ".json");
	}
	,executeInformation: function() {
		var jsonOutputDirectory = [(jsx.output.OutputPath.instance == null?jsx.output.OutputPath.instance = new jsx.output.OutputPath():jsx.output.OutputPath.instance).outputDirectoryPath,"json"].join("/") + "/";
		return this.write(jsx.json_convertion.info.PhotoshopInfomationToJsonConverter.toJson(this.information),jsonOutputDirectory,"info" + ".json");
	}
	,write: function(json,jsonOutputDirectory,fileName) {
		var path = jsonOutputDirectory + fileName;
		var file = new File(path);
		var opened = file.open("w");
		if(opened) {
			file.write(json);
			file.close();
		}
		return opened;
	}
	,__class__: jsx.output.JsonExport
};
jsx.output.OutputPath = $hxClasses["jsx.output.OutputPath"] = function() {
};
jsx.output.OutputPath.__name__ = ["jsx","output","OutputPath"];
jsx.output.OutputPath.get_instance = function() {
	if(jsx.output.OutputPath.instance == null) return jsx.output.OutputPath.instance = new jsx.output.OutputPath(); else return jsx.output.OutputPath.instance;
};
jsx.output.OutputPath.prototype = {
	setData: function(outputDirectoryPath,outputAssetsDirectoryPath,jsonLayerPath,jsonDirectoryPath) {
		this.outputDirectoryPath = outputDirectoryPath;
		this.outputAssetsDirectoryPath = outputAssetsDirectoryPath;
		this.jsonLayerPath = jsonLayerPath;
		this.jsonDirectoryPath = jsonDirectoryPath;
	}
	,__class__: jsx.output.OutputPath
};
if(!jsx.parser) jsx.parser = {};
if(!jsx.parser.directory) jsx.parser.directory = {};
jsx.parser.directory.DirectoryData = $hxClasses["jsx.parser.directory.DirectoryData"] = function(name) {
	if(name == null) name = "";
	this.name = name;
	this.files = [];
	this.directoryDataMap = new haxe.ds.StringMap();
};
jsx.parser.directory.DirectoryData.__name__ = ["jsx","parser","directory","DirectoryData"];
jsx.parser.directory.DirectoryData.prototype = {
	addFile: function(fileName) {
		this.files.push(fileName);
	}
	,getChild: function(childDirectoryName) {
		if(!this.directoryDataMap.exists(childDirectoryName)) {
			var v = new jsx.parser.directory.DirectoryData(childDirectoryName);
			this.directoryDataMap.set(childDirectoryName,v);
			v;
		}
		return this.directoryDataMap.get(childDirectoryName);
	}
	,toDirectory: function() {
		var directories = [];
		var $it0 = this.directoryDataMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var directoryData = this.directoryDataMap.get(key);
			directories.push(directoryData.toDirectory());
		}
		return { name : this.name, files : this.files, directories : directories};
	}
	,__class__: jsx.parser.directory.DirectoryData
};
jsx.parser.directory.DirectoryStructure = $hxClasses["jsx.parser.directory.DirectoryStructure"] = function() {
	this.rootDirectoryData = new jsx.parser.directory.DirectoryData();
};
jsx.parser.directory.DirectoryStructure.__name__ = ["jsx","parser","directory","DirectoryStructure"];
jsx.parser.directory.DirectoryStructure.prototype = {
	parse: function(imagePathMap) {
		var $it0 = imagePathMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var directoryData = this.rootDirectoryData;
			var layerData = imagePathMap.get(key);
			var directoryPath = layerData.directoryPath.slice();
			if(directoryPath.length == 0) {
				directoryData.addFile(layerData.fileName);
				continue;
			}
			var _g1 = 0;
			var _g = directoryPath.length;
			while(_g1 < _g) {
				var i = _g1++;
				var directoryName = directoryPath[i];
				directoryData = directoryData.getChild(directoryName);
				if(i == directoryPath.length - 1) directoryData.addFile(layerData.fileName);
			}
		}
	}
	,__class__: jsx.parser.directory.DirectoryStructure
};
if(!jsx.parser.layer) jsx.parser.layer = {};
jsx.parser.layer.LayerProperty = $hxClasses["jsx.parser.layer.LayerProperty"] = function(layer,directoryPath) {
	this.layer = layer;
	this.directoryPath = directoryPath;
	this.bounds = jsx.util.Bounds.convert(layer.bounds);
	this.x = this.bounds.left;
	this.y = this.bounds.top;
	this.opacity = Math.round(layer.opacity);
	this.fileName = new EReg(" ","g").replace(layer.name,"-");
	this.setPath(this.fileName);
};
jsx.parser.layer.LayerProperty.__name__ = ["jsx","parser","layer","LayerProperty"];
jsx.parser.layer.LayerProperty.prototype = {
	renameLayer: function(renamedName) {
		this.renamedFileName = renamedName;
		var visible = this.layer.visible;
		this.layer.name = renamedName;
		this.layer.visible = visible;
		this.setPath(renamedName);
	}
	,renameToOriginalName: function() {
		if(this.renamedFileName != null) {
			var visible = this.layer.visible;
			this.layer.name = this.fileName;
			this.layer.visible = visible;
		}
	}
	,setPath: function(fileName) {
		if(this.directoryPath.length == 0) this.path = fileName; else this.path = [this.directoryPath.join("/"),fileName].join("/");
	}
	,offsetPosition: function(point) {
		this.x -= point.x;
		this.y -= point.y;
	}
	,toPhotoshopLayer: function() {
		var photoshopLayer = { name : this.fileName, directory : this.getDirectoryPathString(), path : this.path, x : this.x, y : this.y, opacity : this.opacity};
		return photoshopLayer;
	}
	,getDirectoryPathString: function() {
		return this.directoryPath.join("/");
	}
	,__class__: jsx.parser.layer.LayerProperty
};
jsx.parser.layer.LayerStructure = $hxClasses["jsx.parser.layer.LayerStructure"] = function(layers,parentDirectoryPath,includedInvisibleLayer) {
	this.layers = layers;
	this.parentDirectoryPath = parentDirectoryPath;
	this.includedInvisibleLayer = includedInvisibleLayer;
	this.layerPropertySet = [];
};
jsx.parser.layer.LayerStructure.__name__ = ["jsx","parser","layer","LayerStructure"];
jsx.parser.layer.LayerStructure.prototype = {
	parse: function() {
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var layer = this.layers[i];
			if(!this.includedInvisibleLayer && !layer.visible) continue;
			if(layer.typename == LayerTypeName.LAYER_SET) {
				var layerSet;
				layerSet = js.Boot.__cast(layer , LayerSet);
				var directoryPath = this.parentDirectoryPath.slice();
				directoryPath.push(layer.name);
				var childLayerStructure = new jsx.parser.layer.LayerStructure(layerSet.layers,directoryPath,this.includedInvisibleLayer);
				childLayerStructure.parse();
				this.layerPropertySet = this.layerPropertySet.concat(childLayerStructure.layerPropertySet);
			} else {
				var layerProperty = new jsx.parser.layer.LayerProperty(layer,this.parentDirectoryPath);
				if(!layerProperty.bounds.isNull()) this.layerPropertySet.push(layerProperty);
			}
		}
	}
	,getPhotoshopLayerSet: function() {
		var photoshopLayerSet = [];
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			photoshopLayerSet.push(layerProperty.toPhotoshopLayer());
		}
		return photoshopLayerSet;
	}
	,createImagePathMap: function() {
		var imagePathMap = new haxe.ds.StringMap();
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			imagePathMap.set(layerProperty.path,layerProperty);
			layerProperty;
		}
		return imagePathMap;
	}
	,createUsedPathSet: function(allFrameImagepathMap) {
		var tempPathSet;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.layerPropertySet;
		while(_g1 < _g2.length) {
			var layerProperty = _g2[_g1];
			++_g1;
			_g.push(new jsx.parser.layer.TempPath(layerProperty.path));
		}
		tempPathSet = _g;
		var $it0 = allFrameImagepathMap.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var _g11 = 0;
			while(_g11 < tempPathSet.length) {
				var tempPath = tempPathSet[_g11];
				++_g11;
				if(tempPath.path == path) {
					tempPath.visible = true;
					if(!(jsx.OptionalParameter.instance == null?jsx.OptionalParameter.instance = new jsx.OptionalParameter():jsx.OptionalParameter.instance).sameNameLayerIsIdentical) break;
				}
			}
		}
		var usedPathSet = [];
		var _g12 = 0;
		while(_g12 < tempPathSet.length) {
			var tempPath1 = tempPathSet[_g12];
			++_g12;
			if(tempPath1.visible) usedPathSet.push(tempPath1.path);
		}
		return usedPathSet;
	}
	,getOffsetPosition: function() {
		var offsetX = null;
		var offsetY = null;
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			if(offsetX == null || layerProperty.x < offsetX) offsetX = layerProperty.x;
			if(offsetY == null || layerProperty.y < offsetY) offsetY = layerProperty.y;
		}
		return new jsx.util.Point(offsetX,offsetY);
	}
	,offsetPosition: function(point) {
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			layerProperty.offsetPosition(point);
		}
	}
	,renameSameNameLayer: function() {
		var layerNameMap = new haxe.ds.StringMap();
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			if(layerNameMap.get(layerProperty.path) == null) {
				layerNameMap.set(layerProperty.path,layerProperty);
				layerProperty;
				continue;
			}
			var arr = layerProperty.path.split("_");
			var copyIdString;
			if(arr.length == 1) copyIdString = "1"; else copyIdString = arr[arr.length - 1];
			var copyId = Std.parseInt(copyIdString);
			if(copyId == null) {
				layerNameMap.set(layerProperty.path,layerProperty);
				layerProperty;
				continue;
			}
			this.renameSameLayerIncrementRoop(layerNameMap,layerProperty,copyId);
		}
	}
	,renameSameLayerIncrementRoop: function(layerNameMap,layerProperty,copyId) {
		var renamedLayerName;
		renamedLayerName = layerProperty.fileName + "_" + (copyId == null?"null":"" + copyId);
		if(layerNameMap.get(renamedLayerName) == null) {
			layerNameMap.set(renamedLayerName,layerProperty);
			layerProperty;
			layerProperty.renameLayer(renamedLayerName);
		} else this.renameSameLayerIncrementRoop(layerNameMap,layerProperty,++copyId);
	}
	,renameToOriginalName: function() {
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			layerProperty.renameToOriginalName();
		}
	}
	,__class__: jsx.parser.layer.LayerStructure
};
jsx.parser.layer.TempPath = $hxClasses["jsx.parser.layer.TempPath"] = function(path) {
	this.path = path;
	this.visible = false;
};
jsx.parser.layer.TempPath.__name__ = ["jsx","parser","layer","TempPath"];
jsx.parser.layer.TempPath.prototype = {
	__class__: jsx.parser.layer.TempPath
};
jsx.parser.layer.LayerStructures = $hxClasses["jsx.parser.layer.LayerStructures"] = function(document) {
	this.document = document;
	this.set = [];
};
jsx.parser.layer.LayerStructures.__name__ = ["jsx","parser","layer","LayerStructures"];
jsx.parser.layer.LayerStructures.prototype = {
	parse: function() {
		if(!(jsx.OptionalParameter.instance == null?jsx.OptionalParameter.instance = new jsx.OptionalParameter():jsx.OptionalParameter.instance).sameNameLayerIsIdentical) this.renameSameNameLayer();
		if(jsx.util.PrivateAPI.timelineAnimationFrameExists()) this.parseAllFrames(); else this.parseFrame();
		this.offsetAlongFrame1();
		if(this.set.length != 1 && (jsx.OptionalParameter.instance == null?jsx.OptionalParameter.instance = new jsx.OptionalParameter():jsx.OptionalParameter.instance).ignoredFrame1Output) this.set.shift();
		this.createImagePathMap();
		this.createPhotoshopLayerSets();
		this.createUsedPathSet();
		if(!(jsx.OptionalParameter.instance == null?jsx.OptionalParameter.instance = new jsx.OptionalParameter():jsx.OptionalParameter.instance).sameNameLayerIsIdentical) this.renameToOriginalName();
	}
	,parseAllFrames: function() {
		var timelineAnimationFrameIndex = 1;
		while(true) {
			try {
				jsx.util.PrivateAPI.selectTimelineAnimationFrame(timelineAnimationFrameIndex);
				this.parseFrame();
			} catch( e ) {
				break;
			}
			timelineAnimationFrameIndex++;
		}
	}
	,parseFrame: function() {
		var layerStructure = new jsx.parser.layer.LayerStructure(this.document.layers,[],false);
		layerStructure.parse();
		this.set.push(layerStructure);
	}
	,offsetAlongFrame1: function() {
		if(!(jsx.OptionalParameter.instance == null?jsx.OptionalParameter.instance = new jsx.OptionalParameter():jsx.OptionalParameter.instance).frame1offset) return;
		var offsetPosition = this.set[0].getOffsetPosition();
		var _g = 0;
		var _g1 = this.set;
		while(_g < _g1.length) {
			var layerStructure = _g1[_g];
			++_g;
			layerStructure.offsetPosition(offsetPosition);
		}
	}
	,createImagePathMap: function() {
		this.imagePathMap = new haxe.ds.StringMap();
		var _g = 0;
		var _g1 = this.set;
		while(_g < _g1.length) {
			var layerStructure = _g1[_g];
			++_g;
			var map = layerStructure.createImagePathMap();
			var $it0 = map.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				if(!this.imagePathMap.exists(key)) {
					var v = map.get(key);
					this.imagePathMap.set(key,v);
					v;
				}
			}
		}
	}
	,createPhotoshopLayerSets: function() {
		this.photoshopLayerSets = [];
		var _g = 0;
		var _g1 = this.set;
		while(_g < _g1.length) {
			var layerStructure = _g1[_g];
			++_g;
			this.photoshopLayerSets.push(layerStructure.getPhotoshopLayerSet());
		}
	}
	,createUsedPathSet: function() {
		var layerStructure = new jsx.parser.layer.LayerStructure(this.document.layers,[],true);
		layerStructure.parse();
		this.usedPathSet = layerStructure.createUsedPathSet(this.imagePathMap);
	}
	,renameSameNameLayer: function() {
		this.sameLayerNameCheckedLayerStructure = new jsx.parser.layer.LayerStructure(this.document.layers,[],true);
		this.sameLayerNameCheckedLayerStructure.parse();
		this.sameLayerNameCheckedLayerStructure.renameSameNameLayer();
	}
	,renameToOriginalName: function() {
		this.sameLayerNameCheckedLayerStructure.renameToOriginalName();
	}
	,__class__: jsx.parser.layer.LayerStructures
};
if(!jsx.util) jsx.util = {};
jsx.util.Bounds = $hxClasses["jsx.util.Bounds"] = function(left,top,right,bottom) {
	this.left = left;
	this.top = top;
	this.right = right;
	this.bottom = bottom;
};
jsx.util.Bounds.__name__ = ["jsx","util","Bounds"];
jsx.util.Bounds.convert = function(bounds) {
	return new jsx.util.Bounds(bounds[0].value,bounds[1].value,bounds[2].value,bounds[3].value);
};
jsx.util.Bounds.prototype = {
	toString: function() {
		return [this.left,this.top,this.right,this.bottom].join(":");
	}
	,isNull: function() {
		return this.left == 0 && this.right == 0 && this.top == 0 && this.bottom == 0;
	}
	,get_width: function() {
		return this.right - this.left;
	}
	,get_height: function() {
		return this.bottom - this.top;
	}
	,__class__: jsx.util.Bounds
};
jsx.util.ErrorChecker = $hxClasses["jsx.util.ErrorChecker"] = function() { };
jsx.util.ErrorChecker.__name__ = ["jsx","util","ErrorChecker"];
jsx.util.ErrorChecker.isSelectedSingleLayer = function(activeDocument) {
	var selectedSingleLayer = true;
	var selection = activeDocument.selection;
	try {
		selection.deselect();
		var x = 0;
		var y = 0;
		selection.select([[x,y],[x + 1,y],[x + 1,y + 1],[x,y + 1]]);
		selection.similar(0,false);
	} catch( error ) {
		selectedSingleLayer = false;
	}
	selection.deselect();
	return selectedSingleLayer;
};
jsx.util.ErrorChecker.hasPixel = function(layer) {
	var bounds = layer.bounds;
	var _g = 0;
	while(_g < bounds.length) {
		var bound = bounds[_g];
		++_g;
		if(bound == null) return false;
	}
	return true;
};
jsx.util.Point = $hxClasses["jsx.util.Point"] = function(x,y) {
	this.x = x;
	this.y = y;
};
jsx.util.Point.__name__ = ["jsx","util","Point"];
jsx.util.Point.prototype = {
	__class__: jsx.util.Point
};
jsx.util.PrivateAPI = $hxClasses["jsx.util.PrivateAPI"] = function() { };
jsx.util.PrivateAPI.__name__ = ["jsx","util","PrivateAPI"];
jsx.util.PrivateAPI.selectTimelineAnimationFrame = function(index) {
	var idslct = charIDToTypeID("slct");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var ref = new ActionReference();
	var idanimationFrameClass = stringIDToTypeID("animationFrameClass");
	ref.putIndex(idanimationFrameClass,index);
	desc.putReference(idnull,ref);
	executeAction(idslct,desc,DialogModes.NO);
};
jsx.util.PrivateAPI.timelineAnimationFrameExists = function() {
	try {
		jsx.util.PrivateAPI.selectTimelineAnimationFrame(1);
	} catch( e ) {
		return false;
	}
	return true;
};
jsx.util.PrivateAPI.selectShapeBorder = function(layer) {
	var originalLayerName = layer.name;
	layer.name = "_____temp_layer_name_____ ";
	var layerName = layer.name;
	var idsetd = charIDToTypeID("setd");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var ref = new ActionReference();
	var idChnl = charIDToTypeID("Chnl");
	var idfsel = charIDToTypeID("fsel");
	ref.putProperty(idChnl,idfsel);
	desc.putReference(idnull,ref);
	var idT = charIDToTypeID("T   ");
	var ref2 = new ActionReference();
	ref2.putEnumerated(charIDToTypeID("Chnl"),charIDToTypeID("Chnl"),charIDToTypeID("Trsp"));
	var idLyr = charIDToTypeID("Lyr ");
	ref2.putName(idLyr,layerName);
	desc.putReference(idT,ref2);
	executeAction(idsetd,desc,DialogModes.NO);
	layer.name = originalLayerName;
};
var lib = lib || {};
lib.FileDirectory = $hxClasses["lib.FileDirectory"] = function() { };
lib.FileDirectory.__name__ = ["lib","FileDirectory"];
var LayerTypeName = $hxClasses["LayerTypeName"] = function() { };
LayerTypeName.__name__ = ["LayerTypeName"];
var psd = psd || {};
psd.Lib = $hxClasses["psd.Lib"] = function() { };
psd.Lib.__name__ = ["psd","Lib"];
psd.Lib.writeln = function(message) {
	$.writeln(message);
};
psd.UnitType = $hxClasses["psd.UnitType"] = function() { };
psd.UnitType.__name__ = ["psd","UnitType"];
var psd_private = psd_private || {};
if(!psd_private._CharacterID) psd_private._CharacterID = {};
psd_private._CharacterID.CharacterID_Impl_ = $hxClasses["psd_private._CharacterID.CharacterID_Impl_"] = function() { };
psd_private._CharacterID.CharacterID_Impl_.__name__ = ["psd_private","_CharacterID","CharacterID_Impl_"];
psd_private.Lib = $hxClasses["psd_private.Lib"] = function() { };
psd_private.Lib.__name__ = ["psd_private","Lib"];
psd_private.Lib.charIDToTypeID = function(characterID) {
	return charIDToTypeID(characterID);
};
psd_private.Lib.stringIDToTypeID = function(stringID) {
	return stringIDToTypeID(stringID);
};
psd_private.Lib.executeAction = function(typeId,actionDescriptor,dialogModes) {
	executeAction(typeId,actionDescriptor,dialogModes);
};
if(!psd_private._StringID) psd_private._StringID = {};
psd_private._StringID.StringID_Impl_ = $hxClasses["psd_private._StringID.StringID_Impl_"] = function() { };
psd_private._StringID.StringID_Impl_.__name__ = ["psd_private","_StringID","StringID_Impl_"];
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
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
adobe._FileOpenMode.FileOpenMode_Impl_.WRITE = "w";
adobe._FileOpenMode.FileOpenMode_Impl_.READ = "r";
adobe._FileOpenMode.FileOpenMode_Impl_.EDIT = "e";
common._FrameAnimationExportInitialErrorEvent.FrameAnimationExportInitialError_Impl_.UNOPENED_DOCUMENT = "Unopened document.";
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
jsx.json_convertion.JsonStructure.CURLY_START = "{";
jsx.json_convertion.JsonStructure.CURLY_END = "}";
jsx.json_convertion.JsonStructure.ARRAY_START = "[";
jsx.json_convertion.JsonStructure.ARRAY_END = "]";
jsx.json_convertion.JsonStructure.CLUMN = ",";
jsx.json_convertion.JsonStructure.CR = "\n";
jsx.json_convertion.JsonStructure.TAB = "\t";
jsx.json_convertion.directory.DirectoryStructureToJsonConverter.TEMPLATE_JSON = "::tab::{\r\n::tab::\t\"name\":\"::name::\",\r\n::tab::\t\"files\":[\r\n::files::\r\n::tab::\t],\r\n::tab::\t\"directories\":[\r\n::directories::\r\n::tab::\t]\r\n::tab::}";
jsx.json_convertion.info.PhotoshopInfomationToJsonConverter.TEMPLATE_JSON = "{\r\n\t\"filename\":\"::filename::\"\r\n}";
jsx.json_convertion.layer.LayerToJsonConverter.TEMPLATE_JSON = "\t\t{\r\n\t\t\t\"name\":\"::name::\",\r\n\t\t\t\"directory\":\"::directory::\",\r\n\t\t\t\"path\":\"::path::\",\r\n\t\t\t\"x\":::x::,\r\n\t\t\t\"y\":::y::,\r\n\t\t\t\"opacity\":::opacity::\r\n\t\t}";
jsx.output._DirectoryCreation.DirectoryCreationError_Impl_.FOLDER_SELECTION_ERROR = "Folder selection error.";
jsx.output._DirectoryCreation.DirectoryCreationError_Impl_.OUTPUT_FOLDER_CREATION_ERROR = "Output folder creation error.";
jsx.output._DirectoryCreation.DirectoryCreationError_Impl_.OUTPUT_ASSETS_FOLDER_CREATION_ERROR = "Output assets folder creation error.";
jsx.output._DirectoryCreation.DirectoryCreationError_Impl_.OUTPUT_JSON_LAYER_FOLDER_CREATION_ERROR = "Output json layer folder creation error.";
jsx.output._DirectoryCreation.DirectoryCreationError_Impl_.OUTPUT_JSON_DIRECTORY_FOLDER_CREATION_ERROR = "Output json assets folder creation error.";
jsx.parser.layer.LayerStructure.COPY_NAME_CLUMN = "_";
jsx.parser.layer.LayerStructure.COPY_NAME_DEFAULT_ID = "1";
jsx.util.PrivateAPI.TIMELINE_ANIMATION_FRAME_FIRST_INDEX = 1;
lib.FileDirectory.ROOT_DIRECTORY = "";
lib.FileDirectory.PATH_COLUMN = "/";
lib.FileDirectory.IMAGE_EXTENSION = ".png";
lib.FileDirectory.JSON_EXTENSION = ".json";
lib.FileDirectory.PSD_EXTENSION = ".psd";
lib.FileDirectory.OUTPUT_DIRECTORY = "frame_animation_export";
lib.FileDirectory.ASSETS_DIRECTORY = "assets";
lib.FileDirectory.JSON_DIRECTORY = "json";
lib.FileDirectory.INFOMATION_FILE = "info" + ".json";
lib.FileDirectory.JSON_LAYER_STRUCTURE_DIRECTORY = "layer";
lib.FileDirectory.LAYER_STRUCTURE_FILE = "structure" + ".json";
lib.FileDirectory.LAYER_INDEX_FILE = "index" + ".json";
lib.FileDirectory.JSON_DIRECTORY_STRUCTURE_DIRECTORY = "directory";
lib.FileDirectory.DIRECTORY_STRUCTURE_FILE = "structure" + ".json";
LayerTypeName.LAYER_SET = "LayerSet";
psd.Lib.app = app;
psd.Lib.preferences = preferences;
psd.UnitType.PIXEL = "px";
psd_private._CharacterID.CharacterID_Impl_.SELECT = "slct";
psd_private._CharacterID.CharacterID_Impl_.NULL = "null";
psd_private._CharacterID.CharacterID_Impl_.LAYER = "Lyr ";
psd_private._CharacterID.CharacterID_Impl_.MKVS = "MkVs";
psd_private._CharacterID.CharacterID_Impl_.SETD = "setd";
psd_private._CharacterID.CharacterID_Impl_.CHNL = "Chnl";
psd_private._CharacterID.CharacterID_Impl_.FSEL = "fsel";
psd_private._CharacterID.CharacterID_Impl_.T = "T   ";
psd_private._CharacterID.CharacterID_Impl_.TRSP = "Trsp";
psd_private._StringID.StringID_Impl_.ANIMATION_FRAME_CLASS = "animationFrameClass";
FrameAnimationExport.main();
