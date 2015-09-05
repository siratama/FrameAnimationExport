package jsx.json_convertion.layer;
import lib.PhotoshopLayer;
import haxe.Template;

class LayerToJsonConverter
{
	private static inline var TEMPLATE_JSON =
'		{
			"name":"::name::",
			"directory":"::directory::",
			"path":"::path::",
			"x":::x::,
			"y":::y::,
			"opacity":::opacity::
		}';

	//private static inline var TEMPLATE_ARRAY_STRING = '		["::name::", "::directory::", "::path::", ::x::, ::y::, ::opacity::]';

	public static function toJson(photoshopLayer:PhotoshopLayer):String{
		return toCommon(photoshopLayer, TEMPLATE_JSON);
	}
	/*
	public static function toArrayString(photoshopLayer:PhotoshopLayer):String{
		return toCommon(photoshopLayer, TEMPLATE_ARRAY_STRING);
	}
	*/
	private static function toCommon(photoshopLayer:PhotoshopLayer, templateString:String)
	{
		var template:Template = new Template(templateString);
		return template.execute({
			name:photoshopLayer.name,
			directory:photoshopLayer.directory,
			path:photoshopLayer.path,
			x:photoshopLayer.x,
			y:photoshopLayer.y,
			opacity:photoshopLayer.opacity
		});
	}
}
