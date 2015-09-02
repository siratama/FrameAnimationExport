package jsx.json_convertion.assets;
import lib.Directory;
import jsx.layer.LayerData;
class AssetsStructureToJsonConverter
{
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

	public static function toTest(imagePathMap:Map<String, LayerData>)
	{
		var directoryData = new DirectoryData();
		for(key in imagePathMap.keys())
		{
			var layerData:LayerData = imagePathMap[key];
			var directoryPath = layerData.directoryPath.copy();
			for (i in 0...directoryPath.length)
			{
				var directoryName = directoryPath[i];
				directoryData = directoryData.getChild(directoryName);

				if(i == directoryPath.length - 1)
					directoryData.addFile(layerData.fileName);
			}
		}
	}
}

class DirectoryData
{
	private var name:String;
	private var files:Array<String>;
	public var directoryDataMap(default, null):Map<DirectoryData>;

	public function new(name:String = "")
	{
		this.name = name;
		files = [];
		directoryDataMap = new Map();
	}
	public function addFile(fileName:String)
	{
		files.push(fileName);
	}
	public function getChild(childDirectoryName:String):DirectoryData
	{
		if(!directoryDataMap.exists(childDirectoryName)){
			directoryDataMap[childDirectoryName] = new DirectoryData(childDirectoryName);
		}
		return directoryDataMap[childDirectoryName];
	}
}
