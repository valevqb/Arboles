/*  
Código obtenido de https://www.developer.com/design/creating-a-tree-diagram-with-d3-js/
*/

function tree() {  
  
  // Configuración
  const margin = {top: 10, right: 10, bottom: 10, left: 10},
        width  = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

  const diameter = height * 0.75;
  const radius = diameter / 2;
  
  // Define un layout y su tamaño
  const treemap = d3.tree()
    .size([2 * Math.PI, radius])
    .separation(function(a, b) { 
      return (a.parent == b.parent ? 1 : 2) / a.depth; 
  });
  
  d3.json("https://raw.githubusercontent.com/valevqb/Arboles/main/ejemplo.json").then(function(treeData) {

  //console.log(d3.csv("https://raw.githubusercontent.com/valevqb/Arboles/main/Exports-2019---Click-to-Select-a-Product.csv"));
  
  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(treeData, function(d) {
    if (d.HS2 == "Live animals");
      console.log(d);
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
    .style("stroke", d => d.data.level)
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
    .attr("fill", "rgba(255,255,255,0)" );

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
  
  // Genera los circulos de los nodos
  node.append("circle")
    .attr("r", d => d.data.value)
    .style("stroke", d => d.data.type)
    .style("fill", d => d.data.level);
    
  // agrega el texto
  node.append("text")
    .attr("dx", d => { return d.x < Math.PI ? 8 : -8; })
    .attr("dy", ".31em")
    .attr("text-anchor", d => { 
        return d.x < Math.PI ? "start" : "end"; 
    })
    .attr("transform", d => { 
        return d.x < Math.PI ? null : "rotate(180)"; 
    })
    .text(function(d) { return d.data.name; });
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