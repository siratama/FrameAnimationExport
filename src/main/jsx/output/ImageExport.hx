package jsx.output;
import adobe.Folder;
import jsx.parser.layer.LayerProperty;
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
	private var layerProperty:LayerProperty;
	private var application:Application;

	public function new(application:Application, layerProperty:LayerProperty)
	{
		this.application = application;
		this.layerProperty = layerProperty;
	}
	public function execute()
	{
		var defaultVisible = layerProperty.layer.visible;
		layerProperty.layer.visible = true;

		createDirectory();
		prepare();
		executeInNewDocument();

		layerProperty.layer.visible = defaultVisible;
	}
	private function createDirectory()
	{
		var imageDirectoryPath = [
			OutputPath.instance.outputAssetsDirectoryPath,
			layerProperty.getDirectoryPathString()
		].join(FileDirectory.PATH_COLUMN);

		var folder = new Folder(imageDirectoryPath);
		if(!folder.exists)
			folder.create();
	}
	private function prepare()
	{
		var document = application.activeDocument;
		document.activeLayer = layerProperty.layer;
		PrivateAPI.selectShapeBorder(layerProperty.layer);
		document.selection.copy(false);
	}
	private function executeInNewDocument()
	{
		var newDocument = application.documents.add(
			Std.int(layerProperty.bounds.width), Std.int(layerProperty.bounds.height),
			72, null, null, DocumentFill.TRANSPARENT
		);
		newDocument.paste();
		var exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();
		exportOptionsSaveForWeb.format = SaveDocumentType.PNG;
		exportOptionsSaveForWeb.PNG8 = false;

		var outputPath = [OutputPath.instance.outputDirectoryPath, FileDirectory.ASSETS_DIRECTORY, layerProperty.path].join(FileDirectory.PATH_COLUMN);
		newDocument.exportDocument(new File(outputPath + FileDirectory.IMAGE_EXTENSION), ExportType.SAVEFORWEB, exportOptionsSaveForWeb);
		newDocument.close(SaveOptions.DONOTSAVECHANGES);
	}
}
