var width=400,
    height=400,
    radius=200,
    colors=d3.scale.ordinal()
             .range(["#595AB7","#A57706","#D11C24","#C61C6F","#99FFCC",
              "BD3613","#2176C7","#259286","#738A05","#CC9933"]);

var piData=[
    {label:"Jan",
    value:31},
    {label:"Feb",
    value:28},
    {label:"Mar",
    value:31},
    {label:"Apr",
    value:30},
    {label:"May",
    value:31},
    {label:"Jun",
    value:30},
    {label:"Jul",
    value:31},
    {label:"Aug",
    value:31},
    {label:"Sept",
    value:30},
    {label:"Oct",
    value:31},
    {label:"Nov",
    value:30},
    {label:"Dec",
    value:31}
];  


var pie=d3.layout.pie()
          .value(function(d){
            return d.value;
          }) 

var arc=d3.svg.arc()
          .outerRadius(radius) 

var myChart=d3.select("#pie")
              .append("svg")
              .attr("width",width)
              .attr("height",height)
              .append("g") 
              .attr("transform","translate("+(width-radius)+","+(height-radius)+")")
              .selectAll('path').data(pie(piData))  
              .enter().append('g')
              .classed("slice",true)    


var slices=d3.selectAll("g.slice") 
             .append('path')
              .attr("fill",function(d,i){
                return colors(i);
              }) 
              .attr("d",arc)  

var text=d3.selectAll("g.slice")
           .append("text")
           .text(function(d,i){
            console.log(d);
            return d.data.label;
           })             
           .attr("text-anchor","middle")
           .attr("fill","#0000FF")
           .attr("transform",function(d){
                d.innerRadius=0;
                d.outerRadius=radius;
                return "translate("+arc.centroid(d)+")"
           })            