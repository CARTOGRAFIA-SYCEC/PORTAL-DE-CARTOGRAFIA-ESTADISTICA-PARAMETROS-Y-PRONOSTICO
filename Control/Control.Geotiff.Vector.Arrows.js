(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  L.LeafletGeotiff.VectorArrows = L.LeafletGeotiffRenderer.extend({
    options: {
      arrowSize: 20
    },
    initialize: function (options) {
      this.name = "Vector";
      L.setOptions(this, options);
    },
    setArrowSize: function (colorScale) {
      this.options.colorScale = colorScale;

      this.parent._reset();
    },
    render: function (raster, canvas, ctx, args) {
      let arrowSize = this.options.arrowSize;
      let gridPxelSize = (args.rasterPixelBounds.max.x - args.rasterPixelBounds.min.x) / raster.width;
      let stride = Math.max(1, Math.floor(1.2 * arrowSize / gridPxelSize));

      for (let y = 0; y < raster.height; y = y + stride) {
        for (let x = 0; x < raster.width; x = x + stride) {
          let rasterIndex = y * raster.width + x;

          if (raster.data[0][rasterIndex] >= 0) {
            //Ignore missing values
            //calculate lat-lon of of this point
            let currentLng = this.parent._rasterBounds._southWest.lng + (x + 0.5) * args.lngSpan;
            let currentLat = this.parent._rasterBounds._northEast.lat - (y + 0.5) * args.latSpan; //convert lat-lon to pixel cordinates

            let projected = this.parent._map.latLngToContainerPoint(L.latLng(currentLat, currentLng)); //If slow could unpack this calculation


            let xProjected = projected.x;
            let yProjected = projected.y; //draw an arrow

            ctx.save();
            ctx.translate(xProjected, yProjected);
            ctx.rotate((90 + raster.data[0][rasterIndex]) * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(-arrowSize / 2, 0);
            ctx.lineTo(+arrowSize / 2, 0);
            ctx.moveTo(arrowSize * 0.25, -arrowSize * 0.25);
            ctx.lineTo(+arrowSize / 2, 0);
            ctx.lineTo(arrowSize * 0.25, arrowSize * 0.25);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }
  });

  L.LeafletGeotiff.vectorArrows = function (options) {
    return new L.LeafletGeotiff.VectorArrows(options);
  };

})));
