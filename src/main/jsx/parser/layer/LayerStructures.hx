package jsx.parser.layer;
import psd.SaveOptions;
import jsx.util.Timeline;
import jsx.OptionalParameter;
import lib.PhotoshopLayer;
import psd.Document;
import jsx.util.PrivateAPI;
class LayerStructures
{
	private var document:Document;
	private var timelineFrameExists:Bool;

	public var set(default, null):Array<LayerStructure>;
	public var imagePathMap(default, null):Map<String, LayerProperty>;
	public var photoshopLayerSets(default, null):Array<Array<PhotoshopLayer>>;
	public var usedPathSet(default, null):Array<String>;

	private var sameLayerNameCheckedLayerStructure:LayerStructure;

	public function new(document:Document)
	{
		this.document = document;
		set = [];
		timelineFrameExists = Timeline.frameExists();
	}
	public function parse()
	{
		if(!OptionalParameter.instance.sameNameLayerIsIdentical)
			renameSameNameLayer();

		if(timelineFrameExists)
			parseAllFrames();
		else
			parseFrame(Timeline.FIRST_FRAME_INDEX);

		offsetAlongFrame1();
		if(set.length != 1 && OptionalParameter.instance.ignoredFrame1Output){
			set.shift();
		}

		createImagePathMap();
		createPhotoshopLayerSets();
		createUsedPathSet();

		if(!OptionalParameter.instance.sameNameLayerIsIdentical)
			renameToOriginalName();
	}
	private function parseAllFrames()
	{
		var timelineAnimationFrameIndex = Timeline.FIRST_FRAME_INDEX;
		while(true)
		{
			try{
				Timeline.selectFrame(timelineAnimationFrameIndex);
				parseFrame(timelineAnimationFrameIndex);

			}catch(e:Dynamic){
				break;
			}
			timelineAnimationFrameIndex++;
		}
	}
	private function parseFrame(timelineAnimationFrameIndex:Int)
	{
		var duplicatesTimelineFirstFrame = timelineFrameExists && timelineAnimationFrameIndex == Timeline.FIRST_FRAME_INDEX;
		if(duplicatesTimelineFirstFrame){
			Timeline.duplicateSelectedFrame();
		}

		var layerStructure = new LayerStructure(document, document.layers, [], false, true);
		layerStructure.parse();
		set.push(layerStructure);

		if(duplicatesTimelineFirstFrame){
			Timeline.deleteSelectedFrame();
		}
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
				if(!imagePathMap.exists(key)){
					imagePathMap[key] = map[key];
				}
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
		var layerStructure = new LayerStructure(document, document.layers, [], true, false);
		layerStructure.parse();
		usedPathSet = layerStructure.createUsedPathSet(imagePathMap);
	}

	private function renameSameNameLayer()
	{
		sameLayerNameCheckedLayerStructure = new LayerStructure(document, document.layers, [], true, false);
		sameLayerNameCheckedLayerStructure.parse();
		sameLayerNameCheckedLayerStructure.renameSameNameLayer();
	}
	private function renameToOriginalName()
	{
		sameLayerNameCheckedLayerStructure.renameToOriginalName();
	}
}
