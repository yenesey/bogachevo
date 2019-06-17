/* eslint-disable */
// URL: https://observablehq.com/d/5904f1bb66ed16e5
// Title: 3D graphics - first steps - part 3
// Author: Denis Bogachev
// Version: 801
// Runtime version: 1

const m0 = {
  id: "5904f1bb66ed16e5@801",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
        md`Демонстрация. [Оригинал](https://observablehq.com/@yenisey/3d-graphics-first-steps-part-3) на Observable дает больше интерактивных возможностей, например редактирование кода`
);}),
      node_id: 0
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Трехмерная графика - первые шаги
#### Интерактивное пособие для уроков математики и информатики в старших классах средней школы
---`
);}),
      node_id: 19
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Часть 3. Формирование поверхности фигуры
#### (Продолжение [части 2](part-2))`
);}),
      node_id: 21
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Тор пока представляет собой массив точек (вершин) каждая из которых имеет 3 координаты (x,y,z). Нам нужно как-то "объяснить" компьютеру, что эти вершины, вообще-то образуют поверхность фигуры. То есть, помимо вершин, нужно создать еще один блок (массив) информации, где будут храниться сведения, какие точки можно считать смежными и образующими элемент поверхности - грань тора.
Нам повезло: раз мы сами обсчитывали вершины для тора в [части 2](https://observablehq.com/d/c1e791ba4476a9a5)) с помощью вложенных циклов, теперь мы можем воспользоваться тем же самым алгоритмом. Двигаясь по пути, по которому создавались вершины, можно просто отметить близлежащие точки как грани:`
);}),
      node_id: 130
    },
    {
      name: "vertsRotated",
      inputs: ["rotate","verts","a","b","t"],
      value: (function(rotate,verts,a,b,t){return(
rotate(verts, a, b, t)
);}),
      node_id: 27
    },
    {
      name: "faces",
      inputs: ["MAJOR_COUNT","MINOR_COUNT"],
      value: (function(MAJOR_COUNT,MINOR_COUNT)
{
  var faces = new Array()  // массив будет содержать индексы смежных вершин
  
  for (var i = 0; i < MAJOR_COUNT; i++) { // -- по вершинам большого круга
    for (var j = 0; j < MINOR_COUNT; j++) { // -- по вершинам малого круга

      var v = i * MINOR_COUNT + j    // получаем индекс для 1-мерного массива

      var v1 = v                      // v    +1
      var v2 = v + 1                  // v1->-v2   -- принадлежат текущему малому кругу
      var v3 = v + MINOR_COUNT + 1    // |     |   +  MINOR_COUNT - попадаем в след. круг 
      var v4 = v + MINOR_COUNT        // v4->-v3   -- принадлежт следующему малому кругу

      if (j === MINOR_COUNT - 1) {    // j === последняя вершина в малом круге?
        v2 = v2 - MINOR_COUNT         // -- замыкаем малый круг на начало, т.е. переводим индексы к стартовой точке
        v3 = v3 - MINOR_COUNT         // -- замыкаем малый круг на начало, т.е. переводим индексы к стартовой точке
      }
         
      if (i === MAJOR_COUNT - 1) {    // i === последний сегмент в большом круге?
        v3 = v3 - (i + 1) * MINOR_COUNT // -- замыкаем большой круг (трубу)
        v4 = j                        // -- замыкаем большой круг (трубу)
      }

      faces.push([v1, v2, v3, v4])  
    }
  }

  return faces
}
),
      node_id: 51
    },
    {
      name: "viewof temp",
      inputs: ["DOM","width","vertsRotated","iFaces","faces","drawPoly"],
      value: (function(DOM,width,vertsRotated,iFaces,faces,drawPoly)
{
  const height = 320
  const ctx = DOM.context2d(width, height)
  ctx.translate(width / 2, height / 2)
  ctx.fillStyle = 'green'
  ctx.clearRect(-width / 2, -height / 2, width, height)
  var x1, y1, x2, y2, x3,y3 ,x4,y4
  var verts = vertsRotated
  for (var i = 0; i < iFaces; i++) {
  	x1 = verts[ faces[i][0] ].x;  y1 = verts[ faces[i][0] ].y 
		x2 = verts[ faces[i][1] ].x;  y2 = verts[ faces[i][1] ].y 
		x3 = verts[ faces[i][2] ].x;  y3 = verts[ faces[i][2] ].y 
		x4 = verts[ faces[i][3] ].x;  y4 = verts[ faces[i][3] ].y

	  drawPoly(ctx, x1, y1,	x2, y2,	x3, y3,	x4, y4,	'rgb(100,145,155)', true)
  }
  return ctx.canvas
}
),
      node_id: 194
    },
    {
      name: "temp",
      inputs: ["Generators","viewof temp"],
      value: (G, _) => G.input(_),
      node_id: 194
    },
    {
      name: "viewof iFaces",
      inputs: ["slider","VERT_COUNT"],
      value: (function(slider,VERT_COUNT){return(
slider({label:'Визуализация расчета граней:', value:15, min:0, max:VERT_COUNT, step:1})
);}),
      node_id: 219
    },
    {
      name: "iFaces",
      inputs: ["Generators","viewof iFaces"],
      value: (G, _) => G.input(_),
      node_id: 219
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Получается настоящая [полигональная сетка](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B8%D0%B3%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%81%D0%B5%D1%82%D0%BA%D0%B0), или "меш" (polygon mesh)`
);}),
      node_id: 388
    },
    {
      name: "drawPoly",
      value: (function(){return(
function drawPoly(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color, stroke, fill) {
  // отрисовка четырехугольной грани по заданным кординатам
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(x1, y1); 
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath()
  if (stroke) ctx.stroke()
  if (fill) ctx.fill()
}
);}),
      node_id: 65
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Перед тем, как вывести тор с гранями, раскроем два важных момента: 
1. Желательно не выводить дальние грани, которые закрыты от взгляда более ближними.
Есть хитрые алгоритмы отсечения невидимых граней на раннем этапе, но в этом примере мы просто отсортируем их по удаленности от наблюдателя (по координате z), и будем отрисовывать, начиная с самых дальних. Таким образом, более ближние появятся позже и просто закроют/закрасят дальние.

2. Желательно не выводить те грани, которые повернуты к зрителю внутренней стороной, а не внешней. Иначе наблюдатель может увидеть как бы внутреннюю стенку тора, чего в реальности не бывает. Для этого мы найдем *вектор нормали к поверхности грани*, то есть вектор, который перпендикулярен поверхности (как бы торчит из грани). Нас интересует только координата z этого вектора. Если она отрицательна, значит грань отвернулась от зрителя и не должна быть видима.

Вектор нормали нам дает векторное произведение 2х векторов:
        
        A(ax,ay,az)
        B(bx,by,bz)
				
        (ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx)
        из которого нас интересует только z: ax*by - ay*bx
`
);}),
      node_id: 688
    },
    {
      name: "drawFigure",
      inputs: ["options","iFaces2","drawPoly"],
      value: (function(options,iFaces2,drawPoly){return(
function drawFigure (ctx, verts, faces) {
  var x1, y1, x2, y2, x3, y3, x4, y4
  var ax, ay, bx, by, color
  
  if (options.sort) {
    // сортировка граней по удаленности (по координате z)
    faces.sort(function(face1, face2) {
      var z1 = verts[ face1[0] ].z + verts[ face1[1] ].z + verts[ face1[2] ].z //почему не берем 4ю вершину? она все равно
      var z2 = verts[ face2[0] ].z + verts[ face2[1] ].z + verts[ face2[2] ].z //лежит в той же плоскости. хватит и 3х
      return (z1 === z2 ? 0 : z1 > z2 ? 1 : -1)
    })
  }
  
  for (var i = 0; i < iFaces2; i++) {
    x1 = verts[ faces[i][0] ].x;  y1 = verts[ faces[i][0] ].y 
    x2 = verts[ faces[i][1] ].x;  y2 = verts[ faces[i][1] ].y 
    x3 = verts[ faces[i][2] ].x;  y3 = verts[ faces[i][2] ].y 
    x4 = verts[ faces[i][3] ].x;  y4 = verts[ faces[i][3] ].y
   
    // компоненты для векторного произведения (через длины отрезков, составляющих грань):
    ax = x4 - x1;   ay = y4 - y1
    bx = x2 - x1;   by = y2 - y1 

    var zNorm = ax * by - ay * bx
    var color = Math.round(Math.abs(zNorm) / 10)
    if (
      (options.normal == true && zNorm > 0) || 
      (options.normal == false)
    ) drawPoly(ctx, x1, y1, x2, y2, x3, y3, x4, y4, 'rgb(100,' + Number(145+color) + ',155)', false, true )
  }
}
);}),
      node_id: 568
    },
    {
      name: "ctx",
      inputs: ["DOM","width","drawFigure","vertsRotated","faces"],
      value: (function(DOM,width,drawFigure,vertsRotated,faces)
{
  const height = 320
  const ctx = DOM.context2d(width, height)
  ctx.translate(width / 2, height / 2)
  ctx.fillStyle = 'green'
  ctx.clearRect(-width / 2, -height / 2, width, height)
  drawFigure(ctx, vertsRotated, faces)
  return ctx.canvas
}
),
      node_id: 13
    },
    {
      name: "viewof iFaces2",
      inputs: ["slider","VERT_COUNT"],
      value: (function(slider,VERT_COUNT){return(
slider({label:'Визуализация порядка вывода граней:', value:15, min:0, max:VERT_COUNT, step:1})
);}),
      node_id: 549
    },
    {
      name: "iFaces2",
      inputs: ["Generators","viewof iFaces2"],
      value: (G, _) => G.input(_),
      node_id: 549
    },
    {
      name: "viewof options",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`
    <form>
       <input type=checkbox name=sort> <i>Сортировать грани по удаленности</i> &nbsp;&nbsp;
       <input type=checkbox name=normal> <i>Только расположенные видимой частью к наблюдателю</i>
    </form>
  `
  
  form.oninput = () => {
    form.value = {sort: form.sort.checked, normal: form.normal.checked}
  }
  form.oninput()
  
  return form
}
),
      node_id: 768
    },
    {
      name: "options",
      inputs: ["Generators","viewof options"],
      value: (G, _) => G.input(_),
      node_id: 768
    },
    {
      name: "viewof a",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0,
  max: 2*PI,
  value: 1.725*PI,
  step: 0.01,
  label: 'Ось x ',
  format: v => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`,
})
);}),
      node_id: 29
    },
    {
      name: "a",
      inputs: ["Generators","viewof a"],
      value: (G, _) => G.input(_),
      node_id: 29
    },
    {
      name: "viewof b",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0,
  max: 2*PI,
  value: 1.725*PI,
  step: 0.01,
  label: 'Ось y ',
  format: v => `b = ${Math.round(v / PI * 1000) / 1000 } Pi`,
})
);}),
      node_id: 426
    },
    {
      name: "b",
      inputs: ["Generators","viewof b"],
      value: (G, _) => G.input(_),
      node_id: 426
    },
    {
      name: "viewof t",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({
  min: 0,
  max: 2*PI,
  value: 0,
  step: 0.01,
  label: 'Ось z ',
  format: v => `t = ${Math.round(v / PI * 1000) / 1000 } Pi`,
  description: "Двигайте слайдеры для поворота вокруг осей"
})
);}),
      node_id: 34
    },
    {
      name: "t",
      inputs: ["Generators","viewof t"],
      value: (G, _) => G.input(_),
      node_id: 34
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`---
### Заключение


Уважаемый читатель! Надеюсь, теперь вы более подробно представляете, как происходит формирование, хранение, обработка и вывод на экран 3-мерных объектов на компьютере. Здесь были раскрыты только самые начальные принципы. 3D графика используется сейчас повсеместно: в обучении, играх, моделировании, создании кино и мультипликационных фильмов. Если эта тема вам интересна, то впереди еще целая куча информации и тем, связанных с программированием:
   - применение матричных вычислений   
   - наложение текстур
   - освещение
   - перспектива/проецирование/камера
   - аппаратное ускорение на видеокартах
   - OpenGL/WebGL

Много простых и наглядных примеров находится здесь на [Observable](https://observablehq.com).
И возможно, стоит ознакомиться с такими программами как : Blender, Maya и т.д.

`
);}),
      node_id: 101
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`[ *<--* Предыдущая часть](part-2)`
);}),
      node_id: 736
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`----
#### Импорт`
);}),
      node_id: 740
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "sin",
      remote: "sin",
      node_id: 8
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "cos",
      remote: "cos",
      node_id: 8
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "PI",
      remote: "PI",
      node_id: 8
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "slider",
      remote: "slider",
      node_id: 8
    },
    {
      from: "@yenisey/3d-graphics-first-steps-part-2",
      name: "VERT_COUNT",
      remote: "VERT_COUNT",
      node_id: 746
    },
    {
      from: "@yenisey/3d-graphics-first-steps-part-2",
      name: "MAJOR_COUNT",
      remote: "MAJOR_COUNT",
      node_id: 746
    },
    {
      from: "@yenisey/3d-graphics-first-steps-part-2",
      name: "MINOR_COUNT",
      remote: "MINOR_COUNT",
      node_id: 746
    },
    {
      from: "@yenisey/3d-graphics-first-steps-part-2",
      name: "verts",
      remote: "verts",
      node_id: 746
    },
    {
      from: "@yenisey/3d-graphics-first-steps-part-2",
      name: "rotate",
      remote: "rotate",
      node_id: 746
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
      node_id: 108
    },
    {
      name: "width",
      inputs: ["Generators","viewof width"],
      value: (G, _) => G.input(_),
      node_id: 108
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
const m2 = {
  id: "@yenisey/3d-graphics-first-steps-part-2",
  variables: [
    {
      name: "VERT_COUNT",
      inputs: ["MINOR_COUNT","MAJOR_COUNT"],
      value: function(MINOR_COUNT,MAJOR_COUNT){return(
MINOR_COUNT * MAJOR_COUNT
)}
    },
    {
      name: "MAJOR_COUNT",
      value: function(){return(
24
)}
    },
    {
      name: "MINOR_COUNT",
      value: function(){return(
12
)}
    },
    {
      name: "verts",
      inputs: ["VERT_COUNT","MAJOR_COUNT","PI","MINOR_COUNT","R","r","cos","sin","Vertex"],
      value: function(VERT_COUNT,MAJOR_COUNT,PI,MINOR_COUNT,R,r,cos,sin,Vertex)
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
    },
    {
      name: "rotate",
      inputs: ["cos","sin","Vertex"],
      value: function(cos,sin,Vertex){return(
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
)}
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "PI",
      remote: "PI"
    },
    {
      name: "R",
      value: function(){return(
80
)}
    },
    {
      name: "r",
      value: function(){return(
40
)}
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "cos",
      remote: "cos"
    },
    {
      from: "@yenisey/3d-graphics-first-steps",
      name: "sin",
      remote: "sin"
    },
    {
      name: "Vertex",
      value: function(){return(
function Vertex(x, y, z) {
	this.x = Math.round(x)
	this.y = Math.round(y)
	this.z = Math.round(z)
}
)}
    },
  ]
};
const nodes = [{"id":0,"value":"md`# 3D graphics - first steps - part 3`","pinned":false},{"id":19,"value":"md`# Трехмерная графика - первые шаги\n#### Интерактивное пособие для уроков математики и информатики в старших классах средней школы\n---`","pinned":false},{"id":21,"value":"md`## Часть 3. Формирование поверхности фигуры\n#### (Продолжение [части 2](https://observablehq.com/d/c1e791ba4476a9a5))`","pinned":false},{"id":130,"value":"md`Тор пока представляет собой массив точек (вершин) каждая из которых имеет 3 координаты (x,y,z). Нам нужно как-то \"объяснить\" компьютеру, что эти вершины, вообще-то образуют поверхность фигуры. То есть, помимо вершин, нужно создать еще один блок (массив) информации, где будут храниться сведения, какие точки можно считать смежными и образующими элемент поверхности - грань тора.\nНам повезло: раз мы сами обсчитывали вершины для тора в [части 2](https://observablehq.com/d/c1e791ba4476a9a5)) с помощью вложенных циклов, теперь мы можем воспользоваться тем же самым алгоритмом. Двигаясь по пути, по которому создавались вершины, можно просто отметить близлежащие точки как грани:`","pinned":false},{"id":27,"value":"vertsRotated = rotate(verts, a, b, t)","pinned":false},{"id":51,"value":"faces = {\n  var faces = new Array()  // массив будет содержать индексы смежных вершин\n  \n  for (var i = 0; i < MAJOR_COUNT; i++) { // -- по вершинам большого круга\n    for (var j = 0; j < MINOR_COUNT; j++) { // -- по вершинам малого круга\n\n      var v = i * MINOR_COUNT + j    // получаем индекс для 1-мерного массива\n\n      var v1 = v                      // v    +1\n      var v2 = v + 1                  // v1->-v2   -- принадлежат текущему малому кругу\n      var v3 = v + MINOR_COUNT + 1    // |     |   +  MINOR_COUNT - попадаем в след. круг \n      var v4 = v + MINOR_COUNT        // v4->-v3   -- принадлежт следующему малому кругу\n\n      if (j === MINOR_COUNT - 1) {    // j === последняя вершина в малом круге?\n        v2 = v2 - MINOR_COUNT         // -- замыкаем малый круг на начало, т.е. переводим индексы к стартовой точке\n        v3 = v3 - MINOR_COUNT         // -- замыкаем малый круг на начало, т.е. переводим индексы к стартовой точке\n      }\n         \n      if (i === MAJOR_COUNT - 1) {    // i === последний сегмент в большом круге?\n        v3 = v3 - (i + 1) * MINOR_COUNT // -- замыкаем большой круг (трубу)\n        v4 = j                        // -- замыкаем большой круг (трубу)\n      }\n\n      faces.push([v1, v2, v3, v4])  \n    }\n  }\n\n  return faces\n}","pinned":true},{"id":194,"value":"viewof temp = {\n  const height = 320\n  const ctx = DOM.context2d(width, height)\n  ctx.translate(width / 2, height / 2)\n  ctx.fillStyle = 'green'\n  ctx.clearRect(-width / 2, -height / 2, width, height)\n  var x1, y1, x2, y2, x3,y3 ,x4,y4\n  var verts = vertsRotated\n  for (var i = 0; i < iFaces; i++) {\n  \tx1 = verts[ faces[i][0] ].x;  y1 = verts[ faces[i][0] ].y \n\t\tx2 = verts[ faces[i][1] ].x;  y2 = verts[ faces[i][1] ].y \n\t\tx3 = verts[ faces[i][2] ].x;  y3 = verts[ faces[i][2] ].y \n\t\tx4 = verts[ faces[i][3] ].x;  y4 = verts[ faces[i][3] ].y\n\n\t  drawPoly(ctx, x1, y1,\tx2, y2,\tx3, y3,\tx4, y4,\t'rgb(100,145,155)', true)\n  }\n  return ctx.canvas\n}","pinned":false},{"id":219,"value":"viewof iFaces = slider({label:'Визуализация расчета граней:', value:15, min:0, max:VERT_COUNT, step:1})","pinned":false},{"id":388,"value":"md`Получается настоящая [полигональная сетка](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B8%D0%B3%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%81%D0%B5%D1%82%D0%BA%D0%B0), или \"меш\" (polygon mesh)`","pinned":false},{"id":65,"value":"function drawPoly(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color, stroke, fill) {\n  // отрисовка четырехугольной грани по заданным кординатам\n  ctx.fillStyle = color\n  ctx.strokeStyle = color\n  ctx.beginPath()\n  ctx.moveTo(x1, y1); \n  ctx.lineTo(x2, y2);\n  ctx.lineTo(x3, y3);\n  ctx.lineTo(x4, y4);\n  ctx.closePath()\n  if (stroke) ctx.stroke()\n  if (fill) ctx.fill()\n}","pinned":true},{"id":688,"value":"md`Перед тем, как вывести тор с гранями, раскроем два важных момента: \n1. Желательно не выводить дальние грани, которые закрыты от взгляда более ближними.\nЕсть хитрые алгоритмы отсечения невидимых граней на раннем этапе, но в этом примере мы просто отсортируем их по удаленности от наблюдателя (по координате z), и будем отрисовывать, начиная с самых дальних. Таким образом, более ближние появятся позже и просто закроют/закрасят дальние.\n\n2. Желательно не выводить те грани, которые повернуты к зрителю внутренней стороной, а не внешней. Иначе наблюдатель может увидеть как бы внутреннюю стенку тора, чего в реальности не бывает. Для этого мы найдем *вектор нормали к поверхности грани*, то есть вектор, который перпендикулярен поверхности (как бы торчит из грани). Нас интересует только координата z этого вектора. Если она отрицательна, значит грань отвернулась от зрителя и не должна быть видима.\n\nВектор нормали нам дает векторное произведение 2х векторов:\n        \n        A(ax,ay,az)\n        B(bx,by,bz)\n\t\t\t\t\n        (ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx)\n        из которого нас интересует только z: ax*by - ay*bx\n`","pinned":false},{"id":568,"value":"function drawFigure (ctx, verts, faces) {\n  var x1, y1, x2, y2, x3, y3, x4, y4\n  var ax, ay, bx, by, color\n  \n  if (options.sort) {\n    // сортировка граней по удаленности (по координате z)\n    faces.sort(function(face1, face2) {\n      var z1 = verts[ face1[0] ].z + verts[ face1[1] ].z + verts[ face1[2] ].z //почему не берем 4ю вершину? она все равно\n      var z2 = verts[ face2[0] ].z + verts[ face2[1] ].z + verts[ face2[2] ].z //лежит в той же плоскости. хватит и 3х\n      return (z1 === z2 ? 0 : z1 > z2 ? 1 : -1)\n    })\n  }\n  \n  for (var i = 0; i < iFaces2; i++) {\n    x1 = verts[ faces[i][0] ].x;  y1 = verts[ faces[i][0] ].y \n    x2 = verts[ faces[i][1] ].x;  y2 = verts[ faces[i][1] ].y \n    x3 = verts[ faces[i][2] ].x;  y3 = verts[ faces[i][2] ].y \n    x4 = verts[ faces[i][3] ].x;  y4 = verts[ faces[i][3] ].y\n   \n    // компоненты для векторного произведения (через длины отрезков, составляющих грань):\n    ax = x4 - x1;   ay = y4 - y1\n    bx = x2 - x1;   by = y2 - y1 \n\n    var zNorm = ax * by - ay * bx\n    var color = Math.round(Math.abs(zNorm) / 10)\n    if (\n      (options.normal == true && zNorm > 0) || \n      (options.normal == false)\n    ) drawPoly(ctx, x1, y1, x2, y2, x3, y3, x4, y4, 'rgb(100,' + Number(145+color) + ',155)', false, true )\n  }\n}","pinned":true},{"id":13,"value":"ctx = {\n  const height = 320\n  const ctx = DOM.context2d(width, height)\n  ctx.translate(width / 2, height / 2)\n  ctx.fillStyle = 'green'\n  ctx.clearRect(-width / 2, -height / 2, width, height)\n  drawFigure(ctx, vertsRotated, faces)\n  return ctx.canvas\n}","pinned":false},{"id":549,"value":"viewof iFaces2 = slider({label:'Визуализация порядка вывода граней:', value:15, min:0, max:VERT_COUNT, step:1})","pinned":false},{"id":768,"value":"viewof options = {\n  const form = html`\n    <form>\n       <input type=checkbox name=sort> <i>Сортировать грани по удаленности</i> &nbsp;&nbsp;\n       <input type=checkbox name=normal> <i>Только расположенные видимой частью к наблюдателю</i>\n    </form>\n  `\n  \n  form.oninput = () => {\n    form.value = {sort: form.sort.checked, normal: form.normal.checked}\n  }\n  form.oninput()\n  \n  return form\n} ","pinned":false},{"id":29,"value":"viewof a = slider({\n  min: 0,\n  max: 2*PI,\n  value: 1.725*PI,\n  step: 0.01,\n  label: 'Ось x ',\n  format: v => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n})","pinned":false},{"id":426,"value":"viewof b = slider({\n  min: 0,\n  max: 2*PI,\n  value: 1.725*PI,\n  step: 0.01,\n  label: 'Ось y ',\n  format: v => `b = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n})","pinned":false},{"id":34,"value":"viewof t = slider({\n  min: 0,\n  max: 2*PI,\n  value: 0,\n  step: 0.01,\n  label: 'Ось z ',\n  format: v => `t = ${Math.round(v / PI * 1000) / 1000 } Pi`,\n  description: \"Двигайте слайдеры для поворота вокруг осей\"\n})","pinned":false},{"id":101,"value":"md`---\n### Заключение\n\n\nУважаемый читатель! Надеюсь, теперь вы более подробно представляете, как происходит формирование, хранение, обработка и вывод на экран 3-мерных объектов на компьютере. Здесь были раскрыты только самые начальные принципы. 3D графика используется сейчас повсеместно: в обучении, играх, моделировании, создании кино и мультипликационных фильмов. Если эта тема вам интересна, то впереди еще целая куча информации и тем, связанных с программированием:\n   - применение матричных вычислений   \n   - наложение текстур\n   - освещение\n   - перспектива/проецирование/камера\n   - аппаратное ускорение на видеокартах\n   - OpenGL/WebGL\n\nМного простых и наглядных примеров находится здесь на [Observable](https://observablehq.com).\nИ возможно, стоит ознакомиться с такими программами как : Blender, Maya и т.д.\n\n`","pinned":false},{"id":736,"value":"md`[ *<--* Предыдущая часть](3d-graphics-first-steps-part-2)`","pinned":false},{"id":740,"value":"md`----\n#### Импорт`","pinned":false},{"id":8,"value":"import {sin, cos, PI, slider} from '@yenisey/3d-graphics-first-steps'","pinned":false},{"id":746,"value":"import {VERT_COUNT, MAJOR_COUNT, MINOR_COUNT, verts, rotate} from '@yenisey/3d-graphics-first-steps-part-2'","pinned":false},{"id":108,"value":"viewof width = {\n  const view = html`<span class=\"observablehq--inspect\"><span class=\"observablehq--number\">`;\n  const resized = function resized() {\n    var w = document.body.clientWidth;\n    w > 400 ? w = w * 0.66 : w = w * 0.85\n    if (w !== view.value) {\n      view.firstChild.textContent = view.value = w;\n      view.dispatchEvent(new CustomEvent(\"input\"));\n    }\n  }\n  window.addEventListener('resize', resized);\n  invalidation.then(() => window.removeEventListener('resize', resized));\n  return resized(), view;\n}","pinned":false}];

const notebook = {
  id: "5904f1bb66ed16e5@801",
  modules: [m0,m1,m2],
  nodes
};
export default notebook;
