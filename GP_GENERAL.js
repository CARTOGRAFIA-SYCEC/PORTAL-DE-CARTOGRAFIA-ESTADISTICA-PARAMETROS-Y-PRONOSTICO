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
L.control.resetView({
        position: "topleft",
        title: "Return zoom",
        latlng: L.latLng([22.25, -92.25]),
        zoom: 7,
    }).addTo(map);

// CARTOGRAFIA GEOJSON (CAPAS) //
// PUNTOS (CAPAS) //
let BOT0 = L.geoJson(bot, {pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
            radius: 5,
            fillColor: '#e36666',
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
    });}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE_BOYA +
            "</div><hr><table><tr><td>Tipo de Boya: " + layer.feature.properties.N_BOYA +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE_BOYA +
            "</div><hr><table><tr><td>Tipo de Boya: " + layer.feature.properties.N_BOYA +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).addTo(map);

let BMT0 = L.geoJson(bmt, {pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
            radius: 5,
            fillColor: '#ffc84b',
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
    });}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE_BOYA +
            "</div><hr><table><tr><td>Tipo de Boya: " + layer.feature.properties.N_BOYA +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE_BOYA +
            "</div><hr><table><tr><td>Tipo de Boya: " + layer.feature.properties.N_BOYA +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).addTo(map);

let AOP0 = L.geoJson(aop, {pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
            radius: 5,
            fillColor: '#7a8ef5',
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
    });}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE_BOYA +
            "</div><hr><table><tr><td>Tipo de Anclaje: " + layer.feature.properties.N_BOYA +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE_BOYA +
            "</div><hr><table><tr><td>Tipo de Anclaje: " + layer.feature.properties.N_BOYA +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).addTo(map);

let Localizacion = L.geoJson(localizacion, {pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
            radius: 5,
            fillColor: '#92d2ea',
            color: '#005187',
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
    });}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ubicación: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.LON_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.LAT_Y +
            "</td></tr><tr><td>Tirante: " + layer.feature.properties.TIRANTE +
            "</td></tr><tr><td>Reporte Viento y Oleaje: " + layer.feature.properties.REP_VyO +
            "</td></tr><tr><td>Reporte Corriente Marina: " + layer.feature.properties.REP_COR +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ubicación: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.LON_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.LAT_Y +
            "</td></tr><tr><td>Tirante: " + layer.feature.properties.TIRANTE +
            "</td></tr><tr><td>Reporte Viento y Oleaje: " + layer.feature.properties.REP_VyO +
            "</td></tr><tr><td>Reporte Corriente Marina: " + layer.feature.properties.REP_COR +
            "</td></tr></table>"
    });

let Parametro = L.geoJson(parametro, {pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 5,
        fillColor: '#9d5353',
        color: '#7f0000',
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
    });}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ubicación: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.LON_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.LAT_Y +
            "</td></tr><tr><td>Tirante: " + layer.feature.properties.TIRANTE +
            "</td></tr><tr><td>Reporte Viento y Oleaje: " + layer.feature.properties.REP_VyO +
            "</td></tr><tr><td>Reporte Corriente Marina: " + layer.feature.properties.REP_COR +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ubicación: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.LON_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.LAT_Y +
            "</td></tr><tr><td>Tirante: " + layer.feature.properties.TIRANTE +
            "</td></tr><tr><td>Reporte Viento y Oleaje: " + layer.feature.properties.REP_VyO +
            "</td></tr><tr><td>Reporte Corriente Marina: " + layer.feature.properties.REP_COR +
            "</td></tr></table>"
    });

let InfraestructuraPEMEX = L.geoJson(infpemex, {pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 5,
        fillColor: '#ffffff',
        color: '#000000',
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
    });}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Fuente: " + layer.feature.properties.FUENTE +
            "</td></tr><tr><td>Tipo de Infraestructura: " + layer.feature.properties.TIPO_INF +
            "</td></tr><tr><td>Estado: " + layer.feature.properties.ESTATUS +
            "</td></tr><tr><td>Fecha de operación: " + layer.feature.properties.FECHA_O +
            "</td></tr><tr><td>Fecha de conclusión: " + layer.feature.properties.FECHA_C +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Fuente: " + layer.feature.properties.FUENTE +
            "</td></tr><tr><td>Tipo de Infraestructura: " + layer.feature.properties.TIPO_INF +
            "</td></tr><tr><td>Estado: " + layer.feature.properties.ESTATUS +
            "</td></tr><tr><td>Fecha de operación: " + layer.feature.properties.FECHA_O +
            "</td></tr><tr><td>Fecha de conclusión: " + layer.feature.properties.FECHA_C +
            "</td></tr><tr><td>Coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr></table>"
    });

