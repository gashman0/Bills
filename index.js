// FOR THE CAROUSEL
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        moveSlide(button.dataset.carouselButton === "next" ? 1 : -1);
    });
});

function moveSlide(offset) {
    const slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
}

// Auto-slide every 3 seconds
setInterval(() => {
    moveSlide(1); // move to next slide
}, 8000);




// FOR THE FORM 
let currentStep = 0;
const steps = document.querySelectorAll('.step');
const form = document.getElementById("onboardingForm");

const prev = document.getElementById('prev_btn');
const next = document.getElementById('next_btn');

function showStep(stepIndex) {
    steps.forEach((step, i) => {
        step.style.display = i === stepIndex ? "block" : "none";
    });

    // Handle prev button visibility
    prev.style.display = stepIndex === 0 ? "none" : "inline-block";

    // Handle next button text
    if (stepIndex === steps.length - 1) {
        next.textContent = "Submit";
        next.style.backgroundColor = "green";
        displayReview(); // populate review step when we land here
    } else {
        next.textContent = "Next";
        next.style.backgroundColor = "#2A61DE";
    }
}

// Next button
next.addEventListener("click", () => {
    if (!validateStep()) return;

    if (currentStep === steps.length - 1) {
        // Last step → submit form
        form.submit();
        return;
    }

    currentStep++;
    showStep(currentStep);
});

// Previous button
prev.addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});

// Validation
function validateStep() {
    steps[currentStep].querySelectorAll(".error-message").forEach(e => e.remove());

    const inputs = steps[currentStep].querySelectorAll("input[required]");
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;

            const errorMsg = document.createElement("div");
            errorMsg.className = "error-message";
            errorMsg.textContent = "This field is required.";
            errorMsg.style.color = "red";
            errorMsg.style.fontSize = "14px";
            errorMsg.style.marginTop = "5px";

            input.insertAdjacentElement("beforebegin", errorMsg);

            input.addEventListener("input", () => {
                let prevEl = input.previousElementSibling;
                if (prevEl && prevEl.classList.contains("error-message")) {
                    prevEl.remove();
                }
            }, { once: true });
        }
    });

    return isValid;
}

// Populate review step
function displayReview() {
    document.getElementById("reviewName").textContent =
        form.querySelector('input[type="text"]').value;

    document.getElementById("reviewPhone").textContent =
        form.querySelector('input[type="tel"]').value;

    document.getElementById("reviewEmail").textContent =
        form.querySelector('input[type="email"]').value;

    document.getElementById("reviewPosition").textContent =
        form.querySelectorAll('input[type="text"]')[1].value; // second text input = position
}

// Init
showStep(currentStep);


