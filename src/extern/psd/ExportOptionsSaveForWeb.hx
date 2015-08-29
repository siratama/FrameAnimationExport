package psd;

@:native("ExportOptionsSaveForWeb")
extern class ExportOptionsSaveForWeb extends ExportOptions
{
	public var format:SaveDocumentType;
	public var PNG8:Bool;
	public function new():Void;
}