// LINEAS (CAPAS) //
let Huracan1 = L.geoJSON(h1, {style: function (feature){
    return {
        color: "#fce805",
        weight: 1.5,
        opacity: 1,
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    });

let Huracan2 = L.geoJSON(h2, {style: function (feature){
    return {
        color: "#fca635",
        weight: 1.5,
        opacity: 1,
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    });

let Huracan3 = L.geoJSON(h3, {style: function (feature){
    return {
        color: "#fa021f",
        weight: 1.5,
        opacity: 1,
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    });

let Huracan4 = L.geoJSON(h4, {style: function (feature){
    return {
        color: "#fa41d2",
        weight: 1.5,
        opacity: 1,
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    });

let Huracan5 = L.geoJSON(h5, {style: function (feature){
    return {
        color: "#7b199c",
        weight: 1.5,
        opacity: 1,
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.name +
            "</div><hr><table><tr><td>Categoría: " + layer.feature.properties.rep_catego +
            "</td></tr><tr><td>Año: " + layer.feature.properties.year +
            "</td></tr><tr><td>Mes: " + layer.feature.properties.month +
            "</td></tr><tr><td>Día: " + layer.feature.properties.day +
            "</td></tr><tr><td>Presión Atmosferica: " + layer.feature.properties.wmo_pres +
            "</td></tr><tr><td>Velocidad del Viento: " + layer.feature.properties.wmo_wind +
            "</td></tr></table>"
    });

// POLIGONOS (CAPAS) //
let polyparameters = L.geoJson(pparameters, {style: function (feature){
    return {
            weight: 2.5,
            opacity: 0.85,
            fillOpacity: 0.85,
            fillColor: '#bfbfbf',
            color: '#0a0a0a',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CVE_NOMBRE +
            "</div><hr><table><tr><td>Nombre completo: " + layer.feature.properties.NOMBRE +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>tTirante: " + layer.feature.properties.TITRANTE +
            "</td></tr><tr><td>Centroide coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Centroide coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr><tr><td>Fecha de reporte parámetros 1: " + layer.feature.properties.F1_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 1: " + layer.feature.properties.M1_RP +
            "</td></tr><tr><td>Fecha de reporte parámetros 2: " + layer.feature.properties.F2_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 2: " + layer.feature.properties.M2_RP +
            "</td></tr><tr><td>Fecha de reporte parámetros 3: " + layer.feature.properties.F3_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 3: " + layer.feature.properties.M3_RP +
            "</td></tr><tr><td>Fecha de reporte parámetros 4: " + layer.feature.properties.F4_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 5: " + layer.feature.properties.M4_RP +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
        return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CVE_NOMBRE +
            "</div><hr><table><tr><td>Nombre completo: " + layer.feature.properties.NOMBRE +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>tTirante: " + layer.feature.properties.TITRANTE +
            "</td></tr><tr><td>Centroide coordenada X: " + layer.feature.properties.COORD_X +
            "</td></tr><tr><td>Centroide coordenada Y: " + layer.feature.properties.COORD_Y +
            "</td></tr><tr><td>Fecha de reporte parámetros 1: " + layer.feature.properties.F1_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 1: " + layer.feature.properties.M1_RP +
            "</td></tr><tr><td>Fecha de reporte parámetros 2: " + layer.feature.properties.F2_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 2: " + layer.feature.properties.M2_RP +
            "</td></tr><tr><td>Fecha de reporte parámetros 3: " + layer.feature.properties.F3_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 3: " + layer.feature.properties.M3_RP +
            "</td></tr><tr><td>Fecha de reporte parámetros 4: " + layer.feature.properties.F4_RP +
            "</td></tr><tr><td>Modelo de reporte parámetros 5: " + layer.feature.properties.M4_RP +
            "</td></tr></table>"
    }).addTo(map);

let Aguas_Profundas = L.geoJson(pq_ap, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#5ac8ff',
            fillColor: '#003c8c',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CVE_CNIH +
            "</div><hr><table><tr><td>Región: " + layer.feature.properties.CATEGORY +
            "</td></tr><tr><td>Sector: " + layer.feature.properties.SECTOR +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.AREA +
            "</td></tr><tr><td>Actividad: " + layer.feature.properties.ACTIVITY +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CVE_CNIH +
            "</div><hr><table><tr><td>Región: " + layer.feature.properties.CATEGORY +
            "</td></tr><tr><td>Sector: " + layer.feature.properties.SECTOR +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.AREA +
            "</td></tr><tr><td>Actividad: " + layer.feature.properties.ACTIVITY +
            "</td></tr></table>"
    });

let Aguas_Someras = L.geoJson(pq_as, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#003c8c',
            fillColor: '#5ac8ff',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CVE_CNIH +
            "</div><hr><table><tr><td>Región: " + layer.feature.properties.CATEGORY +
            "</td></tr><tr><td>Sector: " + layer.feature.properties.SECTOR +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.AREA +
            "</td></tr><tr><td>Actividad: " + layer.feature.properties.ACTIVITY +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CVE_CNIH +
            "</div><hr><table><tr><td>Región: " + layer.feature.properties.CATEGORY +
            "</td></tr><tr><td>Sector: " + layer.feature.properties.SECTOR +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.AREA +
            "</td></tr><tr><td>Actividad: " + layer.feature.properties.ACTIVITY +
            "</td></tr></table>"
    });

let Ronda_1 = L.geoJson(lc_r1, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#2c8c8c',
            fillColor: '#50ffff',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Licitación: " + layer.feature.properties.LICITACION +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Licitación: " + layer.feature.properties.LICITACION +
            "</td></tr></table>"
    });

let Ronda_2 = L.geoJson(lc_r2, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#cc6a90',
            fillColor: '#e678a1',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Licitación: " + layer.feature.properties.LICITACION +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Licitación: " + layer.feature.properties.LICITACION +
            "</td></tr></table>"
    });

let Ronda_3 = L.geoJson(lc_r3, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#36bf00',
            fillColor: '#195900',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Licitación: " + layer.feature.properties.LICITACION +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Región: " + layer.feature.properties.REGION +
            "</td></tr><tr><td>Licitación: " + layer.feature.properties.LICITACION +
            "</td></tr></table>"
    });

let Asignaciones_Pemex = L.geoJson(lc_ap, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#a68c5b',
            fillColor: '#ffd78c',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Licitación: " + layer.feature.properties.T_CVEACT +
            "</td></tr><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Estatus: " + layer.feature.properties.ESTADO +
            "</td></tr><tr><td>Tipo de contrato: " + layer.feature.properties.T_CONTRATO +
            "</td></tr><tr><td>Fecha de convocatoria: " + layer.feature.properties.FEC_CONV +
            "</td></tr><tr><td>Fecha de licitación: " + layer.feature.properties.FEC_LICI +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUP_AREA +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Licitación: " + layer.feature.properties.T_CVEACT +
            "</td></tr><tr><td>Ronda: " + layer.feature.properties.RONDA +
            "</td></tr><tr><td>Estatus: " + layer.feature.properties.ESTADO +
            "</td></tr><tr><td>Tipo de contrato: " + layer.feature.properties.T_CONTRATO +
            "</td></tr><tr><td>Fecha de convocatoria: " + layer.feature.properties.FEC_CONV +
            "</td></tr><tr><td>Fecha de licitación: " + layer.feature.properties.FEC_LICI +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUP_AREA +
            "</td></tr></table>"
    });

let Asignaciones_Vigentes = L.geoJson(a_v, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#195900',
            fillColor: '#36bf00',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.N_CVECNIH + 
            "</div><hr><table><tr><td>Actividad: " + layer.feature.properties.T_CVEACT +
            "</td></tr><tr><td>Fecha de Termino: " + layer.feature.properties.F_FINALIZA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUP_AREA +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.CUENCA +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.N_CVECNIH + 
            "</div><hr><table><tr><td>Actividad: " + layer.feature.properties.T_CVEACT +
            "</td></tr><tr><td>Fecha de Termino: " + layer.feature.properties.F_FINALIZA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUP_AREA +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.CUENCA +
            "</td></tr></table>"
    });

let Asignaciones_No_Vigentes = L.geoJson(a_nv, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            dashArray: 5,
            fillOpacity: 0.25,
            color: '#391773',
            fillColor: '#c0ace6',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.N_CVECNIH +
            "</div><hr><table><tr><td>Actividad: " + layer.feature.properties.T_CVEACT +
            "</td></tr><tr><td>Fecha de Inicio: " + layer.feature.properties.F_INICIO +
            "</td></tr><tr><td>Fecha de Termino: " + layer.feature.properties.F_FINALIZA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUP_AREA +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.CUENCA +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.N_CVECNIH +
            "</div><hr><table><tr><td>Actividad: " + layer.feature.properties.T_CVEACT +
            "</td></tr><tr><td>Fecha de Inicio: " + layer.feature.properties.F_INICIO +
            "</td></tr><tr><td>Fecha de Termino: " + layer.feature.properties.F_FINALIZA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUP_AREA +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.CUENCA +
            "</td></tr></table>"
    });

let Contrato_Licencias = L.geoJson(c_l, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#f8bf39',
            fillColor: '#f15d13',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.N_RONDA +
            "</td></tr><tr><td>Nombre de contrato: " + layer.feature.properties.R_CONTRACT +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.ESTADO +
            "</td></tr><tr><td>Fase: " + layer.feature.properties.FASE +
            "</td></tr><tr><td>Región: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Fecha de inicio: " + layer.feature.properties.FECHA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUPERFICIE +
            "</td></tr><tr><td>Contratista: " + layer.feature.properties.CONTRATIST +
            "</td></tr><tr><td>Paises: " + layer.feature.properties.PAIS +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.N_RONDA +
            "</td></tr><tr><td>Nombre de contrato: " + layer.feature.properties.R_CONTRACT +
            "</td></tr><tr><td>Localización: " + layer.feature.properties.ESTADO +
            "</td></tr><tr><td>Fase: " + layer.feature.properties.FASE +
            "</td></tr><tr><td>Región: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Fecha de inicio: " + layer.feature.properties.FECHA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUPERFICIE +
            "</td></tr><tr><td>Contratista: " + layer.feature.properties.CONTRATIST +
            "</td></tr><tr><td>Paises: " + layer.feature.properties.PAIS +
            "</td></tr></table>"
    });

let Contratos_No_Vigentes = L.geoJson(c_nv, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            dashArray: 5,
            fillOpacity: 0.25,
            color: '#808080',
            fillColor: '#b3b3b3',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CONTRATO +
            "</div><hr><table><tr><td>Tipo de Contrato: " + layer.feature.properties.T_CONTRATO +
            "</td></tr><tr><td>Actividad: " + layer.feature.properties.ACTIVITY +
            "</td></tr><tr><td>Fecha de inicio: " + layer.feature.properties.F_INICIO +
            "</td></tr><tr><td>Fecha de Termino: " + layer.feature.properties.F_FIN +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUPERFICIE +
            "</td></tr><tr><td>Región: " + layer.feature.properties.CUENCA +
            "</td></tr><tr><td>Contratista: " + layer.feature.properties.CONSTRATIS +
            "</td></tr><tr><td>Paises: " + layer.feature.properties.PAIS +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.CONTRATO +
            "</div><hr><table><tr><td>Tipo de Contrato: " + layer.feature.properties.T_CONTRATO +
            "</td></tr><tr><td>Actividad: " + layer.feature.properties.ACTIVITY +
            "</td></tr><tr><td>Fecha de inicio: " + layer.feature.properties.F_INICIO +
            "</td></tr><tr><td>Fecha de Termino: " + layer.feature.properties.F_FIN +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUPERFICIE +
            "</td></tr><tr><td>Región: " + layer.feature.properties.CUENCA +
            "</td></tr><tr><td>Contratista: " + layer.feature.properties.CONSTRATIS +
            "</td></tr><tr><td>Paises: " + layer.feature.properties.PAIS +
            "</td></tr></table>"
    });

let Contratos_Produccion_Compartida = L.geoJson(c_pc, {style: function (feature){
    return {
            weight: 1.5,
            opacity: 0.25,
            fillOpacity: 0.25,
            color: '#f15d13',
            fillColor: '#fed17f',
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.N_RONDA +
            "</td></tr><tr><td>Número de licitación: " + layer.feature.properties.LICITACION +
            "</td></tr><tr><td>Número de Contrato: " + layer.feature.properties.R_CONTRACT +
            "</td></tr><tr><td>Contratista: " + layer.feature.properties.CONTRATIST +
            "</td></tr><tr><td>Paises: " + layer.feature.properties.PAIS +
            "</td></tr><tr><td>Ubicación: " + layer.feature.properties.ESTADO +
            "</td></tr><tr><td>Región: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Fase: " + layer.feature.properties.FASE +
            "</td></tr><tr><td>Fecha: " + layer.feature.properties.FECHA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUPERFICIE +
            "</td></tr></table>"
    }).bindTooltip(function (layer){
    return "<div style=text-align:center><h4>NOMBRE: " + layer.feature.properties.NOMBRE +
            "</div><hr><table><tr><td>Ronda: " + layer.feature.properties.N_RONDA +
            "</td></tr><tr><td>Número de licitación: " + layer.feature.properties.LICITACION +
            "</td></tr><tr><td>Número de Contrato: " + layer.feature.properties.R_CONTRACT +
            "</td></tr><tr><td>Contratista: " + layer.feature.properties.CONTRATIST +
            "</td></tr><tr><td>Paises: " + layer.feature.properties.PAIS +
            "</td></tr><tr><td>Ubicación: " + layer.feature.properties.ESTADO +
            "</td></tr><tr><td>Región: " + layer.feature.properties.UBICACION +
            "</td></tr><tr><td>Fase: " + layer.feature.properties.FASE +
            "</td></tr><tr><td>Fecha: " + layer.feature.properties.FECHA +
            "</td></tr><tr><td>Superficie: " + layer.feature.properties.SUPERFICIE +
            "</td></tr></table>"
    });

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
        'Boya Oceanográfica':BOT0,
        'Boya Metoceánica': BMT0,
        'Anclaje Oceanográfico':AOP0,
        'Localizacion': Localizacion,
        'Localizaciones Parametro (Punto)': Parametro,
        'Localizaciones Parametro (Polígono)': polyparameters,
        'Infraestructura Maritima': InfraestructuraPEMEX,
        'Huracán Categoría 1': Huracan1,
        'Huracán Categoría 2': Huracan2,
        'Huracán Categoría 3': Huracan3,
        'Huracán Categoría 4': Huracan4,
        'Huracán Categoría 5': Huracan5,
        'Plan Quinquenal: Aguas Profundas': Aguas_Profundas,
        'Plan Quinquenal: Aguas Someras': Aguas_Someras,
        'Ronda 1': Ronda_1,
        'Ronda 2': Ronda_2,
        'Ronda 3': Ronda_3,
        'Asignaciones de PEMEX': Asignaciones_Pemex,
        'Asignaciones Vigentes': Asignaciones_Vigentes,
        'Asignaciones No Vigentes': Asignaciones_No_Vigentes,
        'Contrato Licencias': Contrato_Licencias,
        'Contrato No Vigentes': Contratos_No_Vigentes,
        'Contrato Produccion Compartida': Contratos_Produccion_Compartida
    };
let layerControl = L.control.layers(
            baseLayers, 
            overlays, 
                {collapsed: false,
        }).addTo(map);

// SEARCH CONTROL //
let searchControl = new L.Control.Search({
        layer: polyparameters,
        propertyName: 'NOMBRE',
        market: false,
        textPlaceholder: 'Buscar información',
    moveToLocation: function(latlng, title, map) {
let zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom);
        }
    });
    searchControl.on('search:locationfound', function(e)
        {e.layer.setStyle({
                        fillColor: '#3f0', 
                        color: '#0f0',
                        });
        if(e.layer._popup)
            e.layer.bindPopup();
    }).on('search:collapsed', function(e) {
        polyparameters.eachLayer(function(layer) 
        { polyparametersX.resetStyle(layer);
        });	
    });map.addControl(searchControl);