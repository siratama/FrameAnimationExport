package jsx.json_convertion.directory;
import haxe.Template;
import jsx.parser.directory.DirectoryData;
import lib.Directory;
import jsx.parser.layer.LayerProperty;
class DirectoryStructureToJsonConverter
{
	/*
	public static function toPathSet(imagePathMap:Map<String, LayerData>):String
	{
		var json = JsonStructure.ARRAY_START + JsonStructure.CR;

		var pathSet = [
			for(key in imagePathMap.keys()) key
		];

		for (i in 0...pathSet.length)
		{
			var line = '${JsonStructure.TAB}"${pathSet[i]}"';
			if(i < pathSet.length - 1){
				line += JsonStructure.CLUMN;
			}
			line += JsonStructure.CR;
			json += line;
		}

		json += JsonStructure.ARRAY_END;
		return json;
	}
	*/


	private static inline var TEMPLATE_JSON =
'::tab::{
::tab::	"name":"::name::",
::tab::	"files":[
::files::
::tab::	],
::tab::	"directories":[
::directories::
::tab::	]
::tab::}';

	public static function execute(directoryData:DirectoryData):String
	{
		var directory = directoryData.toDirectory();
		return executeRoop(directory);
	}
	private static function executeRoop(directory:Directory, nest:Int=0):String
	{
		var tab = "";
		for(i in 0...nest)
			tab += JsonStructure.TAB;

		var template = new Template(TEMPLATE_JSON);
		var json = template.execute({
			tab: tab,
			name: directory.name,
			files: filesToJson(directory.files, tab),
			directories: childDirectoriesToJson(directory.directories, ++nest)
		});

		return json;
	}
	private static function filesToJson(files:Array<String>, tab:String):String
	{
		for(i in 0...2)
			tab += JsonStructure.TAB;

		var json = "";
		for(i in 0...files.length)
		{
			var file = files[i];
			json += '$tab"$file"';

			if(i < files.length - 1){
				json += JsonStructure.CLUMN + JsonStructure.CR;
			}
		}
		return json;
	}
	private static function childDirectoriesToJson(directories:Array<Directory>, nest:Int):String
	{
		var json = "";
		for(i in 0...directories.length)
		{
			var childDirectory = directories[i];
			json += executeRoop(childDirectory, nest+1);

			if(i < directories.length - 1){
				json += JsonStructure.CLUMN + JsonStructure.CR;
			}
		}
		return json;
	}

}

