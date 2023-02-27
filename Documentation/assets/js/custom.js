const imageSelect = document.querySelector('.image');
const pseudoElement = window.getComputedStyle(imageSelect, '::after');

pseudoElement.addEventListener('click', function () {
    window.location.href = "https://www.google.com";
});
