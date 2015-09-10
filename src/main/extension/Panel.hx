package extension;

import extension.FrameAnimationExporter.FrameAnimationExporterEvent;
import js.Browser;
import haxe.Timer;

class Panel
{
	private var timer:Timer;
	private static inline var TIMER_SPEED_CALM = 250;
	private static inline var TIMER_SPEED_RUNNING = 50;

	private var mainFunction:Void->Void;
	private var csInterface:AbstractCSInterface;
	private var jsxLoader:JsxLoader;
	private var view:View;
	private var frameAnimationExporter:FrameAnimationExporter;

	public static function main(){
		new Panel();
	}
	public function new(){
		Browser.window.addEventListener("load", initialize);
	}
	private function initialize(event)
	{
		csInterface = AbstractCSInterface.create();
		jsxLoader = new JsxLoader();
		frameAnimationExporter = new FrameAnimationExporter();
		view = View.instance;

		startRunning(loadJsx, TIMER_SPEED_RUNNING);
	}

	//
	private function startRunning(func:Void -> Void, speed:Int){
		mainFunction = func;
		setTimer(speed);
	}
	private function changeRunning(func:Void -> Void, speed:Int){
		timer.stop();
		startRunning(func, speed);
	}
	private function setTimer(speed:Int){
		timer = new Timer(speed);
		timer.run = run;
	}
	private function run(){
		mainFunction();
	}

	//
	private function loadJsx()
	{
		jsxLoader.run();
		if(jsxLoader.isFinished()){
			initializeToClickUI();
		}
	}

	//
	private function initializeToClickUI()
	{
		changeRunning(observeToClickUI, TIMER_SPEED_CALM);
	}
	private function observeToClickUI()
	{
		if(view.runButton.isClicked()){
			initializeToCallFrameAnimationExport(false);
		}
		else if(view.runFrame1OffsetButton.isClicked()){
			initializeToCallFrameAnimationExport(true);
		}
	}
	private function initializeToCallFrameAnimationExport(frame1offset:Bool)
	{
		frameAnimationExporter.call(frame1offset, view.isIgnoredFrame1Output());
		changeRunning(callFrameAnimationExport, TIMER_SPEED_RUNNING);
	}
	private function callFrameAnimationExport()
	{
		frameAnimationExporter.run();
		var event = frameAnimationExporter.getEvent();
		switch(event){
			case FrameAnimationExporterEvent.NONE: return;

			case FrameAnimationExporterEvent.INITIAL_ERROR_EVENT(error):
				js.Lib.alert(cast(error, String));
				initializeToClickUI();

			case FrameAnimationExporterEvent.SUCCESS:
				initializeToClickUI();
		}
	}
}

