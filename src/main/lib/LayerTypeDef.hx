package lib;
import haxe.Template;

typedef LayerTypeDef =
{
	var name:String;
	var directoryPath:String;
	var x:Float;
	var y:Float;
	var opacity:Float;
}

class Converter{

	private static inline var TEMPLATE_JSON =
'		{
			"name":"::name::",
			"directory_path":"::directory_path::",
			"x":::x::,
			"y":::y::,
			"opacity":::opacity::
		}';

	private static inline var TEMPLATE_ARRAY_STRING = '		["::name::", "::directory_path::", ::x::, ::y::, ::opacity::]';

	public static function toJson(layerTypeDef:LayerTypeDef):String{
		return toCommon(layerTypeDef, TEMPLATE_JSON);
	}
	public static function toArrayString(layerTypeDef:LayerTypeDef):String{
		return toCommon(layerTypeDef, TEMPLATE_ARRAY_STRING);
	}
	private static function toCommon(layerTypeDef:LayerTypeDef, templateString:String)
	{
		var layerTypeDefStr:Template = new Template(templateString);
		return layerTypeDefStr.execute({
			name:layerTypeDef.name,
			directory_path:layerTypeDef.directoryPath,
			x:layerTypeDef.x,
			y:layerTypeDef.y,
			opacity:layerTypeDef.opacity
		});
	}
}
