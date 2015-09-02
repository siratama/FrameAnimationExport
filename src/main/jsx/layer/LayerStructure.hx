package jsx.layer;

import lib.FileDirectory;
import lib.PhotoshopLayer;
import psd.LayerSet;
import psd.Layers;
import psd.Layer;
import psd.LayerTypeName;

class LayerStructure
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
				var directory = new LayerStructure(layerSet.layers, directoryPath);
				directory.parse();

				visibleLayerDataSet = visibleLayerDataSet.concat(directory.visibleLayerDataSet);
			}
			else
			{
				var layerData = new LayerData(layer, parentDirectoryPath);

				//ignored empty image layer
				if(!layerData.bounds.isNull())
					visibleLayerDataSet.push(layerData);
			}
		}
	}
	public function getPhotoshopLayerSet():Array<PhotoshopLayer>
	{
		var photoshopLayerSet = [];
		for (layerData in visibleLayerDataSet)
		{
			photoshopLayerSet.push(
				layerData.convertToPhotoshopLayer()
			);
		}
		return photoshopLayerSet;
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

