//震源地と各震度のアイコンの定義
var styles = {
    'epicenter': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.9,
            src: 'images/epicenter.png'
        }))
    })],
    '1': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int1.png'
        }))
    })],
    '2': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int2.png'
        }))
    })],
    '3': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int3.png'
        }))
    })],
    '4': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int4.png'
        }))
    })],
    '5-': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int5l.png'
        }))
    })],
    '5+': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int5h.png'
        }))
    })],
    '6-': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int6l.png'
        }))
    })],
    '6+': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int6h.png'
        }))
    })],
    '7': [new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            scale: 0.5,
            src: 'images/int7.png'
        }))
    })],
};

//GeoJSONのproperties->titleに応じてstyleを反映
var styleFunction = function(feature, resolution) {
    return styles[feature.get('class')];
};

//広域ポイント(細分区域)レイヤーの定義
var smallScalePoints = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'smallScalePoints.json',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction,
    //表示する解像度(縮尺)
    minResolution: 1000,
    maxResolution: 20000
});

//詳細ポイント(市町村等)レイヤーの定義
var largeScalePoints = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'largeScalePoints.json',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction,
    //表示する解像度(縮尺)
    minResolution: 20,
    maxResolution: 1000
});

var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: [
        //マップのレイヤー
        new ol.layer.Tile({
            source: new ol.source.OSM
        }),
        //ポイント(細分区域)
        smallScalePoints,
        //ポイント(市町村等)
        largeScalePoints
    ],
    view: new ol.View({
        //中心座標(仮指定)
        center: ol.proj.transform([134.15, 35.27], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});

//広域ポイント(細分区分)から最適なズームレベルと中心座標を設定
var source = smallScalePoints.getSource();
var onChangeKey = source.on('change', function() {
    if (source.getState() == 'ready') {
        ol.Observable.unByKey(onChangeKey);
        map.getView().fit(source.getExtent(), {
            size: map.getSize(),
            padding: [10, 10, 10, 10],
            maxZoom: 8
        });
    }
});
