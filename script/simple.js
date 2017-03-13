var data=[];
for (var i=0;i<80;i++){
	data.push(Math.round(Math.random()*100+20));
}
var tempColor;
var margin={top:30, right:30,bottom:40,left:50}
var height=400-margin.top-margin.bottom,
    width=600-margin.left-margin.right,
	barWidth=50,
	barOffset=5;
var colors=d3.scale.linear()
			 .domain([0,data.length*.33,data.length*.66,data.length])
			 .range(["#FFB832","#C61C6F","#85992C","#268BD2"]);

var yScale=d3.scale.linear()
			 .domain([0,d3.max(data)])
			 .range([0,height]);

var xScale=d3.scale.ordinal()
			 .domain(d3.range(0,data.length))
			 .rangeBands([0,width],0.5,0.75);

var toolTip=d3.select("body").append("div")
              .style("position","absolute")
              .style("padding","0 10px")
              .style("background","#FFFFFF")
              .style("opacity",0);			 

var chart=d3.select("#simple").append("svg")
			.attr("width",width+margin.left+margin.right)
			.attr("height",height+margin.top+margin.bottom)
			.style("background","#E7E0CB")
			.append("g")
			.attr("transform","translate("+margin.left+","+margin.top+")")
			.selectAll("rect").data(data)
			.enter().append("rect")
			.style("fill",function(d,i){
				return colors(i);
			})
			.attr("width",xScale.rangeBand(barWidth))
			.attr("height",0)
            .attr("x",function(d,i){
                return xScale(i);
             })
            .attr("y",height)
            .on("mouseover",function(d){
              toolTip.transition()
                      .style("opacity",.9);
              toolTip.html(d)
                      .style("left",(d3.event.pageX-35)+"px")
                      .style("top",(d3.event.pageY-30)+"px");        
              tempColor=this.style.fill;
              d3.select(this)
                .style("opacity",.5)
                .style("fill","yellow");
             })
            .on("mouseout",function(d){
              d3.select(this)
                .style("opacity",1)
                .style("fill",tempColor);
             });


chart.transition() 
     .attr("height",function(d,i){
          return yScale(d);
         })
     .attr("y",function(d){
           return height-yScale(d);
          }) 
     .delay(function(d,i){
       return i*20;
          })
     .duration(1000)
     .ease("elastic") ; 

var vGuidScale=d3.scale.linear()
                  .domain([0,d3.max(data)])
                  .range([height, 0]);
  var vAxis=d3.svg.axis()
           .scale(vGuidScale) 
          .orient("left")
          .ticks(10)

  var vGuide=d3.select('svg')
              .append('g')
  vAxis(vGuide)      
  vGuide.attr("transform","translate("+margin.left+","+margin.top+")"); 
  vGuide.selectAll('path')
        .style({
          fill:"none",  
          stroke:"#000"
        }) 
  vGuide.selectAll('line')
        .style({ 
          stroke:"#000"
        })                         

  var hAxis =d3.svg.axis()
              .scale(xScale)
              .orient('bottom') 
              .tickValues(xScale.domain().filter(function(d,i){
                return !(i%(data.length/5));
              })) 
  var hGuide=d3.select('svg')
               .append('g')
  hAxis(hGuide) 
  hGuide.attr("transform","translate("+margin.left+","+(height+margin.top)+")"); 
  hGuide.selectAll('path')
        .style({
          fill:"none",  
          stroke:"#000"
        }) 
  hGuide.selectAll('line')
        .style({ 
          stroke:"#000"
        })                         
