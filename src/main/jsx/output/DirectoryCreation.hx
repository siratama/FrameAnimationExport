package jsx.output;

import adobe.Folder;
import lib.FileDirectory;

enum DirectoryCreationEvent
{
	ERROR(error:DirectoryCreationError);
	SUCCESS;
}
@:enum abstract DirectoryCreationError(String)
{
	var FOLDER_SELECTION_ERROR = "Folder selection error.";
	var OUTPUT_FOLDER_CREATION_ERROR = "Output folder creation error.";
	var OUTPUT_ASSETS_FOLDER_CREATION_ERROR = "Output assets folder creation error.";
	var OUTPUT_JSON_LAYER_FOLDER_CREATION_ERROR = "Output json layer folder creation error.";
	var OUTPUT_JSON_DIRECTORY_FOLDER_CREATION_ERROR = "Output json assets folder creation error.";
}

class DirectoryCreation
{
	public static function execute():DirectoryCreationEvent
	{
		var selectedFolder = Folder.selectDialog();
		if(selectedFolder == null){
			return DirectoryCreationEvent.ERROR(DirectoryCreationError.FOLDER_SELECTION_ERROR);
		}

		//can't write?: selectedFolder.path
		var outputDirectoryPath = [selectedFolder.relativeURI, FileDirectory.OUTPUT_DIRECTORY].join(FileDirectory.PATH_COLUMN);
		var outputFolder = new Folder(outputDirectoryPath);
		if(!outputFolder.create()){
			return DirectoryCreationEvent.ERROR(DirectoryCreationError.OUTPUT_FOLDER_CREATION_ERROR);
		}

		var assetsDirectoryPath = [outputDirectoryPath, FileDirectory.ASSETS_DIRECTORY].join(FileDirectory.PATH_COLUMN);
		var outputAssetsFolder = new Folder(assetsDirectoryPath);
		if(!outputAssetsFolder.create()){
			return DirectoryCreationEvent.ERROR(DirectoryCreationError.OUTPUT_ASSETS_FOLDER_CREATION_ERROR);
		}

		var jsonLayerPath = [outputDirectoryPath, FileDirectory.JSON_DIRECTORY, FileDirectory.JSON_LAYER_STRUCTURE_DIRECTORY].join(FileDirectory.PATH_COLUMN);
		var jsonLayerFolder = new Folder(jsonLayerPath);
		if(!jsonLayerFolder.create()){
			return DirectoryCreationEvent.ERROR(DirectoryCreationError.OUTPUT_JSON_LAYER_FOLDER_CREATION_ERROR);
		}

		var jsonDirectoryPath = [outputDirectoryPath, FileDirectory.JSON_DIRECTORY, FileDirectory.JSON_DIRECTORY_STRUCTURE_DIRECTORY].join(FileDirectory.PATH_COLUMN);
		var jsonDirectoryFolder = new Folder(jsonDirectoryPath);
		if(!jsonDirectoryFolder.create()){
			return DirectoryCreationEvent.ERROR(DirectoryCreationError.OUTPUT_JSON_DIRECTORY_FOLDER_CREATION_ERROR);
		}

		OutputPath.instance.setData(outputDirectoryPath, assetsDirectoryPath, jsonLayerPath, jsonDirectoryPath);
		return DirectoryCreationEvent.SUCCESS;
	}
}
