package jsx.json_convertion.layer;
import lib.PhotoshopLayer;
import haxe.Template;

class LayerToJsonConverter
{
	private static inline var TEMPLATE_JSON =
	'		{
			"name":"::name::",
			"directory_path":"::directory_path::",
			"x":::x::,
			"y":::y::,
			"opacity":::opacity::
		}';

	private static inline var TEMPLATE_ARRAY_STRING = '		["::name::", "::directory_path::", ::x::, ::y::, ::opacity::]';

	public static function toJson(photoshopLayer:PhotoshopLayer):String{
		return toCommon(photoshopLayer, TEMPLATE_JSON);
	}
	public static function toArrayString(photoshopLayer:PhotoshopLayer):String{
		return toCommon(photoshopLayer, TEMPLATE_ARRAY_STRING);
	}
	private static function toCommon(photoshopLayer:PhotoshopLayer, templateString:String)
	{
		var layerTypeDefStr:Template = new Template(templateString);
		return layerTypeDefStr.execute({
			name:photoshopLayer.name,
			directory_path:photoshopLayer.directoryPath,
			x:photoshopLayer.x,
			y:photoshopLayer.y,
			opacity:photoshopLayer.opacity
		});
	}
}
