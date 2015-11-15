package jsx.parser.layer;

import psd.LayerSet;
import jsx.util.Point;
import lib.FileDirectory;
import lib.PhotoshopLayer;
import psd.Layer;
import jsx.util.Bounds;

class LayerProperty
{
	public var bounds(default, null):Bounds;
	private var opacity:Int;
	public var layer(default, null):Layer;
	public var layerName(default, null):String;
	public var path(default, null):String;
	public var directoryPath:Array<String>;
	public var fileName(default, null):String;
	public var x(default, null):Float;
	public var y(default, null):Float;
	private var renamedFileName:Null<String>;
	public var rootFolder(default, null):LayerSet;

	public function new(layer:Layer, directoryPath:Array<String>, bounds:Bounds, rootFolder:LayerSet)
	{
		this.layer = layer;
		this.layerName = layer.name;
		this.directoryPath = directoryPath;
		this.bounds = bounds;
		this.rootFolder = rootFolder;

		if(bounds != null){
			x = bounds.left;
			y = bounds.top;
		}
		opacity = Math.round(layer.opacity);

		//When space exists in file name(layer name), when outputting, replaced by hyphen.
		fileName = ~/ /g.replace(layer.name, "-");

		setPath(fileName);
	}
	public function renameLayer(renamedName:String)
	{
		this.renamedFileName = renamedName;
		var visible = layer.visible;
		layer.name = renamedName; //forced visible true?
		//layerName = renamedName;
		layer.visible = visible;
		setPath(renamedName);
	}
	public function renameToOriginalName()
	{
		if(renamedFileName != null){
			var visible = layer.visible;
			/*
			layer.name = fileName;
			layerName = fileName;
			*/
			layer.name = layerName;
			layer.visible = visible;
		}
	}
	private function setPath(fileName:String)
	{
		path = (directoryPath.length == 0) ?
			fileName :
			[directoryPath.join(FileDirectory.PATH_COLUMN), fileName].join(FileDirectory.PATH_COLUMN);
	}
	public function offsetPosition(point:Point)
	{
		x -= point.x;
		y -= point.y;
	}
	public function toPhotoshopLayer():PhotoshopLayer
	{
		var photoshopLayer = {
			name: fileName,
			directory: getDirectoryPathString(),
			path:path,
			x:x,
			y:y,
			opacity:opacity
		};
		return photoshopLayer;
	}
	public function getDirectoryPathString():String
	{
		return directoryPath.join(FileDirectory.PATH_COLUMN);
	}
	public function isRootLayer():Bool
	{
		return rootFolder == null;
	}
}
