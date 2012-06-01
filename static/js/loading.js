    function loading(canvas,options){
      this.canvas = canvas;
      if(options){
        this.radius = options.radius||12;
        this.circleLineWidth = options.circleLineWidth||4;
        this.circleColor = options.circleColor||'lightgray';
        this.dotColor = options.dotColor||'gray';
      }else{      
        this.radius = 12;
        this.circelLineWidth = 4;
        this.circleColor = 'lightgray';
        this.dotColor = 'gray';
      }
    }
    loading.prototype = {
      show:function (){
        var canvas = this.canvas;
        if(!canvas.getContext)return;
        if(canvas.__loading)return;
        canvas.__loading = this;
        var ctx = canvas.getContext('2d');
        var radius = this.radius;      
        var rotators = [{angle:0,radius:1.5},{angle:3/radius,radius:2},{angle:7/radius,radius:2.5},{angle:12/radius,radius:3}];      
        var me = this;
        canvas.loadingInterval = setInterval(function(){
          ctx.clearRect(0,0,canvas.width,canvas.height);         
          var lineWidth = me.circleLineWidth;
          var center = {x:canvas.width/2 - radius,y:canvas.height/2-radius};          
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = me.circleColor;
          ctx.arc(center.x,center.y,radius,0,Math.PI*2);
          ctx.closePath();
          ctx.stroke();
          for(var i=0;i<rotators.length;i++){        
            var rotatorAngle = rotators[i].currentAngle||rotators[i].angle;            
            //在圆圈上面画小圆
            var rotatorCenter = {x:center.x-(radius)*Math.cos(rotatorAngle) ,y:center.y-(radius)*Math.sin(rotatorAngle)};            
            var rotatorRadius = rotators[i].radius;
            ctx.beginPath();
            ctx.fillStyle = me.dotColor;
            ctx.arc(rotatorCenter.x,rotatorCenter.y,rotatorRadius,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
            rotators[i].currentAngle = rotatorAngle+4/radius;
          }
        },50);
      };
