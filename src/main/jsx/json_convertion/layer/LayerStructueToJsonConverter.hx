package jsx.json_convertion.layer;

import jsx.json_convertion.JsonStructure;
import lib.PhotoshopLayer;

class LayerStructueToJsonConverter
{
	public static function execute(photoshopLayerSets:Array<Array<PhotoshopLayer>>):String
	{
		return toJson(photoshopLayerSets, LayerToJsonConverter.toJson);
	}
	/*
	public static function toArray(photoshopLayerSets:Array<Array<PhotoshopLayer>>):String
	{
		return toJson(photoshopLayerSets, LayerToJsonConverter.toArrayString);
	}
	*/
	private static function toJson(photoshopLayerSets:Array<Array<PhotoshopLayer>>, toFunction:PhotoshopLayer->String):String
	{
		var json = JsonStructure.ARRAY_START + JsonStructure.CR;
		for (i in 0...photoshopLayerSets.length)
		{
			var photoshopLayerSet = photoshopLayerSets[i];

			var setLines = JsonStructure.TAB + JsonStructure.ARRAY_START + JsonStructure.CR;
			for (j in 0...photoshopLayerSet.length)
			{
				var photoshopLayer = photoshopLayerSet[j];
				var lines = toFunction(photoshopLayer);

				if(j < photoshopLayerSet.length - 1){
					lines += JsonStructure.CLUMN;
				}
				lines += JsonStructure.CR;
				setLines += lines;
			}
			setLines += JsonStructure.TAB + JsonStructure.ARRAY_END;
			if(i < photoshopLayerSets.length - 1){
				setLines += JsonStructure.CLUMN;
			}
			setLines += JsonStructure.CR;
			json += setLines;
		}
		json += JsonStructure.ARRAY_END;
		return json;
	}

	public static function executeIndex(pathSet:Array<String>):String
	{
		var json = JsonStructure.ARRAY_START + JsonStructure.CR;
		for (i in 0...pathSet.length)
		{
			var line = '${JsonStructure.TAB}"${pathSet[i]}"';
			if(i < pathSet.length - 1){
				line += JsonStructure.CLUMN;
			}
			line += JsonStructure.CR;
			json += line;
		}

		json += JsonStructure.ARRAY_END;
		return json;
	}
}
