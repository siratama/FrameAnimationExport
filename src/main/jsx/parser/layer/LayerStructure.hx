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
	public var layerDataSet(default, null):Array<LayerData>;

	public function new(layers:Layers, parentDirectoryPath:Array<String>, includedInvisibleLayer:Bool)
	{
		this.layers = layers;
		this.parentDirectoryPath = parentDirectoryPath;
		this.includedInvisibleLayer = includedInvisibleLayer;

		layerDataSet = [];
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

				layerDataSet = layerDataSet.concat(childLayerStructure.layerDataSet);
			}
			else
			{
				var layerData = new LayerData(layer, parentDirectoryPath);

				//ignored empty image layer
				if(!layerData.bounds.isNull())
					layerDataSet.push(layerData);
			}
		}
	}
	public function getPhotoshopLayerSet():Array<PhotoshopLayer>
	{
		var photoshopLayerSet = [];
		for (layerData in layerDataSet)
		{
			photoshopLayerSet.push(
				layerData.toPhotoshopLayer()
			);
		}
		return photoshopLayerSet;
	}
	public function createImagePathMap():Map<String, LayerData>
	{
		var imagePathMap:Map<String, LayerData> = new Map();
		for(layerData in layerDataSet)
		{
			imagePathMap[layerData.path] = layerData;
		}
		return imagePathMap;
	}

	public function createUsedPathSet(allFrameImagepathMap:Map<String, LayerData>):Array<String>
	{
		var tempPathSet:Array<TempPath> = [
			for(layerData in layerDataSet){ new TempPath(layerData.path); }
		];

		for (path in allFrameImagepathMap.keys()){
			for(tempLayerData in tempPathSet){
				if(tempLayerData.path == path){
					tempLayerData.visible = true;
					break;
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
		for(layerData in layerDataSet)
		{
			if(offsetX == null || layerData.x < offsetX){
				offsetX = layerData.x;
			}
			if(offsetY == null || layerData.y < offsetY){
				offsetY = layerData.y;
			}
		}
		return new Point(offsetX, offsetY);
	}
	public function offsetPosition(point:Point)
	{
		for(layerData in layerDataSet)
			layerData.offsetPosition(point);
	}
	public function renameSameNameLayer()
	{
		var layerNameMap = new Map<String, LayerData>();
		for(layerData in layerDataSet)
		{
			if(layerNameMap[layerData.path] == null){
				layerNameMap[layerData.path] = layerData;
				continue;
			}

			var arr = layerData.path.split(COPY_NAME_CLUMN);
			var copyIdString = (arr.length == 1) ?
				COPY_NAME_DEFAULT_ID : arr[arr.length - 1];

			var copyId = Std.parseInt(copyIdString);
			if(copyId == null){
				layerNameMap[layerData.path] = layerData;
				continue;
			}
			renameSameLayerIncrementRoop(layerNameMap, layerData, copyId);
		}
	}
	private function renameSameLayerIncrementRoop(layerNameMap:Map<String, LayerData>, layerData:LayerData, copyId:Int)
	{
		var renamedLayerName = layerData.fileName + COPY_NAME_CLUMN + Std.string(copyId);
		if(layerNameMap[renamedLayerName] == null){
			layerNameMap[renamedLayerName] = layerData;
			layerData.renameLayer(renamedLayerName);
		}
		else{
			renameSameLayerIncrementRoop(layerNameMap, layerData, ++copyId);
		}
	}
	public function renameToOriginalName()
	{
		for(layerData in layerDataSet)
		{
			layerData.renameToOriginalName();
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
