// https://observablehq.com/@mouhanedg56/collapsible-radial-tidy-tree@406
export default function define(runtime, observer) {
  const main = runtime.module();
 const fileAttachments = new Map([["flare-3.json",new URL("Exportations.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  
  main.variable(observer("chart")).define("chart", ["d3","tree","data","radialPoint"], function(d3,tree,data,radialPoint)
{
  const colorDicc = {"Animal Products":"rgb(255,153,0)","Vegetable Products":"rgb(113,174,72)","Animal and Vegetable Bi-Products":"rgb(204,204,0)","Foodstuffs":"rgb(112,48,160)","Mineral Products":"rgb(117,113,113)","Chemical Products":"rgb(255,0,0)","Plastics and Rubbers":"rgb(0,112,192)","Animal Hides":"rgb(204,153,0)","Wood Products":"rgb(102,51,0)","Paper Goods":"rgb(217,217,217)","Textiles":"rgb(255,91,173)","Footwear and Headwear":"rgb(204,102,0)","Stone And Glass":"rgb(198,227,225)","Precious Metals":"rgb(0,176,240)","Metals":"rgb(0,55,102)","Machines":"rgb(204,204,255)","Transportation":"rgb(0,102,153)","Instruments":"rgb(255,217,102)","Weapons":"rgb(128,0,0)","Miscellaneous":"rgb(148,129,43)","Arts and Antiques":"rgb(188,0,130)"};
    
  const nodeRadius = 2.5
  const svg = d3.create("svg")
  .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  
  const gLines = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#A7C8F2")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  const gNodes = svg.append("g")
  const gTexts = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("fill", "#F25116")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)

  const root = tree(data)
  
  const leyenda = svg.append("g")
    .attr("class", "leyenda");
    
  var legendY = 720;
    
  leyenda.selectAll("rect")
  .data(root.descendants(), d => d)
  .enter()
      .append('rect')
      .attr('x', -800)
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
      })
      
  legendY = 735;
      
  leyenda.selectAll("text")
    .data(root.descendants(), d => d)
    .enter()
    .append('text')
    .attr('x', -775)
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
      })
      
  function hasKey(d){
    if (colorDicc[d.data.name] != undefined){
        return d.data.name;
    }
    return null;
  }
  
  // create a copy of all children
  root.descendants().forEach((d, i) => {
    d.id = i
    d._children = d.children
  })
  
  update()

  function update() {
    updateLinks()
    //updateLabels()
    updateNodes()
  }
  
  function updateLinks() {
    const links = gLines
      .selectAll("line")
      .data(root.links(), d => d)

    links
      .exit().remove()

    //Calcula posiciones lineas
    links
      .enter().append("line")
        .attr("x1", d => radialPoint(d.source.x, d.source.y)[0])
        .attr("y1", d => radialPoint(d.source.x, d.source.y)[1])
        .attr("x2", d => radialPoint(d.target.x, d.target.y)[0])
        .attr("y2", d => radialPoint(d.target.x, d.target.y)[1])
  }
  
  /*function updateLabels() {
    const labels = gTexts
      .selectAll("text")
      .data(root.descendants(), d => d)

   labels
     .exit().remove()
   
   labels
     .enter().append("text")
       .attr("transform", d => `
         rotate(${d.x * 180 / Math.PI - 90}) 
         translate(${d.y},0) 
         rotate(${d.x >= Math.PI ? 180 : 0})
       `)
       .attr("dy", "0.31em")
       .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
       .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
       .text(d => d.data.name)
       .clone(true).lower()
       .attr("stroke", "white")
  }*/
  
  function updateNodes() {
    var elements = d3
      .select('body')
      .append('rect')
      .style('position', 'absolute')
      .style('z-index', '10') //en donde se ubica
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      
    const nodes = gNodes
      .selectAll("circle")
      .data(root.descendants(), d => d)

    nodes
      .exit().remove()

   //Calcula posicion y caracteristicas de nodos
    nodes
      .enter().append("circle")
        .attr("transform", d => `
          rotate(${d.x * 180 / Math.PI - 90})
          translate(${d.y},0)
        `)
        .attr("r", nodeRadius)
        .attr("fill", d => {
        //colors(d);
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
          return colors(d);
        })
        .on("click", d => {
          elements.style('visibility', 'hidden');
          d.children = d.children ? null : d._children
          update()
        })
        .on("mouseover", function() {
          d3.select(this).attr("r", nodeRadius * 1.5).attr("fill", "#027368") 
          elements.style('visibility', 'visible');
        })
        .on('mousemove', function(d) {
          if (d.children){
            return elements
            .style('top', d3.event.pageY - 20 + 'px')
            .style('left', d3.event.pageX + 20 + 'px')
            .text(d.data.name);
          }
          else{
            return elements
            .style('top', d3.event.pageY - 20 + 'px')
            .style('left', d3.event.pageX + 20 + 'px')
            .text(d.data.name);
          }})
        .on("mouseout", function() {
          d3.select(this).attr("r", nodeRadius)
            .attr("fill", d => {
             //colors(d);
               if (!d.depth) return "#ccc";
               while (d.depth > 1) d = d.parent;
               return colors(d);
            });
          elements.style('visibility', 'hidden');
        })

    nodes
      .attr("fill", "#048ABF")
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

  return svg.attr("viewBox", autoBox).node()
}
);

//Funcion ayuda calculos posiciones
  main.variable(observer("")).define("radialPoint", function(){return(
function radialPoint(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)]
}
)});

function autoBox() {
  document.body.appendChild(this)
  const {x, y, width, height} = this.getBBox()
  document.body.removeChild(this)
  return [x, y, width, height]
}

  main.variable(observer("")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.hierarchy(await FileAttachment("flare-3.json").json())
    .sort((a, b) => d3.ascending(a.data.name, b.data.name))
)});

  main.variable(observer("")).define("tree", ["d3","radius"], function(d3,radius){return(
d3.tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
)});

  main.variable(observer("")).define("width", function(){return(
1800
)});

  main.variable(observer("")).define("radius", ["width"], function(width){return(
width / 2
)});

  main.variable(observer("")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});

  main.variable(observer("")).define("d3", ["require"], function(require){return(
require("d3@5")
)});

  return main;
}
