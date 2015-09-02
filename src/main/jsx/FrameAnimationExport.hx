package jsx;
import jsx.json_convertion.assets.AssetsStructureToJsonConverter;
import jsx.layer.LayerData;
import jsx.layer.LayerStructure;
import jsx.output.DirectoryCreation;

import jsx.json_convertion.layer.LayerStructueToJsonConverter;
import jsx.output.ImageExport;
import jsx.output.DirectoryCreation.DirectoryCreationEvent;
import jsx.output.JsonExport;
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
	private var layerStructureSet:Array<LayerStructure>;
	private var imagePathMap:Map<String, LayerData>;
	private var outputJson:JsonExport;

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
		parseAllFramelayerStructure();
		createImagePathMap();
		createJson();

		output();
	}
	private function parseAllFramelayerStructure()
	{
		layerStructureSet = [];

		var timelineAnimationFrameIndex = PrivateAPI.TIMELINE_ANIMATION_FRAME_FIRST_INDEX;
		while(true)
		{
			try{
				PrivateAPI.selectTimelineAnimationFrame(timelineAnimationFrameIndex);
				var layerStructure = new LayerStructure(activeDocument.layers, []);
				layerStructure.parse();
				layerStructureSet.push(layerStructure);

			}catch(e:Dynamic){
				break;
			}
			timelineAnimationFrameIndex++;
		}
	}
	private function createImagePathMap()
	{
		imagePathMap = new Map();
		for (layerStructure in layerStructureSet)
		{
			var map = layerStructure.createImagePathMap();
			for (key in map.keys())
			{
				if(!imagePathMap.exists(key))
					imagePathMap[key] = map[key];
			}
		}
	}
	private function createJson()
	{
		var photoshopLayerSets = [];
		for (layerStructure in layerStructureSet)
		{
			photoshopLayerSets.push(
				layerStructure.getPhotoshopLayerSet()
			);
		}
		outputJson = new JsonExport(
			LayerStructueToJsonConverter.toDefault(photoshopLayerSets),
			LayerStructueToJsonConverter.toArray(photoshopLayerSets),
			AssetsStructureToJsonConverter.toPathSet(imagePathMap)
		);
	}

	//
	private function output()
	{
		var result = outputJson.execute();
		if(!result){
			js.Lib.alert("Json output error.");
		}
		else{
			outputImage();
		}
		js.Lib.alert("finish");
	}
	private function outputImage()
	{
		//*** worning: layer of checked Propagate Frame1 ***
		//PrivateAPI.selectTimelineAnimationFrame(PrivateAPI.TIMELINE_ANIMATION_FRAME_FIRST_INDEX);

		psd.Lib.preferences.rulerUnits = Units.PIXELS;
		for (key in imagePathMap.keys())
		{
			var layerData:LayerData = imagePathMap[key];
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

