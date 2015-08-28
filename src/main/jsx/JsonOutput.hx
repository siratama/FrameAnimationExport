package jsx;
import lib.FileDirectory;
import adobe.Folder;
import adobe.FileOpenMode;
import adobe.File;
class JsonOutput
{
	private var normalJson:String;
	private var arrayJson:String;
	public var outputDirectoryPath(default, null):String;

	public function new(normalJson:String, arrayJson:String)
	{
		this.normalJson = normalJson;
		this.arrayJson = arrayJson;
	}
	public function execute():Bool
	{
		var selectedFolder = Folder.selectDialog();
		if(selectedFolder == null){
			return false;
		}
		//can't write?: selectedFolder.path
		outputDirectoryPath = selectedFolder.relativeURI + FileDirectory.PATH_COLUMN + FileDirectory.OUTPUT_FOLDER_NAME;
		var folder = new Folder(outputDirectoryPath);
		if(!folder.create()) return false;

		var result = write(normalJson, FileDirectory.OUTPUT_NORMAL_FILE_NAME);
		if(!result) return false;

		return write(arrayJson, FileDirectory.OUTPUT_ARRAY_FILE_NAME);
	}
	private function write(json:String, fileName:String):Bool
	{
		var path = outputDirectoryPath + FileDirectory.PATH_COLUMN + fileName;

		var file = new File(path);
		var opened = file.open(FileOpenMode.WRITE);
		if(opened){
			file.write(json);
			file.close();
		}
		return opened;
	}
}
