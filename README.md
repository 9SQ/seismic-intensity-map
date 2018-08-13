seismic-intensity-map
======

Seismic Intensity Map Rendering using Earthquake Information from JMA(Japan Meteorological Agency) by OpenLayers 4

気象庁防災情報XML電文の震度速報、震源・震度に関する情報から生成したGeoJSONを用いて、区域別の震度(数値)を当該区域上にマッピングします。

[sample web viewer](https://9sq.github.io/seismic-intensity-map/)

* 縮尺に応じて細分区域(188区域)と市町村等(1898区域)の表示が切り替わります。
* [jma-eqxml2geojson](https://github.com/9SQ/jma-eqxml2geojson)で生成した2つのGeoJSONが必要です。
* 描画にはOpenLayers 4を使用しています。

### ファイル

* **maprenderer.js** : 本体
* docs/index.html : サンプルhtml
* docs/maprenderer.min.js : minify済み
* docs/largeScalePoints.json : サンプルGeoJSON
* docs/smallScalePoints.json : サンプルGeoJSON
* docs/images/*.png : 各震度と震源地のアイコン

GeoJSON (2016年04月16日 01時25分頃に熊本県熊本地方で発生した最大震度7の地震のXML電文から生成したもの) をサンプルとして含めているので、docs/index.htmlで表示を確認できます。