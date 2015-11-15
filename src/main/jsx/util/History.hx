package jsx.util;
import psd.Document;
class History
{
	public static function undo(document:Document, count:Int = 1)
	{
		document.activeHistoryState = document.historyStates[document.historyStates.length - (count + 1)];
	}
}
