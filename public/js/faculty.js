let studentInfo;

function changeStatus(rol,col){
    let task
  for(let i=0;i<studentInfo.length;i++){
    if(studentInfo[i].Roll_No==rol){
        task=studentInfo[i];
        break;

    }
   
}
let state;
if(col==='1'){
   state=true;
}else{
  state=false;
}
task.completed=state;
const updates ={ 
                completed:task.completed,
                remarks:task.remarks
              }
//updating the status on the student
const url = "http://localhost/tasks/"+task._id;
   console.log(url);

   fetch(url, {
   method: 'PATCH',
   headers: {
   'Content-Type': 'application/json'
   },
   body: JSON.stringify(updates)
   })
  .then(response => {
  if (!response.ok) {
   throw new Error('Network response was not ok');
  }
    return response.json();
  })
 .then(data => {
  const viewColor=document.querySelector("#button-"+data.Roll_No);
  let presenState=data.completed
  let buttonColor = "white";
  if (presenState == false) {
  buttonColor = "red";
  } else if (presenState == true) {
  buttonColor = "green";
  }
  viewColor.style.backgroundColor=buttonColor
   console.log(data);
 })
.catch(error => {
 console.error('Error:', error);
});




}

//code for applying limit sort filter
let selectedFilterValue = '';
let selectedSortValue = '';

 const filterSelect = document.querySelector('#filter-select');
 const sortSelect = document.querySelector('#sort-select');

 console.log(sortSelect.value)

filterSelect.addEventListener("change",()=>{
  
  let filterValue = filterSelect.value;
  console.log('filter event triggered 1')
  selectedFilterValue = filterValue;
  makeGetConfig(selectedFilterValue, selectedSortValue);
});

sortSelect.addEventListener("change", () => {
  let sortValue = sortSelect.value;
  console.log('event triggered 2')
  selectedSortValue = sortValue;
  makeGetConfig(selectedFilterValue, selectedSortValue);
});



function makeGetConfig(filterValue, sortValue) {
  // Construct the query string based on the selected filter and sort values
 document.getElementById("table").innerText=''
  console.log("makeGetCall")
  let queryString = '';
  if (filterValue) {

    if(filterValue==='accepted')
     {
      filterValue='true'
     }
    else if(filterValue ==="rejected")
     {
      filterValue='false'
      }
     else if(filterValue==="notVisited")
     {
     filtervalue=""
    }
    queryString += `completed=${filterValue}`;
  }


  if (sortValue) {
    queryString += `${queryString ? '&' : ''}sortBy=Roll_No:${sortValue}`;
  }

  // Make the GET call with the selected filter and sort values
  makeBackendcall(queryString)

}




//..............form event ...........

const form=document.querySelector("#myForm")

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  
   makeBackendcall(1);
})

//...........makeBackendcall function.........

function makeBackendcall(l){
  if(l!=1){
    let queryString=l
    const branch=document.getElementById('Branch').value
  const degree=document.getElementById('Degree').value
  const sem=document.getElementById('sem').value
  const year=document.getElementById('year').value

  
    fetch('http://localhost/tasks?Branch='+branch+'&sem='+sem+'&degree='+degree+(queryString ? '&'+queryString : '')).then((response)=>{
response.json().then((data)=>
{
console.log(queryString)
console.log(data.length)
formTable(data)
})     

}).catch((e)=>{
console.log('error')
})

}else if(l==1){
  const branch=document.getElementById('Branch').value
  const degree=document.getElementById('Degree').value
  const sem=document.getElementById('sem').value
  const year=document.getElementById('year').value
  console.log('http://localhost/tasks?branch='+branch+'&sem='+sem+'&degree='+degree)
  console.log(sem)
  console.log(degree)

  fetch('http://localhost/tasks?branch='+branch+'&sem='+sem+'&degree='+degree).then((response)=>
{return response.json()}).then((data)=>
{

formTable(data)

})     
.catch((e)=>{
console.log('error')
})
}
}

//......creating table...............
function formTable(data){

  console.log('forming table')
  document.getElementById("table").innerHTML=''

  let tableData=""
  let count=0;
  studentInfo=data 
  data.map((values)=>
  {
  let buttonColor ="white"
  // console.log(values.completed)
  // if(!values.completed){

  // }else if (values.completed === false) {
  // buttonColor = "red";
  // } else if (values.completed === true) {
  // buttonColor = "green";
  // }
  
      // <td>${values.First_Name}</td>
      // <td>${values.Last_Name}</td>
  /////................................/////////////
      let student=values.Roll_No
      console.log(student)
      tableData+=`<tr>
      <td>${count}</td>
      <td>${values.Roll_No}</td>
      <td><button style="background-color: ${buttonColor}" id="button-${student}" onclick="openPopup('${student}')">view</button></td>
      </tr>`;
       count++;
  })
  document.getElementById("table").innerHTML+=tableData
  
  
  }



  





