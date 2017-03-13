var width=500,
    height=400;

var circleWidth=5;    

var palette={
    "lightgrey":"#819090",
    "gray":"#708284",
    "mediumgray":"#536870",
    "darkgray":"#475B62",
    "darkblue":"#0A2933",
    "darkerblue":"#042029",
    "paleryellow":"#FCF4DC",
    "paleyellow":"#EAE3CB",
    "yellow":"#A57706",
    "orange":"#BD3613",
    "red":"#D11C24",
    "pink":"#C61C6F",
    "purple":"#595AB7",
    "blue":"#2176C7",
    "green":"#259286",
    "yellowgreen":"#738A05"
}

var nodes=[
    {name:"Parent"},
    {name:"child1",target:[2]},
    {name:"child2",target:[0]},
    {name:"child3",target:[0]},
    {name:"child4",target:[1,2,3]},
    {name:"child5",target:[0,1,3]}
]

var links=[];

for(var i=0;i<nodes.length;i++){
  if (nodes[i].target !==undefined){
      for(var x=0;x<nodes[i].target.length;x++){
        links.push({
          source:nodes[i],
          target:nodes[nodes[i].target[x]]
        })
      }
  }
}

var myChart=d3.select("#relation")
              .append("svg")
              .attr("width",width)
              .attr("height",height)

var force=d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0.3)
            .charge(-1000)
            .size([width,height])

var link=myChart.selectAll("line")
                .data(links).enter().append("line")    
                .attr("stroke",palette.gray);

var node=myChart.selectAll("circle")
                .data(nodes).enter().append("g")
                .call(force.drag) //animation
node.append('circle')
    .attr("cx",function(d){
      return d.x;
    })
    .attr("cy",function(d){
      return d.y;
    })
    .attr("r",circleWidth)
    .attr("fill",palette.pink)

node.append("text").text(function(d){return d.name})
     .attr("font-family","Roboto Slab")
     .attr("fill",function(d,i){
      if(i>0){return palette.blue}
      else{return palette.yellowgreen}  
     })
     .attr("text-anchor",function(d,i){
      if(i>0){return "beginning"}
      else{return "end"}  
     })
     .attr("font-size","1em")

force.on('tick',function(e){
  node.attr('transform',function(d){
    return 'translate('+d.x+","+d.y+")";
  })
  link
  .attr("x1",function(d){return d.source.x})
  .attr("x2",function(d){return d.target.x})
  .attr("y1",function(d){return d.source.y})
  .attr("y2",function(d){return d.target.y})
})    


force.start();
























