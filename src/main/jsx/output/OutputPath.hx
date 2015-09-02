package jsx.output;
class OutputPath
{
	@:allow(jsx) private static var instance(get, null):OutputPath;
	private static inline function get_instance():OutputPath
		return instance == null ? instance = new OutputPath(): instance;

	private function new(){}

	public var outputDirectoryPath(default, null):String;
	public var outputAssetsDirectoryPath(default, null):String;
	public var jsonLayerDirectoryPath(default, null):String;
	public var jsonAssetsDirectoryPath(default, null):String;

	public function setData(outputDirectoryPath:String, outputAssetsDirectoryPath:String, jsonLayerDirectoryPath:String, jsonAssetsDirectoryPath:String)
	{
		this.outputDirectoryPath = outputDirectoryPath;
		this.outputAssetsDirectoryPath = outputAssetsDirectoryPath;
		this.jsonLayerDirectoryPath = jsonLayerDirectoryPath;
		this.jsonAssetsDirectoryPath = jsonAssetsDirectoryPath;
	}
}
