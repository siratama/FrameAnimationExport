package jsx.parser.layer;

import jsx.util.Point;
import lib.PhotoshopLayer;
import psd.LayerSet;
import psd.Layers;
import psd.Layer;
import psd.LayerTypeName;

class LayerStructure
{
	private static inline var COPY_NAME_CLUMN = "_";
	private static inline var COPY_NAME_DEFAULT_ID = "1";

	private var layers:Layers;
	private var parentDirectoryPath:Array<String>;
	private var includedInvisibleLayer:Bool;
	public var layerPropertySet(default, null):Array<LayerProperty>;

	public function new(layers:Layers, parentDirectoryPath:Array<String>, includedInvisibleLayer:Bool)
	{
		this.layers = layers;
		this.parentDirectoryPath = parentDirectoryPath;
		this.includedInvisibleLayer = includedInvisibleLayer;

		layerPropertySet = [];
	}
	public function parse()
	{
		for (i in 0...layers.length)
		{
			var layer:Layer = layers[i];
			if(!includedInvisibleLayer && !layer.visible) continue;

			if(layer.typename == LayerTypeName.LAYER_SET)
			{
				var layerSet = cast(layer, LayerSet);

				var directoryPath = parentDirectoryPath.copy();
				directoryPath.push(layer.name);
				var childLayerStructure = new LayerStructure(layerSet.layers, directoryPath, includedInvisibleLayer);
				childLayerStructure.parse();

				layerPropertySet = layerPropertySet.concat(childLayerStructure.layerPropertySet);
			}
			else
			{
				var layerProperty = new LayerProperty(layer, parentDirectoryPath);

				//ignored empty image layer
				if(!layerProperty.bounds.isNull())
					layerPropertySet.push(layerProperty);
			}
		}
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
			for(tempLayerData in tempPathSet){
				if(tempLayerData.path == path){
					tempLayerData.visible = true;

					if(!OptionalParameter.instance.sameNameLayerIsIdentical) break;
				}
			}
		}

		var usedPathSet:Array<String> = [];
		for(tempLayerData in tempPathSet){
			if(tempLayerData.visible){
				usedPathSet.push(tempLayerData.path);
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
