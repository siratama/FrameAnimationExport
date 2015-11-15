package psd;

@:native("HistoryStates")
extern class HistoryStates implements ArrayAccess<HistoryState>
{
	public var length(default, null):Int;
	public function getByName(nameParam:String):HistoryState;
}
