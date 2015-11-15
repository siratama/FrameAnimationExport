package psd;

@:native("LayerSet")
extern class LayerSet extends Layer
{
	public var layers(default, null):Layers;
	public function merge():ArtLayer;
}
