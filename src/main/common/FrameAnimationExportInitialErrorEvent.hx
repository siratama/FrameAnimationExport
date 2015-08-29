package common;

enum FrameAnimationExportInitialErrorEvent
{
	NONE;
	ERROR(error:FrameAnimationExportInitialError);
}

@:enum abstract FrameAnimationExportInitialError(String)
{
	var UNOPENED_DOCUMENT = "Unopened document.";
	var TIMELINE_ANIMATION_FRAME_DOES_NOT_EXIST = "Timeline animation frame does not exist.";
}
