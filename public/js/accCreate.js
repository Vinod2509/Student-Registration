
// const createForm = document.querySelector('form')

// console.log("js is loaded")

// createForm.addEventListener('submit', function (e) {
//     e.preventDefault()
//     console.log("button pressed")

//     const roll=document.getElementById('roll-el').value
//     const email=document.getElementById('email-el').value
//     const password=document.getElementById('password-el').value
//     const confirmPassword=document.getElementById('confirmPassword-el').value
    
//     console.log(roll)

//     const checkingMail=roll+"@nith.ac.in";

//     if(checkingMail === email){
        
//         if(confirmPassword != password){
//             alert('password is not matched')
//         }else{
    
            
//             fetch('http://localhost:80/users', {
//                 method: "POST",
//                 body: JSON.stringify({
//                         email:email,
//                         password:password,
//                          roll:roll
//         }),
//         headers: {
//            // "Content-Type": "application/json",
//              //"charset":"UTF-8"
//              "Content-Type": "application/json; charset=UTF-8"
//         }
//             }).then((response) => {
                
//                  response.json().then( (data)=> {
//                 alert("account is created")
//                 window.open('http://localhost:80/otp')
        
        
//             }).catch((e) => {
//                 console.log(e);
                
//             })
        
        
//         })
//         }
    
    
    
//     }else{
//         alert("enter correct mail")
//     }

    


    
    
    

  

const form = document.getElementById("user-form");
//const sendOtpButton = document.getElementById("send-otp");

//Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // TODO: Add form validation and submit form data to backend
});


   let verfEle = document.querySelector('.verification');
   let successEle = document.querySelector('.success');
   let errorEle = document.querySelector('.error');
   let otp_inputs = document.querySelectorAll('.otp_num');
   let emailpartialEle = document.querySelector('.emailpartial');
   let regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
   let otp_check = '';
   let email,roll,password,confirmPassword;

   otp_inputs.forEach(
       (ip) => {
                   ip.addEventListener('keyup', moveNext)
               }
    )

   function moveNext(event) {
       // otp_num_4

       let current = event.target;
       let index = current.classList[1].slice(-1);
       if (event.keyCode == 8 && index > 1) {
               current.previousElementSibling.focus()
       }
       else if (index < 4) {
           current.nextElementSibling.focus()

       }
       otp_check = '';
       for (ip of otp_inputs) {
           otp_check += ip.value
       }
       if (otp_check.length == 4) {
           verifyOTP()
       }

   }

   function verifyOTP() {
    fetch('http://localhost:80/verify',
         {
               method: "POST",
               body: JSON.stringify({
               "email": `${email}`,
               "otp": `${otp_check}`
               }),
                headers: { 'Content-Type': 'application/json' }


          }
       ) .then(
               (res) => {
                   console.log(res)
                 if (res.status == 200) {
                   
                      verfEle.style.display = 'none';
                      successEle.style.display = 'block';
                       errorEle.style.display = 'none';

                    fetch('http://localhost:80/users', {
                            method: "POST",
                            body: JSON.stringify({
                                  First_Name:document.getElementById('firstName').value,
                                  Last_Name:document.getElementById('lastName').value,
                                  dob:document.getElementById('dob').value,
                                  Mobile_Number:document.getElementById('mobileNumber').value,
                                  Gender:document.getElementById('gender').value,
                                  Address:document.getElementById('address').value,
                                  City:document.getElementById('city').value,
                                  Pin_Code:document.getElementById('pinCode').value,
                                  State:document.getElementById('state').value,
                                  Country:document.getElementById('country').value,
                                  email:email,
                                  password:password,
                                  roll:roll
                               }),
                            headers: {
                                  "Content-Type": "application/json; charset=UTF-8"
                            }
                      }).then((response) => {
       
                         response.json().then( (data)=> {
                         console.log("account is created")


                         }).catch((e) => {
                           console.log(e);
       
                         })

                          alert("account is created")
                          window.open('http://localhost:80/imgupdate',"_self")


                      })

                   }else {

                      errorEle.style.display = 'block';
                      errorEle.innerHTML = "Invalid OTP";
                      successEle.style.display = 'none';

                   }
               }
           )

   }



    function sendOTP()
   {
    const rollEle=document.getElementById('roll-el')
    
const passwordEle=document.getElementById('password-el')
const confirmPasswordEle=document.getElementById('confirmPassword-el')

   let emailEle = document.getElementById('email-el');

      email = emailEle.value;
      roll=rollEle.value
      password=passwordEle.value
      confirmPassword=confirmPasswordEle.value
      const checkingMail=roll+"@nith.ac.in"
      console.log(checkingMail)

      if(checkingMail===email){

        if(confirmPassword===password){


             if (regex.test(email)) {
                fetch('http://localhost:80/sendotp', {
                    method: "POST",
                    body: JSON.stringify({
                    "email": `${email}`
                    }),
                    headers: { 'Content-Type': 'application/json' }
                   })
                   .then(
                   (res) => {
                      if (res.status == 200) {
                         verfEle.style.display = 'block';
                         emailpartialEle.innerHTML = "***" + email.slice(3)
                       
                       }
                       else {
                         errorEle.style.display = 'block';
                        errorEle.innerHTML = "Email not exist";
                        successEle.style.display = 'none';

                       }
                   })

               }
                else {
                 errorEle.style.display = 'block';
                 errorEle.innerHTML = "Invalid Email";
                 successEle.style.display = 'none';

               }

           }else{
             alert('password is not matched')

           }
       }else{

           alert('enter correct email')

        }




  

   }


