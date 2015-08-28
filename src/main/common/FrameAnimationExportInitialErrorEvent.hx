package common;

enum FrameAnimationExportInitialErrorEvent
{
	NONE;
	ERROR(error:FrameAnimationExportInitialError);
}

@:enum abstract FrameAnimationExportInitialError(String)
{
	var UNOPENED_DOCUMENT = "unopened document";
	var TIMELINE_ANIMATION_FRAME_DOES_NOT_EXIST = "timeline animation frame does not exist";
}
