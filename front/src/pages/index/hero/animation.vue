<template lang="pug">
  canvas.hero-animation(width=640, height=480)
</template>

<script>

const GALAXY_ARMS_COUNT = 3
const GALAXY_STARS_PER_ARM = 17500
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
//	var sizes = new Array(VERT_COUNT)

	var R = 37 // радиус шага витка спирали (радиус галактики больше т.к. учавствует экспонента + крутим до 3.5Pi)
	var r = 30 // радиус балджа (центральное скопление)

	for (var i = 0; i < GALAXY_ARMS_COUNT; i++) {
		var a = i * 2*PI / GALAXY_ARMS_COUNT

		r1 = r
		for (var j = 0; j < GALAXY_STARS_PER_ARM; j++) {
			var b = j * 3.4*PI / GALAXY_STARS_PER_ARM

			var r1 = floor(r - (j / GALAXY_STARS_PER_ARM / 2) * r)
			var rr1 = randn_bm()*r1
			var rr2 = randn_bm()*r1
			var rr3 = randn_bm()*r1

			/*
				логарифмическая спираль

				x(c) = a*Math.exp(b*c)*cos(c)
				y(c) = a*Math.exp(b*c)*sin(c)
			*/	
			var x = R * exp(0.27*b)*cos(b)
			var y = R * exp(0.27*b)*sin(b)

			verts[i * GALAXY_STARS_PER_ARM * 3 + j * 3 + 0] = (x * cos(a) - y * sin(a)) + rr1
			verts[i * GALAXY_STARS_PER_ARM * 3 + j * 3 + 1] = (x * sin(a) + y * cos(a)) + rr2 
			verts[i * GALAXY_STARS_PER_ARM * 3 + j * 3 + 2] = rr3

/*
			verts[i * GALAXY_STARS_PER_ARM + j + 0] = Math.random() * 2 - 1
			verts[i * GALAXY_STARS_PER_ARM + j + 1] = Math.random() * 2 - 1
			verts[i * GALAXY_STARS_PER_ARM + j + 2] = Math.random() * 2 - 1
*/
			//var bm = Math.abs(randn_bm())
			//sizes[i * GALAXY_STARS_PER_ARM + j] = bm > 2.8 ? 3 : (bm > 1.6 ? 2 : 1)
		}
	}

	return verts
}

//---------------------------------------------------
export default {
  data () {
    return {
			u_a: null,
			a: 0,
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
			const { gl } = this
			this.a =  this.a + 0.002
			if (this.a > 2*Math.PI) this.a = this.a - 2*Math.PI

			gl.uniform1f(this.u_a, this.a)

			gl.drawArrays(gl.POINTS, 0, VERT_COUNT)
			requestAnimationFrame(this.step)
		},

		vertexShader () {
			const { gl } = this
			const shader = gl.createShader(gl.VERTEX_SHADER)
			gl.shaderSource(shader, `
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

				attribute vec3 position;
				uniform float timer;

				void main() {
						const mat4 projection = mat4(
								vec4(3.0/4.0, 0.0, 0.0, 0.0),
								vec4(    0.0, 1.0, 0.0, 0.0),
								vec4(    0.0, 0.0, 0.5, 0.5),
								vec4(    0.0, 0.0, 0.0, 510.0)
						);

			
						gl_Position = translate(0.3, 0.0, 0.0) * projection * rotationY(-timer) * rotationX(radians(-70.0)) * scale(4.0/3.0, 1.0, 1.0) * vec4(position, 1.0);
				
						gl_PointSize = 0.05;
				}
				`)
				gl.compileShader(shader)
				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader)
				// invalidation.then(() => gl.deleteShader(shader));
				return shader
		},


		fragmentShader () {
			const { gl } = this
			const shader = gl.createShader(gl.FRAGMENT_SHADER)
			gl.shaderSource(shader, `
				precision highp float;

				void main() {
					gl_FragColor = vec4(1.1, 1.1, 1.1, 1.0);
				}
			`)
			gl.compileShader(shader)
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader)
			// invalidation.then(() => gl.deleteShader(shader))
			return shader
		},

		vertexBuffer () {
			const { gl } = this
			const array = generateGalaxy()
			const buffer = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
			gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW)
			//invalidation.then(() => gl.deleteBuffer(buffer))
			return buffer
		}
		
  },
  mounted () {
		window.tst = this
		const { gl } = this
		const program = gl.createProgram()
  	gl.attachShader(program, this.vertexShader())
  	gl.attachShader(program, this.fragmentShader())
  	gl.linkProgram(program)
  	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw gl.getProgramInfoLog(program)
  	//invalidation.then(() => gl.deleteProgram(program));

		gl.useProgram(program)
		const a_position = gl.getAttribLocation(program, 'position')
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer())
		gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0)
		gl.enableVertexAttribArray(a_position)

		this.u_a = gl.getUniformLocation(program, "timer")
		
		this.step()


		this.$nextTick(() => this.resizeCanvas())
		//this.bgColor = window.getComputedStyle( this.$parent.$el, null).backgroundColor
		window.addEventListener('keydown', this.onKey, false)

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