/* eslint-disable */
// URL: https://observablehq.com/d/7a8c74eb2072bca4
// Title: 3D graphics - first steps - part 1
// Author: Denis Bogachev
// Version: 1419
// Runtime version: 1

const m0 = {
  id: "7a8c74eb2072bca4@1419",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
        md`Демонстрация. [Оригинал](https://observablehq.com/@yenisey/3d-graphics-first-steps) на Observable дает больше интерактивных возможностей, например редактирование кода`
);}),
      node_id: 1231
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Трехмерная графика - первые шаги
#### Интерактивное пособие для уроков математики и информатики в старших классах средней школы
---`
);}),
      node_id: 0
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Часть 1. Введение`
);}),
      node_id: 864
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`В чем главное преимущество трехмерного изображения по сравнению с плоским, например c фотографией?
Конечно же в том, что мы можем его **покрутить**, то есть взглянуть на объект под разными углами.

Поэтому, давайте разберемся сначала с **вращением** во всех подробностях.


`
);}),
      node_id: 197
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Окружность, вращение и угол`
);}),
      node_id: 178
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Начнем с самого простого: рассмотрим поворот точки на плоскости вокруг заданного центра вращения. Если точка сделает полный оборот и вернется в начальную позицию, получится окружность. Расстояние от точки до центра называют радиусом, и обычно обозначают буквой **R**. Диаметр окружности, обозначается как **D**, и он в 2 раза больше радиуса. Угол отклонения радиуса от оси **x** обычно обозначают греческой буквой **α** (альфа). Участок (сектор) окружности, который по длине равен радиусу отмечен красным цветом. Так как величина угла **α** напрямую **пропорциональна** сектору окружности, угол измеряется в этих секторах. Это международная мера угла так и называется - радиан, и обозначается **rad**`
);}),
      node_id: 209
    },
    {
      name: "viewof fig1",
      inputs: ["DOM","width","alpha1","cos","sin","PI"],
      value: (function(DOM,width,alpha1,cos,sin,PI)
{
  const height = 300
  const context = DOM.context2d(width, height)
  const R = Math.min(height / 2 - 40, width / 2 - 40)
  var x, y, alpha = alpha1
  var rad = Math.floor(alpha)
  
  context.translate(width > 400 ? R + 100 : width / 2, height / 2)
  context.font = 'bold 14px arial'
  context.textAlign = 'center'
  context.strokeStyle = '#ccc'
  context.beginPath()
  context.moveTo(0, -height/2)
  context.lineTo(0, height/2)
  context.moveTo(-height, 0)
  context.lineTo(2* R, 0)
  context.stroke()
  
  context.strokeStyle = '#000'
  x = R * cos(alpha)
  y = R * sin(alpha)

  
  context.beginPath()
  context.arc(0, 0, 10, 0, 2 * PI-alpha, true)
  context.fillText(`a`, 20 * cos(alpha / 2),  -10 * sin(alpha / 2))
  context.stroke()
  context.beginPath()
  context.arc(0, 0, R, 2*PI - rad, 2*PI - alpha, true)
  context.lineTo(0, 0)
  context.stroke()
   
  context.beginPath()
  context.arc(0, 0, 2, 0, 2*PI, false)
  context.stroke()

  context.beginPath()
  context.arc(x, -y, 2, 0, 2*PI, false)
  context.stroke()

  while (rad) {
    context.beginPath()
    context.strokeStyle = '#f00'
    //context.lineWidth = 2
    context.arc(0, 0, R, 0, -rad, true)
    context.stroke()
    context.beginPath()
    context.setLineDash([5, 5])
    context.lineWidth = 1
    context.strokeStyle = '#0f0'
    context.moveTo(R * cos(-rad), R * sin(-rad))
    context.lineTo(0, 0)
    context.lineTo(R, 0)
    context.stroke()
    context.setLineDash([])
    context.fillText(`${rad} rad`, (R + 20) * cos(rad - .5), -(R + 10) * sin(rad - .5))
    if (rad===3 && alpha >= PI) context.fillText(`Pi rad`, (R + 20) * cos(PI - 0.02), -(R + 10) * sin(PI - 0.02))
    if (rad===6 && alpha >= 2*PI-0.01) context.fillText(`2Pi rad`, (R + 25) * cos(-0.1), -(R + 10) * sin(-0.1))
    rad--
  }
  
  if (alpha > PI) {
    context.beginPath()
    context.strokeStyle = '#2ad'
    context.fillStyle = '#2ad'
    context.moveTo(R, 0)
    context.lineTo(-R, 0)
    context.closePath()
    context.stroke()
    let w = context.measureText('D = 2*R').width
    context.fillText('D = 2*R', -w, R / 6)
  }
  context.fillStyle = '#000'
  context.fillText('R', x / 2, -y / 2 - 10)
  return context.canvas
}
),
      node_id: 223
    },
    {
      name: "fig1",
      inputs: ["Generators","viewof fig1"],
      value: (G, _) => G.input(_),
      node_id: 223
    },
    {
      name: "viewof alpha1",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({label:'Угол:', value:1/3*PI, min:0, max:2*PI, step:0.001, format:(v) => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`})
);}),
      node_id: 221
    },
    {
      name: "alpha1",
      inputs: ["Generators","viewof alpha1"],
      value: (G, _) => G.input(_),
      node_id: 221
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Еще углы измеряются в градусах от 0° до 360°. Но это исторически сложившаяся мера, которая не имеет взаимосвязи с радиусом окружности.
А математики вообще любят все взаимоувязывать - потому, что так проще запоминать и переходить в расчетах от одной величины к другой. Вот например число π (Pi) показывает сколько длин диаметров понадобится, чтобы нарисовать окружность.`
);}),
      node_id: 1146
    },
    {
      inputs: ["tex"],
      value: (function(tex){return(
tex`\pi = \dfrac{L}{D},\space \text{где L - длина окружности, а D - диаметр}`
);}),
      node_id: 182
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Число Pi можно вычислить лишь приблизительно, потому что оно *иррациональное* (количество знаков после точки бесконечно)`
);}),
      node_id: 1197
    },
    {
      name: "PI",
      value: (function(){return(
Math.PI
);}),
      node_id: 65
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Длину окружности можно записать как L = π\\*D , или если подставить радиус L = π\\*2\\*R (так как радиус в два раза меньше диаметра). Получается, чтобы начертить окружность, радиус должен "пробежать" угол соответствующий длине окружности в 2π\\*R, а угол при этом будет меняться от 0 до 2π (радиан)`
);}),
      node_id: 1151
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Нахождение координат точки после поворота на угол`
);}),
      node_id: 1226
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Проще всего считать что центр окружности распологается в начале координат (0,0). Точка, которую мы поворачиваем, будет принимать меняющиеся координаты (x,y). Если соединить отрезками вершины (0,0)-(x,y)-(x,0), то получится прямоугольный треугольник. Радиус R, образованный отрезком (0,0)-(x,y) является **гипотенузой** прямоугольного треугольника.
`
);}),
      node_id: 340
    },
    {
      name: "viewof fig2",
      inputs: ["DOM","width","alpha2","cos","sin","PI"],
      value: (function(DOM,width,alpha2,cos,sin,PI)
{
  const height = 300
  const context = DOM.context2d(width, height)
  const R = height / 2 - 30
  var x, y, alpha = alpha2

  context.translate(width > 400 ? R + 50 : width / 2, height / 2);
  context.font = 'bold 14px arial'
  context.textAlign = 'center'
  context.strokeStyle = '#ccc'
  context.beginPath()
  context.moveTo(0, -height/2)
  context.lineTo(0, height/2)
  context.moveTo(-height, 0)
  context.lineTo(2* R, 0)
  context.stroke()
  //
  context.strokeStyle = '#000'
  x = R * cos(alpha)
  y = R * sin(alpha)

  var py = Math.round(alpha / 2 / PI) % 2
  var px = Math.round(alpha / PI) % 2
  
  context.beginPath()
  context.arc(0, 0, 2, 0, 2 * PI, false)
  context.stroke()

  context.beginPath()
  context.arc(x, -y, 2, 0, 2 * PI, false)
  context.stroke()
  
  context.beginPath()
  context.arc(x, 0, 2, 0, 2 * PI, false)
  context.stroke()
  
  context.beginPath()
  context.arc(0, 0, 10, 0, 2 * PI-alpha, true)
  context.fillText('a', 16 * cos(alpha / 2),  -8 * sin(alpha / 2))
  context.stroke()
  context.beginPath()
  context.arc(0, 0, R, 0, 2*PI - alpha, true)
  context.lineTo(0, 0)
  context.stroke()

  context.beginPath()
  context.strokeStyle = '#090'
  context.rect(x + [-10, 0][px], [-10, 0][py], 10, 10);
  context.moveTo(0, 0)
  context.lineTo(x, 0)
  context.lineTo(x, -y)
  context.stroke()
 
  context.beginPath()
  context.moveTo(x, -y)
  context.lineTo(0, -y)
  context.setLineDash([5, 5])
  context.stroke()
  context.setLineDash([])
    
  context.fillStyle = '#090'
  context.fillText('x,0', x + 5, [15, -5][py])
  context.fillText('y', [-10, 10][px], -y + 4)


  context.fillStyle = '#000'
  context.fillText('R', x / 2, -y / 2 - 10)
  context.fillText('(0,0)', -10, 15)
  context.fillText('(x,y)', (R + 20) * cos(alpha), -(R + 20) * sin(alpha))
  return context.canvas
}
),
      node_id: 348
    },
    {
      name: "fig2",
      inputs: ["Generators","viewof fig2"],
      value: (G, _) => G.input(_),
      node_id: 348
    },
    {
      name: "viewof alpha2",
      inputs: ["slider","PI"],
      value: (function(slider,PI){return(
slider({label:'Угол:', value:1/3*PI, min:0, max:2*PI, step:0.001, format:(v) => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`})
);}),
      node_id: 539
    },
    {
      name: "alpha2",
      inputs: ["Generators","viewof alpha2"],
      value: (G, _) => G.input(_),
      node_id: 539
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Благодаря тому, что один из углов прямоугольного треугольника **никогда не меняется** (он всегда прямой), в его острых углах и катетах заложена пропорциональность соотношений. Например, изменение угла α, заставляет меняться оба катета и противоположный острый угол при неизменном радиусе (гипотенузе). Два основных соотношения это: синус и косинус.
`
);}),
      node_id: 632
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Косинус — отношение прилежащего катета к гипотенузе. В нашем случае, прилежащий (тот, который образует угол α) катет - это отрезок длиной в (x)

        cos(α) = x / R
`
);}),
      node_id: 646
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Синус — отношение противолежащего (напротив угла α) катета к гипотенузе. В нашем случае это отрезок между точками (x,0) - (x,y), или просто y, потому что длина отрезка всегда равняется (y) и это, видно на графике.

        sin(α) = y / R`
);}),
      node_id: 635
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Получается, что зная радиус R, и угол α мы всегда можем найти координаты точки (x,y) - как длины сторон прямоугольного треугольника:

        x = R * cos(α)
        y = R * sin(α)
