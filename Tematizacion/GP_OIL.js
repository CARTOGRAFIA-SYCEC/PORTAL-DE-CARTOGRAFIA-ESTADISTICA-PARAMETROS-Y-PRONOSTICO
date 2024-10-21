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
let esridark = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',{
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'
    });

//  CONFIGURACIÓN LIENZO DEL MAPA //
let map = L.map('map', {
        layers: [esridark],
        tap: false,
        center: new L.LatLng(20, -94),
        zoom: 8,
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
            this._div.innerHTML = `<h3>RIESGO POR HIDROCARBUROS EN EL GOLFO DE MÉXICO</h3>`;
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
        latlng: L.latLng([20, -94]),
        zoom: 8,
    }).addTo(map);

// CARTOGRAFIA GEOJSON (CAPAS) //
// LINEAS (CAPAS) //
let ISA_PEP = L.geoJSON(ISA_2006, {style: function (feature){
    switch(String(feature.properties['CVE_ISA'])) {
    case 'ISA-01A':
    return {
        color: "#0061ff",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-01B':
    return {
        color: "#00ccff",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-03A':
    return {
        color: "#cc00cc",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-04':
    return {
        color: "#996600",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-05':
    return {
        color: "#663300",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-06A':
    return {
        color: "#99cc00",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-06B':
    return {
        color: "#ff4b00",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-07':
    return {
        color: "#00ff00",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-08A':
    return {
        color: "#8e8f9e",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-08B':
    return {
        color: "#003300",
        weight: 2,
        opacity: 1,
      }; 
    case 'ISA-10A':
    return {
        color: "#0000cc",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-10B':
    return {
        color: "#ffcc99",
        weight: 2,
        opacity: 1,
      };  
    case 'ISA-10C':
    return {
        color: "#ffaf00",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-10D':
    return {
        color: "#ffcecc",
        weight: 2,
        opacity: 1,
      };
    case 'ISA-10F':
    return {
        color: "#96ce00",
        weight: 2,
        opacity: 1,
      };  
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>Clave ISA: " + layer.feature.properties.CVE_ISA +
            "</div><hr><table><tr><td>Descripción ISA: " + layer.feature.properties.DESCR_ISA +
            "</td></tr><tr><td>Distancia (km): " + layer.feature.properties.DISTANCIA +
            "</td></tr><tr><td>Fuente de la cartografía: " + layer.feature.properties.FUENTE +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>Clave ISA: " + layer.feature.properties.CVE_ISA +
            "</div><hr><table><tr><td>Descripción ISA: " + layer.feature.properties.DESCR_ISA +
            "</td></tr><tr><td>Distancia (km): " + layer.feature.properties.DISTANCIA +
            "</td></tr><tr><td>Fuente de la cartografía: " + layer.feature.properties.FUENTE +
            "</td></tr></table>"
    }).addTo(map);

// GEOTIFF (CAPAS)
let CargaTIFF1 = "./GeoTIFF/Konen-1EXP_lluvias.tif";
let RenderizadoTIFF1 = L.LeafletGeotiff.plotty({
        displayMin: 5,
        displayMax: 101,
        clampLow: false,
        clampHigh: false,
        colorScale: 'jet',
    });
let NombreTIFF1 = L.leafletGeotiff(CargaTIFF1, {
        renderer: RenderizadoTIFF1,
        opacity: 0.90,
    }).addTo(map);

let CargaTIFF2 = "./GeoTIFF/Konen-1EXP_nortes.tif";
let RenderizadoTIFF2 = L.LeafletGeotiff.plotty({
        displayMin: 5,
        displayMax: 101,
        clampLow: false,
        clampHigh: false,
        colorScale: 'jet',
    });
let NombreTIFF2 = L.leafletGeotiff(CargaTIFF2, {
        renderer: RenderizadoTIFF2,
        opacity: 0.90,
    }).addTo(map);

let CargaTIFF3 = "./GeoTIFF/Konen-1EXP_secas.tif";
let RenderizadoTIFF3 = L.LeafletGeotiff.plotty({
        displayMin: 5,
        displayMax: 101,
        clampLow: false,
        clampHigh: false,
        colorScale: 'jet',
    });
let NombreTIFF3 = L.leafletGeotiff(CargaTIFF3, {
        renderer: RenderizadoTIFF3,
        opacity: 0.90,
    }).addTo(map);

// ACTIVAR CAPAS //
let baseLayers = {
        'OpenStreetMap Standard': osm,
        'OpenStreetMap Humanitarian': hdm,
        'ESRI Medio Físico': esriphy,
        'ESRI Terreno': esriter,
        'ESRI Oceánico': esriocea,
        'ESRI Satelital': esrisat,
        'ESRI DarkMap': esridark,
    };               
let overlays = {
        'Índice de Sensibilidad Ambiental - ISA': ISA_PEP,
        'Konen-1EXP - Nortes':NombreTIFF2,
        'Konen-1EXP - Lluvias':NombreTIFF1,
        'Konen-1EXP - Secas':NombreTIFF3,
    };
let layerControl = L.control.layers(
            baseLayers,
            overlays,
                {collapsed: false,
        }).addTo(map);
