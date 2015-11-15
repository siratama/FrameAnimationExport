package psd_private;

@:native("StringIDToTypeID")
@:enum abstract StringID(String)
{
	var ANIMATION_FRAME_CLASS = "animationFrameClass";
	var RASTERIZE_LAYER = "rasterizeLayer";
	var RASTERIZE_ITEM = "rasterizeItem";
	var LAYER_STYLE = "layerStyle";
}
