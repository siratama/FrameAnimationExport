# FrameAnimationExport

FrameAnimationExport は Photoshop CC 用拡張パネルです。
フレームアニメーション タイムラインウインドウ内 各フレームの表示情報を、画像と json に出力します。

## Movie
## 紹介動画

[introduction movie](http://)

## Download
## ダウンロード

In the case of Windows, it can save from a right-click. 

Windows の場合、右クリックから「リンク先のコンテンツを保存」を選択で保存できます。

### zxp file (for Photoshop CC)

* [FrameAnimationExport.zxp](https://raw.github.com/siratama/FrameAnimationExport/master/download/FrameAnimationExport.zxp)

This file is a extension panel for Photoshop CC.
[Extension Manager Command Line tool(ExManCmd)](https://www.adobeexchange.com/resources/28) is required in order to install. 

Photoshop CC 拡張パネル用ファイルです。
インストールには別途 [Extension Manager Command Line tool(ExManCmd)](https://www.adobeexchange.com/resources/28)が必要です。

### jsx file (for Photoshop Any Version)

* [FrameAnimationExport.zxp](https://raw.github.com/siratama/FrameAnimationExport/master/download/FrameAnimationExport.jsx)
* [FrameAnimationExportAlongFrame1Offset.zxp](https://raw.github.com/siratama/FrameAnimationExport/master/download/FrameAnimationExportAlongFrame1Offset.jsx)

jsx ファイルは以下の機能は持ちあわせていません。

* フレーム1の出力は無視
* 同名レイヤーは同一の画像とみなす

## Example of use of assets
## 出力データ利用例

FrameAnimationExport から出力されたデータを読み込むことで、
Photoshop フレームアニメーションほぼそのままの形を 他のアプリケーション上に再現できます。

以下は、Flash Pro CC から FrameAnimationExport 出力データを読み込む拡張機能です。

[FrameAnimationImport for Flash Pro CC](https://github.com/siratama/FrameAnimationImport)

## Feature
## 機能

図

### RUN (frame1 offset): フレーム1の左上座標を原点とした座標オフセット出力

フレーム1に表示される画像データの左上座標を原点とし、それ以外のフレームの座標が計算されます。

図

フレーム1 の表示を同一にする事で、
キャンバスサイズの異なる psd ファイルでも座標をそろえることが可能です。

図2(待機・攻撃)

### Ignored frame1 output: フレーム1の出力は無視

座標オフセット用に配置したフレーム1の表示は不要な場合、等に利用します。
以下の設定の場合、フレーム1に対する座標オフセットは行われますがフレーム1は出力対象にはなりません。

図 

### Same name layer is identical: 同名レイヤーは同一の画像とみなす

同名のレイヤーが存在する場合、同一の画像データを使用しているものとしてデータ出力を行います。
このチェックボックスにチェックがない場合、
同名のレイヤーは自動的に名称変更された後、別々の画像データとして出力が行われます。

図 こういう時に使う

## 
## 課題

### フレームディレイ値の取得は不可
### Frame Animation Delay Value

ディレイ値 図

現在の Photoshop jsx では、各フレームのディレイ値を読み取ることができないため、
各フレームがどれくらいの間隔で表示されるか、を示す情報は出力されません。

URL

このため、FrameAnimationExport 出力データを他のアプリケーションで読み込んだ後に、
そのアプリケーション側で各フレームがどれくらい表示されるのかを設定する必要があります。
(多少の対処策はあります。
[FrameAnimationImport for Flash Pro CC](https://github.com/siratama/FrameAnimationImport) の FAQ 参考。)

