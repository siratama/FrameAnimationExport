package jsx.parser.directory;

import lib.Directory;
class DirectoryData
{
	private var name:String;
	private var files:Array<String>;
	public var directoryDataMap(default, null):Map<String, DirectoryData>;

	public function new(name:String = "")
	{
		this.name = name;
		files = [];
		directoryDataMap = new Map();
	}
	public function addFile(fileName:String)
	{
		files.push(fileName);
	}
	public function getChild(childDirectoryName:String):DirectoryData
	{
		if(!directoryDataMap.exists(childDirectoryName)){
			directoryDataMap[childDirectoryName] = new DirectoryData(childDirectoryName);
		}
		return directoryDataMap[childDirectoryName];
	}
	public function toDirectory():Directory
	{
		var directories:Array<Directory> = [];
		for(key in directoryDataMap.keys())
		{
			var directoryData:DirectoryData = directoryDataMap[key];
			directories.push(directoryData.toDirectory());
		}
		return {name:name, files:files, directories:directories};
	}
}
