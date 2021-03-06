(function () {
  'use strict'
  // eslint-disable-next-line
  var 
    _min = Math.min,
    _max = Math.max,
    _round = Math.round,
    _floor = Math.floor,
    _log = function (x, y) {
      return Math.log(y) / Math.log(x)
    }

  function _listen (target, events, handler, listen) {
    for (var i = 0; i < events.length; i++) {
      (listen === false)
        ? target.removeEventListener(events[i], handler)
        : target.addEventListener(events[i], handler)
    }
  }

  var defaults = {
    padding: 5,
    minimapHeightRel: 0.14,
    minimapBandSize: 12,
    colors: {
      background: '#fff',
      minimap: '#f4f8ff',
      minimapFrame: '#c8dde8',
      minimapDrag: 'rgba(175, 175, 210, 0.2)',
      label: '#666',
      labelBackground: 'rgba(240, 240, 250, 0.82)'
    }
  }

  var transition = {
    run: false,
    duration: 200,
    ts: 0,
    from: 0,
    to: 0,
    pos: 0,
    onComplete: null
  }

  // ----------------------------------------------

  function VanillaChart (containerId, data) {
  /*
    the data contract is:
      colors: {y0: "#3DC23F", y1: "#F34C44"}
      columns: (3) [Array(113), Array(113), Array(113)]
      names: {y0: "#0", y1: "#1"}
      types: {y0: "line", y1: "line", x: "x"}
  */
    this.data = null
    this.names = {}
    this.tree = [] // segment tree
    this.options = defaults
    this.container = document.getElementById(containerId)
    if (!this.container) throw new Error('chart container not found!')
    this.canvas = this.container.appendChild(document.createElement('canvas'))
    this.ctx = this.canvas.getContext('2d')
    this.ctx.font = window.getComputedStyle(this.container, null).font
    this.font = this.ctx.font
    this.vw = 0
    this.vh = 0
    this.select = -1

    this.controls = {
      h: 0,
      vh: 0,
      width: 0
    }

    this.minimap = {
      left: 0,
      right: 0,
      rlLeft: 0.75,
      rlRight: 1,
      a: 0,
      b: 0,
      vh: 0
    }

    this._transitions = {
      minimap: Object.create(transition),
      graph: Object.create(transition),
      pointer: Object.create(transition)
    }

    this.setData(data)

    var _justifySize = function () {
      var rect = this.canvas.parentNode.getBoundingClientRect()
//      console.log(rect.width)
      this.vw = rect.width
      this.vh = rect.height
      this.canvas.width = rect.width
      this.canvas.height = rect.height
      this.minimap.left = _round(this.vw * this.minimap.rlLeft)
      this.minimap.right = _round(this.vw * this.minimap.rlRight)
      this.minimap.vh = _round(this.vh * this.options.minimapHeightRel)
      this.controls.vh = (this.controls.h + this.options.padding * 2) * (1 + Math.floor(this.controls.width / this.vw))
      this.select = -1
      this.draw()
    }
    _listen(window, ['resize', 'load'], _justifySize.bind(this))
    _listen(this.canvas, ['mousemove', 'toucmove'], this.move.bind(this))
    _listen(this.canvas, ['mousedown', 'touchstart'], this.mousetouch.bind(this))

    this.resize = _justifySize
  }

  (function () {
    // helpers (a spike of private data/methods ):
    var pointerX = 0
    var pointerY = 0
    var _drag = {
      mode: 0,
      start: 0,
      left: 0,
      right: 0,
      runBnd: null,
      doneBnd: null
    }

    function _buildTree (self) { // build segment tree (with max)
      var n = (1 << (_log(2, self.dataLength - 1) + 1))
      var T = new Array(2 * n)
      
      for (var i = 0; i <= self.dataLength; i++) {
        var max = -1
        for (var name in self.names) if (self.names[name].visible) {
          var column = _getColumn(self.data, name)
          max = _max(max, column[i + 1])
        }
        T[i] = max
      }

      for (i = self.dataLength; i < 2*n; i++) T[i] = -1
      for (i = n; i < 2*n; i++) T[i] = T[i - n]
      for (i = n - 1; i > 0; i--)	T[i] = _max(T[2 * i], T[2 * i + 1])
      return T
    }

    function _treeMax (T, l, r) {
      var result = -1
      var n = T.length / 2
      l += n - 1, r += n - 1
      while (l <= r) {
        if (l & 1) result = _max(result, T[l])
        if (!(r & 1)) result = _max(result, T[r])
        l = _floor((l + 1) / 2)
        r = _floor((r - 1) / 2)
      }		
      return result
    }

    function _getMaxY (self, useMinimap) {
      var a = useMinimap ? self.minimap.a : 0
      var b = useMinimap ? self.minimap.b : self.dataLength - 1
      return _treeMax(self.tree, a + 1, b + 1)
    }

    function _getMinimapRect (self) {
      var mm = self.minimap
      var margin = _round(mm.vh * 0.10)
      return {
        y: self.vh - mm.vh + margin - self.controls.vh,
        x: mm.left,
        w: mm.right - mm.left,
        h: mm.vh - margin * 2
      }
    }

    function _calcMinimap (self) {
      if (self.vw === 0) return
      var mm = self.minimap
      var scaleView = self.vw / (self.dataLength - 1)
      mm.rlLeft = mm.left / self.vw
      mm.rlRight = mm.right / self.vw
      mm.a = _round(mm.left / scaleView)
      mm.b = _round(mm.right / scaleView)
    }

    function _iterateControls (self, cb) {
      var pad = self.options.padding
      var controls = self.controls
      var names = self.names
      var x = pad, i = 0
      var y = self.vh - controls.vh + pad
      for (var col in self.data.names) {
        if (x + names[col].width + pad > self.vw) {
          x = pad
          y = y + controls.h + pad
        }
        if (cb) cb({ x: x, y: y, w: names[col].width, h: controls.h - pad }, col)
        x = x + names[col].width + pad
        i++
      }
      return i
    }

    function _inRect (x, y, r) {
      return (r.x <= x && x <= r.x + r.w && r.y <= y && y <= r.y + r.h)
    }

    function _getPointingRegion (self, x, y) {
      var r = _getMinimapRect(self)
      var sb = self.options.minimapBandSize
      if (y < r.y) return 7
      if (_inRect(x, y, r)) {
        if (x < r.x + sb) return 1
        if (x > r.x + r.w - sb) return 2
        return 3
      }
      return 0
    }

    function _getColumn (data, name) {
      for (var i = 0; i < data.columns.length; i++) {
        if (data.columns[i][0] === name) return data.columns[i]
      }
      return null
    }

    function _transitions (trns) {
      var result = false
      for (var key in trns) {
        var trn = trns[key]
        result = result || trn.run
        // linear duration(ms) based transition
        if (trn.run) {
          trn.pos = trn.from + (trn.to - trn.from) / trn.duration * (performance.now() - trn.ts) 
          if ((trn.to > trn.from && trn.pos >= trn.to) || (trn.to < trn.from && trn.pos <= trn.to) || trn.to === trn.from  ) {
            trn.run = false
            trn.pos = trn.to
            if (trn.onComplete) trn.onComplete()
          }
        }
      }
      return result
    } // _transitions

    function _dragRun(e) {
      this.select = -1
      var delta = 0
      if (e) {
        if (e.type === 'touchmove') e = e.targetTouches[0]
        delta = e.clientX - _drag.start
      }
      var mm = this.minimap
      var sbSize = this.options.minimapBandSize

      if (_drag.mode & 4) delta = -delta // drag by body - reversal
      if (_drag.mode & 1) {
        mm.left = _drag.left + delta
        mm.left = _max(mm.left, 1)
        mm.left = _min(mm.left, mm.right - sbSize * 2 - 1)
      }
      if (_drag.mode & 2) {
        mm.right = _drag.right + delta 
        mm.right = _min(mm.right, this.vw - 1)
        mm.right = _max(mm.right, mm.left + sbSize * 2 + 1)
      }
      _calcMinimap(this)
      this.initTransition('graph', 'current', _getMaxY(this, true) )
    }

    function _dragDone (e) {
      if (e.type !== 'touchmove') e.target.style.cursor = 'default'
      _listen(document, ['mousemove', 'touchmove'], _drag.runBnd, false)
      _listen(document, ['mouseup', 'touchend'], _drag.doneBnd, false)
      _drag.runBnd = null
      _drag.doneBnd = null
      this.initTransition('minimap', 'current', 0, function () { _drag.mode = 0 })
    }

    function _fontShift (font, delta, bold) {
      return font.replace(/(\d*\.?\d+)px/, function(m, p1) {return (bold ? 'bold ' : '') + Number(Number(p1)+delta) + 'px' } )
    }

    function _getDateText (unixDate, part) {
      return String.prototype.substr.apply((new Date(unixDate)), [[0, 3], [4, 11],	[4, 6],	[11, 4]][part])
    }

    function _drawRoundedRect (ctx, x, y, w, h, r, corners) {
      var methods = ['arcTo', 'lineTo']
      corners = corners || [0, 0, 0 ,0]
      ctx.moveTo(x+r, y)
      ctx[ methods[corners[0]] ](x+w, y,   x+w, y+h, r) 
      ctx[ methods[corners[1]] ](x+w, y+h, x,   y+h, r)
      ctx[ methods[corners[2]] ](x,   y+h, x,   y,   r)
      ctx[ methods[corners[3]] ](x,   y,   x+w, y,   r)
      return ctx
    }

    function _drawLabelBox (ctx, x, data, visible, i, _labelHeight, bkColor, borderColor, labelColor, vw) {
    // displays info for 1, 2 and more named columns
      var p = 10
      var date = _getColumn(data, 'x')[i]
      var dateLabel = _getDateText(date, 0) + ', ' + _getDateText(date, 2)
      var dateWidth = ctx.measureText(dateLabel).width
      var obj = {}
      var width = 0
      for (var key in data.names) {
        if (visible[key].visible) {
          obj[key] = {}
          obj[key].name = data.names[key]
          obj[key].value = _getColumn(data, key)[i]
          obj[key].width = _max(ctx.measureText(obj[key].name).width, ctx.measureText(obj[key].value).width)
          obj[key].color = data.colors[key]
          width += obj[key].width + p
        }
      }
      width = _max(dateWidth, width) + p
      x = x - width / 2
      if (x < 0) x = 0
      if (x + width > vw) x = vw - width

      ctx.fillStyle = bkColor
      ctx.strokeStyle = borderColor
      ctx.beginPath()
      _drawRoundedRect(ctx, x, 1, width, _labelHeight * 3 + p, 6).fill()
      ctx.stroke()

      ctx.fillStyle = labelColor
      ctx.beginPath()
      ctx.fillText(dateLabel, x + width / 2 - dateWidth / 2, _labelHeight + p / 2)

      var w = 0, _x = x
      var font = ctx.font
      var bold = _fontShift(ctx.font, 2, true)
      for (key in obj) {
        ctx.fillStyle = obj[key].color
        w = obj[key].width
        ctx.font = bold
        ctx.fillText(obj[key].value, _x + p, _labelHeight * 2 + p	)
        ctx.font = font
        ctx.fillText(obj[key].name,  _x + p, _labelHeight * 3 + p / 1.2)
        _x = _x + w + 10
      }
      ctx.fill()
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    function _drawGraph (self, y, height, useMinimap, lineWidth, grid, maxY) {
      var ctx = self.ctx
      var symbolSize = ctx.measureText('M').width
      if (grid) height = height - symbolSize - 8
      var data = self.data
      var names = self.names

      var left = 0
      var right = self.vw
      var a = 0
      var b = self.dataLength - 1

      if (useMinimap) {
        a = _max(0, self.minimap.a - 1)
        b = _min(self.minimap.b + 1, self.dataLength - 1)
        left = self.minimap.left
        right = self.minimap.right
      }
      var width = self.vw
      var scaleView = width / (self.dataLength - 1)
      var rlLeft = left / width
      var rlRight = right / width
      var scaleX = (1 / (rlRight - rlLeft))
      var scaleY = height / maxY
      var Y0 = y + height
      var visCount = 0

      ctx.lineWidth = lineWidth
      ctx.lineJoin = 'round'
      ctx.font = self.font
      for (var name in names) if (names[name].visible) {
        visCount++
        ctx.beginPath()
        ctx.strokeStyle = data.colors[name]
        var dataY = _getColumn(data, name)
        // [a..b] - no need offscreen drawing
        for (var i = a; i <= b; i++) ctx.lineTo(
          (i * scaleView - left) * scaleX,
          Y0 - dataY[i+1] * scaleY
        )
        ctx.stroke()
      }

      if (grid && visCount === 0) {
        var msg = 'No data to display'
        var msgWidth = ctx.measureText(msg).width
        ctx.fillStyle = self.options.colors.label
        ctx.font = _fontShift(ctx.font, 4, false)
        ctx.fillText(msg, width/2-msgWidth/2 , height/2)
        return
      }

      if (!grid) return
      // -------------------------Y - lines / labels
      ctx.lineWidth = 0.2
      ctx.beginPath()
      ctx.strokeStyle = 'grey'
      ctx.fillStyle = self.options.colors.label
      var dense = _round(_max(0, _log(2, (height / 6)/ scaleY)))
      var i = 0
      while (i < maxY) {
        var y = i * scaleY
        ctx.moveTo(0, Y0 - y)
        ctx.lineTo(width, Y0 - y)
        ctx.fillText(_round(i).toString(), 5, Y0 - y )
        i += Math.pow(2, dense)
      }
      ctx.stroke()

      //-------------------------X - labels
      // note: this works fine only if intervals are regular
      var labelSize = _round(symbolSize * 7)
      var dense = _round(_max(0, _log(2, labelSize / (scaleView * scaleX))))	// (scaleView * scaleX) - in fact is a distance between 2 near points
      //run out of time to polish label animation
      //		var alpha = ((dense - Math.floor(dense)))
      var i = 1, label, w, dataX = _getColumn(data, 'x');
      while (i < b) {
        var x = (i * scaleView - left) * scaleX
        if (x > symbolSize) {
          label = _getDateText(dataX[i+1], 2)
          w = ctx.measureText(label).width
          ctx.fillText(label, _round(x - w / 2),	Y0 + symbolSize + 6)
        }
        i += Math.pow(2, dense)
      }

      //-------------------------Selection
      if (self.select !== -1) {
        var i = _round((left * scaleX + self.select) / (scaleX * scaleView))
        ctx.beginPath()
        ctx.strokeStyle = 'grey'
        ctx.lineWidth = 0.5
        var x = i * scaleView * scaleX - left * scaleX
        ctx.moveTo(x, symbolSize * 5)
        ctx.lineTo(x, height)
        ctx.stroke()

        ctx.lineWidth = lineWidth
        for (var name in names) if (names[name].visible) {
          var dataY = _getColumn(data, name)
          ctx.beginPath()
          ctx.strokeStyle = data.colors[name]
          ctx.fillStyle = self.options.colors.background
          var y = Y0 - dataY[i+1] * scaleY
          ctx.arc(x, y, 4, 0, 2*Math.PI, false)
          ctx.fill()
          ctx.stroke()
        }

        _drawLabelBox(ctx, x, data, self.names, i+1, symbolSize * 1.4,  self.options.colors.labelBackground, self.options.colors.minimap ,self.options.colors.label, width)
      }

    }	// _drawGraph

    function _drawMinimap(self) {
      var ctx = self.ctx
      var sb = self.options.minimapBandSize
      var colors = self.options.colors
      var r = _getMinimapRect(self)

      ctx.beginPath()
      ctx.fillStyle = colors.minimap
      ctx.fillRect(0, r.y, r.x + sb, r.h)
      ctx.fillRect(r.x + r.w - sb, r.y, self.vw - r.x - r.w + sb , r.h)

      ctx.fillStyle = colors.minimapFrame
      _drawRoundedRect(ctx, r.x,            r.y, sb, r.h, 6, [1,1,0,0])
      _drawRoundedRect(ctx, r.x + r.w - sb, r.y, sb, r.h, 6, [0,0,1,1])
      ctx.fill()
      ctx.fillRect(r.x + sb, r.y, r.w-sb*2, 2)
      ctx.fillRect(r.x + sb, r.y+r.h-2, r.w-sb*2, 2)

      _drawGraph(self,r.y, r.h, false, 1, false, _getMaxY(self, false))

      //animation
      if (_drag.mode !== 0) {
        ctx.beginPath()
        ctx.fillStyle = colors.minimapDrag
         ctx.arc(r.x + [0, sb/2, r.w-sb/2, r.w/2][_drag.mode], r.y + r.h/2, self._transitions.minimap.pos,   0, 2*Math.PI, false)
        ctx.fill()
      }
    }

    function _drawControls(self) {
      var ctx = self.ctx
      ctx.font = _fontShift(self.font, 4)
      var data = self.data
      _iterateControls(self, function(r, col){
        ctx.beginPath()
        ctx.fillStyle = self.options.colors.minimap
        ctx.strokeStyle = 'grey'
        ctx.lineWidth = 0.3
        _drawRoundedRect(ctx, r.x, r.y, r.w, r.h, r.h/2).fill()
        ctx.stroke()
        ctx.textBaseline = 'middle'
        if (self.names[col].visible) {
          ctx.beginPath()
          ctx.fillStyle = data.colors[col]
          ctx.arc(r.x + r.h/2, r.y+r.h/2, r.h/3, 0, 2*Math.PI, false)
          ctx.fill()

          ctx.font = _fontShift(self.font, 4, true)
          ctx.beginPath()
          ctx.fillStyle = '#fff'
          ctx.fillText('\u2713' , r.x + r.h*0.33, r.y + r.h*0.52)
          ctx.font = _fontShift(self.font, 4)
        } else {
          ctx.beginPath()
          ctx.lineWidth = 1
          ctx.strokeStyle = data.colors[col]
          ctx.arc(r.x + r.h/2, r.y+r.h/2, r.h/3, 0, 2*Math.PI, false)
          ctx.stroke()
        }
        ctx.fillStyle = data.colors[col]
        ctx.beginPath()	
        ctx.fillText(data.names[col], r.x + r.h , r.y + r.h/2)
        ctx.textBaseline = 'bottom'
      })

    }

    function _draw() {
      var ctx = this.ctx
      ctx.fillStyle = this.options.colors.background
      ctx.fillRect(0, 0, this.vw, this.vh)
      ctx.font = this.font
      if (this.minimap.b === 0 ) {
        _calcMinimap(this)
        this.initTransition('graph', 'current', _getMaxY(this, true) )
      }

      _drawControls(this)
      _drawMinimap(this)
    
      var h = _round(this.vh - this.minimap.vh - this.controls.vh)
      _drawGraph(this, 0, h, true, 2, true, this._transitions.graph.pos)

      var r = this._transitions.pointer.pos
      if (r > 0) {
        ctx.beginPath()
        ctx.fillStyle = this.options.colors.minimapDrag
        ctx.arc(pointerX, pointerY, r,   0, 2*Math.PI, false)
        if (r > 12)	ctx.arc(pointerX, pointerY, r-12,   0, 2*Math.PI, true)
        ctx.fill()
      }

      if (_transitions(this._transitions)) this.draw() // -- re-call while transitions running
    }
    // helpers end

    // --------------------------------------------------------------------------------------
    // VanillaChart.prototype methods:
    this.draw = function () {
      requestAnimationFrame(_draw.bind(this))
    }

    this.move = function (e) {
      var r = e.target.getBoundingClientRect()
      if (e.type === 'touchstart') e = e.targetTouches[0]
      var x = e.clientX - r.left, y = e.clientY - r.top
      if (y < (this.vh - this.minimap.vh - this.controls.vh)) {
        this.select = x
        this.draw()
      }
    }

    this.mousetouch	= function (e) {
      if (_drag.runBnd || _drag.doneBnd) return
      var r = e.target.getBoundingClientRect()
      var event = e
      if (e.type === 'touchstart') e = e.targetTouches[0]
      pointerX = e.clientX - r.left
      pointerY = e.clientY - r.top

      _drag.mode = _getPointingRegion(this, pointerX, pointerY)
      if (_drag.mode > 0) {
        event.target.style.cursor = 'w-resize'
        _drag.start = e.clientX
        _drag.left = this.minimap.left
        _drag.right = this.minimap.right
        _drag.runBnd = _dragRun.bind(this)
        _drag.doneBnd = _dragDone.bind(this)
        _listen(document, ['mousemove', 'touchmove'], _drag.runBnd)
        _listen(document, ['mouseup', 'touchend'], _drag.doneBnd)
        this.initTransition('minimap', 'current', _round(this.minimap.vh * 0.65) )
      } else {
        var self = this
        _iterateControls(this, function(r, col) {
          if (_inRect(pointerX, pointerY, r)) {
            event.preventDefault()
            self.setVisibility(col)
            self.initTransition('pointer', 'current', 50, function () { self._transitions.pointer.pos = 0}.bind(self) )
          }
        })

      }
    }

    this.setData = function (data) {
      this.data = data
      try {
        this.dataLength = data.columns[0].length - 1
      }	catch (e)	{
        throw new TypeError('incorrect <inputData> format')
      }
      var ctx = this.ctx
      ctx.font = _fontShift(this.font, 4, true)
      this.controls.h = _round(ctx.measureText('M').width * 2.5)
      this.controls.width = 0
      this.names = {}
      for (var k in data.names) {
        var w = ctx.measureText(data.names[k]).width + this.controls.h + this.options.padding * 2
        this.controls.width += w
        this.names[k] = {
          visible: true, // visible by default
          width: w - this.options.padding
        }
      }
      this.tree = _buildTree(this)
      this.initTransition('graph', 'current', _getMaxY(this, true) )
    }

    this.setVisibility = function (col, vis) {
      this.names[col].visible = (typeof vis === 'undefined')? !this.names[col].visible : vis
      this.tree = _buildTree(this)
      this.initTransition('graph', 'current', _getMaxY(this, true) )
    }

    this.initTransition = function (key, from, to, onComplete) {
      var trns = this._transitions
      var trn = trns[key]
      trn.from = (from === 'current')?trn.pos: from
      trn.pos = trn.from
      trn.to = to
      trn.ts = performance.now()
      trn.onComplete = onComplete
      var running = false
      for (var k in trns) running = running || trns[k].run
      if (!running) this.draw()
      trn.run = true
    }
  }).call(VanillaChart.prototype)

  if (typeof window !== 'undefined') window.VanillaChart = VanillaChart
})()
