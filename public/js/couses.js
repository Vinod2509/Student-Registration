const addCourseBtn = document.getElementById('addCourse');
const coursesContainer = document.getElementById('courses');

let courseId = 0;

addCourseBtn.addEventListener('click', () => {
  const courseContainer = document.createElement('div');
  courseContainer.classList.add('course');

  const ccodeInput = createInput('text', 'ccode', `Course Code ${courseId + 1}`);
  const cnameInput = createInput('text', 'cname', `Course Name ${courseId + 1}`);
  const creditsInput = createInput('number', 'credits', `Credits ${courseId + 1}`);
  const hoursInput = createInput('number', 'hours', `Hours ${courseId + 1}`);

  courseContainer.appendChild(ccodeInput);
  courseContainer.appendChild(cnameInput);
  courseContainer.appendChild(creditsInput);
  courseContainer.appendChild(hoursInput);

  coursesContainer.appendChild(courseContainer);

  courseId++;
});

function createInput(type, name, label) {
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('inputContainer');

  const inputLabel = document.createElement('label');
  inputLabel.setAttribute('for', name);
  inputLabel.textContent = label;

  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('id', name);
  input.setAttribute('name', name);
  input.setAttribute('required', true);

  inputContainer.appendChild(inputLabel);
  inputContainer.appendChild(input);

  return inputContainer;
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const thours = document.getElementById('thours').value;
  const tcredits = document.getElementById('tcredits').value;
  const branch = document.getElementById('branch').value;
  const sem = document.getElementById('sem').value;
  const courses = [];

  const courseContainers = document.querySelectorAll('.course');

  courseContainers.forEach((container) => {
    const ccode = container.querySelector('[name="ccode"]').value;
    const cname = container.querySelector('[name="cname"]').value;
    const credits = container.querySelector('[name="credits"]').value;
    const hours = container.querySelector('[name="hours"]').value;

    courses.push({
      ccode,
      cname,
      credits,
      hours
    });
  });

  const data = {
    thours,
    tcredits,
    courseDetails: {
      branch,
      sem,
      courses
    }
  };

  fetch('http://localhost:80/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        alert('Course added successfully!');
        window.location.href = '/';
      } else {
        throw new Error('Failed to add course');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Failed to add course');
    });
});
