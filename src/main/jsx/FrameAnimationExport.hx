package jsx;
import jsx.parser.layer.LayerStructures;
import lib.Information;
import jsx.parser.directory.DirectoryStructure;
import lib.PhotoshopLayer;
import jsx.parser.layer.LayerData;
import jsx.parser.layer.LayerStructure;
import jsx.output.DirectoryCreation;

import jsx.output.ImageExport;
import jsx.output.DirectoryCreation.DirectoryCreationEvent;
import jsx.output.JsonExport;
import psd.Units;
import js.Lib;
import common.FrameAnimationExportInitialErrorEvent;
import haxe.Serializer;
import haxe.Unserializer;
import psd.Application;
import psd.Document;
import psd.Lib.app;

using jsx.util.ErrorChecker;

@:keep
@:native("PixelOutline")
class FrameAnimationExport
{
	private var application:Application;
	private var activeDocument:Document;
	private var directoryStructure:DirectoryStructure;
	private var information:Information;
	private var layerStructures:LayerStructures;

	public static function main()
	{
		#if jsx
		FrameAnimationExportJSXRunner.execute();
		#end
	}
	public function new()
	{
		application = app;
	}
	public function getInitialErrorEvent():String
	{
		var error =
			(application.documents.length == 0) ?
				FrameAnimationExportInitialError.UNOPENED_DOCUMENT: null;

		var event = (error == null) ? FrameAnimationExportInitialErrorEvent.NONE: FrameAnimationExportInitialErrorEvent.ERROR(error);
		return Serializer.run(event);
	}

	//
	public function execute():Void
	{
		activeDocument = application.activeDocument;
		createDirectory();
	}

	//
	private function createDirectory()
	{
		switch(DirectoryCreation.execute())
		{
			case DirectoryCreationEvent.ERROR(error):
				js.Lib.alert(error);
			case DirectoryCreationEvent.SUCCESS:
				parse();
		}
	}

	//
	private function parse()
	{
		layerStructures = new LayerStructures(activeDocument);
		layerStructures.parse();

		directoryStructure = new DirectoryStructure();
		directoryStructure.parse(layerStructures.imagePathMap);

		information = {
			filename:activeDocument.name
		};

		output();
	}

	//
	private function output()
	{
		var result = outputJson();
		if(!result){
			js.Lib.alert("Json output error.");
		}
		else{
			outputImage();
		}
		js.Lib.alert("finish");
	}
	private function outputJson():Bool
	{
		var jsonExport = new JsonExport(
			layerStructures,
			directoryStructure.rootDirectoryData,
			information
		);
		return jsonExport.execute();
	}
	private function outputImage()
	{
		//*** worning: layer of checked Propagate Frame1 ***
		//PrivateAPI.selectTimelineAnimationFrame(PrivateAPI.TIMELINE_ANIMATION_FRAME_FIRST_INDEX);

		psd.Lib.preferences.rulerUnits = Units.PIXELS;
		for (key in layerStructures.imagePathMap.keys())
		{
			var layerData:LayerData = layerStructures.imagePathMap[key];
			var outputImage = new ImageExport(application, layerData);
			outputImage.execute();
		}
		activeDocument.selection.deselect();
	}
}
private class FrameAnimationExportJSXRunner
{
	public static function execute()
	{
		var frameAnimationExport = new FrameAnimationExport();
		var errorEvent:FrameAnimationExportInitialErrorEvent = Unserializer.run(frameAnimationExport.getInitialErrorEvent());
		switch(errorEvent)
		{
			case FrameAnimationExportInitialErrorEvent.ERROR(error):
				Lib.alert(cast(error, String));

			case FrameAnimationExportInitialErrorEvent.NONE:
				frameAnimationExport.execute();
		}
	}
}

