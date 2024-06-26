/* Leaflet.Search (c) By Stefano Cudini */
(function (factory) 
  {
    if (typeof define === 'function' && define.amd)
      {
        define(['leaflet'], factory)
      } 
        else if (typeof module !== 'undefined') 
      {
        module.exports = factory(require('leaflet'))
      } 
        else 
      {
        if (typeof window.L === 'undefined') 
      { 
        throw new Error('Leaflet must be loaded first') 
      }
      factory(window.L)
    }
  }
)
(function (L) 
  {
    L.Control.Search = L.Control.extend({
    includes: L.version[0] === '1' ? L.Evented.prototype : L.Mixin.Events,
    options:
    {
      url: '',
      layer: null,
      sourceData: null,
      jsonpParam: null,
      propertyLoc: 'loc',
      propertyName: 'title',
      formatData: null,
      filterData: null,
      moveToLocation: null,
      buildTip: null,
      container: '',
      zoom: null, 
      minLength: 1,
      initial: true,
      casesensitive: false,
      autoType: true,
      delayType: 400,
      tooltipLimit: -1,
      tipAutoSubmit: true,
      firstTipSubmit: false,
      autoResize: true,
      collapsed: true,
      autoCollapse: false,
      autoCollapseTime: 1200,
      textErr: 'Location not found',
      textCancel: 'Cancel',
      textPlaceholder: 'Search...',
      hideMarkerOnCollapse: false,
      position: 'topleft',
      marker: 
        {
          icon: false,
          animate: true,
          circle: 
          {
            radius: 10,
            weight: 3,
            color: '#c61a09',
            stroke: true,
            fill: false
          }
        }
    },
    _getPath: function (obj, prop)
    {
      let parts = prop.split('.')
      let last = parts.pop()
      let len = parts.length
      let cur = parts[0]
      let i = 1
      if (len > 0)
      {
        while ((obj = obj[cur]) && i < len) { cur = parts[i++] }
      }
      if (obj) 
      { 
        return obj[last] 
      }
    },
    _isObject: function (obj) 
    {
      return Object.prototype.toString.call(obj) === '[object Object]'
    },
    initialize: function (options) 
    {
      L.Util.setOptions(this, options || {})
      this._inputMinSize = this.options.textPlaceholder ? this.options.textPlaceholder.length : 10
      this._layer = this.options.layer || new L.LayerGroup()
      this._filterData = this.options.filterData || this._defaultFilterData
      this._formatData = this.options.formatData || this._defaultFormatData
      this._moveToLocation = this.options.moveToLocation || this._defaultMoveToLocation
      this._autoTypeTmp = this.options.autoType
      this._countertips = 0
      this._recordsCache = {}
      this._curReq = null
    },
    onAdd: function (map) 
    {
      this._map = map
      this._container = L.DomUtil.create('div', 'leaflet-control-search')
      this._input = this._createInput(this.options.textPlaceholder, 'search-input')
      this._tooltip = this._createTooltip('search-tooltip')
      this._cancel = this._createCancel(this.options.textCancel, 'search-cancel')
      this._button = this._createButton(this.options.textPlaceholder, 'search-button')
      this._alert = this._createAlert('search-alert')
      if (this.options.collapsed === false) { this.expand(this.options.collapsed) }
      if (this.options.marker) 
      {
        if (this.options.marker instanceof L.Marker || this.options.marker instanceof L.CircleMarker) 
        {
          this._markerSearch = this.options.marker 
        } 
        else if 
          (this._isObject(this.options.marker)) 
        { 
          this._markerSearch = new L.Control.Search.Marker([0, 0], this.options.marker) 
        }
        this._markerSearch._isMarkerSearch = true
      }
      this.setLayer(this._layer)
      map.on
      (
        {
        resize: this._handleAutoresize
        }, this
      )
      return this._container
    },
    addTo: function (map) 
    {
      if (this.options.container) 
      {
        this._container = this.onAdd(map)
        this._wrapper = L.DomUtil.get(this.options.container)
        this._wrapper.style.position = 'relative'
        this._wrapper.appendChild(this._container)
      } 
      else 
      { 
        L.Control.prototype.addTo.call(this, map) 
      }
      return this
    },
    onRemove: function (map) 
    {
      this._recordsCache = {}
      map.off
      (
        {
        resize: this._handleAutoresize
        }, 
        this
      )
    },
    setLayer: function (layer) 
    {
      this._layer = layer
      this._layer.addTo(this._map)
      return this
    },
    showAlert: function (text) 
    {
      let self = this
      text = text || this.options.textErr
      this._alert.style.display = 'block'
      this._alert.innerHTML = text
      clearTimeout
        (
          this.timerAlert
        )
      this.timerAlert = setTimeout
      (
        function () 
        {
          self.hideAlert()
        }, 
        this.options.autoCollapseTime
      )
      return this
    },
    hideAlert: function () 
    {
      this._alert.style.display = 'none'
      return this
    },
    cancel: function () 
    {
      this._input.value = ''
      this._handleKeypress
      (
        {
          keyCode: 8 
        }
      )
      this._input.size = this._inputMinSize
      this._input.focus()
      this._cancel.style.display = 'none'
      this._hideTooltip()
      this.fire('search:cancel')
      return this
    },
    expand: function (toggle)
    {
      toggle = typeof toggle === 'boolean' ? toggle : true
      this._input.style.display = 'block'
      L.DomUtil.addClass(this._container, 'search-exp')
      if (toggle !== false) 
      {
        this._input.focus()
        this._map.on('dragstart click', this.collapse, this)
      }
      this.fire('search:expanded')
      return this
    },
    collapse: function () 
    {
      this._hideTooltip()
      this.cancel()
      this._alert.style.display = 'none'
      this._input.blur()
      if (this.options.collapsed) 
      {
        this._input.style.display = 'none'
        this._cancel.style.display = 'none'
        L.DomUtil.removeClass(this._container, 'search-exp')
        if (this.options.hideMarkerOnCollapse) {
          this._map.removeLayer(this._markerSearch)
        }
        this._map.off('dragstart click', this.collapse, this)
      }
      this.fire('search:collapsed')
      return this
    },
    collapseDelayed: function () 
    {
      let self = this
      if (!this.options.autoCollapse) return this
      clearTimeout(this.timerCollapse)
      this.timerCollapse = setTimeout(function () 
      {
        self.collapse()
      }, this.options.autoCollapseTime)
      return this
    },
    collapseDelayedStop: function () 
    {
      clearTimeout(this.timerCollapse)
      return this
    },
    _createAlert: function (className) 
    {
      let alert = L.DomUtil.create('div', className, this._container)
      alert.style.display = 'none'
      L.DomEvent
        .on(alert, 'click', L.DomEvent.stop, this)
        .on(alert, 'click', this.hideAlert, this)
      return alert
    },
    _createInput: function (text, className) 
    {
      let self = this
      let label = L.DomUtil.create('label', className, this._container)
      let input = L.DomUtil.create('input', className, this._container)
      input.type = 'text'
      input.size = this._inputMinSize
      input.value = ''
      input.autocomplete = 'off'
      input.autocorrect = 'off'
      input.autocapitalize = 'off'
      input.placeholder = text
      input.style.display = 'none'
      input.role = 'search'
      input.id = input.role + input.type + input.size
      label.htmlFor = input.id
      label.style.display = 'none'
      label.value = text
      L.DomEvent
        .disableClickPropagation(input)
        .on(input, 'keyup', this._handleKeypress, this)
        .on(input, 'paste', function (e) {
          setTimeout(function (e) {
            self._handleKeypress(e)
          }, 10, e)
        }, this)
        .on(input, 'blur', this.collapseDelayed, this)
        .on(input, 'focus', this.collapseDelayedStop, this)
      return input
    },
    _createCancel: function (title, className)
    {
      let cancel = L.DomUtil.create('a', className, this._container)
      cancel.href = '#'
      cancel.title = title
      cancel.style.display = 'none'
      cancel.innerHTML = '<span>&otimes;</span>'
      L.DomEvent
        .on(cancel, 'click', L.DomEvent.stop, this)
        .on(cancel, 'click', this.cancel, this)
      return cancel
    },
    _createButton: function (title, className) 
    {
      let button = L.DomUtil.create('a', className, this._container)
      button.href = '#'
      button.title = title
      L.DomEvent
        .on(button, 'click', L.DomEvent.stop, this)
        .on(button, 'click', this._handleSubmit, this)
        .on(button, 'focus', this.collapseDelayedStop, this)
        .on(button, 'blur', this.collapseDelayed, this)
      return button
    },
    _createTooltip: function (className) 
    {
      let self = this
      let tool = L.DomUtil.create('ul', className, this._container)
      tool.style.display = 'none'
      L.DomEvent
        .disableClickPropagation(tool)
        .on(tool, 'blur', this.collapseDelayed, this)
        .on(tool, 'wheel', function (e) 
        {
          self.collapseDelayedStop()
          L.DomEvent.stopPropagation(e)// disable zoom map
        }, this)
        .on(tool, 'mouseover', function (e) 
        {
          self.collapseDelayedStop()
        }, this)
      return tool
    },
    _createTip: function (text, val) 
    {
      let tip
      if (this.options.buildTip) 
      {
        tip = this.options.buildTip.call(this, text, val)
        if (typeof tip === 'string') 
        {
          let tmpNode = L.DomUtil.create('div')
          tmpNode.innerHTML = tip
          tip = tmpNode.firstChild
        }
      } 
      else 
      {
        tip = L.DomUtil.create('li', '')
        tip.innerHTML = text
      }
      L.DomUtil.addClass(tip, 'search-tip')
      tip._text = text
      if (this.options.tipAutoSubmit) 
      {
        L.DomEvent
          .disableClickPropagation(tip)
          .on(tip, 'click', L.DomEvent.stop, this)
          .on(tip, 'click', function (e) 
          {
            this._input.value = text
            this._handleAutoresize()
            this._input.focus()
            this._hideTooltip()
            this._handleSubmit()
          }, this)
      }
      return tip
    },
    _getUrl: function (text) 
    {
      return (typeof this.options.url === 'function') ? this.options.url(text) : this.options.url
    },
    _defaultFilterData: function (text, records) 
    {
      let frecords = {}
      text = text.replace(new RegExp('[.*+?^${}()|[\]\\]','g'), '')
      if (text === '') 
      {
        return []
      }
      let init = this.options.initial ? '^' : ''
      let icase = !this.options.casesensitive ? 'i' : undefined
      let regSearch = new RegExp(init + text, icase)
      for (let key in records) {
        if (regSearch.test(key)) {
          frecords[key] = records[key]
        }
      }
      return frecords
    },
    showTooltip: function (records) 
    {
      this._countertips = 0
      this._tooltip.innerHTML = ''
      this._tooltip.currentSelection = -1
      if (this.options.tooltipLimit) 
      {
        for (let key in records) 
        {
          if (this._countertips === this.options.tooltipLimit) 
          {
            break
          }
          this._countertips++
          this._tooltip.appendChild(this._createTip(key, records[key]))
        }
      }
      if (this._countertips > 0) 
      {
        this._tooltip.style.display = 'block'
        if (this._autoTypeTmp) 
        {
          this._autoType()
        }
        this._autoTypeTmp = this.options.autoType
      }
      else 
      {
        this._hideTooltip()
      }
      this._tooltip.scrollTop = 0
      return this._countertips
    },
    _hideTooltip: function () 
    {
      this._tooltip.style.display = 'none'
      this._tooltip.innerHTML = ''
      return 0
    },
    _defaultFormatData: function (json) 
    {
      let self = this
      let propName = this.options.propertyName
      let propLoc = this.options.propertyLoc
      let jsonret = {}
      if (L.Util.isArray(propLoc)) 
      {
        for (let i in json) 
        {
          jsonret[self._getPath(json[i], propName)] = L.latLng
            (
              self._getPath(json[i], 
              propLoc[0]), 
              self._getPath(json[i], propLoc[1])
            )
        }
      }
      else 
      {
        for (let i in json) 
        {
          jsonret[self._getPath(json[i], propName)] = L.latLng(self._getPath(json[i], propLoc))
        }
      }
      return jsonret
    },
    _recordsFromJsonp: function (text, callAfter) 
    {
      L.Control.Search.callJsonp = callAfter
      let script = L.DomUtil.create('script', 'leaflet-search-jsonp', document.getElementsByTagName('body')[0])
      let url = L.Util.template(this._getUrl(text) + '&' + this.options.jsonpParam + '=L.Control.Search.callJsonp', { s: text }) // parsing url
      script.type = 'text/javascript'
      script.src = url
      return {abort: function () {script.parentNode.removeChild(script)}}
    },
    _recordsFromAjax: function (text, callAfter) 
    {
      let request
      try {
        request = new window.XMLHttpRequest()
      } catch (e) {
        throw new Error('XMLHttpRequest is not supported')
      }
      let url = L.Util.template(this._getUrl(text), { s: text })
      request.open('GET', url)
      request.onload = function () 
      {
        callAfter(JSON.parse(request.responseText))
      }
      request.onreadystatechange = function () 
      {
        if (request.readyState === 4 && request.status === 200) 
        {
          this.onload()
        }
      }
      request.send()
      return request
    },
    _searchInLayer: function (layer, retRecords, propName, baseProp = 'options') 
    {
      let self = this; 
      let loc
      if (layer instanceof L.Control.Search.Marker) return
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) 
      {
        if (self._getPath(layer.options, propName)) 
        {
          loc = layer.getLatLng()
          loc.layer = layer
          retRecords[self._getPath(layer.options, propName)] = loc
        } 
        else if (self._getPath(layer.feature.properties, propName)) 
        {
          loc = layer.getLatLng()
          loc.layer = layer
          retRecords[self._getPath(layer.feature.properties, propName)] = loc
        } 
        else 
        {
          console.warn(`propertyName '${propName}' not found in marker`);
        }} else if (layer instanceof L.Path || layer instanceof L.Polyline || layer instanceof L.Polygon) 
        {
        if (self._getPath(layer.options, propName)) 
        {
          loc = layer.getBounds().getCenter()
          loc.layer = layer
          retRecords[self._getPath(layer.options, propName)] = loc
        } else if (self._getPath(layer.feature.properties, propName)) 
        {
          loc = layer.getBounds().getCenter()
          loc.layer = layer
          retRecords[self._getPath(layer.feature.properties, propName)] = loc
        } else {
          console.warn(`propertyName '${propName}' not found in shape`);
        }} else if (Object.prototype.hasOwnProperty.call(layer, 'feature')) 
        {
        if (Object.prototype.hasOwnProperty.call(layer.feature.properties, propName)) 
        {
          if (layer.getLatLng && typeof layer.getLatLng === 'function') 
          {
            loc = layer.getLatLng()
            loc.layer = layer
            retRecords[layer.feature.properties[propName]] = loc
          } 
          else if 
          (layer.getBounds && typeof layer.getBounds === 'function') 
            {
              loc = layer.getBounds().getCenter()
              loc.layer = layer
              retRecords[layer.feature.properties[propName]] = loc
            } 
          else 
          {
            console.warn(`Unknown type of Layer`);
          }
        } 
        else 
        {
          console.warn(`propertyName '${propName}' not found in feature`);
        }} 
        else if 
        (layer instanceof L.LayerGroup) 
        {
        layer.eachLayer(function (layer) 
        {
          self._searchInLayer(layer, retRecords, propName)
        })}},
    _recordsFromLayer: function () 
    {
      let self = this
      let retRecords = {}
      let propName = this.options.propertyName
      this._layer.eachLayer(function (layer) 
      {
        self._searchInLayer(layer, retRecords, propName)
      })
      return retRecords
    },
    _autoType: function () 
    {
      let start = this._input.value.length
      let firstRecord = this._tooltip.firstChild ? this._tooltip.firstChild._text : ''
      let end = firstRecord.length
      if (firstRecord.indexOf(this._input.value) === 0) 
      {
        this._input.value = firstRecord
        this._handleAutoresize()
        if (this._input.createTextRange) 
        {
          let selRange = this._input.createTextRange()
          selRange.collapse(true)
          selRange.moveStart('character', start)
          selRange.moveEnd('character', end)
          selRange.select()
        } 
        else if (this._input.setSelectionRange) 
        {
          this._input.setSelectionRange(start, end)
        } else if (this._input.selectionStart) 
        {
          this._input.selectionStart = start
          this._input.selectionEnd = end
        }
      }
    },
    _hideAutoType: function () 
    {
      let sel
      if ((sel = this._input.selection) && sel.empty) 
      {
        sel.empty()
      } 
      else if (this._input.createTextRange) 
      {
        sel = this._input.createTextRange()
        sel.collapse(true)
        let end = this._input.value.length
        sel.moveStart('character', end)
        sel.moveEnd('character', end)
        sel.select()
      } else {
        if (this._input.getSelection) {
          this._input.getSelection().removeAllRanges()
        }
        this._input.selectionStart = this._input.selectionEnd
      }
    },
    _handleKeypress: function (e) {
      let self = this
      switch (e.keyCode) {
        case 27:
          this.collapse()
          break
        case 13: 
          if (this._countertips === 1 || (this.options.firstTipSubmit && this._countertips > 0)) 
          {
            if (this._tooltip.currentSelection === -1) 
            {
              this._handleArrowSelect(1)
            }
          }
          this._handleSubmit()
          break
        case 38:
          this._handleArrowSelect(-1)
          break
        case 40: 
          this._handleArrowSelect(1)
          break
        case 45:
        case 46:
          this._autoTypeTmp = false
          break
        case 37:
        case 39:
        case 16:
        case 17:
        case 35:
        case 36:
          break
        default:
          if (this._input.value.length) 
          {
            this._cancel.style.display = 'block'
          }
          else 
          {
            this._cancel.style.display = 'none'
          }

          if (this._input.value.length >= this.options.minLength) 
          {
            clearTimeout(this.timerKeypress)
            this.timerKeypress = setTimeout(function () {
              self._fillRecordsCache()
            }, this.options.delayType)
          } else { this._hideTooltip() }
      }
      this._handleAutoresize()
    },
    searchText: function (text) {
      let code = text.charCodeAt(text.length)
      this._input.value = text
      this._input.style.display = 'block'
      L.DomUtil.addClass(this._container, 'search-exp')
      this._autoTypeTmp = false
      this._handleKeypress({ keyCode: code })
    },
    _fillRecordsCache: function () {
      let self = this
      let inputText = this._input.value; let records
      if (this._curReq && this._curReq.abort) 
      { 
        this._curReq.abort()
      }
      L.DomUtil.addClass(this._container, 'search-load')
      if (this.options.layer) 
      {
        this._recordsCache = this._recordsFromLayer()
        records = this._filterData(this._input.value, this._recordsCache)
        this.showTooltip(records)
        L.DomUtil.removeClass(this._container, 'search-load')
      } 
      else 
      {
        if (this.options.sourceData) 
        { 
          this._retrieveData = this.options.sourceData 
        }
        else if (this.options.url) 
        {
          this._retrieveData = this.options.jsonpParam ? this._recordsFromJsonp : this._recordsFromAjax
        }
        this._curReq = this._retrieveData.call
        (this, inputText, function (data){
          self._recordsCache = self._formatData(self, data)
          if (self.options.sourceData)
          {
            records = self._filterData(self._input.value, self._recordsCache)
          } 
          else
          {
            records = self._recordsCache
          }
          self.showTooltip(records)
          L.DomUtil.removeClass(self._container, 'search-load')
        })
      }
    },
    _handleAutoresize: function () {
      let maxWidth
      if (this._input.style.maxWidth !== this._map._container.offsetWidth) 
      {
        maxWidth = this._map._container.clientWidth
        maxWidth -= 10 + 20 + 1 + 30 + 22
        this._input.style.maxWidth = maxWidth.toString() + 'px'
      }
      if (this.options.autoResize && (this._container.offsetWidth + 20 < this._map._container.offsetWidth)) 
      {
        this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length
      }
    },
    _handleArrowSelect: function (velocity) 
    {
      let searchTips = this._tooltip.hasChildNodes() ? this._tooltip.childNodes : []
      for (let i = 0; i < searchTips.length; i++) 
      {
        L.DomUtil.removeClass(searchTips[i], 'search-tip-select')
      }
      if ((velocity === 1) && (this._tooltip.currentSelection >= (searchTips.length - 1)))
      { 
        L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select')
      } 
      else if ((velocity === -1) && (this._tooltip.currentSelection <= 0)) 
      {
        this._tooltip.currentSelection = -1
      } 
      else if (this._tooltip.style.display !== 'none') 
      {
        this._tooltip.currentSelection += velocity
        L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select')
        this._input.value = searchTips[this._tooltip.currentSelection]._text
        let tipOffsetTop = searchTips[this._tooltip.currentSelection].offsetTop
        if (tipOffsetTop + searchTips[this._tooltip.currentSelection].clientHeight >= this._tooltip.scrollTop + this._tooltip.clientHeight) 
        {
          this._tooltip.scrollTop = tipOffsetTop - this._tooltip.clientHeight + searchTips[this._tooltip.currentSelection].clientHeight
        } 
        else if (tipOffsetTop <= this._tooltip.scrollTop) 
        {
          this._tooltip.scrollTop = tipOffsetTop
        }
      }
    },
    _handleSubmit: function () 
    {
      this._hideAutoType()
      this.hideAlert()
      this._hideTooltip()
      if 
      (
        this._input.style.display === 'none'
      )
      {
        this.expand()
      } 
      else 
      {
        if (this._input.value === '') 
        {
          this.collapse()
        } 
        else 
        {
          let loc = this._getLocation(this._input.value)
          if (!loc) 
          {
            this.showAlert()
          } 
          else 
          {
            this.showLocation(loc, this._input.value)
            this.fire('search:locationfound', 
            {
              latlng: loc,
              text: this._input.value,
              layer: loc.layer ? loc.layer : null
            })
          }
        }
      }
    },
    _getLocation: function (key) 
    {
      if (Object.prototype.hasOwnProperty.call(this._recordsCache, key)) 
      {
        return this._recordsCache[key]
      } 
      else 
      {
        return false
      }
    },
    _defaultMoveToLocation: function (latlng, title, map) 
    {
      if (this.options.zoom) 
      {
        this._map.setView(latlng, this.options.zoom)
      } 
      else 
      {
        this._map.panTo(latlng)
      }
    },
    showLocation: function (latlng, title) 
    {
      let self = this
      self._map.once('moveend zoomend', function (e) 
      {
        if (self._markerSearch) 
        {
          self._markerSearch.addTo(self._map).setLatLng(latlng)
        }
      })
      self._moveToLocation(latlng, title, self._map)
      if (self.options.autoCollapse) 
      { 
        self.collapse() 
      }
      return self
    }
  })
  L.Control.Search.Marker = L.Marker.extend(
    {
    includes: L.version[0] === '1' ? L.Evented.prototype : L.Mixin.Events,
    options: 
    {
      icon: new L.Icon.Default(),
      animate: true,
      circle: 
      {
        radius: 10,
        weight: 3,
        color: '#e03',
        stroke: true,
        fill: false
      }
    },
    initialize: function (latlng, options) 
    {
      L.setOptions(this, options)
      if (options.icon === true) 
      {
        options.icon = new L.Icon.Default()
      }
      L.Marker.prototype.initialize.call(this, latlng, options)
      if (L.Control.Search.prototype._isObject(this.options.circle)) 
      { 
        this._circleLoc = new L.CircleMarker(latlng, this.options.circle) 
      }
    },
    onAdd: function (map) 
    {
      L.Marker.prototype.onAdd.call(this, map)
      if (this._circleLoc) 
      {
        map.addLayer(this._circleLoc)
        if (this.options.animate) 
        { 
          this.animate() 
        }
      }
    },
    onRemove: function (map) 
    {
      L.Marker.prototype.onRemove.call(this, map)
      if (this._circleLoc) 
      { 
        map.removeLayer(this._circleLoc) 
      }
    },
    setLatLng: function (latlng) 
    {
      L.Marker.prototype.setLatLng.call(this, latlng)
      if (this._circleLoc) 
      { 
        this._circleLoc.setLatLng(latlng) 
      }
      return this
    },
    _initIcon: function () 
    {
      if (this.options.icon) 
      { 
        L.Marker.prototype._initIcon.call(this) 
      }
    },
    _removeIcon: function () 
    {
      if (this.options.icon) 
      { 
        L.Marker.prototype._removeIcon.call(this) 
      }
    },
    animate: function () 
    {
      if (this._circleLoc) 
      {
        let circle = this._circleLoc
        let tInt = 200
        let ss = 5
        let mr = parseInt(circle._radius / ss)
        let oldrad = this.options.circle.radius
        let newrad = circle._radius * 2
        let acc = 0
        circle._timerAnimLoc = setInterval(function () {
          acc += 0.5
          mr += acc
          newrad -= mr
          circle.setRadius(newrad)
          if (newrad < oldrad) 
          {
            clearInterval(circle._timerAnimLoc)
            circle.setRadius(oldrad)
          }
        }, 
        tInt)
      }
      return this
    }
  })
  L.Map.addInitHook(function () 
  {
    if (this.options.searchControl) 
    {
      this.searchControl = L.control.search(this.options.searchControl)
      this.addControl(this.searchControl)
    }
  })
  L.control.search = function (options) 
  {
    return new L.Control.Search(options)
  }
  return L.Control.Search
})