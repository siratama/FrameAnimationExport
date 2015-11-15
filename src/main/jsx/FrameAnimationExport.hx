package jsx;

import jsx.util.LayersDisplay;
import jsx.util.History;
import lib.FileDirectory;
import jsx.parser.layer.LayerStructures;
import lib.Information;
import jsx.parser.directory.DirectoryStructure;
import jsx.parser.layer.LayerProperty;
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
@:native("FrameAnimationExport")
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
		FrameAnimationExportJSXRunner.execute(false, false, false);
		#elseif jsx_offset
		FrameAnimationExportJSXRunner.execute(true, false, false);
		//FrameAnimationExportJSXRunner.execute(true, false, true); //test
		#end
	}
	public function new(frame1offsetData:String, ignoredFrame1OutputData:String, sameNameLayerIsIdenticalData:String)
	{
		var ignoredFrame1Output:Bool = Unserializer.run(ignoredFrame1OutputData);
		var frame1offset:Bool = Unserializer.run(frame1offsetData);
		var sameNameLayerIsIdentical:Bool = Unserializer.run(sameNameLayerIsIdenticalData);

		OptionalParameter.instance.set(frame1offset, ignoredFrame1Output, sameNameLayerIsIdentical);
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
				switch(error){
					case DirectoryCreationError.FOLDER_SELECTION_ERROR: return;
					case _: js.Lib.alert(error);
				}
				//js.Lib.alert(error);

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

		//aaa.psd -> aaa
		//aaa.bbb.psd -> aaa.bbb
		//aaa -> aaa
		var arr = activeDocument.name.split(".");
		if(arr.length > 1) arr.pop();
		information = {
			filename:arr.join(".")
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
			var layerProperty:LayerProperty = layerStructures.imagePathMap[key];
			var outputImage = new ImageExport(application, layerProperty);
			outputImage.execute();
		}
	}
}
private class FrameAnimationExportJSXRunner
{
	public static function execute(frame1offset:Bool, ignoredFrame1Output:Bool, sameNameLayerIsIdentical:Bool)
	{
		var frame1offsetData = Serializer.run(frame1offset);
		var ignoredFrame1OutputData = Serializer.run(ignoredFrame1Output);
		var sameNameLayerIsIdenticalData = Serializer.run(sameNameLayerIsIdentical);

		var frameAnimationExport = new FrameAnimationExport(frame1offsetData, ignoredFrame1OutputData, sameNameLayerIsIdenticalData);
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

