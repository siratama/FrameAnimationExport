package jsx.util;

import psd_private.StringID;
import psd.Layer;
import psd_private.CharacterID;
import psd_private.Lib;
import psd_private.DialogModes;
import psd_private.ActionReference;
import psd_private.ActionDescriptor;

class Timeline
{
	public static inline var FIRST_FRAME_INDEX = 1;

	/**
	 * @index: 1~n
	 * @throw: out of bounds error
	 */
	public static function selectFrame(index:Int)
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
	/**
	 * attention: this method uses selectFrame method
	 */
	public static function frameExists():Bool
	{
		try{
			selectFrame(FIRST_FRAME_INDEX);

		}catch(e:Dynamic){
			return false;
		}
		return true;
	}

	public static function duplicateSelectedFrame()
	{
		var idDplc = Lib.charIDToTypeID(CharacterID.DUPLICATE);
		var desc = new ActionDescriptor();
		var idnull = Lib.charIDToTypeID(CharacterID.NULL);
		var ref = new ActionReference();
		var idanimationFrameClass = Lib.stringIDToTypeID(StringID.ANIMATION_FRAME_CLASS);
		var idOrdn = Lib.charIDToTypeID(CharacterID.ORDN);
		var idTrgt = Lib.charIDToTypeID(CharacterID.TARGET);
		ref.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
		desc.putReference( idnull, ref );
		Lib.executeAction( idDplc, desc, DialogModes.NO );
	}

	public static function deleteSelectedFrame()
	{
		var idDlt = Lib.charIDToTypeID(CharacterID.DELETE);
		var desc = new ActionDescriptor();
		var idnull = Lib.charIDToTypeID(CharacterID.NULL);
		var ref = new ActionReference();
		var idanimationFrameClass = Lib.stringIDToTypeID(StringID.ANIMATION_FRAME_CLASS);
		var idOrdn = Lib.charIDToTypeID(CharacterID.ORDN);
		var idTrgt = Lib.charIDToTypeID(CharacterID.TARGET);
		ref.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
		desc.putReference( idnull, ref );
		Lib.executeAction( idDlt, desc, DialogModes.NO );
	}
}
