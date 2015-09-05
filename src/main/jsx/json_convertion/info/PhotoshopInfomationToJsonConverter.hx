package jsx.json_convertion.info;
import haxe.Template;
import lib.Information;
class PhotoshopInfomationToJsonConverter
{

	private static inline var TEMPLATE_JSON =
'{
	"filename":"::filename::"
}';

	public static function toJson(infomation:Information):String
	{
		var template = new Template(TEMPLATE_JSON);
		return template.execute({
			filename:infomation.filename
		});
	}
}
