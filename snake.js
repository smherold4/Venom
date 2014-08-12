(function (root) {
  var S = root.S = (root.S || {});

  
  
  var Snake = S.Snake = function(dir, dangerFrequency) {
    this.dir = dir;
    var sh = 17;
    this.clock = -5;
    
    this.venomClock = 20;
    this.hit = false;
    this.freq = dangerFrequency;
    // this.segments = [[sh,10]]
    this.segments = [[sh,13],[sh,12],[sh,11],[sh,10]]// ,[sh,13],[sh,14],[sh,15]]
    this.gunSouth = [34,17, -1] //not increasing eastwards (going left)
    this.bulletsNorth = [];
    this.gunEast = [17,34,1] //increasing downwards
    this.bulletsWest = [];
    this.gunNorth = [0,17, 1] //increasing eastwards 
    this.bulletsSouth = [];
    this.gunWest = [17,0, -1] //not increasing downwares (going upwards)
    this.bulletsEast = [];
    this.venomLeft = [];
    this.venomRight = [];
    
    this.motherboard = this.generateBoard();
    this.board = this.motherboard.bArray;
    //now be can refer to the boardarray as just the .board 
    //of the game if we want
    this.plus = false;
  }
  
  
  Snake.prototype.DIRECTIONS = {
    "N": [-1, 0],
    "S": [1, 0],
    "E": [0, 1],
    "W": [0, -1]
  };
  
  Snake.prototype.generateBoard = function () {
    //this method instantiates a board which now has 
    //a bArray from the makeBoardArray method 
    //which gets called when the board is instantiated here.
    //then it puts the initial snake segments on the board
    var b = new S.Board();
    this.segments.forEach( function(segment,idx) {
      if (idx === 0) {
        b.bArray[segment[0]][segment[1]] = '<img src="nn.png">';
      }
      
      b.bArray[segment[0]][segment[1]] = '<img class="segment" src="green.png">';     
    })

  
    b.bArray[this.gunSouth[0]][this.gunSouth[1]] = '<img class="guns" src="triSouth.png">';
    
    b.bArray[this.gunSouth[0]][this.gunSouth[1] + 1] = '<img class="guns" src="triSouthRight.png">';
    
    b.bArray[this.gunSouth[0]][this.gunSouth[1] - 1] = '<img class="guns" src="triSouthLeft.png">';
   
    b.bArray[this.gunEast[0]][this.gunEast[1]] = '<img class="guns" src="triEast.png">';
    
    b.bArray[this.gunEast[0] - 1][this.gunEast[1]] = '<img class="guns" src="triEastTop.png">';
    
    b.bArray[this.gunEast[0] + 1][this.gunEast[1]] = '<img class="guns" src="triEastBottom.png">';
    
    b.bArray[this.gunNorth[0]][this.gunNorth[1]] = '<img class="guns" src="triNorth.png">';
    
    b.bArray[this.gunNorth[0]][this.gunNorth[1] + 1] = '<img class="guns" src="triNorthRight.png">';
    
    b.bArray[this.gunNorth[0]][this.gunNorth[1] - 1] = '<img class="guns" src="triNorthLeft.png">';
   
    b.bArray[this.gunWest[0]][this.gunWest[1]] = '<img class="guns" src="triWest.png">';
    
    b.bArray[this.gunWest[0] - 1][this.gunWest[1]] = '<img class="guns" src="triWestTop.png">';
    
    b.bArray[this.gunWest[0] + 1][this.gunWest[1]] = '<img class="guns" src="triWestBottom.png">';
   
    
  
    return b;
  }
  Snake.prototype.shootVenom = function () {
    if (this.venomClock < -1) {
      this.venomClock = 20;
      var first = this.segments[0]
  
      var row = first[0]
      var col = first[1]
      if (this.dir === "N")  {
        this.venomLeft = [row - 1,col,[-1, 1]]
        this.venomRight = [row - 1,col,[-1, -1]] 
      } else if(this.dir === "S") {
        this.venomLeft = [row + 1,col,[1, 1]]
        this.venomRight = [row + 1,col,[1, -1]] 
        
      } else if (this.dir === "E") {
        this.venomLeft = [row,col + 1,[1, 1]]
        this.venomRight = [row,col + 1,[-1, 1]]
      } else if (this.dir === "W") {
        this.venomLeft = [row,col - 1,[1, -1]]
        this.venomRight = [row,col - 1,[-1, -1]]
        
      }
    }

  }
  
  Snake.prototype.iterate = function () {
    
    if (this.hit) {
      console.log("HIT")
      clearInterval(S.renderInterval)
      clearInterval(S.tickInterval)
      
      
      setTimeout(function () {
        
        $("#seconds").text("0");
        var game = new S.Snake('E',10);

        var view = new S.View('#field', game);
        view.prestart();
        
        
        
        
      }, 1500)
      
      // this.segments.splice(-1,1)
    } else {

      if (this.won()) {
        S.goClock = false;
        return (this.motherboard.winRender())
      } else {
        return (this.move())
      }
    }
  }
    
  Snake.prototype.won = function () {
    if ((!this.gunSouth) && (!this.gunNorth) && (!this.gunEast) && (!this.gunWest)) {return true} else {return false}      
  }
    
  Snake.prototype.move = function() {

    
    //this the precursor to renderign
    this.clock += 1;
    this.venomClock -= 1;
 
    
    first = this.segments[0]
    last = this.segments[this.segments.length - 1]
    if (!this.plus )
    {
      this.board[last[0]][last[1]] = null; //makes spot of segment null on board
      this.segments.splice(-1, 1); //cuts off last segment
    }
    
    var row = first[0] - 5 + this.DIRECTIONS[this.dir][0];
    var col = first[1] - 5 + this.DIRECTIONS[this.dir][1];
    row = (row + 2500000000) % 25 + 5;
    col = (col + 2500000000) % 25 + 5;   
    this.segments.unshift([row, col]);
    
    if (this.venomClock <= 0) {
      this.board[row][col] = '<img class="segment" src="yellow.png">';
    } else {
    this.board[row][col] = '<img class="segment" src="green.png">';
    }
    var that = this;
    if (that.gunSouth) {
    var p = that.gunSouth[0]
    var q = that.gunSouth[1]
    var sdir = that.gunSouth[2]
    }
    
    if (that.gunEast) {
    var r = that.gunEast[0]
    var s = that.gunEast[1]
    var edir = that.gunEast[2]
    }
    
    if (that.gunNorth) {
    var t = that.gunNorth[0]
    var v = that.gunNorth[1]
    var ndir = that.gunNorth[2]
    }
    
    if (that.gunWest) {
    var w = that.gunWest[0]
    var x = that.gunWest[1]
    var wdir = that.gunWest[2]
    }
    
    
    for (var a = 0; a < that.bulletsNorth.length; a++) {
      
     
      var rowN = that.bulletsNorth[a][0];
      var colN = that.bulletsNorth[a][1];
      if (rowN !== 34) {that.board[rowN][colN] = null}
      that.bulletsNorth[a][0] -= 1;
      rowN = that.bulletsNorth[a][0];
      colN = that.bulletsNorth[a][1];
      that.segments.forEach( function(seg) {
        if (seg[0] === rowN && seg[1] == colN ) {
          that.hit = true;
     
        }
 
      })

      if (rowN < 2) {
        var kN = true
        that.board[rowN][colN] = null;
      } else {
        if (Math.abs(17 - rowN) > 12 || Math.abs(17 - colN) > 12) {
         that.board[rowN][colN] = '<img class="bordertri" src="bullet.png">'
        } else {
         that.board[rowN][colN] = '<img class="tri" src="bullet.png">'
        } 
      
      
      } 
    }
    if (kN) {
      that.bulletsNorth.shift()
      kN = false;
    }
    
    
    
    for (var a = 0; a < that.bulletsSouth.length; a++) {
      
     
      var rowS = that.bulletsSouth[a][0];
      var colS = that.bulletsSouth[a][1];
       if (rowS !== 0) {that.board[rowS][colS] = null}
      that.bulletsSouth[a][0] += 1;
      rowS = that.bulletsSouth[a][0];
      colS = that.bulletsSouth[a][1];
      that.segments.forEach( function(seg) {
        if (seg[0] === rowS && seg[1] == colS ) {
          that.hit = true;
     
        }
 
      })
      
      if (rowS > 32) {
        var kS = true
        that.board[rowS][colS] = null;
      } else {
        if (Math.abs(17 - rowS) > 12 || Math.abs(17 - colS) > 12) {
         that.board[rowS][colS] = '<img class="bordertri" src="bullet.png">'
        } else {
         that.board[rowS][colS] = '<img class="tri" src="bullet.png">'
        } 
      } 
    }
    if (kS) {
      that.bulletsSouth.shift()
      kS = false;
    }
    
    
    for (var a = 0; a < that.bulletsEast.length; a++) {
      
     
      var rowE = that.bulletsEast[a][0];
      var colE = that.bulletsEast[a][1];
      if (colE !== 0) {that.board[rowE][colE] = null}
      that.bulletsEast[a][1] += 1;
      rowE = that.bulletsEast[a][0];
      colE = that.bulletsEast[a][1];
      that.segments.forEach( function(seg) {
        if (seg[0] === rowE && seg[1] == colE ) {
          that.hit = true;
        }
      })
      
      if (colE > 32) {
        var kE = true
        that.board[rowE][colE] = null;
      } else {
        if (Math.abs(17 - rowE) > 12 || Math.abs(17 - colE) > 12) {
         that.board[rowE][colE] = '<img class="bordertri" src="bullet.png">'
        } else {
         that.board[rowE][colE] = '<img class="tri" src="bullet.png">'
        } 
      } 
    }
    if (kE) {
      that.bulletsEast.shift()
      kE = false;
    }
    
    for (var a = 0; a < that.bulletsWest.length; a++) {
        
      var rowW = that.bulletsWest[a][0];
      var colW = that.bulletsWest[a][1];
      if (colW !== 34) {that.board[rowW][colW] = null}
      that.bulletsWest[a][1] -= 1;
      rowW = that.bulletsWest[a][0];
      colW = that.bulletsWest[a][1];
      
      that.segments.forEach( function(seg) {
        if (seg[0] === rowW && seg[1] == colW ) {
          that.hit = true;
        }
      })

      if (colW < 2) {
        var kE = true
        that.board[rowW][colW] = null;
      } else {
        if (Math.abs(17 - rowW) > 12 || Math.abs(17 - colW) > 12) {
         that.board[rowW][colW] = '<img class="bordertri" src="bullet.png">'
        } else {
         that.board[rowW][colW] = '<img class="tri" src="bullet.png">'
        } 
      } 
    }
    if (kE) {
      that.bulletsWest.shift()
      kE = false;
    }


    
    ///here we load up bullets on various intervals

    if (that.clock === (that.freq*1)) {
      if (that.gunSouth) {
      that.bulletsNorth.push([p,q]);       
      }
    }
    
    if (that.clock === (that.freq*2)) {
      if (that.gunEast) {
      that.bulletsWest.push([r,s]);       
      }
    }
    if (that.clock === (that.freq*3)) {
      if (that.gunNorth) {
      that.bulletsSouth.push([t,v]);       
      }
    }
    if (that.clock === (that.freq*4)) {
      that.clock = 0;
      if (that.gunWest) {
      that.bulletsEast.push([w,x]);       
      }
    }
    
    
    
    
    
    if (Math.floor(Math.random()*that.freq) === 1) {
      
      
      //the q changes for the gun, so the p will be changing for the bullet
    if (that.gunSouth) {  
        if (q > 31) {
          that.gunSouth[2] = -1;
          sdir = -2;
        } else if (q < 3) {
          that.gunSouth[2] = 1;
          sdir = 2;
        } 
 
        that.board[p][q + 2] = null;
        that.board[p][q + 1] = null;
        that.board[p][q] = null;
        that.board[p][q - 1] = null;
        that.board[p][q - 2] = null;
        
      that.board[p][q + sdir - 1] = '<img class="guns" src="triSouthLeft.png">';
      that.board[p][q + sdir] = '<img class="guns" src="triSouth.png">';
      that.board[p][q + sdir + 1] = '<img class="guns" src="triSouthRight.png">';
        that.gunSouth = [p, q + sdir, that.gunSouth[2]];
      }
    }
    
    if (Math.floor(Math.random()*that.freq) === 1) {
      if (that.gunNorth) { 
        if (v > 31) {
          that.gunNorth[2] = -1;
          ndir = -2;
        } else if (v < 3) {
          that.gunNorth[2] = 1;
          ndir = 2;
        } 
        that.board[t][v + 2] = null;
        that.board[t][v + 1] = null;
        that.board[t][v] = null;
        that.board[t][v - 1] = null;
        that.board[t][v - 2] = null;
        
      that.board[t][v + ndir - 1] = '<img class="guns" src="triNorthLeft.png">';
      that.board[t][v + ndir] = '<img class="guns" src="triNorth.png">';
      that.board[t][v + ndir + 1] = '<img class="guns" src="triNorthRight.png">';
        that.gunNorth = [t, v + ndir, that.gunNorth[2]];
      }
    }
  

    
    if (Math.floor(Math.random()*that.freq) === 1) {
      if (that.gunEast) {
        if (r > 31) {
          that.gunEast[2] = -1;
          edir = -2;
        } else if (r < 3) { 
          that.gunEast[2] = 1;
          edir = 2;
        } 
        that.board[r - 2][s] = null;
        that.board[r - 1][s] = null;
        that.board[r][s] = null;
        that.board[r + 1][s] = null;
        that.board[r + 2][s] = null;
        
      that.board[r + edir + 1][s] = '<img class="guns" src="triEastBottom.png">';
      that.board[r + edir][s] = '<img class="guns" src="triEast.png">';
      that.board[r + edir - 1][s] = '<img class="guns" src="triEastTop.png">';
        that.gunEast = [r + edir, s, that.gunEast[2]];
      }
    }

    
    if (Math.floor(Math.random()*that.freq) === 1) {
      if (that.gunWest) {
      if (w > 31) {
        that.gunWest[2] = -1;
        wdir = -2;
      } else if (w < 3) { 
        that.gunWest[2] = 1;
        wdir = 2;
      } 
      
      that.board[w + 2][x] = null;
      that.board[w + 1][x] = null;
      that.board[w][x] = null;
      that.board[w - 1][x] = null;
      that.board[w - 2][x] = null;
    
    that.board[w + wdir - 1][x] = '<img class="guns" src="triWestTop.png">';  
    that.board[w + wdir][x] = '<img class="guns" src="triWest.png">';
    that.board[w + wdir + 1][x] = '<img class="guns" src="triWestBottom.png">';
      that.gunWest = [w + wdir, x, that.gunWest[2]];
      }
    }
    
    
    
    if (this.venomLeft.length > 0) {
     var row = this.venomLeft[0];
     var col = this.venomLeft[1];
     if (this.board[row][col] !== '<img class="tri" src="bullet.png">') {
       this.board[row][col] = null;
     }
     var chRow = this.venomLeft[2][0]
     var chCol = this.venomLeft[2][1]
     this.venomLeft[0] = row + chRow;
     this.venomLeft[1] = col + chCol;
     
     if (row + chRow > 34 || row + chRow < 0 || col + chCol > 34 || col + chCol < 0 || (this.board[row + chRow][col + chCol] === '<img class="tri" src="bullet.png">')) {
       this.venomLeft[0] = 35;
       this.venomLeft[1] = 35;
     }
     
     
     var leftDestroy = false;
     
     if (this.gunEast) {
       if (Math.abs(this.gunEast[0] - this.venomLeft[0]) <= 1 && (this.gunEast[1] === this.venomLeft[1])) {
        var y = this.gunEast[0];
        var x = this.gunEast[1];
        this.gunEast = null;
        this.board[y][x] = null
        this.board[y - 1][x] = null;
        this.board[y + 1][x] = null;
        this.venomLeft = [];
        leftDestroy = true;  
       } 
     }
     if (this.gunWest) {
       if (Math.abs(this.gunWest[0] - this.venomLeft[0]) <= 1 && (this.gunWest[1] === this.venomLeft[1])) {
         var y = this.gunWest[0];
         var x = this.gunWest[1];
         this.gunWest = null;
         this.board[y][x] = null
         this.board[y - 1][x] = null;
         this.board[y + 1][x] = null;
        this.venomLeft = [];
        leftDestroy = true; 
       } 
     }
     if (this.gunNorth) {
       if ((this.gunNorth[0] === this.venomLeft[0]) && Math.abs(this.gunNorth[1] - this.venomLeft[1]) <= 1) {
         var y = this.gunNorth[0];
         var x = this.gunNorth[1];
         this.gunNorth = null;
         this.board[y][x] = null;
         this.board[y][x - 1] = null;
         this.board[y][x + 1] = null;
        this.venomLeft = [];
        leftDestroy = true;     
       } 
     }
     if (this.gunSouth) {
       if ((this.gunSouth[0] === this.venomLeft[0]) && Math.abs(this.gunSouth[1] - this.venomLeft[1]) <= 1) {
         var y = this.gunSouth[0];
         var x = this.gunSouth[1];
         this.gunSouth = null;
         this.board[y][x] = null;
         this.board[y][x - 1] = null;
         this.board[y][x + 1] = null;
        this.venomLeft = [];
        leftDestroy = true;    
       } 
     }
     
     if (!leftDestroy) {
       if (this.venomLeft[0] > 34 || this.venomLeft[0] < 0 || this.venomLeft[1] > 34 || this.venomLeft[1] < 0) {
         this.venomLeft = [];
       }
     }
     
  
     if (this.venomLeft.length > 0) {
       if (Math.abs(17 - row - chRow) > 12 || Math.abs(17 - col - chCol) > 12) {
       this.board[row + chRow][col + chCol] = '<img class="outsidevenom" src="venom.png">';
       } else {
       this.board[row + chRow][col + chCol] = '<img class="venom" src="venom.png">';
       }
     } 
     
     
    }
    
    if (this.venomRight.length > 0) {
     var row = this.venomRight[0]
     var col = this.venomRight[1]
     var chRow = this.venomRight[2][0];
     var chCol = this.venomRight[2][1];
     
     if (this.board[row][col] !== '<img class="tri" src="bullet.png">') {
       this.board[row][col] = null;
     }
     
     this.venomRight[0] = row + chRow;
     this.venomRight[1] = col + chCol;
     
     if (row + chRow > 34 || row + chRow < 0 || col + chCol > 34 || col + chCol < 0 || (this.board[row + chRow][col + chCol] === '<img class="tri" src="bullet.png">')) {
       this.venomRight[0] = 35;
       this.venomRight[1] = 35;
     }

     var rightDestroy = false;
     
     if (this.gunEast) {
       if (Math.abs(this.gunEast[0] - this.venomRight[0]) <= 1 && (this.gunEast[1] === this.venomRight[1])) {
        
         var y = this.gunEast[0];
         var x = this.gunEast[1];
         this.gunEast = null;
         this.board[y][x] = null
         this.board[y - 1][x] = null;
         this.board[y + 1][x] = null;
         this.venomRight = [];
         rightDestroy = true;
       } 
   }
   
   
     if (this.gunWest) {
       if (Math.abs(this.gunWest[0] - this.venomRight[0]) <= 1 && (this.gunWest[1] === this.venomRight[1])) {
         var y = this.gunWest[0];
         var x = this.gunWest[1];
         this.gunWest = null;
         this.board[y][x] = null
         this.board[y - 1][x] = null;
         this.board[y + 1][x] = null;
        this.venomRight = [];
        rightDestroy = true; 

       } 
     }
     
     if (this.gunNorth) {
       if ((this.gunNorth[0] === this.venomRight[0]) &&  Math.abs(this.gunNorth[1] - this.venomRight[1]) <= 1) {
         var y = this.gunNorth[0];
         var x = this.gunNorth[1];
         this.gunNorth = null;
         this.board[y][x] = null;
         this.board[y][x - 1] = null;
         this.board[y][x + 1] = null;
         this.venomRight = [];
         rightDestroy = true;
       } 
     }
     
     if (this.gunSouth) {
       if ((this.gunSouth[0] === this.venomRight[0]) && Math.abs(this.gunSouth[1] - this.venomRight[1]) <= 1) {
        var y = this.gunSouth[0];
        var x = this.gunSouth[1];
        this.gunSouth = null;
        this.board[y][x] = null;
        this.board[y][x - 1] = null;
        this.board[y][x + 1] = null;
        this.venomRight = [];
        rightDestroy = true;  
       } 
     }
     
     if (!rightDestroy) {
       if (this.venomRight[0] > 34 || this.venomRight[0] < 0 || this.venomRight[1] > 34 || this.venomRight[1] < 0) {
         this.venomRight = [];
       }
     }
     
  
     if (this.venomRight.length > 0) {
       if (Math.abs(17 - row - chRow) > 12 || Math.abs(17 - col - chCol) > 12) {
       this.board[row + chRow][col + chCol] = '<img class="outsidevenom" src="venom.png">';
       } else {
       this.board[row + chRow][col + chCol] = '<img class="venom" src="venom.png">';
       }
     }  
     

    }
    
    return this.motherboard.render();
  };
  
  Snake.prototype.turn = function(dir){
    this.dir = dir;
  }
    
  Snake.prototype.plus = function() {
    this.plus = true;
  }
    
    
    
  
  
      
  
})(this)