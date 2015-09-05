package jsx.parser.layer;

import lib.FileDirectory;
import psd.Document;
import psd.Layers;
import psd.LayerSet;
import psd.LayerTypeName;
import psd.Layer;

class AllLayers
{
	private var document:Document;
	private var allLayerSet:Array<AllLayersData>;
	private var imagePathMap:Map<String, LayerData>;
	private var visibleLayerPathSet:Array<String>;

	public function new(document:Document, imagePathMap:Map<String, LayerData>)
	{
		this.imagePathMap = imagePathMap;
		this.document = document;

		allLayerSet = [];
	}
	public function parse()
	{
		setAllLayer(document.layers, FileDirectory.ROOT_DIRECTORY);
		setVisible();
		extractVisibleLayer();
	}
	private function setAllLayer(layers:Layers, parentDirectoryPath:String)
	{
		for(i in 0...layers.length)
		{
			var layer:Layer = layers[i];
			var directoryPath = (parentDirectoryPath == FileDirectory.ROOT_DIRECTORY) ?
				layer.name:
				[parentDirectoryPath, layer.name].join(FileDirectory.PATH_COLUMN);

			if(layer.typename == LayerTypeName.LAYER_SET)
			{
				var layerSet = cast(layer, LayerSet);
				setAllLayer(layerSet.layers, directoryPath);
			}
			else{
				allLayerSet.push(
					new AllLayersData(directoryPath)
				);
			}
		}
	}
	private function setVisible()
	{
		for (key in imagePathMap.keys())
		{
			js.Lib.alert(key);
			for(allLayersData in allLayerSet)
			{
				if(allLayersData.path != key) continue;

				js.Lib.alert(allLayersData.path);
				allLayersData.visible = true;
				break;
			}
		}
	}
	private function extractVisibleLayer()
	{
		visibleLayerPathSet = [];
		for(allLayersData in allLayerSet)
		{
			if(!allLayersData.visible) continue;

			//js.Lib.alert(allLayersData.path);
			visibleLayerPathSet.push(allLayersData.path);
		}
	}
}

class AllLayersData
{
	public var path(default, null):String;
	public var visible:Bool;
	public function new(path:String)
	{
		this.path = path;
		visible = false;
	}
}

