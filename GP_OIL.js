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
// GEOTIFF (CAPAS)
let CargaTIFF1 = "BATIMETRIA_GOM.tif";
let RenderizadoTIFF1 = L.LeafletGeotiff.plotty({
        displayMin: -5102,
        displayMax: 0,
        clampLow: false,
        clampHigh: false,
        colorScale: 'jet',
    });
let NombreTIFF1 = L.leafletGeotiff(CargaTIFF1, {
        renderer: RenderizadoTIFF1,
        opacity: 0.6,
    }).addTo(map);

// WEB MAP SERVICE (WMS - CAPAS) //
let ActiveCTH = L.tileLayer.wms("https://nowcoast.noaa.gov/geoserver/hazards/tropical_cyclones/ows?", {
        layers: 'active_tropical_cyclones',
        format: 'image/png',
        transparent: true,
        attribution: "NOAA nowCOAST"
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
        'Ciclon Tropical / Huracán activo':ActiveCTH,
        'Batimetría - Golfo de México':NombreTIFF1,
    };
let layerControl = L.control.layers(
            baseLayers,
            overlays,
                {collapsed: false,
        }).addTo(map);

// SEARCH CONTROL //
//let searchControl = new L.Control.Search({
//	layer: BOYA_ANCLAJE_2024,
//	propertyName: 'NOMBRE_BOYA',
//	market: true,
//	textPlaceholder: 'Buscar información',
//	moveToLocation: function(latlng, title, map) {
//		let zoom = map.getBoundsZoom(latlng.layer.getBounds());
//		map.setView(latlng, zoom);
//		}
//	});
//	searchControl.on('search:locationfound', function(e)
//		{e.layer.setStyle({
//						fillColor: '#3f0', 
//						color: '#0f0',
//						});
//		if(e.layer._popup)
//			e.layer.bindPopup();
//	}).on('search:collapsed', function(e) {
//		BOYA_ANCLAJE_2024.eachLayer(function(layer) 
//		{ BOYA_ANCLAJE_2024.resetStyle(layer);
//		});	
//	});map.addControl(searchControl);