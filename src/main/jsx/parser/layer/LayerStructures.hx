package jsx.parser.layer;
import jsx.OptionalParameter;
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

	private var sameLayerNameCheckedLayerStructure:LayerStructure;

	public function new(document:Document)
	{
		this.document = document;
		set = [];
	}
	public function parse()
	{
		renameSameNameLayer();

		if(PrivateAPI.timelineAnimationFrameExists())
			parseAllFrames();
		else
			parseFrame();

		offsetAlongFrame1();
		if(set.length != 1 && OptionalParameter.instance.ignoredFrame1Output){
			set.shift();
		}

		createImagePathMap();
		createPhotoshopLayerSets();
		createUsedPathSet();
		renameToOriginalName();
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
	private function offsetAlongFrame1()
	{
		if(!OptionalParameter.instance.frame1offset) return;

		var offsetPosition = set[0].getOffsetPosition();
		for (layerStructure in set)
		{
			layerStructure.offsetPosition(offsetPosition);
		}
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

	private function renameSameNameLayer()
	{
		sameLayerNameCheckedLayerStructure = new LayerStructure(document.layers, [], true);
		sameLayerNameCheckedLayerStructure.parse();
		sameLayerNameCheckedLayerStructure.renameSameNameLayer();
	}
	private function renameToOriginalName()
	{
		sameLayerNameCheckedLayerStructure.renameToOriginalName();
	}
}
