package jsx.output;
import lib.FileDirectory;
import adobe.FileOpenMode;
import adobe.File;
class JsonExport
{
	private var layerStructureDefaultJson:String;
	private var layerStructureArrayJson:String;
	private var assetsStructureArrayJson:String;


	public function new(
		layerStructureDefaultJson:String,
		layerStructureArrayJson:String,
	    assetsStructureArrayJson:String
	){
		this.layerStructureDefaultJson = layerStructureDefaultJson;
		this.layerStructureArrayJson = layerStructureArrayJson;
		this.assetsStructureArrayJson = assetsStructureArrayJson;
	}
	public function execute():Bool
	{
		var result = executeLayer();
		if(!result) return false;

		return executeAssets();
	}
	private function executeLayer():Bool
	{
		var jsonOutputDirectory = OutputPath.instance.jsonLayerDirectoryPath + FileDirectory.PATH_COLUMN;

		var result = write(layerStructureDefaultJson, jsonOutputDirectory, FileDirectory.LAYER_STRUCTURE_DEFAULT_FILE);
		if(!result) return false;

		return write(layerStructureArrayJson, jsonOutputDirectory, FileDirectory.LAYER_STRUCTURE_ARRAY_FILE);
	}

	private function executeAssets():Bool
	{
		var jsonOutputDirectory = OutputPath.instance.jsonAssetsDirectoryPath + FileDirectory.PATH_COLUMN;

		var result = write(assetsStructureArrayJson, jsonOutputDirectory, FileDirectory.ASSETS_STRUCTURE_PATH_FILE);
		if(!result) return false;

		return true;
	}
	private function write(json:String, jsonOutputDirectory:String, fileName:String):Bool
	{
		var path = jsonOutputDirectory + fileName;

		var file = new File(path);
		var opened = file.open(FileOpenMode.WRITE);
		if(opened){
			file.write(json);
			file.close();
		}
		return opened;
	}
}
