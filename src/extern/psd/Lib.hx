package psd;
class Lib
{
	public static var app:Application = untyped __js__("app");
	public static var preferences:Preferences = untyped __js__("preferences");

	public static function writeln(message:Dynamic) {
		untyped $.writeln(message);
	}
}
