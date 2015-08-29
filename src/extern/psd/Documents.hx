package psd;

@:native("Documents")
extern class Documents implements ArrayAccess<Layer>
{
	public var length(default, null):Int;
	public function add(width:Int = null, height:Int = null, resolution:Float = 72, name:String = null, mode:NewDocumentMode = null, initialFill:DocumentFill = null):Document;
}
