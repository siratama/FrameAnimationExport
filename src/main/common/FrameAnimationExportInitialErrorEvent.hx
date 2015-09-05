package common;

enum FrameAnimationExportInitialErrorEvent
{
	NONE;
	ERROR(error:FrameAnimationExportInitialError);
}

@:enum abstract FrameAnimationExportInitialError(String)
{
	var UNOPENED_DOCUMENT = "Unopened document.";
}
