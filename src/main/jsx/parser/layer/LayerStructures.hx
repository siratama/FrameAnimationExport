package jsx.parser.layer;
import lib.PhotoshopLayer;
import psd.Document;
import jsx.util.PrivateAPI;
class LayerStructures
{
	private var document:Document;

	public var set(default, null):Array<LayerStructure>;
	public var imagePathMap(default, null):Map<String, LayerData>;
	public var photoshopLayerSets(default, null):Array<Array<PhotoshopLayer>>;
	public var usedPathSet(default, null):Array<String>;

	public function new(document:Document)
	{
		this.document = document;
		set = [];
	}
	public function parse()
	{
		if(PrivateAPI.timelineAnimationFrameExists())
			parseAllFrames();
		else
			parseFrame();

		createImagePathMap();
		createPhotoshopLayerSets();
		createUsedPathSet();
	}
	private function parseAllFrames()
	{
		var timelineAnimationFrameIndex = PrivateAPI.TIMELINE_ANIMATION_FRAME_FIRST_INDEX;
		while(true)
		{
			try{
				PrivateAPI.selectTimelineAnimationFrame(timelineAnimationFrameIndex);
				parseFrame();
			}catch(e:Dynamic){
				break;
			}
			timelineAnimationFrameIndex++;
		}
	}
	private function parseFrame()
	{
		var layerStructure = new LayerStructure(document.layers, [], false);
		layerStructure.parse();
		set.push(layerStructure);
	}

	private function createImagePathMap()
	{
		imagePathMap = new Map();
		for (layerStructure in set)
		{
			var map = layerStructure.createImagePathMap();
			for (key in map.keys())
			{
				if(!imagePathMap.exists(key))
					imagePathMap[key] = map[key];
			}
		}
	}
	private function createPhotoshopLayerSets()
	{
		photoshopLayerSets = [];
		for (layerStructure in set)
		{
			photoshopLayerSets.push(
				layerStructure.getPhotoshopLayerSet()
			);
		}
	}
	private function createUsedPathSet()
	{
		var layerStructure = new LayerStructure(document.layers, [], true);
		layerStructure.parse();
		usedPathSet = layerStructure.createUsedPathSet(imagePathMap);
	}
}
