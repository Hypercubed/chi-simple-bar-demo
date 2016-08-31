(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'd3', './bars.css!'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('d3'), require('./bars.css!'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.d3, global.bars);
    global.barsChart = mod.exports;
  }
})(this, function (exports, _d) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Bars = Bars;

  var _d2 = _interopRequireDefault(_d);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function Bars(opts) {
    opts = opts || {};

    var margin = opts.margin || { top: 20, right: 20, bottom: 30, left: 40 };
    var width = 960 - margin.left - margin.right; // 900
    var height = 500 - margin.top - margin.bottom; // 440
    var title = opts.title || 'Bar Chart';

    var formatPercent = _d2.default.format('.0%');

    var xValue = function xValue(d) {
      return d.letter;
    }; // data -> value
    var xScale = _d2.default.scale.ordinal(); // value -> display
    var xMap = function xMap(d) {
      return xScale(xValue(d));
    }; // data -> display
    var xAxis = _d2.default.svg.axis().scale(xScale).orient('bottom');

    var yValue = function yValue(d) {
      return d.frequency;
    }; // data -> value
    var yScale = _d2.default.scale.linear(); // value -> display
    var yMap = function yMap(d) {
      return yScale(yValue(d));
    }; // data -> display
    var yAxis = _d2.default.svg.axis().scale(yScale).orient('left').tickFormat(formatPercent);
    var yAxisLabel = 'Frequency';

    function bars(selection) {
      selection.each(function (d) {
        var el = _d2.default.select(this);

        xScale.rangeRoundBands([0, width], 0.1);
        yScale.range([height, 0]);

        el.selectAll('svg').remove();

        var svg = el.append('svg').attr('title', title).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        xScale.domain(d.map(xValue));
        yScale.domain([0, _d2.default.max(d, yValue)]);

        svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis);

        svg.append('g').attr('class', 'y axis').call(yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text(yAxisLabel);

        svg.selectAll('.bar').data(d).enter().append('rect').attr('class', 'bar').attr('x', xMap).attr('width', xScale.rangeBand).attr('y', yMap).attr('height', function (d) {
          return height - yMap(d);
        });
      });
    }

    bars.width = function (_) {
      if (arguments.length < 1) {
        return width;
      }
      width = _;
      return bars;
    };

    bars.height = function (_) {
      if (arguments.length < 1) {
        return height;
      }
      if (_ === 'auto') {
        _ = 440 / 900 * width;
      }
      height = _;
      return bars;
    };

    return bars;
  }

  exports.default = Bars;
});

//# sourceMappingURL=bar-chart.umd.js.map