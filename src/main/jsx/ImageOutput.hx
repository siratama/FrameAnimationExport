package jsx;
import adobe.Folder;
import jsx.util.PrivateAPI;
import psd.SaveOptions;
import lib.FileDirectory;
import psd.ExportType;
import adobe.File;
import psd.SaveDocumentType;
import psd.ExportOptionsSaveForWeb;
import psd.DocumentFill;
import psd.Application;
import psd.Document;
import psd.Layer;
class ImageOutput
{
	private var layerData:LayerData;
	private var application:Application;
	private var outputDirectoryPath:String;
	private var outputAssetsDirectoryPath:String;

	public function new(application:Application, outputDirectoryPath:String, outputAssetsDirectoryPath:String, layerData:LayerData)
	{
		this.application = application;
		this.outputDirectoryPath = outputDirectoryPath;
		this.outputAssetsDirectoryPath = outputAssetsDirectoryPath;
		this.layerData = layerData;
	}
	public function execute()
	{
		var defaultVisible = layerData.layer.visible;
		layerData.layer.visible = true;

		createDirectory();
		prepare();
		executeInNewDocument();

		layerData.layer.visible = defaultVisible;
	}
	private function createDirectory()
	{
		var imageDirectoryPath = '$outputAssetsDirectoryPath${FileDirectory.PATH_COLUMN}${layerData.getDirectoryPathString()}';
		var folder = new Folder(imageDirectoryPath);
		if(!folder.exists)
			folder.create();
	}
	private function prepare()
	{
		var document = application.activeDocument;
		document.activeLayer = layerData.layer;
		PrivateAPI.selectShapeBorder(layerData.layer);
		document.selection.copy(false);
	}
	private function executeInNewDocument()
	{
		var newDocument = application.documents.add(
			Std.int(layerData.bounds.width), Std.int(layerData.bounds.height),
			72, null, null, DocumentFill.TRANSPARENT
		);
		newDocument.paste();
		var exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();
		exportOptionsSaveForWeb.format = SaveDocumentType.PNG;
		exportOptionsSaveForWeb.PNG8 = false;

		var outputPath = [outputDirectoryPath, FileDirectory.OUTPUT_ASSETS_FOLDER_NAME, layerData.path].join(FileDirectory.PATH_COLUMN);
		newDocument.exportDocument(new File(outputPath + FileDirectory.IMAGE_EXTENSION), ExportType.SAVEFORWEB, exportOptionsSaveForWeb);
		newDocument.close(SaveOptions.DONOTSAVECHANGES);
	}
}
