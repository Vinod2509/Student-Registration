const loginform=document.querySelector('form')

loginform.addEventListener('submit',(e) =>{
    e.preventDefault()

    const passwordEl=document.getElementById('password-el')
const usernameEl=document.getElementById('username-el')

 
    const password=passwordEl.value
    const username=usernameEl.value
    
    console.log(password)
    console.log(username)
    

    
   fetch('http://localhost:80/users/login',{
   
   method:"POST",
   body:JSON.stringify({
       email:username,
       password:password
   }),
   headers: {
       "Content-Type": "application/json; charset=UTF-8"
   }
}).then((response)=>{
    response.json().then((data)=>{
        if(!data.error){
            console.log(data)//*webcam-studentRegistration
        window.open('http://localhost:80/faculty',"_self")
    }else
    alert('no user found...singnup!')
})
    
    })   
    
    
    
    })



