let current_page = 0;
const pages = document.querySelectorAll('.page');
const progressBar = document.querySelector('.progress-bar .progress');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showPage(pageIndex) {
  pages.forEach((page, index) => {
    if (index === pageIndex) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((current_page + 1) / pages.length) * 100;
  progressBar.style.width = progress + '%';
}

function nextPage() {
  if (current_page < pages.length - 1) {
    current_page++;
    showPage(current_page);
  }
}

function prevPage() {
  if (current_page > 0) {
    current_page--;
    showPage(current_page);
  }
}

// Add event listener to the "Next" button
nextBtn.addEventListener('click', nextPage);

// Add event listener to the "Previous" button
prevBtn.addEventListener('click', prevPage);

   // Function to open the modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
    // Attach event listener to check if all fields are filled
    document.getElementById("myModal").addEventListener("input", function() {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var gender = document.getElementById("gender").value;

        if (name && age && gender) {
            document.getElementById("submitButton").style.display = "block";
        } else {
            document.getElementById("submitButton").style.display = "none";
        }
    });
}

// Function to close the modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}


  // Function to save patient details
  function savePatient() {
      var name = document.getElementById("name").value;
      var age = document.getElementById("age").value;
      var gender = document.getElementById("gender").value;

      // Validate all fields are filled
      if (!name || !age || !gender) {
          alert("Please fill in all fields.");
          return;
      }

      // Validate number of patients
      if (document.querySelectorAll('.patient').length >= 4) {
          alert("Maximum 4 patients allowed.");
          return;
      }

      // Create a new patient rectangle
      var patientDiv = document.createElement("div");
      patientDiv.className = "patient";

      // Create elements for displaying patient details
      var nameElement = document.createElement("div");
      var agegenderElement = document.createElement("div")

      // Set text content and styles for each element
      nameElement.textContent = name;
      nameElement.style.fontSize = "20px";

      agegenderElement.textContent = age+", "+gender;
      agegenderElement.style.color = "rgb(75, 71, 71)";
      agegenderElement.style.fontSize = "14px";

      // Append elements to patientDiv
      patientDiv.appendChild(nameElement);
      patientDiv.appendChild(agegenderElement);

      // Add click event to move forward
      patientDiv.onclick = function() {
        // Remove border color from all patient divs
        document.querySelectorAll('.patient').forEach(function(div) {
            div.classList.remove('selected');
        });
        // Add border color to the selected patient div
        this.classList.add('selected');
    };
    

      // Append patient rectangle to container
      document.getElementById("patientContainer").appendChild(patientDiv);

      // Check if 4 patients have been added and hide the button
      if (document.querySelectorAll('.patient').length >= 4) {
          document.getElementById("addMemberButton").style.display = "none";
      }

      // Clear form fields
      document.getElementById("patientForm").reset();

      // Close modal
      closeModal();
  }

  // Function to show submit button if all fields are filled
  document.getElementById("myModal").addEventListener("input", function() {
      var name = document.getElementById("name").value;
      var age = document.getElementById("age").value;
      var gender = document.getElementById("gender").value;

      if (name && age && gender) {
          document.getElementById("submitButton").style.display = "block";
      } else {
          document.getElementById("submitButton").style.display = "none";
      }
  });
    // Add symptom from input box
    $('#addSymptom').click(function() {
      var symptom = $('#inputSymptom').val().trim();
      if (symptom !== '') {
        $('.symptoms').append('<div class="symptom">' + symptom + '<span class="remove"><i class="fas fa-times"></i></span></div>');
        $('#inputSymptom').val('');
      }
    });
  
    // Remove symptom
    $('.symptoms').on('click', '.remove', function() {
      $(this).parent().remove();
    });
  
    // Add suggested symptom
    $('.suggested-symptom').click(function() {
      var symptom = $(this).text().trim();
      $('.symptoms').append('<div class="symptom">' + symptom + '<span class="remove"><i class="fas fa-times"></i></span></div>');
      $(this).remove();
    });
