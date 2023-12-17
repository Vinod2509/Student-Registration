// Handle form submission
const form = document.getElementById('documentForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Collect form data
  const rollNo = document.getElementById('rollNo').value;
  const branch = document.getElementById('branch').value;
  const sem = document.getElementById('sem').value;
  const degree = document.getElementById('degree').value;
  const year = document.getElementById('year').value;
  const presem = document.getElementById('presem').value;
  const sgpi = document.getElementById('sgpi').value;
  const cgpi = document.getElementById('cgpi').value;
  const bcourses = [];
  const cccodes = document.getElementsByClassName('cccode');
  const cnames = document.getElementsByClassName('cname');
  for (let i = 0; i < cccodes.length; i++) {
    bcourses.push({
      cccode: cccodes[i].value,
      cname: cnames[i].value
    });
  }
  
  // const remarks = document.getElementById('remarks').value;
  // const completed = document.getElementById('completed').checked;

  // Create FormData object and append form data
  const formData = new FormData();
  formData.append('Roll_No', rollNo);
  formData.append('branch', branch);
  formData.append('sem', sem);
  formData.append('degree', degree);
  formData.append('year', year);
  formData.append('presem', presem);
  formData.append('sgpi', sgpi);
  formData.append('cgpi', cgpi);
  const filesInput = document.getElementById('files');
// Get selected files
const files = filesInput.files;
// Convert each file to Blob and append to FormData
for (let i = 0; i < files.length; i++) {
  const file = new Blob([files[i]], { type: files[i].type });
  formData.append('files', file);
}
  formData.append('bcourses', JSON.stringify(bcourses));

  formData.append('remarks', "");
  
  // Send form data to the backend

  fetch('http://localhost:80/tasks', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Handle response from the backend
      console.log(data); // You can do something with the response data here
      window.open('http://localhost:80','_self')
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Handle "Add Course" button click
const addCourseButton = document.getElementById('addCourse');
addCourseButton.addEventListener('click', function(event) {
  event.preventDefault();

  const coursesContainer = document.getElementById('coursesContainer');
  const courseDiv = document.createElement('div');
  courseDiv.innerHTML = `
    <input type="text" class="cccode" placeholder="Course Code">
    <input type="text" class="cname" placeholder="Course Name">
    <br>
  `;
  coursesContainer.appendChild(courseDiv);
});
