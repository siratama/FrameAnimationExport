var console = Function("return typeof console != 'undefined' ? console : {log:function(){}}")();
var $hxClasses = $hxClasses || {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = $hxClasses["HxOverrides"] = function() { };
HxOverrides.__name__ = ["HxOverrides"];
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
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
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
	,__class__: List
};
Math.__name__ = ["Math"];
var Reflect = $hxClasses["Reflect"] = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
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
	return js_Boot.__string_rec(s,"");
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
	if(a == null) return null;
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
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
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
		var c = js_Boot.getClass(v);
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
var common_FrameAnimationExportInitialErrorEvent = $hxClasses["common.FrameAnimationExportInitialErrorEvent"] = { __ename__ : ["common","FrameAnimationExportInitialErrorEvent"], __constructs__ : ["NONE","ERROR"] };
common_FrameAnimationExportInitialErrorEvent.NONE = ["NONE",0];
common_FrameAnimationExportInitialErrorEvent.NONE.toString = $estr;
common_FrameAnimationExportInitialErrorEvent.NONE.__enum__ = common_FrameAnimationExportInitialErrorEvent;
common_FrameAnimationExportInitialErrorEvent.ERROR = function(error) { var $x = ["ERROR",1,error]; $x.__enum__ = common_FrameAnimationExportInitialErrorEvent; $x.toString = $estr; return $x; };
var haxe_IMap = $hxClasses["haxe.IMap"] = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe__$Int64__$_$_$Int64 = $hxClasses["haxe._Int64.___Int64"] = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.run = function(v) {
	var s = new haxe_Serializer();
	s.serialize(v);
	return s.toString();
};
haxe_Serializer.prototype = {
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
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
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
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
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
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
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
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe__$Template_TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] };
haxe__$Template_TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
var haxe_Template = $hxClasses["haxe.Template"] = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw new js__$Boot_HaxeError("Unexpected '" + Std.string(tokens.first().s) + "'");
};
haxe_Template.__name__ = ["haxe","Template"];
haxe_Template.prototype = {
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
		var _g_head = this.stack.h;
		var _g_val = null;
		while(_g_head != null) {
			var ctx;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			ctx = _g_val;
			if(Object.prototype.hasOwnProperty.call(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe_Template.globals,v);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe_Template.splitter.match(data)) {
			var p = haxe_Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe_Template.splitter.matchedRight();
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
				} else if(c == null) throw new js__$Boot_HaxeError("Unclosed macro parenthesis");
				if(c == 44 && npar == 1) {
					params.push(part);
					part = "";
				} else part += String.fromCharCode(c);
			}
			params.push(part);
			tokens.add({ p : haxe_Template.splitter.matched(2), s : false, l : params});
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
		return haxe__$Template_TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe__$Template_TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe__$Template_TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw new js__$Boot_HaxeError("Unclosed 'if'");
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw new js__$Boot_HaxeError("Unclosed 'else'");
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe__$Template_TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e1 = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t2 = tokens.pop();
			if(t2 == null || t2.p != "end") throw new js__$Boot_HaxeError("Unclosed 'foreach'");
			return haxe__$Template_TemplateExpr.OpForeach(e1,efor);
		}
		if(haxe_Template.expr_splitter.match(p)) return haxe__$Template_TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe__$Template_TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe_Template.expr_splitter.match(data)) {
			var p = haxe_Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe_Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe_Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw new js__$Boot_HaxeError(l.first().p);
		} catch( s ) {
			if (s instanceof js__$Boot_HaxeError) s = s.val;
			if( js_Boot.__instanceof(s,String) ) {
				throw new js__$Boot_HaxeError("Unexpected '" + s + "' in " + expr);
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				if (exc instanceof js__$Boot_HaxeError) exc = exc.val;
				throw new js__$Boot_HaxeError("Error : " + Std.string(exc) + " in " + expr);
			}
		};
	}
	,makeConst: function(v) {
		haxe_Template.expr_trim.match(v);
		v = haxe_Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe_Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe_Template.expr_float.match(v)) {
			var f = parseFloat(v);
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
		if(field == null || !field.s) throw new js__$Boot_HaxeError(field.p);
		var f = field.p;
		haxe_Template.expr_trim.match(f);
		f = haxe_Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw new js__$Boot_HaxeError("<eof>");
		if(p.s) return this.makeConst(p.p);
		var _g = p.p;
		switch(_g) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw new js__$Boot_HaxeError(p1.p);
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw new js__$Boot_HaxeError(p2.p);
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
				throw new js__$Boot_HaxeError("Unknown operation " + p1.p);
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
		throw new js__$Boot_HaxeError(p.p);
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
			var _g_head = l.h;
			var _g_val = null;
			while(_g_head != null) {
				var e3;
				e3 = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				this.run(e3);
			}
			break;
		case 5:
			var loop = e[3];
			var e4 = e[2];
			var v2 = e4();
			try {
				var x = $iterator(v2)();
				if(x.hasNext == null) throw new js__$Boot_HaxeError(null);
				v2 = x;
			} catch( e5 ) {
				if (e5 instanceof js__$Boot_HaxeError) e5 = e5.val;
				try {
					if(v2.hasNext == null) throw new js__$Boot_HaxeError(null);
				} catch( e6 ) {
					if (e6 instanceof js__$Boot_HaxeError) e6 = e6.val;
					throw new js__$Boot_HaxeError("Cannot iter on " + Std.string(v2));
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
			var pl = [];
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var _g_head1 = params.h;
			var _g_val1 = null;
			while(_g_head1 != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val1 = _g_head1[0];
					_g_head1 = _g_head1[1];
					$r = _g_val1;
					return $r;
				}(this));
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
				this.buf.add(Std.string(Reflect.callMethod(this.macros,v4,pl)));
			} catch( e7 ) {
				if (e7 instanceof js__$Boot_HaxeError) e7 = e7.val;
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( e8 ) {
					if (e8 instanceof js__$Boot_HaxeError) e8 = e8.val;
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e7) + ")";
				throw new js__$Boot_HaxeError(msg);
			}
			break;
		}
	}
	,__class__: haxe_Template
};
var haxe_Unserializer = $hxClasses["haxe.Unserializer"] = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
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
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
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
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
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
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
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
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
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
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ds_IntMap = $hxClasses["haxe.ds.IntMap"] = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = $hxClasses["haxe.ds.ObjectMap"] = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
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
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = $hxClasses["haxe.ds.StringMap"] = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = $hxClasses["haxe.io.Bytes"] = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = $hxClasses["haxe.io.FPHelper"] = function() { };
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var js__$Boot_HaxeError = $hxClasses["js._Boot.HaxeError"] = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = $hxClasses["js.Boot"] = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
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
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_Lib = $hxClasses["js.Lib"] = function() { };
js_Lib.__name__ = ["js","Lib"];
js_Lib.alert = function(v) {
	alert(js_Boot.__string_rec(v,""));
};
var js_html_compat_ArrayBuffer = $hxClasses["js.html.compat.ArrayBuffer"] = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = $hxClasses["js.html.compat.DataView"] = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = $hxClasses["js.html.compat.Uint8Array"] = function() { };
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var FrameAnimationExport = $hxClasses["FrameAnimationExport"] = function(frame1offsetData,ignoredFrame1OutputData,sameNameLayerIsIdenticalData) {
	var ignoredFrame1Output = haxe_Unserializer.run(ignoredFrame1OutputData);
	var frame1offset = haxe_Unserializer.run(frame1offsetData);
	var sameNameLayerIsIdentical = haxe_Unserializer.run(sameNameLayerIsIdenticalData);
	(jsx_OptionalParameter.instance == null?jsx_OptionalParameter.instance = new jsx_OptionalParameter():jsx_OptionalParameter.instance).set(frame1offset,ignoredFrame1Output,sameNameLayerIsIdentical);
	this.application = psd_Lib.app;
};
FrameAnimationExport.__name__ = ["FrameAnimationExport"];
FrameAnimationExport.main = function() {
	jsx__$FrameAnimationExport_FrameAnimationExportJSXRunner.execute(false,false,false);
};
FrameAnimationExport.prototype = {
	getInitialErrorEvent: function() {
		var error;
		if(this.application.documents.length == 0) error = "Unopened document."; else error = null;
		var event;
		if(error == null) event = common_FrameAnimationExportInitialErrorEvent.NONE; else event = common_FrameAnimationExportInitialErrorEvent.ERROR(error);
		return haxe_Serializer.run(event);
	}
	,execute: function() {
		this.activeDocument = this.application.activeDocument;
		this.createDirectory();
	}
	,createDirectory: function() {
		{
			var _g = jsx_output_DirectoryCreation.execute();
			switch(_g[1]) {
			case 0:
				var error = _g[2];
				switch(error) {
				case "Folder selection error.":
					return;
				default:
					js_Lib.alert(error);
				}
				break;
			case 1:
				this.parse();
				break;
			}
		}
	}
	,parse: function() {
		this.layerStructures = new jsx_parser_layer_LayerStructures(this.activeDocument);
		this.layerStructures.parse();
		this.directoryStructure = new jsx_parser_directory_DirectoryStructure();
		this.directoryStructure.parse(this.layerStructures.imagePathMap);
		var arr = this.activeDocument.name.split(".");
		if(arr.length > 1) arr.pop();
		this.information = { filename : arr.join(".")};
		this.output();
	}
	,output: function() {
		var result = this.outputJson();
		if(!result) js_Lib.alert("Json output error."); else this.outputImage();
		js_Lib.alert("finish");
	}
	,outputJson: function() {
		var jsonExport = new jsx_output_JsonExport(this.layerStructures,this.directoryStructure.rootDirectoryData,this.information);
		return jsonExport.execute();
	}
	,outputImage: function() {
		psd_Lib.preferences.rulerUnits = Units.PIXELS;
		var $it0 = this.layerStructures.imagePathMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var layerProperty = this.layerStructures.imagePathMap.get(key);
			var outputImage = new jsx_output_ImageExport(this.application,layerProperty);
			outputImage.execute();
		}
	}
	,__class__: FrameAnimationExport
};
var jsx__$FrameAnimationExport_FrameAnimationExportJSXRunner = $hxClasses["jsx._FrameAnimationExport.FrameAnimationExportJSXRunner"] = function() { };
jsx__$FrameAnimationExport_FrameAnimationExportJSXRunner.__name__ = ["jsx","_FrameAnimationExport","FrameAnimationExportJSXRunner"];
jsx__$FrameAnimationExport_FrameAnimationExportJSXRunner.execute = function(frame1offset,ignoredFrame1Output,sameNameLayerIsIdentical) {
	var frame1offsetData = haxe_Serializer.run(frame1offset);
	var ignoredFrame1OutputData = haxe_Serializer.run(ignoredFrame1Output);
	var sameNameLayerIsIdenticalData = haxe_Serializer.run(sameNameLayerIsIdentical);
	var frameAnimationExport = new FrameAnimationExport(frame1offsetData,ignoredFrame1OutputData,sameNameLayerIsIdenticalData);
	var errorEvent = haxe_Unserializer.run(frameAnimationExport.getInitialErrorEvent());
	switch(errorEvent[1]) {
	case 1:
		var error = errorEvent[2];
		js_Lib.alert(js_Boot.__cast(error , String));
		break;
	case 0:
		frameAnimationExport.execute();
		break;
	}
};
var jsx_OptionalParameter = $hxClasses["jsx.OptionalParameter"] = function() {
};
jsx_OptionalParameter.__name__ = ["jsx","OptionalParameter"];
jsx_OptionalParameter.get_instance = function() {
	if(jsx_OptionalParameter.instance == null) return jsx_OptionalParameter.instance = new jsx_OptionalParameter(); else return jsx_OptionalParameter.instance;
};
jsx_OptionalParameter.prototype = {
	set: function(frame1offset,ignoredFrame1Output,sameNameLayerIsIdentical) {
		this.frame1offset = frame1offset;
		this.ignoredFrame1Output = ignoredFrame1Output;
		this.sameNameLayerIsIdentical = sameNameLayerIsIdentical;
	}
	,__class__: jsx_OptionalParameter
};
var jsx_json_$convertion_JsonStructure = $hxClasses["jsx.json_convertion.JsonStructure"] = function() { };
jsx_json_$convertion_JsonStructure.__name__ = ["jsx","json_convertion","JsonStructure"];
var jsx_json_$convertion_directory_DirectoryStructureToJsonConverter = $hxClasses["jsx.json_convertion.directory.DirectoryStructureToJsonConverter"] = function() { };
jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.__name__ = ["jsx","json_convertion","directory","DirectoryStructureToJsonConverter"];
jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.execute = function(directoryData) {
	var directory = directoryData.toDirectory();
	return jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.executeRoop(directory);
};
jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.executeRoop = function(directory,nest) {
	if(nest == null) nest = 0;
	var tab = "";
	var _g = 0;
	while(_g < nest) {
		var i = _g++;
		tab += "\t";
	}
	var template = new haxe_Template("::tab::{\r\n::tab::\t\"name\":\"::name::\",\r\n::tab::\t\"files\":[\r\n::files::\r\n::tab::\t],\r\n::tab::\t\"directories\":[\r\n::directories::\r\n::tab::\t]\r\n::tab::}");
	var json = template.execute({ tab : tab, name : directory.name, files : jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.filesToJson(directory.files,tab), directories : jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.childDirectoriesToJson(directory.directories,++nest)});
	return json;
};
jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.filesToJson = function(files,tab) {
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
jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.childDirectoriesToJson = function(directories,nest) {
	var json = "";
	var _g1 = 0;
	var _g = directories.length;
	while(_g1 < _g) {
		var i = _g1++;
		var childDirectory = directories[i];
		json += jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.executeRoop(childDirectory,nest + 1);
		if(i < directories.length - 1) json += "," + "\n";
	}
	return json;
};
var jsx_json_$convertion_info_PhotoshopInfomationToJsonConverter = $hxClasses["jsx.json_convertion.info.PhotoshopInfomationToJsonConverter"] = function() { };
jsx_json_$convertion_info_PhotoshopInfomationToJsonConverter.__name__ = ["jsx","json_convertion","info","PhotoshopInfomationToJsonConverter"];
jsx_json_$convertion_info_PhotoshopInfomationToJsonConverter.toJson = function(infomation) {
	var template = new haxe_Template("{\r\n\t\"filename\":\"::filename::\"\r\n}");
	return template.execute({ filename : infomation.filename});
};
var jsx_json_$convertion_layer_LayerStructueToJsonConverter = $hxClasses["jsx.json_convertion.layer.LayerStructueToJsonConverter"] = function() { };
jsx_json_$convertion_layer_LayerStructueToJsonConverter.__name__ = ["jsx","json_convertion","layer","LayerStructueToJsonConverter"];
jsx_json_$convertion_layer_LayerStructueToJsonConverter.execute = function(photoshopLayerSets) {
	return jsx_json_$convertion_layer_LayerStructueToJsonConverter.toJson(photoshopLayerSets,jsx_json_$convertion_layer_LayerToJsonConverter.toJson);
};
jsx_json_$convertion_layer_LayerStructueToJsonConverter.toJson = function(photoshopLayerSets,toFunction) {
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
jsx_json_$convertion_layer_LayerStructueToJsonConverter.executeIndex = function(pathSet) {
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
var jsx_json_$convertion_layer_LayerToJsonConverter = $hxClasses["jsx.json_convertion.layer.LayerToJsonConverter"] = function() { };
jsx_json_$convertion_layer_LayerToJsonConverter.__name__ = ["jsx","json_convertion","layer","LayerToJsonConverter"];
jsx_json_$convertion_layer_LayerToJsonConverter.toJson = function(photoshopLayer) {
	return jsx_json_$convertion_layer_LayerToJsonConverter.toCommon(photoshopLayer,"\t\t{\r\n\t\t\t\"name\":\"::name::\",\r\n\t\t\t\"directory\":\"::directory::\",\r\n\t\t\t\"path\":\"::path::\",\r\n\t\t\t\"x\":::x::,\r\n\t\t\t\"y\":::y::,\r\n\t\t\t\"opacity\":::opacity::\r\n\t\t}");
};
jsx_json_$convertion_layer_LayerToJsonConverter.toCommon = function(photoshopLayer,templateString) {
	var template = new haxe_Template(templateString);
	return template.execute({ name : photoshopLayer.name, directory : photoshopLayer.directory, path : photoshopLayer.path, x : photoshopLayer.x, y : photoshopLayer.y, opacity : photoshopLayer.opacity});
};
var jsx_output_DirectoryCreationEvent = $hxClasses["jsx.output.DirectoryCreationEvent"] = { __ename__ : ["jsx","output","DirectoryCreationEvent"], __constructs__ : ["ERROR","SUCCESS"] };
jsx_output_DirectoryCreationEvent.ERROR = function(error) { var $x = ["ERROR",0,error]; $x.__enum__ = jsx_output_DirectoryCreationEvent; $x.toString = $estr; return $x; };
jsx_output_DirectoryCreationEvent.SUCCESS = ["SUCCESS",1];
jsx_output_DirectoryCreationEvent.SUCCESS.toString = $estr;
jsx_output_DirectoryCreationEvent.SUCCESS.__enum__ = jsx_output_DirectoryCreationEvent;
var jsx_output_DirectoryCreation = $hxClasses["jsx.output.DirectoryCreation"] = function() { };
jsx_output_DirectoryCreation.__name__ = ["jsx","output","DirectoryCreation"];
jsx_output_DirectoryCreation.execute = function() {
	var selectedFolder = Folder.selectDialog();
	if(selectedFolder == null) return jsx_output_DirectoryCreationEvent.ERROR("Folder selection error.");
	var outputDirectoryPath = [selectedFolder.relativeURI,"frame_animation_export"].join("/");
	var outputFolder = new Folder(outputDirectoryPath);
	if(!outputFolder.create()) return jsx_output_DirectoryCreationEvent.ERROR("Output folder creation error.");
	var assetsDirectoryPath = [outputDirectoryPath,"assets"].join("/");
	var outputAssetsFolder = new Folder(assetsDirectoryPath);
	if(!outputAssetsFolder.create()) return jsx_output_DirectoryCreationEvent.ERROR("Output assets folder creation error.");
	var jsonLayerPath = [outputDirectoryPath,"json","layer"].join("/");
	var jsonLayerFolder = new Folder(jsonLayerPath);
	if(!jsonLayerFolder.create()) return jsx_output_DirectoryCreationEvent.ERROR("Output json layer folder creation error.");
	var jsonDirectoryPath = [outputDirectoryPath,"json","directory"].join("/");
	var jsonDirectoryFolder = new Folder(jsonDirectoryPath);
	if(!jsonDirectoryFolder.create()) return jsx_output_DirectoryCreationEvent.ERROR("Output json assets folder creation error.");
	(jsx_output_OutputPath.instance == null?jsx_output_OutputPath.instance = new jsx_output_OutputPath():jsx_output_OutputPath.instance).setData(outputDirectoryPath,assetsDirectoryPath,jsonLayerPath,jsonDirectoryPath);
	return jsx_output_DirectoryCreationEvent.SUCCESS;
};
var jsx_output_ImageExport = $hxClasses["jsx.output.ImageExport"] = function(application,layerProperty) {
	this.application = application;
	this.layerProperty = layerProperty;
};
jsx_output_ImageExport.__name__ = ["jsx","output","ImageExport"];
jsx_output_ImageExport.prototype = {
	execute: function() {
		var layersDisplay = new jsx_util_LayersDisplay(this.application.activeDocument.layers);
		layersDisplay.hide();
		this.createDirectory();
		var tempDocument = this.prepare();
		this["export"](tempDocument);
		layersDisplay.restore();
	}
	,createDirectory: function() {
		var imageDirectoryPath = [(jsx_output_OutputPath.instance == null?jsx_output_OutputPath.instance = new jsx_output_OutputPath():jsx_output_OutputPath.instance).outputAssetsDirectoryPath,this.layerProperty.getDirectoryPathString()].join("/");
		var folder = new Folder(imageDirectoryPath);
		if(!folder.exists) folder.create();
	}
	,prepare: function() {
		var document = this.application.activeDocument;
		var tempDocument = this.application.documents.add(document.width | 0,document.height | 0,72,null,null,DocumentFill.TRANSPARENT);
		this.application.activeDocument = document;
		this.layerProperty.layer.visible = true;
		if(this.layerProperty.isRootLayer()) this.layerProperty.layer.duplicate(tempDocument); else this.layerProperty.rootFolder.duplicate(tempDocument);
		this.application.activeDocument = tempDocument;
		tempDocument.revealAll();
		tempDocument.trim(TrimType.TRANSPARENT);
		return tempDocument;
	}
	,'export': function(tempDocument) {
		var exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();
		exportOptionsSaveForWeb.format = SaveDocumentType.PNG;
		exportOptionsSaveForWeb.PNG8 = false;
		var outputPath = [(jsx_output_OutputPath.instance == null?jsx_output_OutputPath.instance = new jsx_output_OutputPath():jsx_output_OutputPath.instance).outputDirectoryPath,"assets",this.layerProperty.path].join("/");
		tempDocument.exportDocument(new File(outputPath + ".png"),ExportType.SAVEFORWEB,exportOptionsSaveForWeb);
		tempDocument.close(SaveOptions.DONOTSAVECHANGES);
	}
	,__class__: jsx_output_ImageExport
};
var jsx_output_JsonExport = $hxClasses["jsx.output.JsonExport"] = function(layerStructures,directoryData,information) {
	this.layerStructures = layerStructures;
	this.directoryData = directoryData;
	this.information = information;
};
jsx_output_JsonExport.__name__ = ["jsx","output","JsonExport"];
jsx_output_JsonExport.prototype = {
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
		var jsonOutputDirectory;
		jsonOutputDirectory = (jsx_output_OutputPath.instance == null?jsx_output_OutputPath.instance = new jsx_output_OutputPath():jsx_output_OutputPath.instance).jsonLayerPath + "/";
		var result = this.write(jsx_json_$convertion_layer_LayerStructueToJsonConverter.execute(this.layerStructures.photoshopLayerSets),jsonOutputDirectory,"structure" + ".json");
		if(!result) return false;
		return this.write(jsx_json_$convertion_layer_LayerStructueToJsonConverter.executeIndex(this.layerStructures.usedPathSet),jsonOutputDirectory,"index" + ".json");
		return true;
	}
	,executeDirectory: function() {
		var jsonOutputDirectory;
		jsonOutputDirectory = (jsx_output_OutputPath.instance == null?jsx_output_OutputPath.instance = new jsx_output_OutputPath():jsx_output_OutputPath.instance).jsonDirectoryPath + "/";
		return this.write(jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.execute(this.directoryData),jsonOutputDirectory,"structure" + ".json");
	}
	,executeInformation: function() {
		var jsonOutputDirectory = [(jsx_output_OutputPath.instance == null?jsx_output_OutputPath.instance = new jsx_output_OutputPath():jsx_output_OutputPath.instance).outputDirectoryPath,"json"].join("/") + "/";
		return this.write(jsx_json_$convertion_info_PhotoshopInfomationToJsonConverter.toJson(this.information),jsonOutputDirectory,"info" + ".json");
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
	,__class__: jsx_output_JsonExport
};
var jsx_output_OutputPath = $hxClasses["jsx.output.OutputPath"] = function() {
};
jsx_output_OutputPath.__name__ = ["jsx","output","OutputPath"];
jsx_output_OutputPath.get_instance = function() {
	if(jsx_output_OutputPath.instance == null) return jsx_output_OutputPath.instance = new jsx_output_OutputPath(); else return jsx_output_OutputPath.instance;
};
jsx_output_OutputPath.prototype = {
	setData: function(outputDirectoryPath,outputAssetsDirectoryPath,jsonLayerPath,jsonDirectoryPath) {
		this.outputDirectoryPath = outputDirectoryPath;
		this.outputAssetsDirectoryPath = outputAssetsDirectoryPath;
		this.jsonLayerPath = jsonLayerPath;
		this.jsonDirectoryPath = jsonDirectoryPath;
	}
	,__class__: jsx_output_OutputPath
};
var jsx_parser_directory_DirectoryData = $hxClasses["jsx.parser.directory.DirectoryData"] = function(name) {
	if(name == null) name = "";
	this.name = name;
	this.files = [];
	this.directoryDataMap = new haxe_ds_StringMap();
};
jsx_parser_directory_DirectoryData.__name__ = ["jsx","parser","directory","DirectoryData"];
jsx_parser_directory_DirectoryData.prototype = {
	addFile: function(fileName) {
		this.files.push(fileName);
	}
	,getChild: function(childDirectoryName) {
		if(!this.directoryDataMap.exists(childDirectoryName)) {
			var v = new jsx_parser_directory_DirectoryData(childDirectoryName);
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
	,__class__: jsx_parser_directory_DirectoryData
};
var jsx_parser_directory_DirectoryStructure = $hxClasses["jsx.parser.directory.DirectoryStructure"] = function() {
	this.rootDirectoryData = new jsx_parser_directory_DirectoryData();
};
jsx_parser_directory_DirectoryStructure.__name__ = ["jsx","parser","directory","DirectoryStructure"];
jsx_parser_directory_DirectoryStructure.prototype = {
	parse: function(imagePathMap) {
		var $it0 = imagePathMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var directoryData = this.rootDirectoryData;
			var layerData;
			layerData = __map_reserved[key] != null?imagePathMap.getReserved(key):imagePathMap.h[key];
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
	,__class__: jsx_parser_directory_DirectoryStructure
};
var jsx_parser_layer_LayerProperty = $hxClasses["jsx.parser.layer.LayerProperty"] = function(layer,directoryPath,bounds,rootFolder) {
	this.layer = layer;
	this.layerName = layer.name;
	this.directoryPath = directoryPath;
	this.bounds = bounds;
	this.rootFolder = rootFolder;
	if(bounds != null) {
		this.x = bounds.left;
		this.y = bounds.top;
	}
	this.opacity = Math.round(layer.opacity);
	this.fileName = new EReg(" ","g").replace(layer.name,"-");
	this.setPath(this.fileName);
};
jsx_parser_layer_LayerProperty.__name__ = ["jsx","parser","layer","LayerProperty"];
jsx_parser_layer_LayerProperty.prototype = {
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
			this.layer.name = this.layerName;
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
	,isRootLayer: function() {
		return this.rootFolder == null;
	}
	,__class__: jsx_parser_layer_LayerProperty
};
var jsx_parser_layer_LayerStructure = $hxClasses["jsx.parser.layer.LayerStructure"] = function(document,layers,parentDirectoryPath,includedInvisibleLayer,extractedBounds) {
	this.document = document;
	this.layers = layers;
	this.parentDirectoryPath = parentDirectoryPath;
	this.includedInvisibleLayer = includedInvisibleLayer;
	this.extractedBounds = extractedBounds;
	this.application = psd_Lib.app;
	this.layerPropertySet = [];
	this.layersDisplay = new jsx_util_LayersDisplay(document.layers);
};
jsx_parser_layer_LayerStructure.__name__ = ["jsx","parser","layer","LayerStructure"];
jsx_parser_layer_LayerStructure.prototype = {
	parse: function(rootFolder) {
		var isRootLayer = rootFolder == null;
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var layer = this.layers[i];
			if(!this.includedInvisibleLayer && !layer.visible) continue;
			if(layer.typename == LayerTypeName.LAYER_SET) {
				var layerSet;
				layerSet = js_Boot.__cast(layer , LayerSet);
				var directoryPath = this.parentDirectoryPath.slice();
				directoryPath.push(layer.name);
				var childLayerStructure = new jsx_parser_layer_LayerStructure(this.document,layerSet.layers,directoryPath,this.includedInvisibleLayer,this.extractedBounds);
				var decidedRootFolder;
				if(isRootLayer) decidedRootFolder = layerSet; else decidedRootFolder = rootFolder;
				childLayerStructure.parse(decidedRootFolder);
				this.layerPropertySet = this.layerPropertySet.concat(childLayerStructure.layerPropertySet);
			} else {
				var bounds;
				if(this.extractedBounds) bounds = this.extractBounds(layer,rootFolder); else bounds = null;
				var layerProperty = new jsx_parser_layer_LayerProperty(layer,this.parentDirectoryPath,bounds,rootFolder);
				if(!this.extractedBounds || !layerProperty.bounds.isNull()) this.layerPropertySet.push(layerProperty);
			}
		}
	}
	,extractBounds: function(layer,rootFolder) {
		var bounds;
		var isRootLayer = rootFolder == null;
		if(isRootLayer) {
			this.document.activeLayer = layer;
			jsx_util_DocumentUtil.rasterizeLayerStyle();
			bounds = jsx_util_Bounds.convert(this.document.activeLayer.bounds);
		} else {
			this.layersDisplay.hide();
			layer.visible = true;
			this.document.activeLayer = rootFolder;
			var tempDocument = this.application.documents.add(this.document.width | 0,this.document.height | 0,72,null,null,DocumentFill.TRANSPARENT);
			this.application.activeDocument = this.document;
			var duplicatedRootFolder = rootFolder.duplicate(tempDocument);
			this.application.activeDocument = tempDocument;
			duplicatedRootFolder.merge();
			bounds = jsx_util_Bounds.convert(tempDocument.activeLayer.bounds);
			tempDocument.close(SaveOptions.DONOTSAVECHANGES);
			this.layersDisplay.restore();
		}
		return bounds;
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
		var imagePathMap = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			{
				imagePathMap.set(layerProperty.path,layerProperty);
				layerProperty;
			}
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
			_g.push(new jsx_parser_layer_TempPath(layerProperty.path));
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
					if(!(jsx_OptionalParameter.instance == null?jsx_OptionalParameter.instance = new jsx_OptionalParameter():jsx_OptionalParameter.instance).sameNameLayerIsIdentical) break;
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
		return new jsx_util_Point(offsetX,offsetY);
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
		var layerNameMap = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this.layerPropertySet;
		while(_g < _g1.length) {
			var layerProperty = _g1[_g];
			++_g;
			if(layerNameMap.get(layerProperty.path) == null) {
				{
					layerNameMap.set(layerProperty.path,layerProperty);
					layerProperty;
				}
				continue;
			}
			var arr = layerProperty.path.split("_");
			var copyIdString;
			if(arr.length == 1) copyIdString = "1"; else copyIdString = arr[arr.length - 1];
			var copyId = Std.parseInt(copyIdString);
			if(copyId == null) {
				{
					layerNameMap.set(layerProperty.path,layerProperty);
					layerProperty;
				}
				continue;
			}
			this.renameSameLayerIncrementRoop(layerNameMap,layerProperty,copyId);
		}
	}
	,renameSameLayerIncrementRoop: function(layerNameMap,layerProperty,copyId) {
		var renamedLayerName;
		renamedLayerName = layerProperty.fileName + "_" + (copyId == null?"null":"" + copyId);
		if((__map_reserved[renamedLayerName] != null?layerNameMap.getReserved(renamedLayerName):layerNameMap.h[renamedLayerName]) == null) {
			{
				if(__map_reserved[renamedLayerName] != null) layerNameMap.setReserved(renamedLayerName,layerProperty); else layerNameMap.h[renamedLayerName] = layerProperty;
				layerProperty;
			}
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
	,__class__: jsx_parser_layer_LayerStructure
};
var jsx_parser_layer_TempPath = $hxClasses["jsx.parser.layer.TempPath"] = function(path) {
	this.path = path;
	this.visible = false;
};
jsx_parser_layer_TempPath.__name__ = ["jsx","parser","layer","TempPath"];
jsx_parser_layer_TempPath.prototype = {
	__class__: jsx_parser_layer_TempPath
};
var jsx_parser_layer_LayerStructures = $hxClasses["jsx.parser.layer.LayerStructures"] = function(document) {
	this.document = document;
	this.set = [];
	this.timelineFrameExists = jsx_util_Timeline.frameExists();
};
jsx_parser_layer_LayerStructures.__name__ = ["jsx","parser","layer","LayerStructures"];
jsx_parser_layer_LayerStructures.prototype = {
	parse: function() {
		if(!(jsx_OptionalParameter.instance == null?jsx_OptionalParameter.instance = new jsx_OptionalParameter():jsx_OptionalParameter.instance).sameNameLayerIsIdentical) this.renameSameNameLayer();
		if(this.timelineFrameExists) this.parseAllFrames(); else this.parseFrame(1);
		this.offsetAlongFrame1();
		if(this.set.length != 1 && (jsx_OptionalParameter.instance == null?jsx_OptionalParameter.instance = new jsx_OptionalParameter():jsx_OptionalParameter.instance).ignoredFrame1Output) this.set.shift();
		this.createImagePathMap();
		this.createPhotoshopLayerSets();
		this.createUsedPathSet();
		if(!(jsx_OptionalParameter.instance == null?jsx_OptionalParameter.instance = new jsx_OptionalParameter():jsx_OptionalParameter.instance).sameNameLayerIsIdentical) this.renameToOriginalName();
	}
	,parseAllFrames: function() {
		var timelineAnimationFrameIndex = 1;
		while(true) {
			try {
				jsx_util_Timeline.selectFrame(timelineAnimationFrameIndex);
				this.parseFrame(timelineAnimationFrameIndex);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				break;
			}
			timelineAnimationFrameIndex++;
		}
	}
	,parseFrame: function(timelineAnimationFrameIndex) {
		var duplicatesTimelineFirstFrame = this.timelineFrameExists && timelineAnimationFrameIndex == 1;
		if(duplicatesTimelineFirstFrame) jsx_util_Timeline.duplicateSelectedFrame();
		var layerStructure = new jsx_parser_layer_LayerStructure(this.document,this.document.layers,[],false,true);
		layerStructure.parse();
		this.set.push(layerStructure);
		if(duplicatesTimelineFirstFrame) jsx_util_Timeline.deleteSelectedFrame();
	}
	,offsetAlongFrame1: function() {
		if(!(jsx_OptionalParameter.instance == null?jsx_OptionalParameter.instance = new jsx_OptionalParameter():jsx_OptionalParameter.instance).frame1offset) return;
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
		this.imagePathMap = new haxe_ds_StringMap();
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
					var v;
					v = __map_reserved[key] != null?map.getReserved(key):map.h[key];
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
		var layerStructure = new jsx_parser_layer_LayerStructure(this.document,this.document.layers,[],true,false);
		layerStructure.parse();
		this.usedPathSet = layerStructure.createUsedPathSet(this.imagePathMap);
	}
	,renameSameNameLayer: function() {
		this.sameLayerNameCheckedLayerStructure = new jsx_parser_layer_LayerStructure(this.document,this.document.layers,[],true,false);
		this.sameLayerNameCheckedLayerStructure.parse();
		this.sameLayerNameCheckedLayerStructure.renameSameNameLayer();
	}
	,renameToOriginalName: function() {
		this.sameLayerNameCheckedLayerStructure.renameToOriginalName();
	}
	,__class__: jsx_parser_layer_LayerStructures
};
var jsx_util_Bounds = $hxClasses["jsx.util.Bounds"] = function(left,top,right,bottom) {
	this.left = left;
	this.top = top;
	this.right = right;
	this.bottom = bottom;
};
jsx_util_Bounds.__name__ = ["jsx","util","Bounds"];
jsx_util_Bounds.convert = function(bounds) {
	return new jsx_util_Bounds(bounds[0].value,bounds[1].value,bounds[2].value,bounds[3].value);
};
jsx_util_Bounds.prototype = {
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
	,__class__: jsx_util_Bounds
};
var jsx_util_DocumentUtil = $hxClasses["jsx.util.DocumentUtil"] = function() { };
jsx_util_DocumentUtil.__name__ = ["jsx","util","DocumentUtil"];
jsx_util_DocumentUtil.rasterizeLayerStyle = function() {
	var idrasterizeLayer = stringIDToTypeID("rasterizeLayer");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var ref = new ActionReference();
	var idLyr = charIDToTypeID("Lyr ");
	var idOrdn = charIDToTypeID("Ordn");
	var idTrgt = charIDToTypeID("Trgt");
	ref.putEnumerated(idLyr,idOrdn,idTrgt);
	desc.putReference(idnull,ref);
	var idWhat = charIDToTypeID("What");
	var idrasterizeItem = stringIDToTypeID("rasterizeItem");
	var idlayerStyle = stringIDToTypeID("layerStyle");
	desc.putEnumerated(idWhat,idrasterizeItem,idlayerStyle);
	executeAction(idrasterizeLayer,desc,DialogModes.NO);
};
var jsx_util_ErrorChecker = $hxClasses["jsx.util.ErrorChecker"] = function() { };
jsx_util_ErrorChecker.__name__ = ["jsx","util","ErrorChecker"];
jsx_util_ErrorChecker.isSelectedSingleLayer = function(activeDocument) {
	var selectedSingleLayer = true;
	var selection = activeDocument.selection;
	try {
		selection.deselect();
		var x = 0;
		var y = 0;
		selection.select([[x,y],[x + 1,y],[x + 1,y + 1],[x,y + 1]]);
		selection.similar(0,false);
	} catch( error ) {
		if (error instanceof js__$Boot_HaxeError) error = error.val;
		selectedSingleLayer = false;
	}
	selection.deselect();
	return selectedSingleLayer;
};
jsx_util_ErrorChecker.hasPixel = function(layer) {
	var bounds = layer.bounds;
	var _g = 0;
	while(_g < bounds.length) {
		var bound = bounds[_g];
		++_g;
		if(bound == null) return false;
	}
	return true;
};
var jsx_util_History = $hxClasses["jsx.util.History"] = function() { };
jsx_util_History.__name__ = ["jsx","util","History"];
jsx_util_History.undo = function(document,count) {
	if(count == null) count = 1;
	document.activeHistoryState = document.historyStates[document.historyStates.length - (count + 1)];
};
var jsx_util_LayersDisplay = $hxClasses["jsx.util.LayersDisplay"] = function(layers) {
	this.layers = layers;
	this.defaultLayerVisibleSet = [];
	this.layersDisplayMap = new haxe_ds_ObjectMap();
};
jsx_util_LayersDisplay.__name__ = ["jsx","util","LayersDisplay"];
jsx_util_LayersDisplay.switchSingleLayerVisible = function() {
	var idShw = charIDToTypeID("Shw ");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var list = new ActionList();
	var ref = new ActionReference();
	var idLyr = charIDToTypeID("Lyr ");
	var idOrdn = charIDToTypeID("Ordn");
	var idTrgt = charIDToTypeID("Trgt");
	ref.putEnumerated(idLyr,idOrdn,idTrgt);
	list.putReference(ref);
	desc.putList(idnull,list);
	var idTglO = charIDToTypeID("TglO");
	desc.putBoolean(idTglO,true);
	executeAction(idShw,desc,DialogModes.NO);
};
jsx_util_LayersDisplay.prototype = {
	hide: function() {
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var layer = this.layers[i];
			if(layer.typename == LayerTypeName.LAYER_SET) {
				var layerSet;
				layerSet = js_Boot.__cast(layer , LayerSet);
				var layersDisplay = new jsx_util_LayersDisplay(layerSet.layers);
				layersDisplay.hide();
				this.layersDisplayMap.set(layerSet,layersDisplay);
				continue;
			}
			if((js_Boot.__cast(layer , ArtLayer)).isBackgroundLayer) continue;
			this.defaultLayerVisibleSet[i] = layer.visible;
			layer.visible = false;
		}
	}
	,restore: function() {
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var layer = this.layers[i];
			if(layer.typename == LayerTypeName.LAYER_SET) {
				var layerSet;
				layerSet = js_Boot.__cast(layer , LayerSet);
				var layersDisplay = this.layersDisplayMap.h[layerSet.__id__];
				layersDisplay.restore();
				continue;
			}
			if((js_Boot.__cast(layer , ArtLayer)).isBackgroundLayer) continue;
			layer.visible = this.defaultLayerVisibleSet[i];
		}
	}
	,__class__: jsx_util_LayersDisplay
};
var jsx_util_Point = $hxClasses["jsx.util.Point"] = function(x,y) {
	this.x = x;
	this.y = y;
};
jsx_util_Point.__name__ = ["jsx","util","Point"];
jsx_util_Point.prototype = {
	__class__: jsx_util_Point
};
var jsx_util_PrivateAPI = $hxClasses["jsx.util.PrivateAPI"] = function() { };
jsx_util_PrivateAPI.__name__ = ["jsx","util","PrivateAPI"];
jsx_util_PrivateAPI.selectShapeBorder = function(layer) {
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
jsx_util_PrivateAPI.selectSingleLayer = function(layerName) {
	var idslct = charIDToTypeID("slct");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var ref = new ActionReference();
	var idLyr = charIDToTypeID("Lyr ");
	ref.putName(idLyr,layerName);
	desc.putReference(idnull,ref);
	var idMkVs = charIDToTypeID("MkVs");
	desc.putBoolean(idMkVs,false);
	executeAction(idslct,desc,DialogModes.NO);
};
var jsx_util_Timeline = $hxClasses["jsx.util.Timeline"] = function() { };
jsx_util_Timeline.__name__ = ["jsx","util","Timeline"];
jsx_util_Timeline.selectFrame = function(index) {
	var idslct = charIDToTypeID("slct");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var ref = new ActionReference();
	var idanimationFrameClass = stringIDToTypeID("animationFrameClass");
	ref.putIndex(idanimationFrameClass,index);
	desc.putReference(idnull,ref);
	executeAction(idslct,desc,DialogModes.NO);
};
jsx_util_Timeline.frameExists = function() {
	try {
		jsx_util_Timeline.selectFrame(1);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return false;
	}
	return true;
};
jsx_util_Timeline.duplicateSelectedFrame = function() {
	var idDplc = charIDToTypeID("Dplc");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var ref = new ActionReference();
	var idanimationFrameClass = stringIDToTypeID("animationFrameClass");
	var idOrdn = charIDToTypeID("Ordn");
	var idTrgt = charIDToTypeID("Trgt");
	ref.putEnumerated(idanimationFrameClass,idOrdn,idTrgt);
	desc.putReference(idnull,ref);
	executeAction(idDplc,desc,DialogModes.NO);
};
jsx_util_Timeline.deleteSelectedFrame = function() {
	var idDlt = charIDToTypeID("Dlt ");
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID("null");
	var ref = new ActionReference();
	var idanimationFrameClass = stringIDToTypeID("animationFrameClass");
	var idOrdn = charIDToTypeID("Ordn");
	var idTrgt = charIDToTypeID("Trgt");
	ref.putEnumerated(idanimationFrameClass,idOrdn,idTrgt);
	desc.putReference(idnull,ref);
	executeAction(idDlt,desc,DialogModes.NO);
};
var lib_FileDirectory = $hxClasses["lib.FileDirectory"] = function() { };
lib_FileDirectory.__name__ = ["lib","FileDirectory"];
var LayerTypeName = $hxClasses["LayerTypeName"] = function() { };
LayerTypeName.__name__ = ["LayerTypeName"];
var psd_Lib = $hxClasses["psd.Lib"] = function() { };
psd_Lib.__name__ = ["psd","Lib"];
psd_Lib.writeln = function(message) {
	$.writeln(message);
};
var psd_UnitType = $hxClasses["psd.UnitType"] = function() { };
psd_UnitType.__name__ = ["psd","UnitType"];
var psd_$private_Lib = $hxClasses["psd_private.Lib"] = function() { };
psd_$private_Lib.__name__ = ["psd_private","Lib"];
psd_$private_Lib.charIDToTypeID = function(characterID) {
	return charIDToTypeID(characterID);
};
psd_$private_Lib.stringIDToTypeID = function(stringID) {
	return stringIDToTypeID(stringID);
};
psd_$private_Lib.executeAction = function(typeId,actionDescriptor,dialogModes) {
	executeAction(typeId,actionDescriptor,dialogModes);
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses.Math = Math;
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
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe_Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe_Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe_Template.expr_int = new EReg("^[0-9]+$","");
haxe_Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe_Template.globals = { };
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
jsx_json_$convertion_JsonStructure.CURLY_START = "{";
jsx_json_$convertion_JsonStructure.CURLY_END = "}";
jsx_json_$convertion_JsonStructure.ARRAY_START = "[";
jsx_json_$convertion_JsonStructure.ARRAY_END = "]";
jsx_json_$convertion_JsonStructure.CLUMN = ",";
jsx_json_$convertion_JsonStructure.CR = "\n";
jsx_json_$convertion_JsonStructure.TAB = "\t";
jsx_json_$convertion_directory_DirectoryStructureToJsonConverter.TEMPLATE_JSON = "::tab::{\r\n::tab::\t\"name\":\"::name::\",\r\n::tab::\t\"files\":[\r\n::files::\r\n::tab::\t],\r\n::tab::\t\"directories\":[\r\n::directories::\r\n::tab::\t]\r\n::tab::}";
jsx_json_$convertion_info_PhotoshopInfomationToJsonConverter.TEMPLATE_JSON = "{\r\n\t\"filename\":\"::filename::\"\r\n}";
jsx_json_$convertion_layer_LayerToJsonConverter.TEMPLATE_JSON = "\t\t{\r\n\t\t\t\"name\":\"::name::\",\r\n\t\t\t\"directory\":\"::directory::\",\r\n\t\t\t\"path\":\"::path::\",\r\n\t\t\t\"x\":::x::,\r\n\t\t\t\"y\":::y::,\r\n\t\t\t\"opacity\":::opacity::\r\n\t\t}";
jsx_parser_layer_LayerStructure.COPY_NAME_CLUMN = "_";
jsx_parser_layer_LayerStructure.COPY_NAME_DEFAULT_ID = "1";
jsx_util_Timeline.FIRST_FRAME_INDEX = 1;
lib_FileDirectory.ROOT_DIRECTORY = "";
lib_FileDirectory.PATH_COLUMN = "/";
lib_FileDirectory.IMAGE_EXTENSION = ".png";
lib_FileDirectory.JSON_EXTENSION = ".json";
lib_FileDirectory.PSD_EXTENSION = ".psd";
lib_FileDirectory.OUTPUT_DIRECTORY = "frame_animation_export";
lib_FileDirectory.ASSETS_DIRECTORY = "assets";
lib_FileDirectory.JSON_DIRECTORY = "json";
lib_FileDirectory.INFOMATION_FILE = "info" + ".json";
lib_FileDirectory.JSON_LAYER_STRUCTURE_DIRECTORY = "layer";
lib_FileDirectory.LAYER_STRUCTURE_FILE = "structure" + ".json";
lib_FileDirectory.LAYER_INDEX_FILE = "index" + ".json";
lib_FileDirectory.JSON_DIRECTORY_STRUCTURE_DIRECTORY = "directory";
lib_FileDirectory.DIRECTORY_STRUCTURE_FILE = "structure" + ".json";
LayerTypeName.LAYER_SET = "LayerSet";
psd_Lib.app = app;
psd_Lib.preferences = preferences;
psd_UnitType.PIXEL = "px";
FrameAnimationExport.main();
