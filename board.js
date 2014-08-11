(function (root) {
  var S = root.S = (root.S || {});
  
  var Board = S.Board = function(){
    this.bArray = this.makeBoardArray();
    this.winRenderCount = 0;
  };
  
  Board.prototype.makeBoardArray = function() {
    return _.times(35, function(i) {
      return _.times(35, function(j) {
        return null;
      })
    })
  }
  
  Board.prototype.render = function() {
    var string = "";
    for(var i = 0; i < this.bArray.length; i++) {
      for(var j = 0; j < this.bArray[0].length; j++) {
        if ((j > 29) || (i > 29) || (i < 5) || (j < 5)) {
          string += (this.bArray[i][j] || '<div class="blue"></div>');
        } else {
         string += (this.bArray[i][j] || '<div class="black"></div>');
        }
      }
      string += "<br>";
    }
    return string;
  };
  
  
  Board.prototype.winRender = function () {
    var string = "";
    for(var i = 0; i < this.winRenderCount; i++) {
      for(var j = 0; j < this.bArray[0].length; j++) {
        if ((j > 29) || (i > 29) || (i < 5) || (j < 5)) {
          string += (this.bArray[i][j] || '<div class="blue"></div>');
        } else {
          if (i === 7 && j === 6) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 8 && j === 6) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 9 && j === 6) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 9 && j === 7) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 10 && j === 7) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 10 && j === 8) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 11 && j === 8) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 11 && j === 8) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 10 && j === 9) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 9 && j === 9) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 10 && j === 10) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 11 && j === 10) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 10 && j === 11) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 9 && j === 11) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 9 && j === 12) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 8 && j === 12) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 7 && j === 12) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 12 && j === 13) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 12 && j === 14) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 12 && j === 15) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 13 && j === 14) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 14 && j === 14) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 15 && j === 14) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 16 && j === 14) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 16 && j === 15) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 16 && j === 13) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 17 && j === 17) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 18 && j === 17) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 19 && j === 17) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 20 && j === 17) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 21 && j === 17) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 22 && j === 17) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 18 && j === 18) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 19 && j === 18) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 19 && j === 19) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 20 && j === 19) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 20 && j === 20) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 21 && j === 20) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 21 && j === 21) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 22 && j === 21) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 20 && j === 21) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 19 && j === 21) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 18 && j === 21) {
            this.bArray[i][j] = '<div class="white"></div>'
          } else if (i === 17 && j === 21) {
            this.bArray[i][j] = '<div class="white"></div>'
          }
  
         string += (this.bArray[i][j] || '<div class="black"></div>');
        }
      }
      string += "<br>";
    }
    
    if (this.winRenderCount <= 34) {
      this.winRenderCount += 1;
    }
    
    return string
    
  }
  
  
  
  
})(this)