package jsx;

import lib.FileDirectory;
import lib.LayerTypeDef;
import psd.LayerSet;
import psd.Layers;
import psd.Layer;
import psd.LayerTypeName;

class LayerWindow
{
	private var layers:Layers;
	private var parentDirectoryPath:Array<String>;
	public var visibleLayerDataSet(default, null):Array<LayerData>;

	public function new(layers:Layers, parentDirectoryPath:Array<String>)
	{
		this.layers = layers;
		this.parentDirectoryPath = parentDirectoryPath;
		visibleLayerDataSet = [];
	}
	public function parse()
	{
		for (i in 0...layers.length)
		{
			var layer:Layer = layers[i];
			if(!layer.visible) continue;

			if(layer.typename == LayerTypeName.LAYER_SET)
			{
				var layerSet = cast(layer, LayerSet);

				var directoryPath = parentDirectoryPath.copy();
				directoryPath.push(layer.name);
				var directory = new LayerWindow(layerSet.layers, directoryPath);
				directory.parse();

				visibleLayerDataSet = visibleLayerDataSet.concat(directory.visibleLayerDataSet);
			}
			else
			{
				var layerData = new LayerData(layer, parentDirectoryPath);
				visibleLayerDataSet.push(layerData);
			}
		}
	}
	public function getLayerTypeDefSet():Array<LayerTypeDef>
	{
		var layerTypeDefSet = [];
		for (layerData in visibleLayerDataSet)
		{
			layerTypeDefSet.push(
				layerData.getLayerTypeDef()
			);
		}
		return layerTypeDefSet;
	}
	public function createImagePathMap():Map<String, LayerData>
	{
		var imagePathMap:Map<String, LayerData> = new Map();
		for(layerData in visibleLayerDataSet)
		{
			imagePathMap[layerData.path] = layerData;
		}
		return imagePathMap;
	}
}

