

const loginform=document.querySelector('form')

loginform.addEventListener('submit',(e) =>{
    e.preventDefault()

    const password=document.getElementById('password-el').value
    const username=document.getElementById('username-el').value

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
        window.open('http://localhost:80/libform',"_self")
    }
        else
        alert('no user found...singnup!')
    })
})

})

