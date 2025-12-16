const hobbiesElement = document.getElementById('hobbies')
const hobbiesList = ['a gamer', 'a programmer', 'a heavy sleeper', 'an ambivert']
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