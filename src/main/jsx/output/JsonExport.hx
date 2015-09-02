package jsx.output;
import jsx.parser.directory.DirectoryData;
import lib.PhotoshopLayer;
import jsx.parser.layer.LayerData;
import jsx.json_convertion.directory.DirectoryStructureToJsonConverter;
import jsx.json_convertion.layer.LayerStructueToJsonConverter;
import lib.FileDirectory;
import adobe.FileOpenMode;
import adobe.File;
class JsonExport
{
	private var imagePathMap:Map<String, LayerData>;
	private var photoshopLayerSets:Array<Array<PhotoshopLayer>>;
	private var directoryData:DirectoryData;

	public function new(
		photoshopLayerSets:Array<Array<PhotoshopLayer>>,
		imagePathMap:Map<String, LayerData>,
		directoryData:DirectoryData
	){
		this.directoryData = directoryData;
		this.imagePathMap = imagePathMap;
		this.photoshopLayerSets = photoshopLayerSets;
	}
	public function execute():Bool
	{
		var result = executeLayer();
		if(!result) return false;

		return executeAssets();
	}
	private function executeLayer():Bool
	{
		var jsonOutputDirectory = OutputPath.instance.jsonLayerPath + FileDirectory.PATH_COLUMN;

		var result = write(
			LayerStructueToJsonConverter.toDefault(photoshopLayerSets),
			jsonOutputDirectory, FileDirectory.LAYER_STRUCTURE_DEFAULT_FILE
		);
		if(!result) return false;

		return write(
			LayerStructueToJsonConverter.toArray(photoshopLayerSets),
			jsonOutputDirectory, FileDirectory.LAYER_STRUCTURE_ARRAY_FILE
		);
	}

	private function executeAssets():Bool
	{
		var jsonOutputDirectory = OutputPath.instance.jsonDirectoryPath + FileDirectory.PATH_COLUMN;

		var result = write(
			DirectoryStructureToJsonConverter.toPathSet(imagePathMap),
			jsonOutputDirectory,
			FileDirectory.DIRECTORY_STRUCTURE_PATH_FILE
		);
		if(!result) return false;

		return write(
			DirectoryStructureToJsonConverter.toDirectory(directoryData),
			jsonOutputDirectory,
			FileDirectory.DIRECTORY_STRUCTURE_DEFAULT_FILE
		);
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
