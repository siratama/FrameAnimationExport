package jsx.parser.directory;
import jsx.parser.layer.LayerData;
class DirectoryStructure
{
	public var rootDirectoryData(default, null):DirectoryData;
	public function new()
	{
		rootDirectoryData = new DirectoryData();
	}
	public function parse(imagePathMap:Map<String, LayerData>)
	{
		for(key in imagePathMap.keys())
		{
			var directoryData = rootDirectoryData;
			var layerData:LayerData = imagePathMap[key];
			var directoryPath = layerData.directoryPath.copy();

			if(directoryPath.length == 0){
				directoryData.addFile(layerData.fileName);
				continue;
			}

			for (i in 0...directoryPath.length)
			{
				var directoryName = directoryPath[i];
				directoryData = directoryData.getChild(directoryName);

				if(i == directoryPath.length - 1)
					directoryData.addFile(layerData.fileName);
			}
		}
	}
}
