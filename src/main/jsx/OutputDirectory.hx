package jsx;

import adobe.Folder;
import lib.FileDirectory;

enum OutputDirectoryEvent
{
	ERROR(error:OutputDirectoryError);
	SUCCESS(outputDirectoryPath:String, assetsDirectoryPath:String);
}
@:enum abstract OutputDirectoryError(String)
{
	var FOLDER_SELECTION_ERROR = "Folder selection error.";
	var OUTPUT_FOLDER_CREATION_ERROR = "Output folder creation error.";
	var OUTPUT_ASSETS_FOLDER_CREATION_ERROR = "Output assets folder creation error.";
}

class OutputDirectory
{
	public static function execute():OutputDirectoryEvent
	{
		var selectedFolder = Folder.selectDialog();
		if(selectedFolder == null){
			return OutputDirectoryEvent.ERROR(OutputDirectoryError.FOLDER_SELECTION_ERROR);
		}

		//can't write?: selectedFolder.path
		var outputDirectoryPath = [selectedFolder.relativeURI, FileDirectory.OUTPUT_FOLDER_NAME].join(FileDirectory.PATH_COLUMN);
		var outputFolder = new Folder(outputDirectoryPath);

		if(!outputFolder.create()){
			return OutputDirectoryEvent.ERROR(OutputDirectoryError.OUTPUT_FOLDER_CREATION_ERROR);
		}

		var assetsDirectoryPath = [outputDirectoryPath, FileDirectory.OUTPUT_ASSETS_FOLDER_NAME].join(FileDirectory.PATH_COLUMN);
		var outputAssetsFolder = new Folder(assetsDirectoryPath);

		return (!outputAssetsFolder.create()) ?
			OutputDirectoryEvent.ERROR(OutputDirectoryError.OUTPUT_ASSETS_FOLDER_CREATION_ERROR):
			OutputDirectoryEvent.SUCCESS(outputDirectoryPath, assetsDirectoryPath);
	}
}
