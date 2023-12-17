
let x=document.cookie
let token=x.replace("authorizationToken=","")
console.log(token)
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
       //shutter.play();
    
       // take snapshot and get image data
       Webcam.snap(function(data_uri) {
          // display results in page
          //document.getElementById('results').innerHTML = 
              //'<img src="'+data_uri+'"/>';
               fetch('http://localhost:80/imgverify', {
                method: "POST",
                body: JSON.stringify({
                        encoded_image2:data_uri
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization":token
        }
            }).then((response) => {
                response.json().then((response)=> 
                {
                    //console.log(JSON.stringify(response));
                    let object=JSON.parse(JSON.stringify(response))
                    let da =object.da
                    
                    //console.log(da);
                    
                   // window.open('http://localhost:80/'+da,"_self");
                   window.alert('your prescence in institute is confirmed')
                   window.open('http://localhost:80',"_self")
                })


                }).catch((e) => {
                    window.alert('your image is not matched')
                
            });


              

        });
    }
   // </script>