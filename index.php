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
 
<br>

<div id="clock" style="margin-left: 38px">
   <h2><span id="seconds">0</span> seconds</h2>
 </div></div>
<div id="controls"><img src="Keyboard.png"></div>
  <div id='field' 
  style="margin-left: 260px; width: 700px">
</div> 

  
  <script>
  $(function () {
    
    var game = new S.Snake('S', 10);

    var view = new S.View('#field', game);
    view.prestart();
    

  })
  </script>
</body>