//....................................................................................//

 
function openPopup(rn)
        {
            console.log(studentInfo)
            let student;
            for(let i=0;i<studentInfo.length;i++){
                if(studentInfo[i].Roll_No==rn){
                    student=studentInfo[i];
                    break;

                }
            }
            console.log(student);
            let course
            let personalData
            fetch('/users?Roll_No='+student.Roll_No )
            .then(response => response.json())
            .then(data => {
              // Process the retrieved data
              console.log(data);
              personalData=data

              fetch('/ccourses?branch='+student.branch +'&sem='+student.sem)
              .then(response => response.json())
              .then(data => {
                // Process the retrieved data
                console.log(data);
                course=data


                   // create the modal element
           const modal = document.createElement("div");
           modal.classList.add("modal");
         
     
        // set the HTML content of the modal
        modal.innerHTML = `
        <div class="modal-content">

        
        <span class="close">&times;</span>        
         <h3>STUDENT REGISTRATION FORM</h3>
         
<table align="center" cellpadding = "10">

<!----- First Name ---------------------------------------------------------->
<tr>
  <td >Roll No</td>
  <td><input type="text" name="roll_No" value="${student.Roll_No}"/>
  </td>

</tr>
  
<tr>
    <td>FIRST NAME</td>
    <td><input type="text" name="fname" value="${personalData[0].First_Name}"/>
    </td>
</tr>
 
<!----- Last Name ---------------------------------------------------------->
<tr>
    <td>LAST NAME</td>
    <td><input type="text" name="Last_Name" value="${personalData[0].Last_Name}"/>
    </td>
</tr>
 
<!----- Date Of Birth -------------------------------------------------------->
<tr>
<td>DATE OF BIRTH</td>
 <td><input id="dob" type="text" name="dob" maxlength="11" value="${personalData[0].dob}"/>


</td>
</tr>
 
<!----- Email Id ---------------------------------------------------------->
<tr>
<td>EMAIL ID</td>
<td><input type="text" name="Email_Id" maxlength="100" value="${personalData[0].email}" /></td>
</tr>
 
<!----- Mobile Number ---------------------------------------------------------->
<tr>
<td>MOBILE NUMBER</td>
<td>
<input type="text" name="Mobile_Number" maxlength="10" value="${personalData[0].Mobile_Number}" />
(10 digit number)
</td>
</tr>
 
<!----- Gender ----------------------------------------------------------->
<tr>
<td>GENDER</td>
<td>
<textarea id="gender" name="gender" rows="4" cols="50">${personalData[0].Gender}</textarea>

</td>
</tr>
 
<!----- Address ---------------------------------------------------------->
<tr>
<td>ADDRESS <br /><br /><br /></td>
<td><textarea name="Address" rows="4" cols="30">${personalData[0].Address}</textarea></td>
</tr>
 
<!----- City ---------------------------------------------------------->
<tr>
<td>CITY</td>
<td><input type="text" name="City" maxlength="30" value="${personalData[0].City}" />
(max 30 characters a-z and A-Z)
</td>
</tr>
 
<!----- Pin Code ---------------------------------------------------------->
<tr>
<td>PIN CODE</td>
<td><input type="text" name="Pin_Code" maxlength="6" value="${personalData[0].Pin_Code}" />
(6 digit number)
</td>
</tr>
 
<!----- State ---------------------------------------------------------->
<tr>
<td>STATE</td>
<td><input type="text" name="State" maxlength="30" value="${personalData[0].State}" />
(max 30 characters a-z and A-Z)
</td>
</tr>
 
<!----- Country ---------------------------------------------------------->
<tr>
<td>COUNTRY</td>
<td><input type="text" name="Country" value="${personalData[0].Country}"/></td>
</tr>
 
<!----- Courses ---------------------------------------------------------->
 
 


 
<!----- Qualification---------------------------------------------------------->
<tr>

<table>
 
<tr>
<td align="center"><b>Sl.No.</b></td>
<td align="center"><b>Course Code</b></td>
<td align="center"><b>Course Name</b></td>
<td align="center"><b>Credits</b></td>
<td align="center"><b>Hours</b></td>

</tr>
 
<tr>
<td>1</td>

<td><input type="text" name="ccode" maxlength="30" value="${course[0].courseDetails.courses[0].ccode}" /></td>
<td><input type="text" name="cname" maxlength="30" value="${course[0].courseDetails.courses[0].cname}"/></td>
<td><input type="text" name="credits" maxlength="20" value="${course[0].courseDetails.courses[0].credits}"/></td>
<td><input type="text" name="hrs" maxlength="30" value="${course[0].courseDetails.courses[0].hours}" /></td>
</tr>
 
<tr>
<td>2</td>

<td><input type="text" name="ccode" maxlength="30" value="${course[0].courseDetails.courses[1].ccode}" /></td>
<td><input type="text" name="cname" maxlength="30" value="${course[0].courseDetails.courses[1].cname}"/></td>
<td><input type="text" name="credits" maxlength="20" value="${course[0].courseDetails.courses[1].credits}"/></td>
<td><input type="text" name="hrs" maxlength="30" value="${course[0].courseDetails.courses[1].hours}" /></td>
</tr>
 
<tr>
<td>3</td>

<td><input type="text" name="ccode" maxlength="30" /></td>
<td><input type="text" name="cname" maxlength="30" /></td>
<td><input type="text" name="credits" maxlength="20" /></td>
<td><input type="text" name="hrs" maxlength="30" /></td>
</tr>
 
<tr>
<td>4</td>

<td><input type="text" name="ccode" maxlength="30" /></td>
<td><input type="text" name="cname" maxlength="30" /></td>
<td><input type="text" name="credits" maxlength="20" /></td>
<td><input type="text" name="hrs" maxlength="30" /></td>
</tr>
 <tr>
<td>5</td>

<td><input type="text" name="ccode" maxlength="30" /></td>
<td><input type="text" name="cname" maxlength="30" /></td>
<td><input type="text" name="credits" maxlength="20" /></td>
<td><input type="text" name="hrs" maxlength="30" /></td>
</tr>
<tr>
<td>6</td>

<td><input type="text" name="ccode" maxlength="30" /></td>
<td><input type="text" name="cname" maxlength="30" /></td>
<td><input type="text" name="credits" maxlength="20" /></td>
<td><input type="text" name="hrs" maxlength="30" /></td>
</tr>
<tr>
<td>7</td>

<td><input type="text" name="ccode" maxlength="30" /></td>
<td><input type="text" name="cname" maxlength="30" /></td>
<td><input type="text" name="credits" maxlength="20" /></td>
<td><input type="text" name="hrs" maxlength="30" /></td>
</tr>
<tr>
<td>8</td>

<td><input type="text" name="ccode" maxlength="30" /></td>
<td><input type="text" name="cname" maxlength="30" /></td>
<td><input type="text" name="credits" maxlength="20" /></td>
<td><input type="text" name="hrs" maxlength="30" /></td>
</tr>
<tr>
  <td>9</td>
  
  <td><input type="text" name="ccode" maxlength="30" /></td>
  <td><input type="text" name="cname" maxlength="30" /></td>
  <td><input type="text" name="credits" maxlength="20" /></td>
  <td><input type="text" name="hrs" maxlength="30" /></td>
  </tr>
  

</table>
<tr>
  <td>Total Credits</td>
  <td><input type="text" name="Total Credits"  value="${course[0].tcredits}"/></td>
  </tr>
  <tr>
    <td>Total Hours</td>
    <td><input type="text" name="Total hours"  value="${course[0].thours}"/></td>
    </tr>
    <tr>
      <td>previous semster number</td>
      <td><input type="text" name="psn" value="${student.presem}"/></td>
      </tr>
    <tr>
        <td>SGPI</td>
        <td><input type="text" name="SGPI" value="${student.sgpi}"/></td>
    </tr>
    <tr>
          <td>CGPI</td>
          <td><input type="text" name="CGPI" value="${student.cgpi}"/></td>
          <td>STUDENT PRESENT AT INSTITUTE</td>
          <td><input type="boolean" name="studentStatus" value="${personalData[0].presentStatus}"/></td>
    </tr>
    <tr>
      <td>Courses With Grade F(if any)<br /><br /><br /><br /><br /><br /><br /></td>
       
      <td>
      <table>
       
      <tr>
      <td align="center"><b>Sl.No.</b></td>
      <td align="center"><b>Course Code</b></td>
      <td align="center"><b>Course Name</b></td>
      
      
      </tr>
       
      <tr>
      <td>1</td>
      
      <td><input type="text" name="fccode" maxlength="30" /></td>
      <td><input type="text" name="fcname" maxlength="30" /></td>
      
      </tr>
       
      <tr>
      <td>2</td>
      
      <td><input type="text" name="fccode" maxlength="30" /></td>
      <td><input type="text" name="fcname" maxlength="30" /></td>
      
      </tr>
      </table>
      
      <button class="w3-btn">add rows</button>
    
  
 
<!----- Course -------------------------------------------------------->


<div class="mb-3"></div>
<tr>
  <td> <label for="formFileSm" class="form-label">Fee Receipt</label></td>
 <td> <input class="form-control form-control-sm" id="formFileSm" type="text"></td>
</tr>
<tr>
<td> <label for="formFileSm" class="form-label">Certificates(if applicable)</label></td>
<td> <input class="form-control form-control-sm" id="formFileSm" type="file"></td>
</tr>
<tr>
<td> <button class="accept-btn" onclick= "changeStatus('${student.Roll_No}','1')">Accept</button> </td>
 <td> <button class="reject-btn"  onclick= "changeStatus('${student.Roll_No}','0')" >Reject</button> <td>
</tr>
</div>


</table>



 

    `;
      //gettting field id
      
     
        // add the modal to the page
           document.body.appendChild(modal);
     
           // add a click event listener to the close button
        const closeBtn = modal.querySelector(".close");
           closeBtn.addEventListener("click", () => {
           modal.remove();
           })









                
              })
              .catch(error => {
                // Handle any errors
                console.error(error);
              });
   
              
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
            });

                      
            // let student=values
            
         
       }





      