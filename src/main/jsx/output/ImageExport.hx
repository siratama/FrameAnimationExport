package jsx.output;
import adobe.Folder;
import jsx.parser.layer.LayerData;
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
class ImageExport
{
	private var layerData:LayerData;
	private var application:Application;

	public function new(application:Application, layerData:LayerData)
	{
		this.application = application;
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
		var imageDirectoryPath = [
			OutputPath.instance.outputAssetsDirectoryPath,
			layerData.getDirectoryPathString()
		].join(FileDirectory.PATH_COLUMN);

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

		var outputPath = [OutputPath.instance.outputDirectoryPath, FileDirectory.ASSETS_DIRECTORY, layerData.path].join(FileDirectory.PATH_COLUMN);
		newDocument.exportDocument(new File(outputPath + FileDirectory.IMAGE_EXTENSION), ExportType.SAVEFORWEB, exportOptionsSaveForWeb);
		newDocument.close(SaveOptions.DONOTSAVECHANGES);
	}
}
