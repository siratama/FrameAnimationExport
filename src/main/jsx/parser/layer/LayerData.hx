package jsx.parser.layer;

import lib.FileDirectory;
import lib.PhotoshopLayer;
import psd.Layer;
import jsx.util.Bounds;
using jsx.util.Bounds;

class LayerData
{
	public var bounds(default, null):Bounds;
	private var opacity:Int;
	public var layer(default, null):Layer;
	public var path(default, null):String;
	public var directoryPath:Array<String>;
	public var fileName(default, null):String;

	public function new(layer:Layer, directoryPath:Array<String>)
	{
		this.layer = layer;
		this.directoryPath = directoryPath;

		bounds = layer.bounds.convert();
		opacity = Math.round(layer.opacity);

		//When space exists in file name(layer name), when outputting, replaced by hyphen.
		fileName = ~/ /g.replace(layer.name, "-");

		path = (directoryPath.length == 0) ?
			fileName :
			[directoryPath.join(FileDirectory.PATH_COLUMN), fileName].join(FileDirectory.PATH_COLUMN);
	}
	public function toPhotoshopLayer():PhotoshopLayer
	{
		var photoshopLayer = {
			name: fileName,
			directory: getDirectoryPathString(),
			path:path,
			x:bounds.left,
			y:bounds.top,
			opacity:opacity
		};
		return photoshopLayer;
	}
	public function getDirectoryPathString():String
	{
		return directoryPath.join(FileDirectory.PATH_COLUMN);
	}
}
