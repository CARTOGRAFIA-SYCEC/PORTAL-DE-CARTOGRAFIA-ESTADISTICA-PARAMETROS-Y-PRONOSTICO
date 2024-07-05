					// BASEMAPS //
					let osm = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
						attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'});
					let hdm = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
						attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'});
					let esrisat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
						attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'});
					let esriphy = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
						attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'});
					let esriter = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
						attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'});
					let esriocea = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',{
						attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="">Mr Urbanist MX</a> | contributors'});
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
					let toggleFullscreen = function () {
					map.toggleFullscreen();
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
					// CARTOGRAFIA GEOJSON (CAPAS) //
					// PUNTOS (CAPAS) //
					let BOYA_ANCLAJE_2024 = L.geoJson(bya_2024, {pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, {
							   radius: 5,
							   fillColor: '#ffffff',
							   color: '#ffffff',
							   weight: 0,
							   opacity: 0,
							   fillOpacity: 0,
						});}}).addTo(map);
					
					let BOYA_ANCLAJE_08_24 = L.geoJson(bya_08_24, {pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, {
							   radius: 5,
							   fillColor: '#82a639',
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
							'Boyas y Anclajes (2008 a 2023)': BOYA_ANCLAJE_08_24,
						};
					let layerControl = L.control.layers(baseLayers, overlays, {collapsed: false,}).addTo(map);
					// RESET VIEW (REGRESAR VISTA IN INICIAL) //
					L.control.resetView({
        			position: "topleft",
        			title: "Return zoom",
       				latlng: L.latLng([22.25, -92.25]),
        			zoom: 7,
   					}).addTo(map);
					// SEARCH CONTROL //
					let searchControl = new L.Control.Search({
						layer: BOYA_ANCLAJE_2024,
						propertyName: 'NOMBRE_BOYA',
						market: true,
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
							BOYA_ANCLAJE_2024.eachLayer(function(layer) 
							{ BOYA_ANCLAJE_2024.resetStyle(layer);
							});	
						});
					map.addControl(searchControl);