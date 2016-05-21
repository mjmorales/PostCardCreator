//Easeljs library used to manipulate canvas objects

var stage, output, canvas;//globally declare these variables to prevent errors in scope
var upload = document.getElementById('upload');//globally declare this variable to prevent errors in file reading
var image = document.getElementById('image');//globally declare this variable to prevent errors in file reading

		
function init() {//initializes the canvas, runs on page load 
    
    canvas = document.getElementById("canvas");//create canvas object
    stage = new createjs.Stage(canvas);//constructor to create stage object from canvas
	alert("The stage has been initialized");//shows stage has properly loaded
	stage.update();//refreshes the stage, updating objects on it
    document.getElementById("canvas").style.display= 'block';
    document.getElementById("canvasImg").style.display= 'none';
}


function addImg() {//adds an image to the canvas, and allows for user manipulation of image
        
    var img = new Image();//create image object
    img.src = reader.result;//get image src from user upload. 
 
    img.onload = 
        function () {
            var bitmap = new createjs.Bitmap(this);//convert img to bitmap for easier movement around the canvas
            stage.addChild(bitmap);//add bitmap to canvas 
            stage.update();//refresh stage
                    
            bitmap.on("pressmove",function(evt) {//allows user to move images by dragging on stage, called when image is clicked and draged
				evt.currentTarget.x = evt.stageX;//sets the image's current x coord to the mouse's x coord
				evt.currentTarget.y = evt.stageY;//sets the image's current y coord to the mouse's y coord
				stage.update();//refreshes the canvas and moves the image
            });
        
             bitmap.on("dblclick",function(evt) {//allows the user to scale the size of the image by double clicking
                 
                 var xScalar,yScalar;//values to scale the height and width
                 
                 //prompt user to enter scale for x and y, if 0 the image is deleted
                 xScalar=prompt("Enter a number to scale the image's WIDTH, 1 resets the img and 0 deletes it");
                 yScalar=prompt("Enter a number to scale the image's HEIGHT, 1 resets the img and 0 deletes it");
                 
                 if(xScalar!=0 && yScalar!=0) {//checks if user wishes to delete the image
                     this.scaleX = xScalar//scales the x
                     this.scaleY = yScalar//scales the y
                     stage.update();//refreshes stage, showing newly scaled image
                 }
                    
                 else{//prompt the user of they wish to continue deleting the image
                     alert("You've entered 1 or more 0s into the scalar! This will delete the image!");
                   
                 if(confirm("Continue deleting the image?")) {
                       this.scaleX = xScalar//scalar is 0
                       this.scaleY = yScalar//scalar is 0
                       stage.update();//image is deleted
                }
                 else{}//empty stub, if user does not want to delete image
                     
                     }
                                            
            });
            
        }
}

function addText() {//adds text to the canvas, performs similarly to an image being added
    
    var color = document.getElementById('formColor').value;//retrieve color from user
    color = color.toLowerCase();//set color to always lowecase, for fewer errors
        
    var font = document.getElementById('fontType').value;//retrieve font from user
    var fontSize = document.getElementById('fontSize').value;//retrieve font size from user
    var textChange = document.getElementById('textChange').value;//retrieve if text is bold or italic from user
    
    
    //create text object using parameters from the user
    var text = new createjs.Text(prompt("Enter text to display: "), ""+textChange+" "+fontSize+"px "+font+ "", color);
    stage.addChild(text);//adds text to canvas
    stage.update();//refreshes canvas showing text
    
    text.on("pressmove",function(evt) {//allows user to move text around stage, same as image movement
				evt.currentTarget.x = evt.stageX;
				evt.currentTarget.y = evt.stageY;
				stage.update();
            });
        
             text.on("dblclick",function(evt) {//allows the user to scale the size of the text, same as image scaling
                 
                 var xScalar,yScalar;
                 xScalar=prompt("Enter a number to scale the text's WIDTH, 1 resets the img and 0 deletes it");
                 yScalar=prompt("Enter a number to scale the text's HEIGHT, 1 resets the img and 0 deletes it");
                 
                 if(xScalar!=0 && yScalar!=0) {
                     this.scaleX = xScalar
                     this.scaleY = yScalar
                     stage.update();
                 }
                    
                 else {
                     alert("You've entered 1 or more 0s into the scalar! This will delete the text!");
                   
                 if(confirm("Continue deleting the text?")) {
                       this.scaleX = xScalar
                       this.scaleY = yScalar
                       stage.update();
                }
                 else{}
                     
                     }
                                            
            });
            
        }


//////////////////////////////////////////////////////
//code from starter code given
function uploadImage(input) {//allows user to choose image to add to canvas

    if (input.files && input.files[0]) {
        reader = new FileReader();
        
        reader.onload = function (e) {
            image.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
};

$("#upload").change(function(){
    uploadImage(this);
});
////////////////////////////////////////////////////////


function saveCanvas() {
    
    var dataURL = canvas.toDataURL();//Saves canvas data into a png
    document.getElementById('canvasImg').src = dataURL;//sets canvasImg to the previous canvas object, to allow for saving 
    document.getElementById("canvas").style.display= 'none';
    document.getElementById("canvasImg").style.display= 'block';
}

function ShowDirections() {//displays directions for using the stage, defaulted to hidden
    
    if (document.getElementById("Directions").style.display == 'none') {

        document.getElementById("Directions").style.display = 'block';

    }
    
    //if directions are displayed already, stop displaying them
    else {
        
        document.getElementById("Directions").style.display = 'none';

    }
    
}    
    
