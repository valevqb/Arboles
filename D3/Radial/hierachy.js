/*  
Código obtenido de https://www.developer.com/design/creating-a-tree-diagram-with-d3-js/
*/

function tree() {  
  
  // Configuración
  const margin = {top: 10, right: 10, bottom: 10, left: 10},
        width  = 11000 - margin.left - margin.right,
        height = 11000 - margin.top - margin.bottom;

  const diameter = height * 0.75;
  const radius = diameter / 2;
  
  // Define un layout y su tamaño
  const treemap = d3.tree()
    .size([2 * Math.PI, radius])
    .separation(function(a, b) { 
      return (a.parent == b.parent ? 1 : 2) / a.depth; 
  });

  d3.json("https://raw.githubusercontent.com/valevqb/Arboles/main/D3/Exportations.json").then(function(treeData) {
  //d3.json("https://raw.githubusercontent.com/valevqb/Arboles/main/ejemplo.json").then(function(treeData) {

  //console.log(d3.csv("https://raw.githubusercontent.com/valevqb/Arboles/main/Exports-2019---Click-to-Select-a-Product.csv"));
  
  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(treeData, function(d) {
    return d.children;
    });
  
  // Mapea los datos en el layout con posiciones en X y Y.
  nodes = treemap(nodes);
  
  const svg = d3.select("#tree")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //Esto es algo que no explique, pero que creí importante incluirlo.
    //Permite hacer zoom y moverse por el gráfico
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }));

  const g = svg.append("g")
  .attr('transform', "translate("+(width/2)+","+(height/2)+")");

  function radialPoint(x, y) {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
  } 
  
  // Genera las lineas entre los nodos
  //utiliza un elemento path
  const link = g.selectAll(".link")
    .data( nodes.descendants().slice(1))
    .enter().append("line")
    .attr("class", "link")
    .style("stroke", "black")
    //define el path que sigue la figura
    .attr("x1", function(d) { return radialPoint(d.x,d.y)[0]; })
      .attr("y1", function(d) { return radialPoint(d.x,d.y)[1]; })
      .attr("x2", function(d) { return radialPoint(d.parent.x,d.parent.y)[0]; })
      .attr("y2", function(d) { return radialPoint(d.parent.x,d.parent.y)[1]; })
    /*utilizamos el color rgba para utilizar la propiedad de opacidad
    de esta mandera hacer el relleno transparente, si cambian y ponen rgba(255,255,255,1)
    se verá el relleno de la figura.
    Se puede utilizar color rgb, rgba y exadecimal. Tambien utilizar funciones que den
    escalas de colores*/

  //genera grupos que van a contener los textos y figuras de cada nodo
  const node = g.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
    //El definir la clase de esta manera permite no solo utilizar css, sino tambien
    //permite trabajar luego con el arbol, seleccionando solo nodos hoja o solo nodos internos.
    .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
    .attr("transform", d => {
      return `rotate(${d.x * 180 / Math.PI - 90})` 
          + `translate(${d.y}, 0)`;
  });
  
  var elements = d3
    .select('body')
    .append('rect')
    .style('position', 'absolute')
    .style('z-index', '10') //en donde se ubica
    .style('visibility', 'hidden')
    .style('background-color', 'white') //cambiarlo dependiendo del color

  // Genera los circulos de los nodos
  node.append("circle")
    .attr("r", 10)//d => d.data.value)
    .style("stroke", "black")//d => d.data.type)
    .style("fill", "black")//d => d.data.level)
    .on('mouseout', function (d, i) {
      elements.style('visibility', 'hidden')
      svg.selectAll("#this")
      .remove();
      d3.select(this).transition()
        .duration('1')
        .attr('opacity', '1')})
    .on('mouseover', function(d) {
      elements.style('visibility', 'visible');
    })
    .on('mousemove', function(d) {
      if (d.children){
        return elements
        .style('top', d3.event.pageY - 40 + 'px')
        .style('left', d3.event.pageX + 40 + 'px')
        .text(d.data.name);
      }
      else{
        return elements
        .style('top', d3.event.pageY - 40 + 'px')
        .style('left', d3.event.pageX + 40 + 'px')
        .text(d.data.name + " VALORES"); //FALTAN LOS VALORES
      }
    })
      /*console.log(d.data.name)
      svg.append("g")
        .attr('id', 'this')
        .append('rect')
        .attr('x',d.data.x)
        .attr('y', d.y)
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', 'black')
        .attr('stroke', "black")

        svg.select("#this")
        .append("text")
        .text( "Nombre")
        .attr("x", 700)
        .attr("y", 70)
        .attr("font-family", "sans-serif")
        .attr("font-size","15px")
        .attr("fill", "#black");

      d3.select(this).transition()
        .duration('1')
    .attr('opacity', '.85')*/
    
  // agrega el texto
  /*node.append("text")
    .attr("dx", d => { return d.x < Math.PI ? 12 : -12; })
    .attr("dy", ".28em")
    .attr("text-anchor", d => { 
        return d.x < Math.PI ? "start" : "end"; 
    })
    .attr("transform", d => { 
        return d.x < Math.PI ? null : "rotate(180)"; 
    })
    .text(function(d) { return d.data.name; });*/
  })}

//Todo lo que está dentro de attr y style lo pueden consultar en la documentación de D3

/*------------------Formato del json-----------------------------
{
  "Dato1":"raiz"
  "Dato2":"34"
  "children":[
    {
      "Dato1":"hijo1"
      "Dato2":"67"
      "children":[
        {... },
        {... }

      ]
    },

    {
      "Dato1":"hijo2"
      "Dato2":"66"    ***Si no tiene hijos, no se agrega children "children":[]
    },

    {
      "Dato1":"hijo3"
      "Dato2":"66"
    }
  ]

}

----------------------------------------------------------------------------------------
Como cargar archivos

  ***JSON****

 d3.json("Link de su archivo",function(d){
     return d
    })
    .then(function(d){
       console.log(d)
     });

     ***CSV***

 d3.csv("Link de su archivo",function(d){
     return d
    })
    .then(function(d){
       console.log(d)
     });
    */