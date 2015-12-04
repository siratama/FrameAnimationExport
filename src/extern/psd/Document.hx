package psd;

import adobe.File;
@:native("Document")
extern class Document
{
	public var name(default, null):String;
	public var activeLayer:Layer;
	public var artLayers(default, null):ArtLayers;
	public var layers(default, null):Layers;
	public var colorSamplers(default, null):ColorSamplers;
	public var selection(default, null):Selection;
	public var width(default, null):Float;
	public var height(default, null):Float;
	public function add(width:Float, height:Float):Void;
	public function paste(introSelection:Bool = false):ArtLayer;
	public function exportDocument(exportIn:File, exportAs:ExportType = null, options:ExportOptions = null):Void;
	public function close(saving:SaveOptions = null):Void;
}
