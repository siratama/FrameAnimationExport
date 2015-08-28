package jsx;

import jsx.JsonOutput;
import psd.Units;
import js.Lib;
import jsx.util.PrivateAPI;
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
	private static inline var BORDER_PIXEL_SIZE = 1;
	private var layerWindowSet:Array<LayerWindow>;
	private var imagePathMap:Map<String, LayerData>;
	private var jsonOutput:JsonOutput;

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
				FrameAnimationExportInitialError.UNOPENED_DOCUMENT:
			(!PrivateAPI.timelineAnimationFrameExists()) ?
				FrameAnimationExportInitialError.TIMELINE_ANIMATION_FRAME_DOES_NOT_EXIST: null;

		var event = (error == null) ? FrameAnimationExportInitialErrorEvent.NONE: FrameAnimationExportInitialErrorEvent.ERROR(error);
		return Serializer.run(event);
	}

	public function execute():Void
	{
		activeDocument = application.activeDocument;

		parseAllFrameLayerWindow();
		createJson();
		createImagePathMap();

		var result = jsonOutput.execute();
		if(!result){
			js.Lib.alert("json output error");
			return;
		}

		outputImage();
		js.Lib.alert("finish");
	}
	private function parseAllFrameLayerWindow()
	{
		layerWindowSet = [];

		var timelineAnimationFrameIndex = PrivateAPI.TIMELINE_ANIMATION_FRAME_FIRST_INDEX;
		while(true)
		{
			try{
				PrivateAPI.selectTimelineAnimationFrame(timelineAnimationFrameIndex);
				var layerWindow = new LayerWindow(activeDocument.layers);
				layerWindow.parse();
				layerWindowSet.push(layerWindow);

			}catch(e:Dynamic){
				break;
			}
			timelineAnimationFrameIndex++;
		}
	}
	private function createJson()
	{
		var layerTypeDefSets = [];
		for (layerWindow in layerWindowSet)
		{
			layerTypeDefSets.push(
				layerWindow.getLayerTypeDefSet()
			);
		}
		jsonOutput = new JsonOutput(
			OutputDataToJsonConverter.toNormal(layerTypeDefSets),
			OutputDataToJsonConverter.toArray(layerTypeDefSets)
		);
	}
	private function createImagePathMap()
	{
		imagePathMap = new Map();
		for (layerWindow in layerWindowSet)
		{
			var map = layerWindow.createImagePathMap();
			for (key in map.keys())
			{
				if(!imagePathMap.exists(key))
					imagePathMap[key] = map[key];
			}
		}
	}
	private function outputImage()
	{
		psd.Lib.preferences.rulerUnits = Units.PIXELS;
		for (key in imagePathMap.keys())
		{
			var imageOutput = new ImageOutput(key, imagePathMap[key]);
		}
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

