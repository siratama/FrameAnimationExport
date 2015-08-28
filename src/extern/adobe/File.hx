package adobe;

@:native("File")
extern class File
{
	public function new(?path:String):Void;
	public static function openDialog(?prompt:String, ?select:String):Bool;
	public static function saveDialog(?prompt:String, ?select:String):File;

	public function open(mode:FileOpenMode, ?type:String, ?creator:String):Bool;
	public function close():Bool;
	public function write(text:String):Bool;
}
