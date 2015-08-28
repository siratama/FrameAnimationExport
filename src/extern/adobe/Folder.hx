package adobe;

@:native("Folder")
extern class Folder
{
	public function new(?path:String):Void;
	public var name(default, null):String;
	public var path(default, null):String;
	public var relativeURI(default, null):String;
	public static function selectDialog(?prompt:String, ?select:String):Folder;
	public function create():Bool;
}
