package jsx;

import lib.LayerTypeDef;
import psd.Layer;
import jsx.util.Bounds;
using jsx.util.Bounds;

class LayerData
{
	private var bounds:Bounds;
	private var opacity:Float;
	public var layer(default, null):Layer;
	public var path(default, null):String;

	public function new(layer:Layer, directoryPath:String)
	{
		this.layer = layer;
		bounds = layer.bounds.convert();
		//layer.opacity;
		path = directoryPath + layer.name;

		//js.Lib.alert(bounds); //ok
	}
	public function getLayerTypeDef():LayerTypeDef
	{
		var layerTypeDef = {
			path: path,
			x:bounds.left,
			y:bounds.top,
			opacity:opacity
		};
		return layerTypeDef;
	}
}
