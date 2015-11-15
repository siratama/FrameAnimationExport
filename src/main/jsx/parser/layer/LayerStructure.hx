package jsx.parser.layer;

import psd.Application;
import psd.SaveOptions;
import psd.DocumentFill;
import jsx.util.Timeline;
import jsx.util.PrivateAPI;
import jsx.util.DocumentUtil;
import jsx.util.Bounds;
import psd.Document;
import jsx.util.History;
import jsx.util.LayersDisplay;
import jsx.util.Point;
import lib.PhotoshopLayer;
import psd.LayerSet;
import psd.Layers;
import psd.Layer;
import psd.LayerTypeName;
using jsx.util.Bounds;
import psd.Lib.app;

class LayerStructure
{
	private static inline var COPY_NAME_CLUMN = "_";
	private static inline var COPY_NAME_DEFAULT_ID = "1";

	private var application:Application;
	private var document:Document;
	private var layers:Layers;
	private var parentDirectoryPath:Array<String>;
	private var includedInvisibleLayer:Bool;
	private var extractedBounds:Bool;
	public var layerPropertySet(default, null):Array<LayerProperty>;
	private var layersDisplay:LayersDisplay;

	public function new(document:Document, layers:Layers, parentDirectoryPath:Array<String>, includedInvisibleLayer:Bool, extractedBounds:Bool)
	{
		this.document = document;
		this.layers = layers;
		this.parentDirectoryPath = parentDirectoryPath;
		this.includedInvisibleLayer = includedInvisibleLayer;
		this.extractedBounds = extractedBounds;

		application = app;
		layerPropertySet = [];

		layersDisplay = new LayersDisplay(document.layers);
	}
	public function parse(rootFolder:LayerSet = null)
	{
		var isRootLayer = (rootFolder == null);

		for (i in 0...layers.length)
		{
			var layer:Layer = layers[i];
			if(!includedInvisibleLayer && !layer.visible) continue;

			if(layer.typename == LayerTypeName.LAYER_SET)
			{
				var layerSet = cast(layer, LayerSet);

				var directoryPath = parentDirectoryPath.copy();
				directoryPath.push(layer.name);
				var childLayerStructure = new LayerStructure(document, layerSet.layers, directoryPath, includedInvisibleLayer, extractedBounds);

				var decidedRootFolder = isRootLayer ? layerSet : rootFolder;
				childLayerStructure.parse(decidedRootFolder);
				layerPropertySet = layerPropertySet.concat(childLayerStructure.layerPropertySet);
			}
			else
			{
				var bounds:Bounds = extractedBounds ? extractBounds(layer, rootFolder): null;
				var layerProperty = new LayerProperty(layer, parentDirectoryPath, bounds, rootFolder);

				//ignored empty image layer
				if(!extractedBounds || !layerProperty.bounds.isNull())
					layerPropertySet.push(layerProperty);
			}
		}
	}
	private function extractBounds(layer:Layer, rootFolder:LayerSet):Bounds
	{
		var bounds:Bounds;
		var isRootLayer = (rootFolder == null);
		if(isRootLayer){
			document.activeLayer = layer;
			DocumentUtil.rasterizeLayerStyle();
			bounds = document.activeLayer.bounds.convert();
		}
		else{
			layersDisplay.hide();
			layer.visible = true;

			document.activeLayer = rootFolder;
			var tempDocument = application.documents.add(
				Std.int(document.width), Std.int(document.height),
				72, null, null, DocumentFill.TRANSPARENT
			);
			application.activeDocument = document;

			var duplicatedRootFolder:LayerSet = cast rootFolder.duplicate(tempDocument);
			application.activeDocument = tempDocument;
			duplicatedRootFolder.merge();
			bounds = tempDocument.activeLayer.bounds.convert();

			tempDocument.close(SaveOptions.DONOTSAVECHANGES);
			layersDisplay.restore();
		}
		return bounds;
	}

	public function getPhotoshopLayerSet():Array<PhotoshopLayer>
	{
		var photoshopLayerSet = [];
		for (layerProperty in layerPropertySet)
		{
			photoshopLayerSet.push(
				layerProperty.toPhotoshopLayer()
			);
		}
		return photoshopLayerSet;
	}
	public function createImagePathMap():Map<String, LayerProperty>
	{
		var imagePathMap:Map<String, LayerProperty> = new Map();
		for(layerProperty in layerPropertySet)
		{
			imagePathMap[layerProperty.path] = layerProperty;
		}
		return imagePathMap;
	}

	public function createUsedPathSet(allFrameImagepathMap:Map<String, LayerProperty>):Array<String>
	{
		var tempPathSet:Array<TempPath> = [
			for(layerProperty in layerPropertySet){ new TempPath(layerProperty.path); }
		];

		for (path in allFrameImagepathMap.keys()){
			for(tempPath in tempPathSet){
				if(tempPath.path == path){
					tempPath.visible = true;

					if(!OptionalParameter.instance.sameNameLayerIsIdentical) break;
				}
			}
		}

		var usedPathSet:Array<String> = [];
		for(tempPath in tempPathSet){
			if(tempPath.visible){
				usedPathSet.push(tempPath.path);
			}
		}
		return usedPathSet;
	}

	public function getOffsetPosition():Point
	{
		var offsetX:Null<Float> = null;
		var offsetY:Null<Float> = null;
		for(layerProperty in layerPropertySet)
		{
			if(offsetX == null || layerProperty.x < offsetX){
				offsetX = layerProperty.x;
			}
			if(offsetY == null || layerProperty.y < offsetY){
				offsetY = layerProperty.y;
			}
		}
		return new Point(offsetX, offsetY);
	}
	public function offsetPosition(point:Point)
	{
		for(layerProperty in layerPropertySet)
			layerProperty.offsetPosition(point);
	}
	public function renameSameNameLayer()
	{
		var layerNameMap = new Map<String, LayerProperty>();
		for(layerProperty in layerPropertySet)
		{
			if(layerNameMap[layerProperty.path] == null){
				layerNameMap[layerProperty.path] = layerProperty;
				continue;
			}

			var arr = layerProperty.path.split(COPY_NAME_CLUMN);
			var copyIdString = (arr.length == 1) ?
				COPY_NAME_DEFAULT_ID : arr[arr.length - 1];

			var copyId = Std.parseInt(copyIdString);
			if(copyId == null){
				layerNameMap[layerProperty.path] = layerProperty;
				continue;
			}
			renameSameLayerIncrementRoop(layerNameMap, layerProperty, copyId);
		}
	}
	private function renameSameLayerIncrementRoop(layerNameMap:Map<String, LayerProperty>, layerProperty:LayerProperty, copyId:Int)
	{
		var renamedLayerName = layerProperty.fileName + COPY_NAME_CLUMN + Std.string(copyId);
		if(layerNameMap[renamedLayerName] == null){
			layerNameMap[renamedLayerName] = layerProperty;
			layerProperty.renameLayer(renamedLayerName);
		}
		else{
			renameSameLayerIncrementRoop(layerNameMap, layerProperty, ++copyId);
		}
	}
	public function renameToOriginalName()
	{
		for(layerProperty in layerPropertySet)
		{
			layerProperty.renameToOriginalName();
		}
	}
}

class TempPath
{
	public var path(default, null):String;
	public var visible:Bool;
	public function new(path:String)
	{
		this.path = path;
		visible = false;
	}
}
