
export default function IcePlotArribaAbajo(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["final_results.json",new URL("Exportations.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Exportaciones CR en el año 2019`
)});
      main.variable(observer("IcePlotArrAb")).define("IcePlotArrAb", ["data","d3","width","height","format"], function(data,d3,width,height,format)
{
  //funcion para hacer los calculos de los valores asi como tamaños
  function partition(){
    const IcePlotAA = d3.hierarchy(data)
      .sum(d => {console.log(d); return d.children? undefined:d.dm}) //saca totales
      .sort((a, b) => b.value - a.value);
    return d3.partition()
      .size([height, (IcePlotAA.height + 1) * (width / 4)])
      (IcePlotAA);
  }
  
  //Crea el arbol
  const IcePlotAA = partition(data);
  
  //Diccionario para cuadros
  const colorDicc = {"Animal Products":"rgb(255,153,0)","Vegetable Products":"rgb(113,174,72)","Animal and Vegetable Bi-Products":"rgb(204,204,0)","Foodstuffs":"rgb(112,48,160)","Mineral Products":"rgb(117,113,113)","Chemical Products":"rgb(255,0,0)","Plastics and Rubbers":"rgb(0,112,192)","Animal Hides":"rgb(204,153,0)","Wood Products":"rgb(102,51,0)","Paper Goods":"rgb(217,217,217)","Textiles":"rgb(255,91,173)","Footwear and Headwear":"rgb(204,102,0)","Stone And Glass":"rgb(198,227,225)","Precious Metals":"rgb(0,176,240)","Metals":"rgb(0,55,102)","Machines":"rgb(204,204,255)","Transportation":"rgb(0,102,153)","Instruments":"rgb(255,217,102)","Weapons":"rgb(128,0,0)","Miscellaneous":"rgb(148,129,43)","Arts and Antiques":"rgb(188,0,130)"};
  
  //Diccionario para letras
  const colorLetter = {"Animal Products":"#000000","Vegetable Products":"#000000","Animal and Vegetable Bi-Products":"#000000","Foodstuffs":"#FFFFFF","Mineral Products":"#FFFFFF","Chemical Products":"#FFFFFF","Plastics and Rubbers":"#FFFFFF","Animal Hides":"#000000","Wood Products":"#FFFFFF","Paper Goods":"#000000","Textiles":"#000000","Footwear and Headwear":"#FFFFFF","Stone And Glass":"#000000","Precious Metals":"#000000","Metals":"#FFFFFF","Machines":"#000000","Transportation":"#FFFFFF","Instruments":"#000000","Weapons":"#FFFFFF","Missquaresaneous":"#FFFFFF","Arts and Antiques":"#FFFFFF"};

  //Lista con solo colores que tengan bancos
  const forWhite = ["rgb(117, 113, 113)","rgb(255, 0, 0)","rgb(112, 48, 160)","rgb(0, 112, 192)","rgb(102, 51, 0)","rgb(204, 102, 0)","rgb(0, 55, 102)","rgb(0, 102, 153)","rgb(128, 0, 0)","rgb(148, 129, 43)","rgb(188, 0, 130)"]
  
  //Variable para ser utilizada al hacer ampliamiento
  let forZoom = IcePlotAA;
  
  //Visualizacion de nombres interactiva
  var forLayout = d3.select('body')
      .append('rect')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('z-index', '10') //en donde se ubica

  //Creacion del svg y rotacion del mismo
  const svg = d3.create("svg")
  .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform);
       svg.attr('transform',function(){
                var me = svg.node();
                var x1 = me.getBBox().x; //mantiene al x
                var y1 = me.getBBox().y; //mantiene al y
                return `rotate(-270, ${x1-65}, ${y1+65})`; //rota de vertical a horizontal
    });
  }));
  
  //Cuadro de información
  svg.attr("viewBox", [0, 0, width, height])
    .style("font", "16px Courier New")
    .style("margin", "20px 10px 10px 10px");

  //Calculo del svg
  const squares = svg
    .selectAll("g")
    .data(IcePlotAA.descendants())
    .join("g")
      .attr("transform", d => "translate(" + (d.y0)/1.5 + "," + d.x0 + ")"); //el tamaño de y debe disminuir
  
  //el svg se rota
  svg.attr('transform',function(){
                var me = svg.node();
                var x1 = me.getBBox().x;
                var y1 = me.getBBox().y;
                return `rotate(-270, ${x1-65}, ${y1+65})`;
            });

  //Saca cada dato de los cuadros
  const rect = squares.append("rect")
      .attr("width", d => (d.y1 - d.y0 - 1)/1.5) //debio ser reducido por su tamaño
      .attr("height", d => rectHeight(d))
      .attr("fill-opacity", 0.6)
      .attr("fill", d => { //busca los colores
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return colors(d);
      })
      .style("cursor", "pointer")
      .on("click", clicked) //vermite ver el layout
      .on("mouseover", function() {
          forLayout.style('visibility', 'visible');
        })
      .on('mousemove', function(d) { //permite leer el nombre de los datos
            var backColor = d3.select(this).style("fill");
            return forLayout
            .style('top', d3.event.pageY - 20 + 'px')
            .style('left', d3.event.pageX + 20 + 'px')
            .text(d.data.name + " with " + d.value).style('color', d => {return containsC(backColor)})
            .style('background-color', backColor)})
            .style("font", "16px Courier New")
      .on("mouseout", function() { //quita lo del nombre
          d3.select(this)
            .attr("fill", d => {
               if (!d.depth) return "#ccc";
               while (d.depth > 1) d = d.parent;
               return colors(d);
            });
            forLayout.style('visibility', 'hidden');
        });
      
  //añade el texto a los cuadros
  const text = squares.append("text")
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

  text.append("tspan")
      .text(d => d.data.name)
      .style("margin", "10px 10px 10px 10px");

  const tspan = text.append("tspan")
      .attr("fill-opacity", d => labelVisible(d) * 0.7)
      .text(d =>{ if (!d.children) return "\n"+d.value});

  //información sobre hijos y madres
  squares.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  function clicked(p) {
    forZoom = forZoom === p ? p = p.parent : p;

    IcePlotAA.each(d => d.target = {
      x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
      x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
      y0: d.y0 - p.y0,
      y1: d.y1 - p.y0
    });

    //transiciones
    const t = squares.transition().duration(600) //se ve como un libro
        .attr("transform", d => `translate(${(d.target.y0)/1.5},${d.target.x0})`);
    //volteo de cuadros
    squares.attr('transform',function(){
                var me = svg.node();
                var x1 = me.getBBox().x;
                var y1 = me.getBBox().y;
                return `rotate(-270, ${x1-65}, ${y1+65})`; //rotacion para conversion
            });

    rect.transition(t).attr("height", d => rectHeight(d.target));
    text.transition(t).attr("fill-opacity", d => +labelVisible(d.target));
    tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
  }
  
  //verifica que dato extraer
  function containsC(colorss){
      for (const index in forWhite){
          if(forWhite[index] == colorss){
              return "white"
          }
      }
      return "black"
  }
  
  //alto
  function rectHeight(d) {
    return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
  }

  //verifica si un nivel es visible o no
  function labelVisible(d) {
    return d.y1 <= (width/2) && d.y0 >= 0 && d.x1 - d.x0 > 16;
  }
  
  //extrae los colores para las cajitas
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
  
  function positions(d){
      if (d.depth == 0){
          d = d.children[0].children[0].children[0];
          return (d.x0);
      }
      else if(d.depth == 1){
          d = d.children[0];
          return (d.x0);
      }
      else if(d.depth == 2){
          d = d.parent;
          return (d.x0);
      }
      else{
        return 0;
      }
  }
    
 const leyenda = svg.append("g")
    .attr("class", "leyenda");
    
  var legendY = 250;
    
  leyenda.selectAll("rect")
  .data(IcePlotAA.descendants(), d => d)
  .enter()
      .append('rect')
      .attr('x', 830)
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
    
  legendY = 265;
      
  leyenda.selectAll("text")
    .data(IcePlotAA.descendants(), d => d)
    .enter()
    .append('text')
    .attr('x', 860)
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
      
  function hasKey(d){
    if (colorDicc[d.data.name] != undefined){
        return d.data.name;
    }
    return null;
  }
  
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
1200
)});
  main.variable(observer("none")).define("height", function(){return(
935
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
