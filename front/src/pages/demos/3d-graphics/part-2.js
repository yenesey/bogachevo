// URL: https://observablehq.com/d/c1e791ba4476a9a5
// Title: 3D graphics - first steps - part 2
// Author: Denis Bogachev
// Version: 845
// Runtime version: 1

const m0 = {
  id: "c1e791ba4476a9a5@845",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
        md`Демонстрация. [Оригинал](https://observablehq.com/@yenisey/3d-graphics-first-steps-part-2) на Observable дает больше интерактивных возможностей, например редактирование кода`
);}),
      node_id: 756
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Трехмерная графика - первые шаги
#### Интерактивное пособие для уроков математики и информатики в старших классах средней школы
---`
);}),
      node_id: 25
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Часть 2. Пишем программу, выводящую тор
#### (Продолжение [части 1](part-1))`
);}),
      node_id: 33
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Самое время перейти от построений на плоскости (xy) в 3 измерения. Для этого нам понадобится еще одна ось - (z), перпендикулярная (x) и (y). По умолчанию она направлена из центра экрана прямо на вас. Немного отклоним оси для наглядности. 
Тороид, или тор очень удачная фигура для экспериментов. Во-первых его форма - "бублика", намного интереснее, чем просто куб, или пирамида. Во-вторых тор, как вы увидите, весь просто "соткан" из вращений, которые мы прошли в [части 1](https://observablehq.com/d/7a8c74eb2072bca4).
И сейчас будет немного математики`
);}),
      node_id: 605
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
1.Построим окружность в плоскости (xz) c центром в точке (0,0) и радиусом (r) и улом (b), меняющимся от 0 до 2PI (см. график). Уравнения окружности должны быть вам знакомы по первой части:
        
        x(b) = r*cos(b)
        z(b) = r*sin(b)  
`
);}),
      node_id: 626
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`2.Отодвинем центр нашей (малой) окружности по оси (x) на расстояние (R), т.е. точка (x,z) = (R, 0) будет новым центром для нашей окружности. *Воспользуйтесь слайдером "R=" для визуализации на графике*

        x1(b) = R + r*cos(b)
        z(b) =      r*sin(b)
`
);}),
      node_id: 630
    },
    {
      name: "viewof fig1",
      inputs: ["DOM","width","rotate","Vertex","major","minor","_R","r","cos","sin"],
      value: (function(DOM,width,rotate,Vertex,major,minor,_R,r,cos,sin)
{
  const height = 300
  const context = DOM.context2d(width, height)
  var rot = [0.250, 0.237, 0]
  
  context.translate(width > 400 ? 200 : width / 2, height / 2);
  context.font = 'bold 14px arial'
  context.textAlign = 'center'

  function axis(mark, vec) {
    context.moveTo(vec[0].x, vec[0].y)
    context.lineTo(vec[1].x, vec[1].y)
    context.stroke()
    context.fillText(mark, vec[1].x - 10, vec[1].y + 20)
  }
  context.strokeStyle = '#aaa'
  context.fillStyle = '#aaa'
  axis('x', rotate([new Vertex(-height, 0, 0),   new Vertex(height, 0, 0)], ...rot))
  axis('y', rotate([new Vertex(0, height/2, 0),  new Vertex(0, -height/2, 0)], ...rot))
  axis('z', rotate([new Vertex(0, 0, height/4),  new Vertex(0, 0, -height/2) ], ...rot))

  context.strokeStyle = '#000'
  context.fillStyle = 'blue'
  
  var a = 0, b = 0
  while (a < major) {
    b = 0
    while (b < minor) {
       let x = (_R + r*cos(b))*cos(a)
       let y = (_R + r*cos(b))*sin(a)
       let z = r*sin(b)
       let v = rotate([new Vertex(x, -y, z)], ...rot)
       context.fillRect(v[0].x, v[0].y, 1,1)
       b += 0.1
    }
    a += 0.1
  }
  
  return context.canvas
}
),
      node_id: 319
    },
    {
      name: "fig1",
      inputs: ["Generators","viewof fig1"],
      value: (G, _) => G.input(_),
      node_id: 319
    },
    {
      name: "viewof _R",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 0,
  max: 80,
  step: 1,
  value: 0,
  label: 'R'  
})
);}),
      node_id: 517
    },
    {
      name: "_R",
      inputs: ["Generators","viewof _R"],
      value: (G, _) => G.input(_),
      node_id: 517
    },
    {
      name: "viewof minor",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0.1,
  max: 2*PI,
  value: 2*PI,
  step: 0.001,
  label:'Малый круг',
  format: v => `b = ${Math.round(v / PI * 1000) / 1000 } Pi`,
})
);}),
      node_id: 424
    },
    {
      name: "minor",
      inputs: ["Generators","viewof minor"],
      value: (G, _) => G.input(_),
      node_id: 424
    },
    {
      name: "viewof major",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0.1,
  max: 2*PI,
  value: 0.1,
  step: 0.001,
  label: 'Большой круг',
  format: v => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`,
})
);}),
      node_id: 402
    },
    {
      name: "major",
      inputs: ["Generators","viewof major"],
      value: (G, _) => G.input(_),
      node_id: 402
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`3.Теперь нам нужно вращать полученную малую окружность вокруг оси (z) в плоскости (xy) Если бы мы хотели просто прочертить окружность в плоскости (xy) c радиусом R, то подошла бы такая формула:

        x(a) = R*cos(a) 
        y(a) = R*sin(a)
        z(a) = 0
`
);}),
      node_id: 632
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`4.Но нам нужно вместо точки, запустить по большому кругу всю малую окружность *(двигайте слайдер большой окружности для примера)*. Поэтому, вместо постоянного радиуса R, нам подойдет геометрическое место точек окружностии x1(b), где каждая точка малой окружности, будет в свою очередь являться отдельным радиусом. Совмещая (2) и (3) с заменой радиуса R в (3) на x1(b) из (2), а также дополнением z(a) до z(a, b), получаем параметрические уравнения тора:

        x(a,b) = x1(b)*cos(a) = (R + r*cos(b)) * cos(a)
        y(a,b) = x1(b)*sin(a) = (R + r*cos(b)) * sin(a)
        z(a,b) =     r*sin(b) =      r*sin(b)`
);}),
      node_id: 634
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`5.Если раскрыть скобки:

        x(a,b) = R*cos(a) + [r*cos(b)*cos(a)]
        y(a,b) = R*sin(a) + [r*cos(b)*sin(a)]
        z(a,b) =            [r*sin(b)]
`
);}),
      node_id: 641
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Обратите также внимание, что выражения в квадратных скобках являются уравнениями сферы с центром в начале координат. Собственно именно в сферу, (как говорят математики) вырождается тор при R = 0. Вы можете самостоятельно проверить это на графике.`
);}),
      node_id: 645
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Рассчет тора`
);}),
      node_id: 551
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Точка (математики пафосно говорят: "вершина" - vertex) в трехмерном пространстве имеет три координаты:`
);}),
      node_id: 0
    },
    {
      name: "Vertex",
      value: (function(){return(
function Vertex(x, y, z) {
	this.x = Math.round(x)
	this.y = Math.round(y)
	this.z = Math.round(z)
}
);}),
      node_id: 3
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Радиус малой окружности`
);}),
      node_id: 689
    },
    {
      name: "r",
      value: (function(){return(
40
);}),
      node_id: 187
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Радиус большой окружности`
);}),
      node_id: 693
    },
    {
      name: "R",
      value: (function(){return(
80
);}),
      node_id: 184
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Ресурсы компьютера ограничены, поэтому количество вершин не может быть слишком большим, иначе программа будет "тормозить". Поэтому зададим заранее некоторое разумное количество вершин:`
);}),
      node_id: 697
    },
    {
      name: "MAJOR_COUNT",
      value: (function(){return(
24
);}),
      node_id: 176
    },
    {
      name: "MINOR_COUNT",
      value: (function(){return(
12
);}),
      node_id: 178
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Общее количество вершин находим перемножая:`
);}),
      node_id: 708
    },
    {
      name: "VERT_COUNT",
      inputs: ["MINOR_COUNT","MAJOR_COUNT"],
      value: (function(MINOR_COUNT,MAJOR_COUNT){return(
MINOR_COUNT * MAJOR_COUNT
);}),
      node_id: 181
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Расcчитываем все вершины тора:`
);}),
      node_id: 716
    },
    {
      name: "verts",
      inputs: ["VERT_COUNT","MAJOR_COUNT","PI","MINOR_COUNT","R","r","cos","sin","Vertex"],
      value: (function(VERT_COUNT,MAJOR_COUNT,PI,MINOR_COUNT,R,r,cos,sin,Vertex)
{
  var verts = new Array(VERT_COUNT)  // массив всех вершин

  for (var i = 0; i < MAJOR_COUNT; i++) {// - i отсчитывает секторы большого круга
  
    var a = 2*PI / MAJOR_COUNT * i // 2Pi - напомню это угол, соответсвующий целому кругу. делим 2Pi на кол-во секторов 
    // получаем угол сектора. а умножая на номер текущего сектора (i) получаем угол, соответствующий текущему сектору

    for (var j = 0; j < MINOR_COUNT; j++) { //j отсчитывает вершины по малому кругу
      var b = 2*PI / MINOR_COUNT * j // угол b соответствует текущему сектору малого круга
      // рассчитываем координаты по нашим уравнениям тора:
      var x = (R + r*cos(b))*cos(a)
      var y = (R + r*cos(b))*sin(a)
      var z = r*sin(b)
      
      var v = i * MINOR_COUNT + j // получаем индекс для 1-мерного массива
      verts[v] = new Vertex(x,y,z) // все вершины складируем в 1-мерный массив
    }
  }
  return verts
}
),
      node_id: 5
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Вращение в трех измерениях`
);}),
      node_id: 244
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`1.Рассмотрим поворот точки на плоскости вокруг начала координат (0, 0). Как уже было показано в [Части 1](https://observablehq.com/d/7a8c74eb2072bca4),	координаты точки (x,y) можно найти по формулам:

		  x = R * cos(a)
	  	y = R * sin(a)

2.Зная координаты (x,y) зададимся целью повернуть точку на новый угол (t) при том же самом радиусе вращения (R), которая получит новые координаты (x1,y1):

	  	x1 = R * cos(a + t)
	  	y1 = R * sin(a + t)

3.Для косинуса и синуса суммы двух углов имеются следующие тригонометрические тождества:

	  	cos(a + t) = cos(a) * cos(t) - sin(a) * sin(t)
	  	sin(a + t) = sin(a) * cos(t) + cos(a) * sin(t)

4.Используем тождества (3) для нашего решения (2) для поворота:

	  	x1 = R * (cos(a) * cos(t) - sin(a) * sin(t))
	  	y1 = R * (sin(a) * cos(t) + cos(a) * sin(t))

5.Раскроем скобки:

	  	x1 = R * cos(a) * cos(t) - R * sin(a) * sin(t)
		  y1 = R * sin(a) * cos(t) + R * cos(a) * sin(t)

6.Поскольку нам уже известны текущие координаты точки (x,y), совмещаем (п.5 и п.1)

	  	x1 = x * cos(t) - y * sin(t)
		  y1 = y * cos(t) + x * sin(t)

7.При переходе в 3 изменения, у нас вместо 1, появляются сразу 3 взаимно-перпендикулярные плоскости: (xy), (xz), (yz). Вращать координаты в таком случае нужно поочередно, в каждой из плоскостей, учитывая результаты поворота в смежной плоскости. Например, если вращали точку в плоскости (yz), то полученные изменения по координате (y) нужно учитывать при повороте по (xy) и наоборот.
`
);}),
      node_id: 238
    },
    {
      name: "rotate",
      inputs: ["cos","sin","Vertex"],
      value: (function(cos,sin,Vertex){return(
function rotate(verts, a, b, t) {
  var vertsRotated = new Array(verts.length)

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
    z1 = z * cos(b) - x * sin(b)
    x1 = z * sin(b) + x * cos(b)
    x = x1
    z = z1
    
    // вращение в плоскости XY вокруг оси z
    x1 = x * cos(t) - y * sin(t)
    y1 = x * sin(t) + y * cos(t)
    x = x1
    y = y1

    vertsRotated[i] = new Vertex(x, y, z)
  }
  return vertsRotated
}
);}),
      node_id: 6
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Массив вершин после поворота по осям:`
);}),
      node_id: 731
    },
    {
      name: "vertsRotated",
      inputs: ["rotate","verts","a","b","t"],
      value: (function(rotate,verts,a,b,t){return(
rotate(verts, a, b, t)
);}),
      node_id: 218
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Выводим результаты после поворота`
);}),
      node_id: 726
    },
    {
      name: "viewof ctx",
      inputs: ["DOM","width","vertsRotated"],
      value: (function(DOM,width,vertsRotated)
{
  const height = 320
  const ctx = DOM.context2d(width, height)
  ctx.translate(width / 2, height / 2)
  ctx.fillStyle = 'green'

  ctx.clearRect(-width / 2, -height / 2, width, height)
  for (var i = 0; i < vertsRotated.length; i++) ctx.fillRect(vertsRotated[i].x, vertsRotated[i].y, 2,2)
   
  return ctx.canvas
}
),
      node_id: 10
    },
    {
      name: "ctx",
      inputs: ["Generators","viewof ctx"],
      value: (G, _) => G.input(_),
      node_id: 10
    },
    {
      name: "viewof a",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0,
  max: 2*PI,
  value: 0,
  step: 0.01,
  label: 'Ось y ',
  format: v => `α = ${Math.round(v / PI * 1000) / 1000 } Pi`,
})
);}),
      node_id: 47
    },
    {
      name: "a",
      inputs: ["Generators","viewof a"],
      value: (G, _) => G.input(_),
      node_id: 47
    },
    {
      name: "viewof b",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0,
  max: 2*PI,
  value: 0,
  step: 0.01,
  label: 'Ось y ',
  format: v => `b = ${Math.round(v / PI * 1000) / 1000 } Pi`,
})
);}),
      node_id: 57
    },
    {
      name: "b",
      inputs: ["Generators","viewof b"],
      value: (G, _) => G.input(_),
      node_id: 57
    },
    {
      name: "viewof t",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0,
  max: 2*PI,
  value: 0.1*PI,
  step: 0.01,
  label: 'Ось z ',
  format: v => `t = ${Math.round(v / PI * 1000) / 1000 } Pi`,
  description: "Двигайте слайдеры для поворота вокруг осей"
})
);}),
      node_id: 60
    },
    {
      name: "t",
      inputs: ["Generators","viewof t"],
      value: (G, _) => G.input(_),
      node_id: 60
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Очевидно, что между точками довольно много свободного места, и это выглядит не слишком красиво. Как решить эту проблему? Можно сделать больше точек, но каждую точку придется обсчитывать и выделять под нее память. Более оптимальным решением будет покрыть поверхность фигуры гранями. Этим мы и займемся в следующей части.`
);}),
      node_id: 749
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`[ *<--* Предыдущая часть](part-1) -|- [Следующая часть *-->*](part-3)`
);}),
      node_id: 818
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`----
#### Импорт`
);}),
      node_id: 284
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "sin",
      remote: "sin",
      node_id: 297
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "cos",
      remote: "cos",
      node_id: 297
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "PI",
      remote: "PI",
      node_id: 297
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "slider",
      remote: "slider",
      node_id: 297
    },
    {
      name: "viewof width",
      inputs: ["html","invalidation"],
      value: (function(html,invalidation)
{
  const view = html`<span class="observablehq--inspect"><span class="observablehq--number">`;
  const resized = function resized() {
    var w = document.body.clientWidth;
    w > 400 ? w = w * 0.66 : w = w * 0.85
    if (w !== view.value) {
      view.firstChild.textContent = view.value = w;
      view.dispatchEvent(new CustomEvent("input"));
    }
  }
  window.addEventListener('resize', resized);
  invalidation.then(() => window.removeEventListener('resize', resized));
  return resized(), view;
}
),
      node_id: 787
    },
    {
      name: "width",
      inputs: ["Generators","viewof width"],
      value: (G, _) => G.input(_),
      node_id: 787
    },
  ]
};
const m1 = {
  id: "@yenisey/3d-graphics-first-steps",
  variables: [
    {
      name: "sin",
      value: function(){return(
Math.sin
)}
    },
    {
      name: "cos",
      value: function(){return(
Math.cos
)}
    },
    {
      name: "PI",
      value: function(){return(
Math.PI
)}
    },
    {
      name: "slider",
      inputs: ["html"],
      value: function(html){return(
function slider({label = '', value, min, max, step, format = (v) => v})  {
  const div = html`
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
       <i style="flex: 0 0 auto; padding-right:.4em;">${label}</i>
       <input type=range min=${min} max=${max} step=${step} style="flex: 0 0 auto; display: flex;">
       <span type=view style="flex: 0 0 auto; display: flex; padding-left:.4em;"></span>
    </div>
  `
  const range = div.querySelector("[type=range]")
  const view = div.querySelector("[type=view]")
  div.value = range.value = value
  view.innerText = format(div.value)
  range.oninput = () => {div.value = range.valueAsNumber; view.innerText = format(range.valueAsNumber)}
  range.oninput()
  
  return div
}
)}
    },
  ]
};
const nodes = [{"id":756,"value":"md`# 3D graphics - first steps - part 2`","pinned":false},{"id":25,"value":"md`# Трехмерная графика - первые шаги\n#### Интерактивное пособие для уроков математики и информатики в старших классах средней школы\n---`","pinned":false},{"id":33,"value":"md`## Часть 2. Пишем программу, выводящую тор\n#### (Продолжение [части 1](https://observablehq.com/d/7a8c74eb2072bca4))`","pinned":false},{"id":605,"value":"md`Самое время перейти от построений на плоскости (xy) в 3 измерения. Для этого нам понадобится еще одна ось - (z), перпендикулярная (x) и (y). По умолчанию она направлена из центра экрана прямо на вас. Немного отклоним оси для наглядности. \nТороид, или тор очень удачная фигура для экспериментов. Во-первых его форма - \"бублика\", намного интереснее, чем просто куб, или пирамида. Во-вторых тор, как вы увидите, весь просто \"соткан\" из вращений, которые мы прошли в [части 1](https://observablehq.com/d/7a8c74eb2072bca4).\nИ сейчас будет немного математики`","pinned":false},{"id":626,"value":"md`\n1.Построим окружность в плоскости (xz) c центром в точке (0,0) и радиусом (r) и улом (b), меняющимся от 0 до 2PI (см. график). Уравнения окружности должны быть вам знакомы по первой части:\n        \n        x(b) = r*cos(b)\n        z(b) = r*sin(b)  \n`","pinned":false},{"id":630,"value":"md`2.Отодвинем центр нашей (малой) окружности по оси (x) на расстояние (R), т.е. точка (x,z) = (R, 0) будет новым центром для нашей окружности. *Воспользуйтесь слайдером \"R=\" для визуализации на графике*\n\n        x1(b) = R + r*cos(b)\n        z(b) =      r*sin(b)\n`","pinned":false},{"id":319,"value":"viewof fig1 = {\n  const height = 300\n  const context = DOM.context2d(width, height)\n  var rot = [0.250, 0.237, 0]\n  \n  context.translate(width > 400 ? 200 : width / 2, height / 2);\n  context.font = 'bold 14px arial'\n  context.textAlign = 'center'\n\n  function axis(mark, vec) {\n    context.moveTo(vec[0].x, vec[0].y)\n    context.lineTo(vec[1].x, vec[1].y)\n    context.stroke()\n    context.fillText(mark, vec[1].x - 10, vec[1].y + 20)\n  }\n  context.strokeStyle = '#aaa'\n  context.fillStyle = '#aaa'\n  axis('x', rotate([new Vertex(-height, 0, 0),   new Vertex(height, 0, 0)], ...rot))\n  axis('y', rotate([new Vertex(0, height/2, 0),  new Vertex(0, -height/2, 0)], ...rot))\n  axis('z', rotate([new Vertex(0, 0, height/4),  new Vertex(0, 0, -height/2) ], ...rot))\n\n  context.strokeStyle = '#000'\n  context.fillStyle = 'blue'\n  \n  var a = 0, b = 0\n  while (a < major) {\n    b = 0\n    while (b < minor) {\n       let x = (_R + r*cos(b))*cos(a)\n       let y = (_R + r*cos(b))*sin(a)\n       let z = r*sin(b)\n       let v = rotate([new Vertex(x, -y, z)], ...rot)\n       context.fillRect(v[0].x, v[0].y, 1,1)\n       b += 0.1\n    }\n    a += 0.1\n  }\n  \n  return context.canvas\n}","pinned":false},{"id":517,"value":"viewof _R = slider({\n  min: 0,\n  max: 80,\n  step: 1,\n  value: 0,\n  label: 'R'  \n})","pinned":false},{"id":424,"value":"viewof minor = slider({\n  min: 0.1,\n  max: 2*PI,\n  value: 2*PI,\n  step: 0.001,\n  label:'Малый круг',\n  format: v => `b = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n})","pinned":false},{"id":402,"value":"viewof major = slider({\n  min: 0.1,\n  max: 2*PI,\n  value: 0.1,\n  step: 0.001,\n  label: 'Большой круг',\n  format: v => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n})","pinned":false},{"id":632,"value":"md`3.Теперь нам нужно вращать полученную малую окружность вокруг оси (z) в плоскости (xy) Если бы мы хотели просто прочертить окружность в плоскости (xy) c радиусом R, то подошла бы такая формула:\n\n        x(a) = R*cos(a) \n        y(a) = R*sin(a)\n        z(a) = 0\n`","pinned":false},{"id":634,"value":"md`4.Но нам нужно вместо точки, запустить по большому кругу всю малую окружность *(двигайте слайдер большой окружности для примера)*. Поэтому, вместо постоянного радиуса R, нам подойдет геометрическое место точек окружностии x1(b), где каждая точка малой окружности, будет в свою очередь являться отдельным радиусом. Совмещая (2) и (3) с заменой радиуса R в (3) на x1(b) из (2), а также дополнением z(a) до z(a, b), получаем параметрические уравнения тора:\n\n        x(a,b) = x1(b)*cos(a) = (R + r*cos(b)) * cos(a)\n        y(a,b) = x1(b)*sin(a) = (R + r*cos(b)) * sin(a)\n        z(a,b) =     r*sin(b) =      r*sin(b)`","pinned":false},{"id":641,"value":"md`5.Если раскрыть скобки:\n\n        x(a,b) = R*cos(a) + [r*cos(b)*cos(a)]\n        y(a,b) = R*sin(a) + [r*cos(b)*sin(a)]\n        z(a,b) =            [r*sin(b)]\n`","pinned":false},{"id":645,"value":"md`Обратите также внимание, что выражения в квадратных скобках являются уравнениями сферы с центром в начале координат. Собственно именно в сферу, (как говорят математики) вырождается тор при R = 0. Вы можете самостоятельно проверить это на графике.`","pinned":false},{"id":551,"value":"md`## Рассчет тора`","pinned":false},{"id":0,"value":"md`Точка (математики пафосно говорят: \"вершина\" - vertex) в трехмерном пространстве имеет три координаты:`","pinned":false},{"id":3,"value":"function Vertex(x, y, z) {\n\tthis.x = Math.round(x)\n\tthis.y = Math.round(y)\n\tthis.z = Math.round(z)\n}","pinned":true},{"id":689,"value":"md`Радиус малой окружности`","pinned":false},{"id":187,"value":"r = 40 // радиус малой окружности (трубы)","pinned":false},{"id":693,"value":"md`Радиус большой окружности`","pinned":false},{"id":184,"value":"R = 80 // радиус большой окружности (кольца)","pinned":false},{"id":697,"value":"md`Ресурсы компьютера ограничены, поэтому количество вершин не может быть слишком большим, иначе программа будет \"тормозить\". Поэтому зададим заранее некоторое разумное количество вершин:`","pinned":false},{"id":176,"value":"MAJOR_COUNT = 24 // количество шагов (сегментов) для большой окружности по радиусу R","pinned":true},{"id":178,"value":"MINOR_COUNT = 12 // количество шагов (вершин) для малой окружности по радиусу r","pinned":true},{"id":708,"value":"md`Общее количество вершин находим перемножая:`","pinned":false},{"id":181,"value":"VERT_COUNT = MINOR_COUNT * MAJOR_COUNT // всего вершин","pinned":true},{"id":716,"value":"md`Расcчитываем все вершины тора:`","pinned":false},{"id":5,"value":"verts = {\n  var verts = new Array(VERT_COUNT)  // массив всех вершин\n\n  for (var i = 0; i < MAJOR_COUNT; i++) {// - i отсчитывает секторы большого круга\n  \n    var a = 2*PI / MAJOR_COUNT * i // 2Pi - напомню это угол, соответсвующий целому кругу. делим 2Pi на кол-во секторов \n    // получаем угол сектора. а умножая на номер текущего сектора (i) получаем угол, соответствующий текущему сектору\n\n    for (var j = 0; j < MINOR_COUNT; j++) { //j отсчитывает вершины по малому кругу\n      var b = 2*PI / MINOR_COUNT * j // угол b соответствует текущему сектору малого круга\n      // рассчитываем координаты по нашим уравнениям тора:\n      var x = (R + r*cos(b))*cos(a)\n      var y = (R + r*cos(b))*sin(a)\n      var z = r*sin(b)\n      \n      var v = i * MINOR_COUNT + j // получаем индекс для 1-мерного массива\n      verts[v] = new Vertex(x,y,z) // все вершины складируем в 1-мерный массив\n    }\n  }\n  return verts\n}","pinned":true},{"id":244,"value":"md`## Вращение в трех измерениях`","pinned":false},{"id":238,"value":"md`1.Рассмотрим поворот точки на плоскости вокруг начала координат (0, 0). Как уже было показано в [Части 1](https://observablehq.com/d/7a8c74eb2072bca4),\tкоординаты точки (x,y) можно найти по формулам:\n\n\t\t  x = R * cos(a)\n\t  \ty = R * sin(a)\n\n2.Зная координаты (x,y) зададимся целью повернуть точку на новый угол (t) при том же самом радиусе вращения (R), которая получит новые координаты (x1,y1):\n\n\t  \tx1 = R * cos(a + t)\n\t  \ty1 = R * sin(a + t)\n\n3.Для косинуса и синуса суммы двух углов имеются следующие тригонометрические тождества:\n\n\t  \tcos(a + t) = cos(a) * cos(t) - sin(a) * sin(t)\n\t  \tsin(a + t) = sin(a) * cos(t) + cos(a) * sin(t)\n\n4.Используем тождества (3) для нашего решения (2) для поворота:\n\n\t  \tx1 = R * (cos(a) * cos(t) - sin(a) * sin(t))\n\t  \ty1 = R * (sin(a) * cos(t) + cos(a) * sin(t))\n\n5.Раскроем скобки:\n\n\t  \tx1 = R * cos(a) * cos(t) - R * sin(a) * sin(t)\n\t\t  y1 = R * sin(a) * cos(t) + R * cos(a) * sin(t)\n\n6.Поскольку нам уже известны текущие координаты точки (x,y), совмещаем (п.5 и п.1)\n\n\t  \tx1 = x * cos(t) - y * sin(t)\n\t\t  y1 = y * cos(t) + x * sin(t)\n\n7.При переходе в 3 изменения, у нас вместо 1, появляются сразу 3 взаимно-перпендикулярные плоскости: (xy), (xz), (yz). Вращать координаты в таком случае нужно поочередно, в каждой из плоскостей, учитывая результаты поворота в смежной плоскости. Например, если вращали точку в плоскости (yz), то полученные изменения по координате (y) нужно учитывать при повороте по (xy) и наоборот.\n`","pinned":false},{"id":6,"value":"function rotate(verts, a, b, t) {\n  var vertsRotated = new Array(verts.length)\n\n  for (var i = 0; i < verts.length; i++) {\n    var x = verts[i].x\n    var y = verts[i].y\n    var z = verts[i].z\n\n    var x1, y1, z1\n    // вращение в плоскости YZ вокруг оси x\n    y1 = y * cos(a) - z * sin(a)\n    z1 = y * sin(a) + z * cos(a)\n    y = y1\n    z = z1\n    \n    // вращение в плоскости XZ вокруг оси y\n    z1 = z * cos(b) - x * sin(b)\n    x1 = z * sin(b) + x * cos(b)\n    x = x1\n    z = z1\n    \n    // вращение в плоскости XY вокруг оси z\n    x1 = x * cos(t) - y * sin(t)\n    y1 = x * sin(t) + y * cos(t)\n    x = x1\n    y = y1\n\n    vertsRotated[i] = new Vertex(x, y, z)\n  }\n  return vertsRotated\n}","pinned":true},{"id":731,"value":"md`Массив вершин после поворота по осям:`","pinned":false},{"id":218,"value":"vertsRotated = rotate(verts, a, b, t)","pinned":true},{"id":726,"value":"md`## Выводим результаты после поворота`","pinned":false},{"id":10,"value":"viewof ctx = {\n  const height = 320\n  const ctx = DOM.context2d(width, height)\n  ctx.translate(width / 2, height / 2)\n  ctx.fillStyle = 'green'\n\n  ctx.clearRect(-width / 2, -height / 2, width, height)\n  for (var i = 0; i < vertsRotated.length; i++) ctx.fillRect(vertsRotated[i].x, vertsRotated[i].y, 2,2)\n   \n  return ctx.canvas\n}","pinned":false},{"id":47,"value":"viewof a = slider({\n  min: 0,\n  max: 2*PI,\n  value: 0,\n  step: 0.01,\n  label: 'Ось y ',\n  format: v => `α = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n})","pinned":false},{"id":57,"value":"viewof b = slider({\n  min: 0,\n  max: 2*PI,\n  value: 0,\n  step: 0.01,\n  label: 'Ось y ',\n  format: v => `b = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n})","pinned":false},{"id":60,"value":"viewof t = slider({\n  min: 0,\n  max: 2*PI,\n  value: 0.1*PI,\n  step: 0.01,\n  label: 'Ось z ',\n  format: v => `t = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n  description: \"Двигайте слайдеры для поворота вокруг осей\"\n})","pinned":false},{"id":749,"value":"md`Очевидно, что между точками довольно много свободного места, и это выглядит не слишком красиво. Как решить эту проблему? Можно сделать больше точек, но каждую точку придется обсчитывать и выделять под нее память. Более оптимальным решением будет покрыть поверхность фигуры гранями. Этим мы и займемся в следующей части.`","pinned":false},{"id":818,"value":"md`[ *<--* Предыдущая часть](3d-graphics-first-steps) -|- [Следующая часть *-->*](3d-graphics-first-steps-part-3)`","pinned":false},{"id":284,"value":"md`----\n#### Импорт`","pinned":false},{"id":297,"value":"import {sin, cos, PI, slider} from '@yenisey/3d-graphics-first-steps'","pinned":false},{"id":787,"value":"viewof width = {\n  const view = html`<span class=\"observablehq--inspect\"><span class=\"observablehq--number\">`;\n  const resized = function resized() {\n    var w = document.body.clientWidth;\n    w > 400 ? w = w * 0.66 : w = w * 0.85\n    if (w !== view.value) {\n      view.firstChild.textContent = view.value = w;\n      view.dispatchEvent(new CustomEvent(\"input\"));\n    }\n  }\n  window.addEventListener('resize', resized);\n  invalidation.then(() => window.removeEventListener('resize', resized));\n  return resized(), view;\n}","pinned":false}];

const notebook = {
  id: "c1e791ba4476a9a5@845",
  modules: [m0,m1],
  nodes
};
export default notebook;
