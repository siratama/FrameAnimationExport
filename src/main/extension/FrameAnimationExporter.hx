package extension;

import common.FrameAnimationExportInitialErrorEvent;
import common.ClassName;
import common.JsxEvent;
import haxe.Unserializer;
import haxe.Serializer;

enum FrameAnimationExporterEvent
{
	INITIAL_ERROR_EVENT(error:FrameAnimationExportInitialError);
	SUCCESS;
	NONE;
}

class FrameAnimationExporter
{
	private var mainFunction:Void->Void;
	private var csInterface:AbstractCSInterface;
	private var jsxEvent:JsxEvent;

	private static inline var INSTANCE_NAME = "frameAnimationExport";
	
	private var event:FrameAnimationExporterEvent;

	public function getEvent():FrameAnimationExporterEvent
	{
		var n = event;
		event = FrameAnimationExporterEvent.NONE;
		return n;
	}

	public function new()
	{
		csInterface = AbstractCSInterface.create();
	}
	public function run()
	{
		mainFunction();
	}

	public function call(frame1offset:Bool, ignoredFrame1Output:Bool)
	{
		event = FrameAnimationExporterEvent.NONE;

		jsxEvent = JsxEvent.NONE;

		var frame1offsetData = Serializer.run(frame1offset);
		var ignoredFrame1OutputData = Serializer.run(ignoredFrame1Output);
		csInterface.evalScript('var $INSTANCE_NAME = new ${ClassName.FRAME_ANIMATION_EXPORT}("$frame1offsetData", "$ignoredFrame1OutputData");');

		csInterface.evalScript('$INSTANCE_NAME.getInitialErrorEvent();', function(result){
			jsxEvent = JsxEvent.GOTTEN(result);
		});
		mainFunction = observeToRecieveInitialErrorEvent;
	}
	private function observeToRecieveInitialErrorEvent()
	{
		switch(recieveJsxEvent())
		{
			case JsxEvent.NONE: return;
			case JsxEvent.GOTTEN(serializedEvent):

				var initialErrorEvent:FrameAnimationExportInitialErrorEvent = Unserializer.run(serializedEvent);
				switch(initialErrorEvent)
				{
					case FrameAnimationExportInitialErrorEvent.ERROR(error):
						destroy(FrameAnimationExporterEvent.INITIAL_ERROR_EVENT(error));
					case FrameAnimationExportInitialErrorEvent.NONE:
						execute();
				}
		}
	}
	private function execute()
	{
		csInterface.evalScript('$INSTANCE_NAME.execute();');
		destroy(FrameAnimationExporterEvent.SUCCESS);
	}
	private function recieveJsxEvent():JsxEvent
	{
		var n = jsxEvent;
		jsxEvent = JsxEvent.NONE;
		return n;
	}
	private function destroy(event:FrameAnimationExporterEvent)
	{
		this.event = event;
		mainFunction = finish;
	}
	private function finish(){}
}
