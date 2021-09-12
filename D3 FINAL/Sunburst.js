
export default function Sunburst(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["flare-2.json",new URL("Exportations.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Exportaciones CR en el año 2019`
)});

  main.variable(observer("chart")).define("chart", ["partition","data","width","arc","format","radius","d3"], function(partition,data,width,arc,format,radius,d3)
{
    //Paletas para colores
  const colorDicc = {"Animal Products":"rgb(255,153,0)","Vegetable Products":"rgb(113,174,72)","Animal and Vegetable Bi-Products":"rgb(204,204,0)","Foodstuffs":"rgb(112,48,160)","Mineral Products":"rgb(117,113,113)","Chemical Products":"rgb(255,0,0)","Plastics and Rubbers":"rgb(0,112,192)","Animal Hides":"rgb(204,153,0)","Wood Products":"rgb(102,51,0)","Paper Goods":"rgb(217,217,217)","Textiles":"rgb(255,91,173)","Footwear and Headwear":"rgb(204,102,0)","Stone And Glass":"rgb(198,227,225)","Precious Metals":"rgb(0,176,240)","Metals":"rgb(0,55,102)","Machines":"rgb(204,204,255)","Transportation":"rgb(0,102,153)","Instruments":"rgb(255,217,102)","Weapons":"rgb(128,0,0)","Miscellaneous":"rgb(148,129,43)","Arts and Antiques":"rgb(188,0,130)"};
  
  const colorLetter = {"Animal Products":"#000000","Vegetable Products":"#000000","Animal and Vegetable Bi-Products":"#000000","Foodstuffs":"#FFFFFF","Mineral Products":"#FFFFFF","Chemical Products":"#FFFFFF","Plastics and Rubbers":"#FFFFFF","Animal Hides":"#000000","Wood Products":"#FFFFFF","Paper Goods":"#000000","Textiles":"#000000","Footwear and Headwear":"#FFFFFF","Stone And Glass":"#000000","Precious Metals":"#000000","Metals":"#FFFFFF","Machines":"#000000","Transportation":"#FFFFFF","Instruments":"#000000","Weapons":"#FFFFFF","Miscellaneous":"#FFFFFF","Arts and Antiques":"#FFFFFF"};
  
  
  //creacion del arbol
  const sunburstTree = partition(data);

  //Uno a uno
  sunburstTree.each(d => d.current = d);

  //Creacion del svg a mostrar
  const svg = d3.create("svg")
       .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform);
    }));
    
 //creacion del viewbox
  svg.attr("viewBox", [0, 0, width, width])
    .style("font", "18px Courier New")

  const g = svg.append("g")
      .attr("transform", `translate(${width/2},${radius*3.3})`);

  //Crea un path y calcula 
  const path = g.append("g")
    .selectAll("path")
    .data(sunburstTree.descendants().slice(1))
    .join("path")
      .attr("fill", d => {
        console.log(colors(d));
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
          return colors(d);
        })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("d", d => arc(d.current))
        
     
  path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked)
      .on("mouseover", function() {
          d3.select(this).attr("fill", "#027368")
        })
      .on('mousemove', function(d) {
          d3.select(this).attr("fill", "#027368")})
        .on("mouseout", function() {
          d3.select(this)
            .attr("fill", d => {
               if (!d.depth) return "#ccc";
               while (d.depth > 1) d = d.parent;
               return colors(d);
            });
        })
        
  path.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("<-")}\n${format(d.value)}`);

  const parent = g.append("circle")
      .datum(sunburstTree) //dato tomado de
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

  function clicked(event, p) {
    parent.datum(p.parent || sunburstTree);

    //ayuda a maximizar el tamaño para que sea igual al anterior
    sunburstTree.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth)
    });

    //visualización de movimientos
    const t = g.transition().duration(700);

    // Para hacer los movimientos de cercanía
    path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
      .filter(function(d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", d => () => arc(d.current));

    //eliminar otros niveles
    label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
  }
  
  //Escribe las leyendas
  const leyenda = svg.append("g")
    .attr("class", "leyenda");
    
  //inicio leyenda
  var legendY = 25;
    
  //creacion de cuadrados para leyenda
  leyenda.selectAll("rect")
  .data(sunburstTree.descendants(), d => d)
  .enter()
      .append('rect')
      .attr('x', 1130)
      .attr('y', d => {
          legendY += 25;
          return legendY;
      })
      .attr('width', d => {
          if(hasKey(d)!=null) return 20}) //verifica la existencia de las llaves
      .attr('height', d => {
          if(hasKey(d)!=null) return 20}) //verifica la existencia de las llaves
      .style('fill',  d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
          return colors(d);
      });
    
  //Inicio leyenda texto
  legendY = 40;
      
  //Selecciona texto buscando los nodos principales
  leyenda.selectAll("text")
    .data(sunburstTree.descendants(), d => d) //busca los decendientes
    .enter()
    .append('text')
    .attr('x', 1160)
    .attr('y', d => {
      legendY += 25;
      return legendY;
    })
    .text(d => hasKey(d))
    .style('fill',  d => { //busca que toda la familia sea del mismo color
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
          return colors(d);
      });
      
  //verificación existencia de llave en el diccionario
  function hasKey(d){
    if (colorDicc[d.data.name] != undefined){
        return d.data.name;
    }
    return null;
  }
  
  //visibilidad del arco
  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 3 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 3 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }
  
  //Ancla a los colores con los nodos del primer nivel
  function colors(d){
      try{
          while(colorDicc[d.data.name] == undefined){
              d = d.parent;
          }
          return colorDicc[d.data.name];
      }catch{
          ;
      }
  }

  return svg.node();
}
);

//Para carga
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("flare-2.json").json()
)});

//verifica el formato de D3
  main.variable(observer()).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});

//Variable para aegurarse del llamado de D3,
//caso contrario es en HTML
  main.variable(observer()).define("d3", ["require"], function(require){return(
require("d3@6")
)});

//Particion que crea el arbol
  main.variable(observer()).define("partition", ["d3"], function(d3){return(
data => {
  const sunburstTree = d3.hierarchy(data)
      .sum(d => {console.log(d); return d.children? undefined:d.dm}) //saca totales
      .sort((a, b) => b.value - a.value);
  return d3.partition()
      .size([2 * Math.PI, sunburstTree.height + 1]) //(x,y)
    (sunburstTree);
}
)});

//Calcula el tamaño real de la ventana
  main.variable(observer()).define("width", function(){return(
window.innerWidth
)});

//Calcula el radio despecto a la ventana
  main.variable(observer()).define("radius", ["width"], function(width){return(
width / 15
)});

//Formula para crear arcos con ayuda de la librería
  main.variable(observer()).define("arc", ["radius","d3"], function(radius,d3){return(
d3.arc()
    .startAngle(d => {return d.x0})
    .endAngle(d => {return d.x1})
    .padAngle(d => {return Math.min((d.x1 - d.x0) / 2, 0.005)})
    .padRadius(d => {return radius * 1.5})
    .innerRadius(d => {return d.y0 * radius})
    .outerRadius(d => {return Math.max(d.y0 * radius, d.y1 * radius - 1)})
)});

  return main;
}
