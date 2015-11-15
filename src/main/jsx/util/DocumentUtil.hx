package jsx.util;
import psd_private.CharacterID;
import psd_private.StringID;
import psd_private.DialogModes;
import psd_private.ActionReference;
import psd_private.ActionDescriptor;
import psd_private.Lib;
class DocumentUtil
{
	public static function rasterizeLayerStyle()
	{
		var idrasterizeLayer = Lib.stringIDToTypeID(StringID.RASTERIZE_LAYER);
		var desc = new ActionDescriptor();
		var idnull = Lib.charIDToTypeID(CharacterID.NULL);
		var ref = new ActionReference();
		var idLyr = Lib.charIDToTypeID(CharacterID.LAYER);
		var idOrdn = Lib.charIDToTypeID(CharacterID.ORDN);
		var idTrgt = Lib.charIDToTypeID(CharacterID.TARGET);
		ref.putEnumerated( idLyr, idOrdn, idTrgt );
		desc.putReference( idnull, ref );
		var idWhat = Lib.charIDToTypeID(CharacterID.WHAT);
		var idrasterizeItem = Lib.stringIDToTypeID(StringID.RASTERIZE_ITEM);
		var idlayerStyle = Lib.stringIDToTypeID(StringID.LAYER_STYLE);
		desc.putEnumerated( idWhat, idrasterizeItem, idlayerStyle );
		Lib.executeAction( idrasterizeLayer, desc, DialogModes.NO );
	}
}
