const hobbiesElement = document.getElementById('hobbies')
const hobbiesList = ['a gamer', 'a programmer', 'a reader', 'an ambivert']
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
let previousTrackIds = [];
function loadSong(){
    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=glitch_purge&api_key=3a463281597cbd6db83586e27fa2e09c&format=json&limit=6")
    .then(res => res.json())
    .then(data => {
        let tracks = data.recenttracks.track;
        tracks = tracks.filter(track => !track['@attr'] || !track['@attr'].nowplaying);
        tracks = tracks.slice(0,5);
        const currentTrackIds = tracks.map(track => track.name + track.artist['#text']);

        if (JSON.stringify(currentTrackIds)!== JSON.stringify(previousTrackIds)){
            const songWrapper = document.getElementById('song-wrapper');
            songWrapper.innerHTML = '';
        
            tracks.forEach((track, index) => {
                const songCard = document.createElement('div');
                songCard.className = 'song-card';
                const songTitle = document.createElement('h4');
                songTitle.textContent = track.name;
                const artistName = document.createElement('h5');
                artistName.textContent = track.artist['#text'];
                const coverImg = document.createElement('img');
                coverImg.src = track.image[2]["#text"];
                coverImg.alt=`${track.name} cover`;

                songCard.appendChild(songTitle);
                songCard.appendChild(artistName);
                songCard.appendChild(coverImg);

                songWrapper.appendChild(songCard);
            });
            previousTrackIds = currentTrackIds;
        }
    })
    .catch ( error => console.error(error))
}
loadSong();
setInterval(loadSong, 1500)

const techDetail = document.getElementById("tech-detail");
const techTitle = document.getElementById("tech-title");
const techText = document.getElementById("tech-text");
const techData = {
    python: {
        title: "My journey in Python",
        text: "Python has played an integral part of programming life. The first time I picked up python was when I was 7 - following an course on Udemy to learn python. The course taught me turtle - one of my favourite libraries in Python, because of how cool it was. And after 7 years of abandoning Python, I remembered every single thing in python turtle. It was not long after I found Hack Club that I started writing even more programs and finally stepped outside my comfort zone! Now Python is an addiction me - something I cannot leave!"
    },
    html: {
        title: "My journey in  HTML",
        text: "HTML - something I first touched in 6th grade - has mesmerised me every since I began it. The freedom I had when I started HTML was something very new to me for web development. The websites I built back then were amazing - at least for my skill that time - but they have been lost to corruption on the laptop which held it. Those websites may exist somewhere in the laptop, but its too far down to get back. That was what propelled me to come back into HTML, this time incorporating my skill - Python - into it."
    },
    css: {
        title: "My journey in  CSS",
        text: "My journey with CSS is very similar to HTML. I first touched it alongside HTML, but I never knew how to make crazy looking websites. CSS used to be rather boring to me, but the life it brought is what kept me going. When I started HTML again a few years ago, I forgot CSS was a thing but the short shock is what made me delve deeper into CSS, and make my websites breathe!"
    },
    js: {
        title: "My journey in JS",
        text: "Unlike HTML & CSS, my journey with JS is rather new. I discovered JS could be used in HTML when me and my friends were working on a project for a Hackathon, and I saw one of them use JS to hide and show a user's password. That new thing made me want to explore more, and that is what really brought me into JS! "
    },
    gd: {
        title: "My journey in GD Script",
        text: "Similar to JS, my GDS joruney is brand new. I picked it up because of an event within Hack Club - Milkyway. I don't have much to write about it so yeah... "
    }
}
let currentTech = null;
let isAnimating = false;
function showTech(key, card){
    if (isAnimating) return;
    if (currentTech === key){
        techDetail.classList.remove('show');
        techDetail.classList.add('close');
        techDetail.addEventListener("animationend", () => {
            techDetail.classList.remove("close");
            isAnimating = false;
        }, { once: true });

        currentTech = null;
        return;
    }
    currentTech = key;
    isAnimating = true;
    techTitle.textContent = techData[key].title;
    techText.textContent = techData[key].text;
    const cardRect = card.getBoundingClientRect();
    const detailRect = techDetail.getBoundingClientRect();
    const originX = cardRect.left + cardRect.width / 2 - detailRect.left;
    const originY = cardRect.top + cardRect.height / 2 - detailRect.top;
    techDetail.style.transformOrigin = `${originX}px ${originY}px`;
    
    techDetail.classList.remove('show', 'close');
    techDetail.style.animation = "none";
    void techDetail.offsetWidth;
    techDetail.classList.add('show');
    techDetail.style.animation = "";
    techDetail.addEventListener("animationend", () => {
        isAnimating = false;
    }, { once: true });
    techDetail.scrollIntoView({ behavior: "smooth", block: "center" });
}