package jsx;

import lib.LayerTypeDef;
import lib.LayerTypeDef.Converter;

class OutputDataToJsonConverter
{
	private static inline var ARRAY_START = "[";
	private static inline var ARRAY_END = "]";
	private static inline var CLUMN = ",";
	private static inline var CR = "\n";
	private static inline var TAB = "\t";
	private static inline var TAB2 = TAB + TAB;

	public static function toNormal(layerTypeDefSets:Array<Array<LayerTypeDef>>):String
	{
		return toJson(layerTypeDefSets, Converter.toJson);
	}
	public static function toArray(layerTypeDefSets:Array<Array<LayerTypeDef>>):String
	{
		return toJson(layerTypeDefSets, Converter.toArrayString);
	}
	private static function toJson(layerTypeDefSets:Array<Array<LayerTypeDef>>, toFunction:LayerTypeDef->String):String
	{
		var json = ARRAY_START + CR;
		for (i in 0...layerTypeDefSets.length)
		{
			var layerTypeDefSet = layerTypeDefSets[i];

			var setLines = TAB + ARRAY_START + CR;
			for (j in 0...layerTypeDefSet.length)
			{
				var layerTypeDef = layerTypeDefSet[j];
				var lines = toFunction(layerTypeDef);

				if(j < layerTypeDefSet.length - 1){
					lines += CLUMN;
				}
				lines += CR;
				setLines += lines;
			}
			setLines += TAB + ARRAY_END;
			if(i < layerTypeDefSets.length - 1){
				setLines += CLUMN;
			}
			setLines += CR;
			json += setLines;
		}
		json += ARRAY_END;
		return json;
	}
}
