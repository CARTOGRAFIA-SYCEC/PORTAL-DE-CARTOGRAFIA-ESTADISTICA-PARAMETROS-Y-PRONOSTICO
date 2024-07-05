// BASEMAPS //
let osm = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'
    });
let hdm = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'
    });
let esrisat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'
    });
let esriphy = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'
    });
let esriter = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'
    });
let esriocea = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',{
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'
    });

//  CONFIGURACIÓN LIENZO //
let map = L.map('map', {
        layers: [osm],
        tap: false,
        center: new L.LatLng(22.25, -92.25),
        zoom: 7,
        minZoom: 5,
        fullscreenControl: true,
        fullscreenControlOptions: {
            title: 'Hide FullScreen',
            titleCancel: 'Show Fullscreen out'
        }
    });
map.on('Hide Fullscreen',
        function () {
            if (window.console) window.console.log('Hide Fullscreen');
    });
map.on('Show Fullscreen',
        function () {
            if (window.console) window.console.log('Show Fullscreen');
    });
let toggleFullscreen = function () {map.toggleFullscreen();
    };

// TITULO //
let info = L.control();
    info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
        return this._div;
        };
        info.update = function (props) {
            this._div.innerHTML = `<h3>VISUALIZADOR DE CAPAS</h3>`;
        };
        info.addTo(map);

// SIDEPANEL CARACTERISITCAS//
let sidepanelLeft = L.control.sidepanel('mySidepanelLeft', {
        tabsPosition: 'left',
        darkMode: true,
        startTab: 'tab-1'
    }).addTo(map);

// ESCALA //
let Escala = L.control.scale({ position: 'bottomright'}).addTo(map);

// MINIBASEMAP //
let MMUrl='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
let MMap = new L.TileLayer(MMUrl, {minZoom: 0, maxZoom: 10,});
let miniMap = new L.Control.MiniMap(MMap, { toggleDisplay: true, position: 'bottomleft'}).addTo(map);					

// RESET VIEW (REGRESAR VISTA IN INICIAL) //
let review = L.control.resetView({
        position: "topleft",
        title: "Return zoom",
        latlng: L.latLng([22.25, -92.25]),
        zoom: 7,
    }).addTo(map);

// CARTOGRAFIA GEOJSON (CAPAS) //
// PUNTOS (CAPAS) //
let EST_RADAR = L.geoJson(radar_hf, {pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
            radius: 5,
            fillColor: '#ff4f4c',
            color: '#bfbfbf',
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
    });}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE ESTACIÓN: " + layer.feature.properties.NOM_EST +
            "</div><hr><table><tr><td>Clave de Estación de medición: " + layer.feature.properties.CVE_EST +
            "</div><hr><table><tr><td>Ubicación: " + layer.feature.properties.NOM_EST +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE ESTACIÓN: " + layer.feature.properties.NOM_EST +
            "</div><hr><table><tr><td>Clave de Estación de medición: " + layer.feature.properties.CVE_EST +
            "</div><hr><table><tr><td>Ubicación: " + layer.feature.properties.NOM_EST +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).addTo(map);

// GEOTIFF (CAPAS)
let RadarArchive1 = "./GeoTIFF/RADAR_U_HF.tif";
let PlottyRender1 = L.LeafletGeotiff.plotty({
        displayMin: -0.430921,
        displayMax: 0.513321,
        clampLow: false,
        clampHigh: false,
        colorScale: 'jet',
    });
let RADAR_U_HF_TIF = L.leafletGeotiff(RadarArchive1, {
        renderer: PlottyRender1,
        opacity: 0.6,
    }).addTo(map);

let RadarArchive2 = "./GeoTIFF/RADAR_V_HF.tif";
let PlottyRender2 = L.LeafletGeotiff.plotty({
        displayMin: -0.540788,
        displayMax: 1.56377,
        clampLow: false,
        clampHigh: false,
        colorScale: 'jet',
    });
let RADAR_V_HF_TIF = L.leafletGeotiff(RadarArchive2, {
        renderer: PlottyRender2,
        opacity: 0.6,
    }).addTo(map);	

let RadarArchive3 = "./GeoTIFF/BATIMETRIA_GOM.tif";
let PlottyRender3 = L.LeafletGeotiff.plotty({
        displayMin: -5102,
        displayMax: 42,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let GOM_TIF = L.leafletGeotiff(RadarArchive3, {
        renderer: PlottyRender3,
        opacity: 0.6,
    }).addTo(map);	

// ACTIVAR CAPAS //
let baseLayers = {
        'OpenStreetMap Standard': osm,
        'OpenStreetMap Humanitarian': hdm,
        'ESRI Medio Físico': esriphy,
        'ESRI Terreno': esriter,
        'ESRI Oceánico': esriocea,
        'ESRI Satelital': esrisat,
    };               
let overlays = {
        'Estaciones de medición - RADAR-HF': EST_RADAR,
        'Dirección U - RADAR-HF': RADAR_U_HF_TIF,
        'Dirección V - RADAR-HF': RADAR_V_HF_TIF,
        'Batimetria Golfo de México': GOM_TIF,
    };
let layerControl = L.control.layers(
        baseLayers, 
        overlays,
            {collapsed: false,
    }).addTo(map);

// SEARCH CONTROL //
let searchControl = new L.Control.Search({
        layer: EST_RADAR,
        propertyName: 'NOM_EST',
        market: true,
        textPlaceholder: 'Buscar información',
    moveToLocation: function(latlng, title, map) {
let zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom);
        }
    });
    searchControl.on('search:locationfound', function(e)
        {e.layer.setStyle({
                        fillColor: '#fd9595', 
                        color: '#400000',
                        });
        if(e.layer._popup)
            e.layer.bindPopup();
    }).on('search:collapsed', function(e) {
        EST_RADAR.eachLayer(function(layer) 
        { EST_RADAR.resetStyle(layer);
        });	
    });map.addControl(searchControl);