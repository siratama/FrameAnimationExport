package jsx.util;

import psd_private.ActionList;
import psd_private.CharacterID;
import psd_private.DialogModes;
import psd_private.ActionReference;
import psd_private.ActionDescriptor;
import psd.LayerSet;
import psd.LayerTypeName;
import psd.ArtLayer;
import psd.Layers;
import psd.Layer;
import psd_private.Lib;

class LayersDisplay
{
	private var layers:Layers;
	private var defaultLayerVisibleSet:Array<Bool>;
	private var layersDisplayMap:Map<LayerSet, LayersDisplay>;

	public function new(layers:Layers)
	{
		this.layers = layers;
		defaultLayerVisibleSet = [];
		layersDisplayMap = new Map();
	}
	public function hide()
	{
		for (i in 0...layers.length)
		{
			var layer:Layer = layers[i];
			if(layer.typename == LayerTypeName.LAYER_SET)
			{
				var layerSet = cast(layer, LayerSet);
				var layersDisplay = new LayersDisplay(layerSet.layers);
				layersDisplay.hide();
				layersDisplayMap.set(layerSet, layersDisplay);
				continue;
			}
			if(cast(layer, ArtLayer).isBackgroundLayer) continue;

			defaultLayerVisibleSet[i] = layer.visible;
			layer.visible = false;
		}
	}
	public function restore()
	{
		for (i in 0...layers.length)
		{
			var layer:Layer = layers[i];
			if(layer.typename == LayerTypeName.LAYER_SET)
			{
				var layerSet = cast(layer, LayerSet);
				var layersDisplay:LayersDisplay = layersDisplayMap.get(layerSet);
				layersDisplay.restore();
				continue;
			}
			if(cast(layer, ArtLayer).isBackgroundLayer) continue;
			layer.visible = defaultLayerVisibleSet[i];
		}
	}

	public static function switchSingleLayerVisible()
	{
		var idShw = Lib.charIDToTypeID(CharacterID.SHOW);
		var desc = new ActionDescriptor();
		var idnull = Lib.charIDToTypeID(CharacterID.NULL);
		var list = new ActionList();
		var ref = new ActionReference();
		var idLyr = Lib.charIDToTypeID(CharacterID.LAYER);
		var idOrdn = Lib.charIDToTypeID(CharacterID.ORDN);
		var idTrgt = Lib.charIDToTypeID(CharacterID.TARGET);
		ref.putEnumerated( idLyr, idOrdn, idTrgt );
		list.putReference( ref );
		desc.putList( idnull, list );
		var idTglO = Lib.charIDToTypeID(CharacterID.TGLO);
		desc.putBoolean( idTglO, true );
		Lib.executeAction( idShw, desc, DialogModes.NO );
	}
}
