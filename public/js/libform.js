const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const uploadForm = document.getElementById('upload-form');
const fileList = document.getElementById('files');
const fileInput = document.getElementById('file');
const nextPage = document.getElementById('next-page');
const yearEl=document.getElementById('year')

let x=document.cookie
let token=x.replace("authorizationToken=","")



yesButton.addEventListener('click', () => {
  uploadForm.classList.remove('hidden');
  nextPage.classList.remove('hidden');
  
});

noButton.addEventListener('click', () => {
  console.log('no event')
  let year=yearEl.value
  console.log(year)
  fetch('http://localhost:80/lib',{
    method:"POST",
    body:JSON.stringify({
      year 

    }),
    headers:{
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization":token
}
  }).then((response) => {
       
    response.json().then( (data)=> {
    console.log(data)


    }).catch((e) => {
      console.log(e);

    })
    
   window.open('http://localhost:80/hostelform',"_self")


})

 
});

nextPage.addEventListener('click',()=>{
  const files=fileInput.files;
  const numFiles=files.length;
  
  if(numFiles===0){
    window.alert('upload files')
  }else{
    window.open('http://localhost:80/hostelform')
  }
})

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const listItem = document.createElement('li');
      listItem.classList.add('file-item');

      const preview = document.createElement('img');
      preview.classList.add('file-preview');
      preview.src = reader.result;

      const name = document.createElement('span');
      name.classList.add('file-name');
      name.textContent = file.name;

      const deleteBtn = document.createElement('span');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.innerHTML = '&#x2716;';
      deleteBtn.addEventListener('click', () => {
        listItem.remove();
      });

      listItem.appendChild(preview);
      listItem.appendChild(name);
      listItem.appendChild(deleteBtn);
      fileList.appendChild(listItem);
    }
  }
});


const documentForm = document.getElementById('documentForm');
documentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const year = document.getElementById('year').value;
  const file = document.getElementById('file').files[0];
  const formData = new FormData();
  formData.append('year', year);
  formData.append('file', file);
  
  fetch('/lib', {
    method: 'POST',
    body: formData,
    headers:{
      "Authorization":token

    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Document uploaded successfully');
      window.open('http://localhost:80/hostelform','_self')
      documentForm.reset();
    } else {
      console.error('Error uploading document');
    }
  })
  .catch(error => {
    console.error('Error uploading document:', error);
  });
});
