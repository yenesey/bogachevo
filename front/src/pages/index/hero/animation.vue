<template lang="pug">
  canvas.hero-animation(width=640, height=480)
</template>

<script>

const GALAXY_ARMS_COUNT = 5
const GALAXY_STARS_PER_ARM = 10000
const VERT_COUNT = GALAXY_STARS_PER_ARM * GALAXY_ARMS_COUNT// всего вершин


function generateGalaxy () {
	const {sin, cos, PI, floor, exp, log, random, sqrt} = Math

	function randn_bm() { // Standard Normal variate using Box-Muller transform.
    var u = 0, v = 0
    while(u === 0) u = random() //Converting [0,1) to (0,1)
    while(v === 0) v = random()
    return sqrt( -2.0 * log( u ) ) * cos( 2.0 * PI * v )
	}

	var verts = new Float32Array(VERT_COUNT * 3)  // массив вершин
	var sizes = new Float32Array(VERT_COUNT)

	var R = 35 // радиус шага витка спирали (радиус галактики больше т.к. учавствует экспонента + крутим до 3.5Pi)
	var r = 95 // радиус балджа (центральное скопление)

	for (var i = 0; i < GALAXY_ARMS_COUNT; i++) {
		var a = i * 2*PI / GALAXY_ARMS_COUNT

		r1 = r
		for (var j = 0; j < GALAXY_STARS_PER_ARM; j++) {
			var b = j * 9.2*PI / GALAXY_STARS_PER_ARM

			var r1 = floor(r - (j / GALAXY_STARS_PER_ARM / 2) * r)
			var rr1 = randn_bm() * r1
			var rr2 = randn_bm() * r1
			var rr3 = randn_bm() * r1

			/*
				логарифмическая спираль

				x(c) = a*Math.exp(b*c)*cos(c)
				y(c) = a*Math.exp(b*c)*sin(c)
			*/	
			var x = R * exp(0.27*b) * cos(b)
			var y = R * exp(0.27*b) * sin(b)

			verts[i * GALAXY_STARS_PER_ARM * 3 + j * 3 + 0] = ((x * cos(a) - y * sin(a)) + rr1) / 100
			verts[i * GALAXY_STARS_PER_ARM * 3 + j * 3 + 1] = ((x * sin(a) + y * cos(a)) + rr2) / 100
			verts[i * GALAXY_STARS_PER_ARM * 3 + j * 3 + 2] = rr3 / 100

			sizes[i * GALAXY_STARS_PER_ARM + j] = randn_bm() * 0.8
		}
	}

	return {verts, sizes}
}

