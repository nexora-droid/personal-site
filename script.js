const hobbiesElement = document.getElementById('hobbies')
const hobbiesList = ['a gamer', 'a frontend developer', 'a backend developer', 'a programmer', 'a heavy sleeper', 'a ambivert']
let hobbyIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 80;
const deletingSpeed = 50;
const pauseAfterType = 1000;
function typeEffect(){
    const currentHobby = hobbiesList[hobbyIndex];
    if (!isDeleting){
        hobbiesElement.textContent = currentHobby.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentHobby.length){
            setTimeout(() => {
                isDeleting = true;
            }, pauseAfterType);
        }
    } else {
        hobbiesElement.textContent = currentHobby.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0){
            isDeleting = false;
            hobbyIndex = (hobbyIndex + 1) % hobbiesList.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}
typeEffect();