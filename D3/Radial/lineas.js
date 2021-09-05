/*
Autores: Luis Diego Alemán Zúñiga
         Tania María Sanchez Irola

*/
function lineas(){
  //Variables de configuración


  d3.csv("https://raw.githubusercontent.com/MrLuis137/Visua/master/Datos.csv",function(d){
    // Se convierten los datos a numeros
     d.area = +d.area;
     d.poblacion= +d.poblacion;
     d.densidad = +d.densidad;
     return d})
     .then(function(d){
      //Una vez los datos fueron obtenidos, ya podemos trabajar con ellos.
       draw(d);
     });

function draw(datos) {
  var alto = 600;
  var ancho = 1000;
  var margen = 20;


//selecciona el elemento #graf
  var svg = d3.select("#Lineas")
  .append("svg")
  .attr("height", alto)
  .attr("width",ancho)
  .attr("transform","translate(" +margen+ ",0)");

  //Titulo
  svg.append("text")
  .text('Cantones de Costa Rica')
  .style("text-anchor", "middle")
  .attr("x", 500)
  .attr("y", 580)
  .attr("font-family","Sans-Serif")
  .attr('font-size', 25)
  .attr("font-weight", "bold")
  .attr("fill", "black")

  //Etiqueta de escala x
  svg.append("text")
  .text("\u00C1rea")
  .style("text-anchor", "middle")
  .attr("x", 500)
  .attr("y",15)
  .attr("font-family", "sans-serif")
  .attr("font-size","15px")
  .attr("fill", "black");

  //etiqueta escala y
  svg.append("text")
  .text("Poblaci\u00F3n")
  .attr("x", 3)
  .attr("y",alto)
  .attr("font-family", "sans-serif")
  .attr("font-size","15px")
  .attr("fill", "black");

  //Resalta relementos
  var highlight = function(d){
    console.log(d);
    d3.selectAll(".barra").style("opacity", .05)
    d3.selectAll(".barra").attr("focus", "false");
    if (d === "San Jos\u00E9"){
      d3.selectAll("."+ "San").style("opacity", 1)
      d3.selectAll("."+ "San").attr("focus", "true");
    }else{
      d3.selectAll("."+d).style("opacity", 1)
      d3.selectAll("."+d).attr("focus", "true");
    }
  }

  // Opaca elementos
  var noHighlight = function(d){
    d3.selectAll(".barra").style("opacity", 1);
    d3.selectAll(".barra").attr("focus", "true");
  }
    
    //ejeX
    var x = d3.scaleLinear()
      .domain([0,3400])
      .range([ 55, (ancho - 200) ]);

    svg.append("g")
      .attr("transform", "translate(0," + 35 + ")")
      .call(d3.axisTop(x).ticks(15));
      //ejeY
    var y = d3.scaleLinear()
      .domain([4500, 290000])
      .range([ alto -25 , 45]);

    svg.append("g")
  .attr("transform", "translate(40,0)")
      .call(d3.axisLeft(y));

      var z = d3.scaleSqrt()
        .domain([10, 8000])
        .range([ 5, 15])


  //escala de colores 
  var color = d3.scaleOrdinal()
    .domain(["San Jos\u00E9", "Alajuela", "Heredia", "Cartago", "Puntarenas", "Guanacaste", "Lim\u00F3n"])
    .range(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]);

  //Agega las barritas
  svg
  .append("g")
  .attr("class", "barras")
  .selectAll("line")
  .data(datos)
  .enter()
  .append('line')
  //agrega atributos personalizados con los datos
  .attr("class",function(d){
    if(d.Provincia === "San Jos\u00E9"){
      return "barra " + "San Jose";
    }
    return "barra " + d.Provincia;
  })
  .attr("poblacion",function(d){
    return d.poblacion;
  })
  .attr("area",function(d){
    return d.area;
  })
  .attr("provincia",function(d){
    return d.Provincia;
  })
  .attr("canton",function(d){
    return d.canton;
  })
  .attr("densidad",function(d){
    return d.densidad;
  })
  .attr("focus","true")
  .attr('x1',x(0) )
  .attr('y1', function(d){
    return y(d.poblacion)
  })
  .attr('x2',function(d){
    return x(d.area)
  })
  .attr('y2', function(d){
    return y(d.poblacion)
  })
  .attr('stroke-width', 3)
  .style('stroke', function(d){
    return color(d.Provincia)
  })
  //Función que genera un cuadro flotante con información
  .on("mouseover", function(){
    mas = this;
    if(this.getAttribute("focus") == "true"){
  svg.append("g")
        .attr('id', 'mas')
        .append('rect')
        .attr('x',300 )
        .attr('y', 200)
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', '#E1E1E1')
        .attr('stroke', "black")

        svg.select("#mas").selectAll("rect")
        .transition().duration(500)
        .attr('width', 400)
        .attr('height', 200);

        svg.select("#mas")
        .append("text")
        .text(this.getAttribute("canton"))
        .style("text-anchor", "middle")
        .attr("x", 500)
        .attr("y",220)
        .attr("font-family", "sans-serif")
        .attr("font-size","20px")
        .attr("fill", "#E1E1E1");

        svg.select("#mas")
        .append("text")
        .text( "Provincia: " + this.getAttribute("provincia"))
        .attr("x", 305)
        .attr("y",255)
        .attr("font-family", "sans-serif")
        .attr("font-size","15px")
        .attr("fill", "#E1E1E1");

        svg.select("#mas")
        .append("text")
        .text( "poblacion: " + this.getAttribute("poblacion"))
        .attr("x", 305)
        .attr("y",300)
        .attr("font-family", "sans-serif")
        .attr("font-size","15px")
        .attr("fill", "#E1E1E1");

        svg.select("#mas")
        .append("text")
        .text( "Area: " + this.getAttribute("area"))
        .attr("x", 305)
        .attr("y",345)
        .attr("font-family", "sans-serif")
        .attr("font-size","15px")
        .attr("fill", "#E1E1E1")


        svg.select("#mas")
        .append("text")
        .text( "Densidad de poblacion: " + this.getAttribute("densidad"))
        .attr("x", 305)
        .attr("y",390)
        .attr("font-family", "sans-serif")
        .attr("font-size","15px")
        .attr("fill", "#E1E1E1");

        svg.select("#mas").selectAll("text")
        .transition().duration(500)
        .attr("fill", "black");
      }
  })
  .on("mouseout", function(){
    svg.selectAll("#mas")
    .remove();
  });;
  
  //Genera el grupo leyenda
  leyenda = svg.append("g")
  .attr("class", "leyenda");

  var provincias = ["San Jos\u00E9", "Alajuela", "Heredia", "Cartago", "Puntarenas", "Guanacaste", "Lim\u00F3n"]
  
  //agrega los circulos con su color
  leyenda.selectAll("circle")
  .data(provincias)
  .enter()
      .append('circle')
      .attr('cx', 850)
      .attr('cy', function(d,i){
        return (220 + (25 *i));
      })
      .attr('r', 7)
      .style('fill', function(d){
        //utiliza la escala de colores definida arriba
        return color(d)
      });


  // agrega los textos utilizando la lista de provincias
  leyenda.selectAll("text")
  .data(provincias)
  .enter()
  .append("text")
  .attr("font-family","Sans-Serif")
  .attr("isClicked", "false")
  .text(function(d){
    return d;
  })
  .attr("prov", function(d){
    return d;
  })
  .attr("x", 870)
  .attr('y', function(d,i){
    return (220 + (25 *i));
  })
  .style("fill", function(d){
      return color(d)
    })
  //Resalta los cantones de la provicia seleccionada
  .on("click", function(){
    console.log(this.getAttribute("isClicked"));
    if(this.getAttribute("isClicked") == "true"){
      noHighlight(this.getAttribute("prov"))
      this.setAttribute("isClicked", "false")

    }
    else{
      highlight(this.getAttribute("prov"))
      this.setAttribute("isClicked", "true")
    }
  })

  leyenda.append("text")
  .text("Click en el nombre")
  .attr("font-family","Sans-Serif")
  .attr("x", 850)
  .attr('y', 405)
  .style("fill", "black");

  leyenda.append("text")
  .text("para hacer focus")
  .attr("font-family","Sans-Serif")
  .attr("x", 850)
  .attr('y', 420)
  .style("fill", "black")




     }

}
