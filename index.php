<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <title>Snake</title>
  <link rel="stylesheet" href="snake.css" type="text/css">

  <script src="jquery.js"></script>

  <script src="snakeUI.js"></script>
  <script src="board.js"></script>
  <script src="snake.js"></script>
  <script src="underscore.js"></script>
  
 <link rel="shortcut icon" href="">	
     <link rel="icon" href="https://s3-us-west-1.amazonaws.com/herold4/snake.png" type="image/png">
 	</head>
<body>


 
 
     <div style="margin-left: 470px"><button><a href="http://www.mikeherold.es">return to www.mikeherold.es</a></button>

<div id="clock" style="margin-left: 38px">
   <h2><span id="seconds">0</span> seconds</h2>
 </div></div>

  <div id='field' 
  style="margin-left: 200px; width: 700px">
</div> 

  
  <script>
  $(function () {
    
    var game = new S.Snake('S', 10);

    var view = new S.View('#field', game);
    view.prestart();
    

  })
  </script>
</body>