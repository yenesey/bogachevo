<template lang="pug">
  canvas.hero-animation(width=640, height=480)
</template>

<script>

var sin = Math.sin
var cos = Math.cos
var PI  = Math.PI

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
}

// определяем точку в пространстве (вершину)
function Vertex(_x, _y, _z) {
	this.x = Math.floor(_x)
	this.y = Math.floor(_y)
	this.z = Math.floor(_z)
}

// процедурно генерируем меш (polygon mesh)
function generateMesh () {
	// ---------------------------------------------
	var GALAXY_ARMS_COUNT = 3
	var GALAXY_STARS_PER_ARM = 850

	var VERT_COUNT = GALAXY_STARS_PER_ARM * GALAXY_ARMS_COUNT // всего вершин
	var verts = new Array(VERT_COUNT)  // массив вершин
	var sizes = new Array(VERT_COUNT)

	var R = 36 // радиус шага витка спирали (радиус галактики больше т.к. учавствует экспонента + крутим до 3.5Pi)
	var r = 25 // радиус балджа (центральное скопление)

	for (var i = 0; i < GALAXY_ARMS_COUNT; i++) {
		var a = i * 2*PI / GALAXY_ARMS_COUNT

		r1 = r
		for (var j = 0; j < GALAXY_STARS_PER_ARM; j++) {
			var b = j * 3.2*PI / GALAXY_STARS_PER_ARM

			var r1 = Math.floor(r - (j / GALAXY_STARS_PER_ARM / 2) * r)
			var rr1 = randn_bm()*r1
			var rr2 = randn_bm()*r1
			var rr3 = randn_bm()*r1

			/*
				логарифмическая спираль

				x(c) = a*Math.exp(b*c)*cos(c)
				y(c) = a*Math.exp(b*c)*sin(c)
			*/	
			var x = R * Math.exp(0.27*b)*cos(b)
			var y = R * Math.exp(0.27*b)*sin(b)

			verts[i * GALAXY_STARS_PER_ARM + j] = new Vertex(
				(x * cos(a) - y * sin(a)) + rr1,
				(x * sin(a) + y * cos(a)) + rr2,
				rr3
			)

			var bm = Math.abs(randn_bm())
			sizes[i * GALAXY_STARS_PER_ARM + j] = bm > 2.8 ? 3 : (bm > 1.6 ? 2 : 1)

		}
	}

	return {
		verts: verts,
		sizes: sizes
	}	
}

function rotate(verts, a, b, c) {
	var vertsRotated = new Array(verts.length)

	// конвертируем градусные углы в радианные
	a = a * PI / 180
	b = b * PI / 180
	c = c * PI / 180

  for (var i = 0; i < verts.length; i++) {
		var x = verts[i].x
		var y = verts[i].y
		var z = verts[i].z
    var x1, y1, z1
		// вращение в плоскости YZ вокруг оси x
		y1 = y * cos(a) - z * sin(a)
		z1 = y * sin(a) + z * cos(a)
		y = y1
		z = z1
		// вращение в плоскости XZ вокруг оси y
		// помним, что на мониторе ось y "перевернута" и отсчитывается сверху -> вниз
		x1 = x * cos(b) + z * sin(b)
		z1 = -x * sin(b) + z * cos(b) 
		x = x1
		z = z1
		// вращение в плоскости XY вокруг оси z
		x1 = x * cos(c) - y * sin(c)
		y1 = x * sin(c) + y * cos(c)
		x = x1
		y = y1

		vertsRotated[i] = new Vertex(x, y, z)
	}
	return vertsRotated
}


//---------------------------------------------------
export default {
  data () {
    return {
			angle: {
      	a: -75,
      	b: 0,
				c: 0,
				da: 0,
				db: -0.07,
				dc: 0
			},
			mesh: null,
			bgColor: '#000',

			showFps: false,
			timestamp: 0,
			timepast: 0,
			fps: 0,
			count: 0,
    }
  },
  computed: {
    canvas () {
      return this.$el
    },
    ctx () {
      return this.canvas.getContext('2d', { alpha: false })
    }
  },
  methods: {
		onKey(e) {
			if (e.keyCode === 70) this.showFps = !this.showFps
			if (e.keyCode === 37) this.angle.db += 0.01
			if (e.keyCode === 39) this.angle.db -= 0.01
			//console.log(e.keyCode)
		},
		resizeCanvas() {
			const { canvas } = this
			let { height, width } = this.$parent.$el.getBoundingClientRect()
			canvas.width  = width
			canvas.height = height - 89
		},
    
    drawPt(x, y, color, sz) {
      var ctx = this.ctx
			ctx.fillStyle = color
			if (sz <=2) {
				ctx.fillRect(x, y, sz, sz)
				return
			} 
			ctx.beginPath()
			ctx.arc(x, y, sz-1, 0, 2*PI, false)
			ctx.fill()
    	//ctx.closePath()
    },

    render (mesh, a, b, c) {
			const { canvas, ctx, bgColor } = this
			
			ctx.fillStyle = bgColor
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			// vs ctx.clearRect(0, 0, canvas.width, canvas.height)

			var now = performance.now()
			this.timepast += now - this.timestamp
			this.timestamp = now
			this.count++
			if (this.timepast >= 1000) {
				this.fps = this.count
				this.count = 0
				this.timepast = 0
			}
			if (this.showFps) {
				ctx.fillStyle = '#fff'
				ctx.font = '12px Play'
				ctx.fillText(this.fps + ' fps', 20, 20)
			}

    	var cx = canvas.width / 2 + 100
    	var cy = canvas.height / 2
     	var verts = rotate(mesh.verts, a, b, c)

			var grd = ctx.createRadialGradient(cx,cy,0, cx,cy,150);
			grd.addColorStop(0, '#122231');
			grd.addColorStop(1, bgColor);
			ctx.fillStyle = grd;
			ctx.fillRect(cx-150, cy-150, 300, 300);

    	for (var i = 0; i < verts.length; i++) {
				let gradient = Math.min(Math.max(verts[i].z, -60), 125)
	      let color = Number(124 + gradient)
        this.drawPt( cx + verts[i].x, cy - verts[i].y,	'rgb('+ color +',' + color + ',' + color + ')', mesh.sizes[i])
			}
    },
    step () {
			const { angle } = this

			//angle.a += 1- cos(angle.b * PI / 180)
			angle.a += angle.da
			angle.b += angle.db
			angle.c += angle.dc
      
		  if (angle.a > 360) angle.a -= 360
		  if (angle.b > 360) angle.b -= 360
		  if (angle.c > 360) angle.c -= 360
			this.render(this.mesh,  angle.a, angle.b, angle.c)

			requestAnimationFrame(this.step)
    }
  },
  mounted () {
		this.mesh = generateMesh()
		this.$nextTick(() => this.resizeCanvas())
		this.bgColor = window.getComputedStyle( this.$parent.$el, null).backgroundColor
		window.addEventListener('keydown', this.onKey, false)

		this.step()
		var self = this
		window.addEventListener('resize', function(event) {
			self.resizeCanvas()
		})
  }
}
</script>

<style>
.hero-animation {
  position: absolute;
  top: 89px;
	z-index: 1;
}
</style>