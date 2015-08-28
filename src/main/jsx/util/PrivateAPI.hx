package jsx.util;

import psd_private.StringID;
import psd.Layer;
import psd_private.CharacterID;
import psd_private.Lib;
import psd_private.DialogModes;
import psd_private.ActionReference;
import psd_private.ActionDescriptor;

class PrivateAPI
{
	/**
	 * @index: 1~n
	 * @throw: out of bounds error
	 */
	public static function selectTimelineAnimationFrame(index:Int)
	{
		var idslct = Lib.charIDToTypeID(CharacterID.SELECT);
		var desc = new ActionDescriptor();
		var idnull = Lib.charIDToTypeID(CharacterID.NULL);
		var ref = new ActionReference();
		var idanimationFrameClass = Lib.stringIDToTypeID(StringID.ANIMATION_FRAME_CLASS);
		ref.putIndex(idanimationFrameClass, index);
		desc.putReference(idnull, ref);
		Lib.executeAction(idslct, desc, DialogModes.NO);
	}
	public static inline var TIMELINE_ANIMATION_FRAME_FIRST_INDEX = 1;

	public static function timelineAnimationFrameExists():Bool
	{
		try{
			selectTimelineAnimationFrame(TIMELINE_ANIMATION_FRAME_FIRST_INDEX);

		}catch(e:Dynamic){
			return false;
		}
		return true;
	}
}
