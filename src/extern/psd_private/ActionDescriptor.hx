package psd_private;

@:native("ActionDescriptor")
extern class ActionDescriptor
{
	public function new():Void;

	public function putReference(typeId:Int, actionReference:ActionReference):Void;
	public function putBoolean(typeId:Int, bool:Bool):Void;
	public function putList(typeId:Int, actionList:ActionList):Void;
	public function putEnumerated(typeId:Int, stringId:Int, stringId2:Int):Void;
}
