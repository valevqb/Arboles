
export default function IcePlotLados(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["final_results.json",new URL("Exportations.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Exportaciones CR en el año 2019`
)});
  main.variable(observer("chart")).define("chart", ["data","d3","width","height","format"], function(data,d3,width,height,format)
{
  //funcion para hacer los calculos de los valores
  function partition(){
    const IcePlotID = d3.hierarchy(data)
      .sum(d => {console.log(d); return d.children? undefined:d.dm}) //saca totales
      .sort((a, b) => b.height - a.height || b.value - a.value); 
    return d3.partition()
      .size([height, (IcePlotID.height + 1) * width / 4])
      (IcePlotID);
  }
   
  //crea el arbol 
  const IcePlotID = partition(data);
  
  //diccionario de colores
  const colorDicc = {"Animal Products":"rgb(255,153,0)","Vegetable Products":"rgb(113,174,72)","Animal and Vegetable Bi-Products":"rgb(204,204,0)","Foodstuffs":"rgb(112,48,160)","Mineral Products":"rgb(117,113,113)","Chemical Products":"rgb(255,0,0)","Plastics and Rubbers":"rgb(0,112,192)","Animal Hides":"rgb(204,153,0)","Wood Products":"rgb(102,51,0)","Paper Goods":"rgb(217,217,217)","Textiles":"rgb(255,91,173)","Footwear and Headwear":"rgb(204,102,0)","Stone And Glass":"rgb(198,227,225)","Precious Metals":"rgb(0,176,240)","Metals":"rgb(0,55,102)","Machines":"rgb(204,204,255)","Transportation":"rgb(0,102,153)","Instruments":"rgb(255,217,102)","Weapons":"rgb(128,0,0)","Miscellaneous":"rgb(148,129,43)","Arts and Antiques":"rgb(188,0,130)"};
  
  //dicionario de colores de letras
  const colorLetter = {"Animal Products":"#000000","Vegetable Products":"#000000","Animal and Vegetable Bi-Products":"#000000","Foodstuffs":"#FFFFFF","Mineral Products":"#FFFFFF","Chemical Products":"#FFFFFF","Plastics and Rubbers":"#FFFFFF","Animal Hides":"#000000","Wood Products":"#FFFFFF","Paper Goods":"#000000","Textiles":"#000000","Footwear and Headwear":"#FFFFFF","Stone And Glass":"#000000","Precious Metals":"#000000","Metals":"#FFFFFF","Machines":"#000000","Transportation":"#FFFFFF","Instruments":"#000000","Weapons":"#FFFFFF","Missquareaneous":"#FFFFFF","Arts and Antiques":"#FFFFFF"};
  
  //lista colores con blanco
  const forWhite = ["rgb(117, 113, 113)","rgb(255, 0, 0)","rgb(112, 48, 160)","rgb(0, 112, 192)","rgb(102, 51, 0)","rgb(204, 102, 0)","rgb(0, 55, 102)","rgb(0, 102, 153)","rgb(128, 0, 0)","rgb(148, 129, 43)","rgb(188, 0, 130)"]
  
  //elemento princpal
  let nodes = IcePlotID;
  
  //Muestra la información de cada nodo
  var infoLayout = d3
      .select('body')
      .append('rect')
      .style('position', 'absolute')
      .style('z-index', '10') //en donde se ubica
      .style('visibility', 'hidden')

  //Crea un svg
  const svg = d3.create("svg")
  .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform);
    }));
  
  //muestra ;a caja con la información
  svg.attr("viewBox", [0, 0, width, height])
    .style("font", "14px Courier New")

  //Calcula las celdas
  const square = svg
    .selectAll("g")
    .data(IcePlotID.descendants())
    .join("g")
      .attr("transform", d => "translate(" + (d.y0)/1.5 + "," + d.x0 + ")");

  //Muestra el conjunto de celdas
  const rect = square
      .append("rect")
      .attr("width", d => (d.y1 - d.y0 - 1)/1.5)
      .attr("height", d => rectHeight(d))
      .attr("fill-opacity", 0.6)
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return colors(d);
      })
      .style("cursor", "pointer")
      .style("margin", "1px 1px 1px 1px")
      .on("click", clicked)
      .on("mouseover", function() {
          infoLayout.style('visibility', 'visible');
        })
      .on('mousemove', function(d) { //Cambia cuando el mouse se posiciona
            var backColor = d3.select(this).style("fill")
            return infoLayout
            .style('top', d3.event.pageY - 20 + 'px')
            .style('left', d3.event.pageX + 20 + 'px')
            .text(d.data.name + " with " + d.value).style('color', d => {return containsC(backColor)})
            .style('background-color', backColor)})
        .on("mouseout", function() {
          d3.select(this)
            .attr("fill", d => {
               if (!d.depth) return "#ccc";
               while (d.depth > 1) d = d.parent;
               return colors(d);
            });
            infoLayout.style('visibility', 'hidden');
        })
      ;

  //Agrega el texto
  const text = square.append("text")
      .style("fill", d => {
        colorsL(d);
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
          return colorsL(d);
      })
      .attr("pointer-events", "none")
      .attr("x", 4)
      .attr("y", 13)
      .attr("fill-opacity", d => +labelVisible(d));

  //muestra el nombre en la celda
  text.append("tspan")
      .text(d => d.data.name);

  //muestra el nombre y total en cada hoja
  const tspan = text.append("tspan")
      .attr("fill-opacity", d => labelVisible(d) * 0.7)
      .text(d =>{ if (!d.children) return "\n"+d.value});

  //funcion que hace zoom para al presionar
  function clicked(p) {
    nodes = nodes === p ? p = p.parent : p;

    IcePlotID.each(d => d.target = {
      x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
      x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
      y0: d.y0 - p.y0,
      y1: d.y1 - p.y0
    });

    const t = square.transition().duration(750)
        .attr("transform", d => `translate(${(d.target.y0)/1.5},${d.target.x0})`);

    rect.transition(t).attr("height", d => rectHeight(d.target));
    text.transition(t).attr("fill-opacity", d => +labelVisible(d.target));
    tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
  }
  
  function rectHeight(d) {
    return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
  }

  function labelVisible(d) {
    return d.y1 <= (width/2) && d.y0 >= 0 && d.x1 - d.x0 > 16;
  }
  
  //Calcila los colores a utilizar
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
    
 const leyenda = svg.append("g")
    .attr("class", "leyenda");
    
  var legendY = 0;
    
  //Agrega los cuadrados de las leyendas    
  leyenda.selectAll("rect")
  .data(IcePlotID.descendants(), d => d)
  .enter()
      .append('rect')
      .attr('x', 740)
      .attr('y', d => {
          legendY += 25;
          return legendY;
      })
      .attr('width', d => {
          if(hasKey(d)!=null) return 20})
      .attr('height', d => {
          if(hasKey(d)!=null) return 20})
      .style('fill',  d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
          return colors(d);
      });
    
  legendY = 15;
      
  //Agrega las leyendas
  leyenda.selectAll("text")
    .data(IcePlotID.descendants(), d => d)
    .enter()
    .append('text')
    .attr('x', 770)
    .attr('y', d => {
      legendY += 25;
      return legendY;
    })
    .text(d => hasKey(d))
    .style('fill',  d => {
        //colors(d);
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
          return colors(d);
      });
      
  //Busca una llave existente
  function hasKey(d){
    if (colorDicc[d.data.name] != undefined){
        return d.data.name;
    }
    return null;
  }
  
  //Clasifica colores según el diccionario
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
  
  function colorsL(d){
      try{
          while(colorLetter[d.data.name] == undefined){
              d = d.parent;
          }
          return colorLetter[d.data.name];
      }catch{
          ;
      }
  }
  
  function containsC(colorss){
      for (const index in forWhite){
          //console.log(d3.rgb(forWhite[index]),d3.rgb(colorss))
          if(forWhite[index] == colorss){
              return "white"
          }
      }
      return "black"
  }
  
  return svg.node();
}
);

  main.variable(observer("none")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("final_results.json").json()
)});
  main.variable(observer("none")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("none")).define("width", function(){return(
975
)});
  main.variable(observer("none")).define("height", function(){return(
1200
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
