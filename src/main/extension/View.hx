package extension;
import extension.parts.Button;
import jQuery.JQuery;
class View
{
	@:allow(extension) private static var instance(get, null):View;
	private static inline function get_instance():View
		return instance == null ? instance = new View(): instance;

	private var element:JQuery;
	public var runButton(default, null):Button;
	public var runFrame1OffsetButton(default, null):Button;
	private function new()
	{
		element =  new JQuery("#container");

		runButton = new Button(element, "run_button");
		runFrame1OffsetButton = new Button(element, "run_frame1_offset_button");
	}
	public function isIgnoredFrame1Output():Bool{
		return isChecked("ignored_frame1_output");
	}
	public function sameNameLayerIsIdentical():Bool{
		return isChecked("same_name_layer_is_identical");
	}
	private function isChecked(className:String):Bool{
		return new JQuery('.$className', element).is(":checked");
	}
}
