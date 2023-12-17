const form = document.getElementById("form");
let x=document.cookie
let token=x.replace("authorizationToken=","")

form.addEventListener("submit", (event) => {
	event.preventDefault();

  const year=document.getElementById('year').value;
  const room=document.getElementById('room').value;
  const hostel_name=document.getElementById('hostel_name').value;
  const file = document.getElementById('file').files[0];
  const formData = new FormData();
  formData.append('room',room)
  formData.append('hostel_name',hostel_name)
  
  formData.append('year', year);
  formData.append('file', file);
  console.log(formData);

  
  
	
  
  // formData.append('hostel_name', hostel_name);
  
  // formData.append('room', room);
  // formData.append('year', year);
  // formData.append('file', file);
  

	
  
	// Send the form data to the server along with the authorization key
	fetch("http://localhost:80/hostel", {
		method: "POST",
		body: formData,
		headers: {
			"Authorization":token
		}
	})
	.then(response => {
		if (response.ok) {
			alert("Form submitted successfully!");
			window.open('http://localhost:80/studentRegistration','_self')
		} else {
			alert("There was an error submitting the form.");
		}
	})
	.catch(error => {
		console.error(error);
		alert("There was a network error.");
	});
});


