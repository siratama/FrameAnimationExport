package jsx.output;

import jsx.parser.layer.LayerStructures;
import jsx.json_convertion.info.PhotoshopInfomationToJsonConverter;
import lib.Information;
import jsx.parser.directory.DirectoryData;
import lib.PhotoshopLayer;
import jsx.parser.layer.LayerProperty;
import jsx.json_convertion.directory.DirectoryStructureToJsonConverter;
import jsx.json_convertion.layer.LayerStructueToJsonConverter;
import lib.FileDirectory;
import adobe.FileOpenMode;
import adobe.File;

class JsonExport
{
	private var layerStructures:LayerStructures;
	private var directoryData:DirectoryData;
	private var information:Information;

	public function new(
		layerStructures:LayerStructures,
		directoryData:DirectoryData,
		information:Information
	){
		this.layerStructures = layerStructures;
		this.directoryData = directoryData;
		this.information = information;
	}
	public function execute():Bool
	{
		var result = executeLayer();
		if(!result) return false;

		result = executeDirectory();
		if(!result) return false;

		result = executeInformation();
		if(!result) return false;

		return true;
	}
	private function executeLayer():Bool
	{
		var jsonOutputDirectory = OutputPath.instance.jsonLayerPath + FileDirectory.PATH_COLUMN;

		var result = write(
			LayerStructueToJsonConverter.execute(layerStructures.photoshopLayerSets),
			jsonOutputDirectory, FileDirectory.LAYER_STRUCTURE_FILE
		);
		if(!result) return false;

		return write(
			LayerStructueToJsonConverter.executeIndex(layerStructures.usedPathSet),
			jsonOutputDirectory, FileDirectory.LAYER_INDEX_FILE
		);
		return true;
	}
	private function executeDirectory():Bool
	{
		var jsonOutputDirectory = OutputPath.instance.jsonDirectoryPath + FileDirectory.PATH_COLUMN;

		return write(
			DirectoryStructureToJsonConverter.execute(directoryData),
			jsonOutputDirectory,
			FileDirectory.DIRECTORY_STRUCTURE_FILE
		);
	}
	private function executeInformation():Bool
	{
		var jsonOutputDirectory =
			[OutputPath.instance.outputDirectoryPath, FileDirectory.JSON_DIRECTORY].join(FileDirectory.PATH_COLUMN) + FileDirectory.PATH_COLUMN;

		return write(
			PhotoshopInfomationToJsonConverter.toJson(information),
			jsonOutputDirectory,
			FileDirectory.INFOMATION_FILE
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
