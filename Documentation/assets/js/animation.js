// Wrap every letter in a span
var textWrapper = document.querySelector('.who-we-are');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.who-we-are .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 8000,
        delay: (el, i) => 500 + 30 * i
    });