Именно так и делается для того, чтобы анимация графиков работала: радиус окружности задан заранее, а угол меняется, когда двигается слайдер. Запомните эти два соотношения, потому что **это все, что нужно для поворота точки на плоскости на заданный угол**.`
);}),
      node_id: 682
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`[Следующая часть *-->*](part-2)`
);}),
      node_id: 1264
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`----
#### Импорт`
);}),
      node_id: 845
    },
    {
      name: "cos",
      value: (function(){return(
Math.cos
);}),
      node_id: 75
    },
    {
      name: "sin",
      value: (function(){return(
Math.sin
);}),
      node_id: 849
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
      node_id: 1249
    },
    {
      name: "width",
      inputs: ["Generators","viewof width"],
      value: (G, _) => G.input(_),
      node_id: 1249
    },
    {
      name: "slider",
      inputs: ["html"],
      value: (function(html){return(
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
);}),
      node_id: 1317
    },
  ]
};

const nodes = [{"id":1231,"value":"md`# 3D graphics - first steps - part 1`","pinned":false},{"id":0,"value":"md`# Трехмерная графика - первые шаги\n#### Интерактивное пособие для уроков математики и информатики в старших классах средней школы\n---`","pinned":false},{"id":864,"value":"md`## Часть 1. Введение`","pinned":false},{"id":197,"value":"md`В чем главное преимущество трехмерного изображения по сравнению с плоским, например c фотографией?\nКонечно же в том, что мы можем его **покрутить**, то есть взглянуть на объект под разными углами.\n\nПоэтому, давайте разберемся сначала с **вращением** во всех подробностях.\n\n\n`","pinned":false},{"id":178,"value":"md`## Окружность, вращение и угол`","pinned":false},{"id":209,"value":"md`Начнем с самого простого: рассмотрим поворот точки на плоскости вокруг заданного центра вращения. Если точка сделает полный оборот и вернется в начальную позицию, получится окружность. Расстояние от точки до центра называют радиусом, и обычно обозначают буквой **R**. Диаметр окружности, обозначается как **D**, и он в 2 раза больше радиуса. Угол отклонения радиуса от оси **x** обычно обозначают греческой буквой **α** (альфа). Участок (сектор) окружности, который по длине равен радиусу отмечен красным цветом. Так как величина угла **α** напрямую **пропорциональна** сектору окружности, угол измеряется в этих секторах. Это международная мера угла так и называется - радиан, и обозначается **rad**`","pinned":false},{"id":223,"value":"viewof fig1 = {\n  const height = 300\n  const context = DOM.context2d(width, height)\n  const R = Math.min(height / 2 - 40, width / 2 - 40)\n  var x, y, alpha = alpha1\n  var rad = Math.floor(alpha)\n  \n  context.translate(width > 400 ? R + 100 : width / 2, height / 2)\n  context.font = 'bold 14px arial'\n  context.textAlign = 'center'\n  context.strokeStyle = '#ccc'\n  context.beginPath()\n  context.moveTo(0, -height/2)\n  context.lineTo(0, height/2)\n  context.moveTo(-height, 0)\n  context.lineTo(2* R, 0)\n  context.stroke()\n  \n  context.strokeStyle = '#000'\n  x = R * cos(alpha)\n  y = R * sin(alpha)\n\n  \n  context.beginPath()\n  context.arc(0, 0, 10, 0, 2 * PI-alpha, true)\n  context.fillText(`a`, 20 * cos(alpha / 2),  -10 * sin(alpha / 2))\n  context.stroke()\n  context.beginPath()\n  context.arc(0, 0, R, 2*PI - rad, 2*PI - alpha, true)\n  context.lineTo(0, 0)\n  context.stroke()\n   \n  context.beginPath()\n  context.arc(0, 0, 2, 0, 2*PI, false)\n  context.stroke()\n\n  context.beginPath()\n  context.arc(x, -y, 2, 0, 2*PI, false)\n  context.stroke()\n\n  while (rad) {\n    context.beginPath()\n    context.strokeStyle = '#f00'\n    //context.lineWidth = 2\n    context.arc(0, 0, R, 0, -rad, true)\n    context.stroke()\n    context.beginPath()\n    context.setLineDash([5, 5])\n    context.lineWidth = 1\n    context.strokeStyle = '#0f0'\n    context.moveTo(R * cos(-rad), R * sin(-rad))\n    context.lineTo(0, 0)\n    context.lineTo(R, 0)\n    context.stroke()\n    context.setLineDash([])\n    context.fillText(`${rad} rad`, (R + 20) * cos(rad - .5), -(R + 10) * sin(rad - .5))\n    if (rad===3 && alpha >= PI) context.fillText(`Pi rad`, (R + 20) * cos(PI - 0.02), -(R + 10) * sin(PI - 0.02))\n    if (rad===6 && alpha >= 2*PI-0.01) context.fillText(`2Pi rad`, (R + 25) * cos(-0.1), -(R + 10) * sin(-0.1))\n    rad--\n  }\n  \n  if (alpha > PI) {\n    context.beginPath()\n    context.strokeStyle = '#2ad'\n    context.fillStyle = '#2ad'\n    context.moveTo(R, 0)\n    context.lineTo(-R, 0)\n    context.closePath()\n    context.stroke()\n    let w = context.measureText('D = 2*R').width\n    context.fillText('D = 2*R', -w, R / 6)\n  }\n  context.fillStyle = '#000'\n  context.fillText('R', x / 2, -y / 2 - 10)\n  return context.canvas\n}","pinned":false},{"id":221,"value":"viewof alpha1 = slider({label:'Угол:', value:1/3*PI, min:0, max:2*PI, step:0.001, format:(v) => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`})\n","pinned":false},{"id":1146,"value":"md`Еще углы измеряются в градусах от 0° до 360°. Но это исторически сложившаяся мера, которая не имеет взаимосвязи с радиусом окружности.\nА математики вообще любят все взаимоувязывать - потому, что так проще запоминать и переходить в расчетах от одной величины к другой. Вот например число π (Pi) показывает сколько длин диаметров понадобится, чтобы нарисовать окружность.`","pinned":false},{"id":182,"value":"tex`\\pi = \\dfrac{L}{D},\\space \\text{где L - длина окружности, а D - диаметр}`","pinned":false},{"id":1197,"value":"md`Число Pi можно вычислить лишь приблизительно, потому что оно *иррациональное* (количество знаков после точки бесконечно)`","pinned":false},{"id":65,"value":"PI  = Math.PI //-приблизительное значение! число Pi вообще имеет бесконечное число знаков","pinned":false},{"id":1151,"value":"md`Длину окружности можно записать как L = π\\\\*D , или если подставить радиус L = π\\\\*2\\\\*R (так как радиус в два раза меньше диаметра). Получается, чтобы начертить окружность, радиус должен \"пробежать\" угол соответствующий длине окружности в 2π\\\\*R, а угол при этом будет меняться от 0 до 2π (радиан)`","pinned":false},{"id":1226,"value":"md`## Нахождение координат точки после поворота на угол`","pinned":false},{"id":340,"value":"md`Проще всего считать что центр окружности распологается в начале координат (0,0). Точка, которую мы поворачиваем, будет принимать меняющиеся координаты (x,y). Если соединить отрезками вершины (0,0)-(x,y)-(x,0), то получится прямоугольный треугольник. Радиус R, образованный отрезком (0,0)-(x,y) является **гипотенузой** прямоугольного треугольника.\n`","pinned":false},{"id":348,"value":"viewof fig2 = {\n  const height = 300\n  const context = DOM.context2d(width, height)\n  const R = height / 2 - 30\n  var x, y, alpha = alpha2\n\n  context.translate(width > 400 ? R + 50 : width / 2, height / 2);\n  context.font = 'bold 14px arial'\n  context.textAlign = 'center'\n  context.strokeStyle = '#ccc'\n  context.beginPath()\n  context.moveTo(0, -height/2)\n  context.lineTo(0, height/2)\n  context.moveTo(-height, 0)\n  context.lineTo(2* R, 0)\n  context.stroke()\n  //\n  context.strokeStyle = '#000'\n  x = R * cos(alpha)\n  y = R * sin(alpha)\n\n  var py = Math.round(alpha / 2 / PI) % 2\n  var px = Math.round(alpha / PI) % 2\n  \n  context.beginPath()\n  context.arc(0, 0, 2, 0, 2 * PI, false)\n  context.stroke()\n\n  context.beginPath()\n  context.arc(x, -y, 2, 0, 2 * PI, false)\n  context.stroke()\n  \n  context.beginPath()\n  context.arc(x, 0, 2, 0, 2 * PI, false)\n  context.stroke()\n  \n  context.beginPath()\n  context.arc(0, 0, 10, 0, 2 * PI-alpha, true)\n  context.fillText('a', 16 * cos(alpha / 2),  -8 * sin(alpha / 2))\n  context.stroke()\n  context.beginPath()\n  context.arc(0, 0, R, 0, 2*PI - alpha, true)\n  context.lineTo(0, 0)\n  context.stroke()\n\n  context.beginPath()\n  context.strokeStyle = '#090'\n  context.rect(x + [-10, 0][px], [-10, 0][py], 10, 10);\n  context.moveTo(0, 0)\n  context.lineTo(x, 0)\n  context.lineTo(x, -y)\n  context.stroke()\n \n  context.beginPath()\n  context.moveTo(x, -y)\n  context.lineTo(0, -y)\n  context.setLineDash([5, 5])\n  context.stroke()\n  context.setLineDash([])\n    \n  context.fillStyle = '#090'\n  context.fillText('x,0', x + 5, [15, -5][py])\n  context.fillText('y', [-10, 10][px], -y + 4)\n\n\n  context.fillStyle = '#000'\n  context.fillText('R', x / 2, -y / 2 - 10)\n  context.fillText('(0,0)', -10, 15)\n  context.fillText('(x,y)', (R + 20) * cos(alpha), -(R + 20) * sin(alpha))\n  return context.canvas\n}","pinned":false},{"id":539,"value":"viewof alpha2 = slider({label:'Угол:', value:1/3*PI, min:0, max:2*PI, step:0.001, format:(v) => `a = ${Math.round(v / PI * 1000) / 1000 } Pi`})","pinned":false},{"id":632,"value":"md`Благодаря тому, что один из углов прямоугольного треугольника **никогда не меняется** (он всегда прямой), в его острых углах и катетах заложена пропорциональность соотношений. Например, изменение угла α, заставляет меняться оба катета и противоположный острый угол при неизменном радиусе (гипотенузе). Два основных соотношения это: синус и косинус.\n`","pinned":false},{"id":646,"value":"md`Косинус — отношение прилежащего катета к гипотенузе. В нашем случае, прилежащий (тот, который образует угол α) катет - это отрезок длиной в (x)\n\n        cos(α) = x / R\n`","pinned":false},{"id":635,"value":"md`Синус — отношение противолежащего (напротив угла α) катета к гипотенузе. В нашем случае это отрезок между точками (x,0) - (x,y), или просто y, потому что длина отрезка всегда равняется (y) и это, видно на графике.\n\n        sin(α) = y / R`","pinned":false},{"id":682,"value":"md`Получается, что зная радиус R, и угол α мы всегда можем найти координаты точки (x,y) - как длины сторон прямоугольного треугольника:\n\n        x = R * cos(α)\n        y = R * sin(α)\nИменно так и делается для того, чтобы анимация графиков работала: радиус окружности задан заранее, а угол меняется, когда двигается слайдер. Запомните эти два соотношения, потому что **это все, что нужно для поворота точки на плоскости на заданный угол**.`","pinned":false},{"id":1264,"value":"md`[Следующая часть *-->*](3d-graphics-first-steps-part-2)`","pinned":false},{"id":845,"value":"md`----\n#### Импорт`","pinned":false},{"id":75,"value":"cos = Math.cos","pinned":false},{"id":849,"value":"sin = Math.sin","pinned":false},{"id":1249,"value":"viewof width = {\n  const view = html`<span class=\"observablehq--inspect\"><span class=\"observablehq--number\">`;\n  const resized = function resized() {\n    var w = document.body.clientWidth;\n    w > 400 ? w = w * 0.66 : w = w * 0.85\n    if (w !== view.value) {\n      view.firstChild.textContent = view.value = w;\n      view.dispatchEvent(new CustomEvent(\"input\"));\n    }\n  }\n  window.addEventListener('resize', resized);\n  invalidation.then(() => window.removeEventListener('resize', resized));\n  return resized(), view;\n}","pinned":false},{"id":1317,"value":"function slider({label = '', value, min, max, step, format = (v) => v})  {\n  const div = html`\n    <div style=\"display: flex; flex-direction: row; flex-wrap: wrap;\">\n       <i style=\"flex: 0 0 auto; padding-right:.4em;\">${label}</i>\n       <input type=range min=${min} max=${max} step=${step} style=\"flex: 0 0 auto; display: flex;\">\n       <span type=view style=\"flex: 0 0 auto; display: flex; padding-left:.4em;\"></span>\n    </div>\n  `\n  const range = div.querySelector(\"[type=range]\")\n  const view = div.querySelector(\"[type=view]\")\n  div.value = range.value = value\n  view.innerText = format(div.value)\n  range.oninput = () => {div.value = range.valueAsNumber; view.innerText = format(range.valueAsNumber)}\n  range.oninput()\n  \n  return div\n}\n","pinned":false}];

const notebook = {
  id: "7a8c74eb2072bca4@1419",
  modules: [m0],
  nodes
};
export default notebook;
