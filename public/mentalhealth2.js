
function showQuestion(questionNumber) {
  var therapyType = document.querySelector('input[name="therapyType"]:checked');
  var genderIdentity = document.querySelector('input[name="genderIdentity"]:checked');
  var age = document.getElementById('age');
  var priorTherapy = document.querySelector('input[name="priorTherapy"]:checked');
  var sleepingHabits = document.querySelector('input[name="sleepingHabits"]:checked');
  var eatingHabits = document.querySelector('input[name="eatingHabits"]:checked');
  var physicalHealth = document.querySelector('input[name="physicalHealth"]:checked');

  

  document.getElementById('question' + (questionNumber - 1)).style.display = 'none';
  document.getElementById('question' + questionNumber).style.display = 'block';
}


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
function openStories() {
  window.location.href = "stories.html"; // Redirect to the stories.html page
}

function showResults() {
  var reasons = [];
  var checkboxes = document.querySelectorAll('input[name="reasons[]"]:checked');
  checkboxes.forEach(function(checkbox) {
      reasons.push(checkbox.value);
  });
  if (!reasons) {
    alert("Please pick one option to move forward.");
    return;
  }
  else{
    alert("Quiz submitted.");

  }
  


}