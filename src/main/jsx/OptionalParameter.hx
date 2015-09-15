package jsx;
class OptionalParameter
{
	@:allow(jsx) private static var instance(get, null):OptionalParameter;
	private static inline function get_instance():OptionalParameter
		return instance == null ? instance = new OptionalParameter(): instance;

	public var frame1offset(default, null):Bool;
	public var ignoredFrame1Output(default, null):Bool;
	public var sameNameLayerIsIdentical(default, null):Bool;

	private function new(){}

	public function set(frame1offset:Bool, ignoredFrame1Output:Bool, sameNameLayerIsIdentical:Bool)
	{
		this.frame1offset = frame1offset;
		this.ignoredFrame1Output = ignoredFrame1Output;
		this.sameNameLayerIsIdentical = sameNameLayerIsIdentical;
	}
}
