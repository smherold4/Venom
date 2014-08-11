<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <title>Snake</title>
  <link rel="stylesheet" href="snake.css" type="text/css">

  <script src="jquery.js"></script>

  <script src="snakeUI.js"></script>
  <script src="board.js"></script>
  <script src="snake.js"></script>
  <script src="underscore.js"></script>
  
 </head>
<body>


 
   <center>
   <button><a href="http://www.mikeherold.es">return to www.mikeherold.es</a></button>
 </center>
 <center><div id="clock">
   <h2><span id="seconds">0</span> seconds</h2>
 </div></center>

  <div id='field' 
  style="margin-left: 320px; width: 700px">
</div> 

  
  <script>
  $(function () {
    
    var game = new S.Snake('W', 5);

    var view = new S.View('#field', game);
    view.prestart();
    

  })
  </script>
</body>