//---------------------------------------------------
export default {
  data () {
    return {
			u_alpha: null,
			alpha: 0,
			u_distance: null,
			distance: 0,
			vertexShader: null,
			fragmentShader: null,
			vertexBuffer: null,
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
    gl () {
      return this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')
		},
		program () {
			return this.gl.createProgram()
		}
  },
  methods: {
		onKey(e) {
			if (e.keyCode === 70) this.showFps = !this.showFps
			//if (e.keyCode === 37) this.angle.db += 0.01
			//if (e.keyCode === 39) this.angle.db -= 0.01
			//console.log(e.keyCode)
		},
		resizeCanvas() {
			const { canvas, gl } = this
			let { height, width } = this.$parent.$el.getBoundingClientRect()
			canvas.width  = width
			canvas.height = height - 89
			gl.viewport(0, 0, canvas.width, canvas.height)
		},
    /*
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
				gl.fillStyle = '#fff'
				gl.font = '12px Play'
				gl.fillText(this.fps + ' fps', 20, 20)
			}
		*/

		step () {
			const { gl, vertexBuffer } = this
			if (this.vertexBuffer === null) return

			this.alpha =  this.alpha + 0.0003
			if (this.alpha > 2*Math.PI) this.alpha = this.alpha - 2*Math.PI
			if (this.distance < 1) this.distance = this.distance + 0.0003

			gl.uniform1f(this.u_alpha, this.alpha)
			gl.uniform1f(this.u_distance, this.distance)

			gl.drawArrays(gl.POINTS, 0, VERT_COUNT)
		  requestAnimationFrame(this.step)
		},

		createShader (type, source) {
			const { gl } = this
			const shader = gl.createShader(type)
			gl.shaderSource(shader, source)
			gl.compileShader(shader)
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader)
			return shader
		}

  },
  mounted () {

		const { gl, program, createShader } = this

		this.vertexShader = createShader(gl.VERTEX_SHADER,
		`
				precision highp float;

				mat4 rotationX( in float angle ) {
					return mat4(	1.0,		0,			0,			0,
									0, 	cos(angle),	-sin(angle),		0,
									0, 	sin(angle),	 cos(angle),		0,
									0, 			0,			  0, 		1);
				}

				mat4 rotationY( in float angle ) {
					return mat4(	cos(angle),		0,		sin(angle),	0,
											0,		1.0,			 0,	0,
									-sin(angle),	0,		cos(angle),	0,
											0, 		0,				0,	1);
				}

				mat4 rotationZ( in float angle ) {
					return mat4(	
									cos(angle),		-sin(angle),	0,	0,
									sin(angle),		cos(angle),		0,	0,
											0,				0,		1,	0,
											0,				0,		0,	1);
				}

				mat4 view_frustum(
						float angle_of_view,
						float aspect_ratio,
						float z_near,
						float z_far
				) {
						return mat4(
								vec4(1.0/tan(angle_of_view),           0.0, 0.0, 0.0),
								vec4(0.0, aspect_ratio/tan(angle_of_view),  0.0, 0.0),
								vec4(0.0, 0.0,    (z_far+z_near)/(z_far-z_near), 1.0),
								vec4(0.0, 0.0, -2.0*z_far*z_near/(z_far-z_near), 0.0)
						);
				}

				mat4 scale(float x, float y, float z)	{
						return mat4(
								vec4(x,   0.0, 0.0, 0.0),
								vec4(0.0, y,   0.0, 0.0),
								vec4(0.0, 0.0, z,   0.0),
								vec4(0.0, 0.0, 0.0, 1.0)
						);
				}
			
				mat4 translate(float x, float y, float z) {
						return mat4(
								vec4(1.0, 0.0, 0.0, 0.0),
								vec4(0.0, 1.0, 0.0, 0.0),
								vec4(0.0, 0.0, 1.0, 0.0),
								vec4(x,   y,   z,   1.0)
						);
				}

				varying vec4 v_color;

				attribute vec3 position;
				attribute float size;

				uniform float u_alpha;
				uniform float u_distance;

				void main() {
						mat4 projection = mat4(
								vec4(	1.0, 0.0, 0.0, 0.0),
								vec4( 0.0, 1.0, 0.0, 0.0),
								vec4( 0.0, 0.0, 1.0, -0.8),
								vec4( 0.0, 0.0, 0.0, 9.0 * u_distance)
						);
						//translate(0.3, 0.0, 0.0) *
						//view_frustum(radians(98.0), 11.0, 50.0, 7.0) 
						gl_Position =  projection * translate(0.3, 0.0, -0.5) * rotationY(u_alpha) * rotationX(radians(70.0)) * vec4(position, 1.0);

						// gl_PointSize = gl_Position.z * 0.36 / (u_distance + 0.0000000001);
						gl_PointSize = size;
						v_color = mix(
							vec4(0.7, 0.7, 0.8, 1.0),
							vec4(gl_Position.z, gl_Position.z, gl_Position.z, 1.0),  0.084
						);
				}
				`
		)

		this.fragmentShader = createShader(gl.FRAGMENT_SHADER, `
				precision highp float;
				varying vec4 v_color;

				void main() {
						gl_FragColor = v_color;
				}
			`
		)

  	gl.attachShader(program, this.vertexShader)
  	gl.attachShader(program, this.fragmentShader)
  	gl.linkProgram(program)
  	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw gl.getProgramInfoLog(program)
		gl.useProgram(program)
		gl.enable(gl.DEPTH_TEST)
		
		const galaxy = generateGalaxy()

		this.vertexBuffer = gl.createBuffer()
		const a_position = gl.getAttribLocation(program, 'position')
		gl.enableVertexAttribArray(a_position)
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, galaxy.verts, gl.STATIC_DRAW)
		gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0)

		this.sizeBuffer = gl.createBuffer()
		const a_size = gl.getAttribLocation(program, 'size')
		gl.enableVertexAttribArray(a_size)
		gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, galaxy.sizes, gl.STATIC_DRAW)
		gl.vertexAttribPointer(a_size, 1, gl.FLOAT, false, 0, 0)

		this.u_alpha = gl.getUniformLocation(program, "u_alpha")
		this.u_distance = gl.getUniformLocation(program, "u_distance")
		
		this.step()


		this.$nextTick(() => this.resizeCanvas())
		//this.bgColor = window.getComputedStyle( this.$parent.$el, null).backgroundColor
		window.addEventListener('keydown', this.onKey, false)

		var self = this
		window.addEventListener('resize', function(event) {
			self.resizeCanvas()
		})
	},
	beforeDestroy () {
		const { gl, program, fragmentShader, vertexShader, vertexBuffer, sizeBuffer } = this
		gl.deleteBuffer(vertexBuffer)
		gl.deleteBuffer(sizeBuffer)
		gl.deleteShader(fragmentShader)
		gl.deleteShader(vertexShader)
		gl.deleteProgram(program)
		this.vertexBuffer = null
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