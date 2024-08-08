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

//  CONFIGURACIÓN LIENZO DEL MAPA //
let map = L.map('map', {
        layers: [osm],
        tap: false,
        center: new L.LatLng(19.5, -93),
        zoom: 9,
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
        latlng: L.latLng([19.5, -93]),
        zoom: 7,
    }).addTo(map);

// CARTOGRAFIA GEOJSON (CAPAS) //
// GEOTIFF (CAPAS)
let CargaTIFF1 = "./GeoTIFF/OS0701.tif";
let RenderizadoTIFF1 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF1 = L.leafletGeotiff(CargaTIFF1, {
        renderer: RenderizadoTIFF1,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF2 = "./GeoTIFF/OS0710.tif";
let RenderizadoTIFF2 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF2 = L.leafletGeotiff(CargaTIFF2, {
        renderer: RenderizadoTIFF2,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF3 = "./GeoTIFF/OS0720.tif";
let RenderizadoTIFF3 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF3 = L.leafletGeotiff(CargaTIFF3, {
        renderer: RenderizadoTIFF3,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF4 = "./GeoTIFF/OS0730.tif";
let RenderizadoTIFF4 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF4 = L.leafletGeotiff(CargaTIFF4, {
        renderer: RenderizadoTIFF4,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF5 = "./GeoTIFF/OS0810.tif";
let RenderizadoTIFF5 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF5 = L.leafletGeotiff(CargaTIFF5, {
        renderer: RenderizadoTIFF5,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF6 = "./GeoTIFF/OS0820.tif";
let RenderizadoTIFF6 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF6 = L.leafletGeotiff(CargaTIFF6, {
        renderer: RenderizadoTIFF6,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF7 = "./GeoTIFF/OS0830.tif";
let RenderizadoTIFF7 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF7 = L.leafletGeotiff(CargaTIFF7, {
        renderer: RenderizadoTIFF7,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF8 = "./GeoTIFF/OS0910.tif";
let RenderizadoTIFF8 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF8 = L.leafletGeotiff(CargaTIFF8, {
        renderer: RenderizadoTIFF8,
        opacity: 0.75,
    }).addTo(map);
    

let CargaTIFF9 = "./GeoTIFF/OS0920.tif";
let RenderizadoTIFF9 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF9 = L.leafletGeotiff(CargaTIFF9, {
        renderer: RenderizadoTIFF9,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF10 = "./GeoTIFF/OS0930.tif";
let RenderizadoTIFF10 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF10 = L.leafletGeotiff(CargaTIFF10, {
        renderer: RenderizadoTIFF10,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF11 = "./GeoTIFF/OS1005.tif";
let RenderizadoTIFF11 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF11 = L.leafletGeotiff(CargaTIFF11, {
        renderer: RenderizadoTIFF11,
        opacity: 0.75,
    }).addTo(map);

let CargaTIFF12 = "./GeoTIFF/OS1015.tif";
let RenderizadoTIFF12 = L.LeafletGeotiff.plotty({
        displayMin: 1,
        displayMax: 9,
        clampLow: false,
        clampHigh: false,
        colorScale: 'turbo',
    });
let NombreTIFF12 = L.leafletGeotiff(CargaTIFF12, {
        renderer: RenderizadoTIFF12,
        opacity: 0.75,
    }).addTo(map);

//let CargaTIFF13 = "./GeoTIFF/OSTUMUT_V.tif";
//let RenderizadoTIFF13 = L.LeafletGeotiff.plotty({
//        displayMin: 1,
//        displayMax: 10,
//        clampLow: false,
//        clampHigh: false,
//        colorScale: 'turbo',
//    });
//let NombreTIFF13 = L.leafletGeotiff(CargaTIFF13, {
//        renderer: RenderizadoTIFF13,
//        opacity: 0.75,
//    }).addTo(map);
    
//let CargaTIFF14 = "./GeoTIFF/OSTUMUT_P.tif";
//let RenderizadoTIFF14 = L.LeafletGeotiff.plotty({
//        displayMin: 1,
//        displayMax: 13,
//        clampLow: false,
//        clampHigh: false,
//        colorScale: 'turbo',
//    });
//let NombreTIFF14 = L.leafletGeotiff(CargaTIFF14, {
//        renderer: RenderizadoTIFF14,
//        opacity: 0.75,
//    });

// WEB MAP SERVICE (WMS - CAPAS) //
//let ActiveCTH = L.tileLayer.wms("https://nowcoast.noaa.gov/geoserver/hazards/tropical_cyclones/ows?", {
//        layers: 'active_tropical_cyclones',
//        format: 'image/png',
//        transparent: true,
//        attribution: "NOAA nowCOAST"
//    });

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
//        'Ciclon Tropical / Huracán activo':ActiveCTH,
//        'Oil Spill - Concentración de eventos':NombreTIFF13,
//        'Oil Spill - Porcentaje':NombreTIFF14,
        'Oil Spill - 01/07/2010':NombreTIFF1,
        'Oil Spill - 10/07/2010':NombreTIFF2,
        'Oil Spill - 20/07/2010':NombreTIFF3,
        'Oil Spill - 30/07/2010':NombreTIFF4,
        'Oil Spill - 10/08/2010':NombreTIFF5,
        'Oil Spill - 20/08/2010':NombreTIFF6,
        'Oil Spill - 30/08/2010':NombreTIFF7,
        'Oil Spill - 10/09/2010':NombreTIFF8,
        'Oil Spill - 20/09/2010':NombreTIFF9,
        'Oil Spill - 30/09/2010':NombreTIFF10,
        'Oil Spill - 05/10/2010':NombreTIFF11,
        'Oil Spill - 15/10/2010':NombreTIFF12,
    };
let layerControl = L.control.layers(
            baseLayers,
            overlays,
                {collapsed: false,
        }).addTo(map);
