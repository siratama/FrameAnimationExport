package jsx.output;
import psd.LayerSet;
import psd.DocumentFill;
import jsx.util.LayersDisplay;
import psd.TrimType;
import adobe.Folder;
import jsx.parser.layer.LayerProperty;
import jsx.util.PrivateAPI;
import psd.SaveOptions;
import lib.FileDirectory;
import psd.ExportType;
import adobe.File;
import psd.SaveDocumentType;
import psd.ExportOptionsSaveForWeb;
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
		var layersDisplay = new LayersDisplay(application.activeDocument.layers);
		layersDisplay.hide();

		createDirectory();

		var tempDocument = prepare();
		export(tempDocument);

		layersDisplay.restore();
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
	private function prepare():Document
	{
		var document = application.activeDocument;

		var tempDocument = application.documents.add(
			Std.int(document.width), Std.int(document.height),
			72, null, null, DocumentFill.TRANSPARENT
		);
		application.activeDocument = document;

		layerProperty.layer.visible = true;
		if(layerProperty.isRootLayer()){
			layerProperty.layer.duplicate(tempDocument);
		}
		else{
			cast layerProperty.rootFolder.duplicate(tempDocument);
		}
		application.activeDocument = tempDocument;

		tempDocument.revealAll();
		tempDocument.trim(TrimType.TRANSPARENT);

		return tempDocument;
	}
	private function export(tempDocument:Document)
	{
		var exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();
		exportOptionsSaveForWeb.format = SaveDocumentType.PNG;
		exportOptionsSaveForWeb.PNG8 = false;

		var outputPath = [OutputPath.instance.outputDirectoryPath, FileDirectory.ASSETS_DIRECTORY, layerProperty.path].join(FileDirectory.PATH_COLUMN);
		tempDocument.exportDocument(new File(outputPath + FileDirectory.IMAGE_EXTENSION), ExportType.SAVEFORWEB, exportOptionsSaveForWeb);
		tempDocument.close(SaveOptions.DONOTSAVECHANGES);
	}
}
