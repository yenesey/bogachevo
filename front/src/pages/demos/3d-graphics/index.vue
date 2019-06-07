<template lang="pug">
  .article(ref="article")
</template>

<script>
//import {Runtime, Inspector, Library} from './runtime'

import * as observable from './runtime'
import part1 from './part-1.js'
import part2 from './part-2.js'
import part3 from './part-3.js'

export default {
  mounted () {
    var part = {
      'part-1': part1,
      'part-2': part2,
      'part-3': part3,
    }
    const {md} = new observable.Library()
    loadWithSource(part[this.$route.params.part], intoWithSource( this.$refs.article, "true", md()))
    //new Runtime(new Library()).module(notebook, Inspector.into( this.$refs.article ))
  }

}


// The function "loadWithSource" is modified from:
// https://github.com/observablehq/runtime/blob/9019bfef749255b5ae14d8dad8dfc2d91f88bad9/src/load.js#L4
// see the license at:
// https://github.com/observablehq/runtime/blob/master/LICENSE
function loadWithSource(notebook, library, observer) {
  if (typeof library == "function") observer = library, library = null;
  if (typeof observer !== "function") throw new Error("invalid observer");
  if (library == null) library = new observable.Library();

  const {modules, id, nodes} = notebook;
  const map = new Map;
  const runtime = new observable.Runtime(library);
  const main = runtime_module(id);

  function runtime_module(id) {
    let module = map.get(id);
    if (!module) map.set(id, module = runtime.module());
    return module;
  }

  for (const m of modules) {
    const module = runtime_module(m.id);
    for (let i = 0; i < m.variables.length; i++) {
      const v = m.variables[i];
      if (module === main) // attach node object to variable
        v.node = nodes.find(({id}) => id === v.node_id);
      if (v.from) { // import cell
        module.import(v.remote, v.name, runtime_module(v.from));
        if (module === main) { // imitate Observable's output for an import with a fake cell
          const importedVars = [v];
          const i0 = i;
          // only show this fake cell once for each import
          while (i+1 < m.variables.length && m.variables[i+1].from === v.from) {
            const nextImport = m.variables[++i];
            importedVars.push(nextImport);
            module.import(nextImport.remote, nextImport.name, runtime_module(v.from));
          }
          const nbURL = 'https://observablehq.com' + (v.from.match(/\//) ? '/' : '/d/') + v.from;
          module.variable(observer(v, i0, m.variables))
            .define(`import ${v.name}`, ["html"], 
                    (function(html){return(html`
<pre>import {${importedVars.map(
            ({name, remote}) => {
              return `<a href="${nbURL}#${remote}">${remote}</a>` + (name === remote ? '' : ' as ' + name);
            }
          ).join(', ')}} from <a href="${nbURL}">${v.from}
`)}));
        }
      }
      else if (module === main) { // only attach observers to variables in the main module
        if (v.node === undefined) console.log(`missing node object at variable ${i}: ${JSON.stringify(v)}`);
        // comment-only cell: (observer is actually an observer factory)
        if (!v.value) module.variable(observer(v, i, m.variables))
          .define(null, ["md"], (function(md){return(md`\`\`\`js
${v.node.value}
\`\`\``)}));
        else {
          if (v.name && v.name.startsWith('initial ')) { // mutable cell 
            // (assumes variables come in the order initial Y -> mutable Y -> Y)
            module.variable().define(v.name, v.inputs, v.value); // initial Y
            const v1 = m.variables[++i]; // mutable Y
            module.variable().define(v1.name, v1.inputs, v1.value);
            const v2 = m.variables[++i]; // Y
            v2.node = v.node;
            module.variable(observer(v2, i-2, m.variables)).define(v2.name, v2.inputs, v2.value);
          } 
          else {
            module.variable(observer(v, i, m.variables)).define(v.name, v.inputs, v.value);            
            if (v.name && v.name.startsWith('viewof ')) { // viewof cell 
              // (assumes variables come in the order viewof X -> X)
              const v1 = m.variables[++i]; // X
              v1.node = v.node;
              module.variable().define(v1.name, v1.inputs, v1.value);
            }
          }
        }
      }
      else module.define(v.name, v.inputs, v.value); // dependencies in imported modules
    }
  }
  return runtime;
}
// The function "intoWithSource" is modified from:
// https://github.com/observablehq/inspector/blob/115a96dd78d41f7fbebc0260155aa9ec90cccca3/src/index.js#L51
// see the license at: 
// https://github.com/observablehq/inspector/blob/master/LICENSE
function intoWithSource(container, prefix="myInspect", md, reverse=false) {
  if (typeof container === "string") {
    container = document.querySelector(container);
    if (container == null) throw new Error("container not found");
  }
  return function(v) { // supplied inputs are variable, array index, array of all variables
    const newContainer = container.appendChild(document.createElement("div"));
    const div = document.createElement("div");
    // makes links to cells work
    if (v.name) {
      const name = v.name.split(' ');
      if (name[0] === "viewof" || name[0] === "initial") name.shift();
      if (name.length === 1 && !document.querySelector(name[0])) div.setAttribute("id", name[0]);
    }
    const newdiv = newContainer.appendChild(div);
    if (v.node !== undefined) { // if node not attached, this'll just act like the default inspector
      newContainer.setAttribute("id", `${prefix}-node-${v.node.id}`)
      newdiv.setAttribute("class", v.node.pinned ?
                          `${prefix}-pinned${reverse ? ` ${prefix}-reverse` : ''}` :
                          `${prefix}-unpinned${reverse ? ` ${prefix}-reverse` : ''}`);
      if (v.from || v.value) { // show source if not comment-only cell
        const sourcediv = reverse ? newContainer.insertBefore(document.createElement("div"), newdiv) : 
          newContainer.appendChild(document.createElement("div"));
        sourcediv.setAttribute(
          "class",
          `${prefix}-source ${v.node.pinned ?
          `${prefix}-source-pinned` :
          `${prefix}-source-unpinned`}`);
        if (v.node.pinned) sourcediv.appendChild(md`\`\`\`js
${v.node.value}
\`\`\``);
        else sourcediv.addEventListener('click', event => {
          if (sourcediv.firstChild) sourcediv.firstChild.remove();
          else sourcediv.appendChild(md`\`\`\`js
${v.node.value}
\`\`\``);
        });
      }
    }
    return new observable.Inspector(newdiv);
  };
}

</script>

<style lang="scss">

.observablehq {
  font-size: 1.1em;
  overflow-x: auto;
  overflow-y: hidden;
  pre {
    overflow-x: auto;
  }
}

.article {
  margin-left:1em;
  margin-right:1em;
  @include break('sm', 'up') {
    margin-left:16.66%;
    margin-right:16.66%;
  }
}

.false-pinned {
  border: 1px solid #aaa;
  margin: 10px 0px 0px 0px;
}
.false-unpinned {
  border: 1px solid #eee;
  margin: 10px 0px 0px 0px;
}
.false-pinned.false-reverse, .false-unpinned.false-reverse {
  margin: 0px 0px 10px 0px;
}
.false-source, .false-source pre {
  margin: 0px;
  overflow-wrap: break-word;
   white-space: pre-wrap;       /* css-3 */
   white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
   white-space: -pre-wrap;      /* Opera 4-6 */
   white-space: -o-pre-wrap;    /* Opera 7 */
   word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
.false-source {
  padding: 5px 10px 5px 10px;
}
.false-source-pinned, .false-source-pinned .hljs {
  background-color: #f7f7ff;
  color: #220;
}
.false-source-unpinned, .false-source-unpinned .hljs {
  cursor: pointer;
  background-color: #fff7f7;
  color: #333;
}










/*

Colorbrewer theme
Original: https://github.com/mbostock/colorbrewer-theme (c) Mike Bostock <mike@ocks.org>
Ported by Fabrício Tavares de Oliveira

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #fff;
}

.hljs,
.hljs-subst {
  color: #000;
}

.hljs-string,
.hljs-meta,
.hljs-symbol,
.hljs-template-tag,
.hljs-template-variable,
.hljs-addition {
  color: #756bb1;
}

.hljs-comment,
.hljs-quote {
  color: #636363;
}

.hljs-number,
.hljs-regexp,
.hljs-literal,
.hljs-bullet,
.hljs-link {
  color: #31a354;
}

.hljs-deletion,
.hljs-variable {
  color: #88f;
}



.hljs-keyword,
.hljs-selector-tag,
.hljs-title,
.hljs-section,
.hljs-built_in,
.hljs-doctag,
.hljs-type,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-strong {
  color: #3182bd;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-attribute {
  color: #e6550d;
}

/*
:root{--syntax_normal:#1b1e23;--syntax_comment:#a9b0bc;--syntax_number:#20a5ba;--syntax_keyword:#c30771;--syntax_atom:#10a778;--syntax_string:#008ec4;--syntax_error:#ffbedc;--syntax_unknown_variable:#838383;--syntax_known_variable:#005f87;--syntax_matchbracket:#20bbfc;--syntax_key:#6636b4;--mono_fonts:82%/1.5 Menlo,Consolas,monospace}.observablehq--collapsed,.observablehq--expanded,.observablehq--function,.observablehq--gray,.observablehq--import,.observablehq--string:after,.observablehq--string:before{color:var(--syntax_normal)}.observablehq--collapsed,.observablehq--inspect a{cursor:pointer}.observablehq--field{text-indent:-1em;margin-left:1em}.observablehq--empty{color:var(--syntax_comment)}.observablehq--blue,.observablehq--keyword{color:#3182bd}.observablehq--forbidden,.observablehq--pink{color:#e377c2}.observablehq--orange{color:#e6550d}.observablehq--boolean,.observablehq--null,.observablehq--undefined{color:var(--syntax_atom)}.observablehq--bigint,.observablehq--date,.observablehq--green,.observablehq--number,.observablehq--regexp,.observablehq--symbol{color:var(--syntax_number)}.observablehq--index,.observablehq--key{color:var(--syntax_key)}.observablehq--empty{font-style:oblique}.observablehq--purple,.observablehq--string{color:var(--syntax_string)}.observablehq--error,.observablehq--red{color:#e7040f}.observablehq--inspect{font:var(--mono_fonts);overflow-x:auto;display:block;white-space:pre}.observablehq--error .observablehq--inspect{word-break:break-all;white-space:pre-wrap}
*/

</style>