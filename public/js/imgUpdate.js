
   
   // <script language="JavaScript">
    
     // Configure a few settings and attach camera
     Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach( '#my_camera' );
   
    // preload shutter audio clip
    var shutter = new Audio();
    shutter.autoplay = true;
    shutter.src = navigator.userAgent.match(/Firefox/) ? 'shutter.ogg' : 'shutter.mp3';
   
   function take_snapshot() {
      // play sound effect
      shutter.play();
   
      // take snapshot and get image data
      Webcam.snap(function(data_uri) {
         // display results in page
         //document.getElementById('results').innerHTML = 
             //'<img src="'+data_uri+'"/>';
              fetch('http://localhost:80/imgupdate', {
               method: "PATCH",
               body: JSON.stringify({
                       encoded_image2:data_uri
       }),
       headers: {
           "Content-Type": "application/json; charset=UTF-8"
       }
           }).then((response) => {
               console.log(response.json())
               
                
               console.log({"imagestatus":"got the image"})
               window.open('http://localhost:80/login',"_self")
       
       
           
           }).catch((e) => {
               console.log("wrong data");
               
           });


             

       });
   }
  // </script>