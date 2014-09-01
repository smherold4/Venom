(function (root) {
  var S = root.S = (root.S || {});
  
  var View = S.View = function($el, game) {
    this.$el = $el;
    this.game = game;   
    // this.board = game.board;
 
  }
  
  View.prototype.prestart = function () {  
    $(this.$el).html('<img src="level1.jpg">')
    var that = this;
    setTimeout(function () {
      $("body").one('keydown',that.startHandler.bind(that))
    },1000)
    
  }

  View.prototype.startHandler = function (event) {
    var code = event.keyCode;
    
    setTimeout(this.start.bind(this),100);
    if (code === 72) {
      this.speed = 60;
      this.game.freq = 7
    } else if (code === 69) {
      this.speed = 130
      this.game.freq = 15;
    } else { 
      this.speed = 80;
      this.game.freq = 12;
    }
  }
  
  View.prototype.start = function() {
    S.timer = 0;
    S.goClock = true;
    $("body").on('keydown',this.keyHandler.bind(this)); 
    S.renderInterval = setInterval(this.render.bind(this), this.speed);
    S.tickInterval = setInterval(this.tick.bind(this),100);
  }
  
  View.prototype.tick = function () {
    if (S.goClock) {
    var current = $("#seconds").text();
    var currentNum = parseFloat(current);
    currentNum += 0.1;
    var cFormat = Math.round(10*currentNum)/10;
    S.timer = cFormat;
    var cFormat = cFormat.toString();
    if (cFormat.split('.').length === 1) {
      cFormat += '.0';
    }
    $("#seconds").text(cFormat);
    }
  }
  
  View.prototype.KEY_TO_DIR = {
    '37' : "W",
    '38' : "N",
    '40' : "S",
    '39' : "E"
  }
  
  
  View.prototype.keyHandler = function(event) {
    var code = event.keyCode;
    
   if (code === 37 || code === 38 || code === 39 || code === 40) { 
    var codeString = (code).toString() 
    
    var newDir = this.KEY_TO_DIR[codeString]; 
    if ((this.game.dir === "N") && (newDir === "S")) {
    
    } else if ((this.game.dir === "S") && (newDir === "N")) {
    
  } else if ((this.game.dir === "E") && (newDir === "W")) {
    
  } else if ((this.game.dir === "W") && (newDir === "E")) {
    
  } else {
    this.game.turn(newDir);
  }
    
  } else if (code === 32) {
     
     this.game.shootVenom()
     
   }
  }

  View.prototype.render = function(){
    var draw_string = this.game.iterate()
    debugger
    $(this.$el).html(draw_string)
  }
  
})(this)