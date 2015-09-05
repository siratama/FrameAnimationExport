package jsx.parser.layer;

import lib.PhotoshopLayer;
import psd.LayerSet;
import psd.Layers;
import psd.Layer;
import psd.LayerTypeName;

class LayerStructure
{
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
				var directory = new LayerStructure(layerSet.layers, directoryPath, includedInvisibleLayer);
				directory.parse();

				layerDataSet = layerDataSet.concat(directory.layerDataSet);
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
