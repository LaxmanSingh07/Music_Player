
const image=document.querySelector('#music-image');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music =document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const prevBtn =document.getElementById('prev');
const playBtn =document.getElementById('play');
const nextBtn =document.getElementById('next');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration')

//Music 

const songs=[
    {
        name:'music-1',
        displayName: 'Swarg Tara',
        artist:'"Himanshu Rawat"',
    },
    {
        name:'music-2',
        displayName: 'Tu Dikhyandi',
        artist:'Charu Semwal',
    },
   
    {
        name:'music-3',
        displayName: 'Electric Chill Machine',
        artist:'Laxman Singh',
    },
    {
        name:'music-4',
        displayName: 'Rangdarri',
        artist:'Arijit Singh',
    },
    {
        name:'music-5',
        displayName: 'Qaafirana',
        artist:'Arijit Singh',
    },
    {
        name:'music-6',
        displayName: 'Raabta',
        artist:'Gulshan Kumar and Prem Vijan',
    },
    {
        name:'music-7',
        displayName: 'Mashup',
        artist:'.................',
    },
    {
        name:'music-8',
        displayName: ' I like Me Better',
        artist:'Lauv',
    },
    {
        name:'music-9',
        displayName: 'Ritual',
        artist:'Alan Walker',
    },
    {
        name:'music-10',
        displayName: 'Mashup',
        artist:'............',
    },
    {
        name:'music-11',
        displayName: 'Mashup',
        artist:'.............',
    },


];

//check if Playing 
let isPlaying=false;


//Play 
function playSong(){
isPlaying=true;
playBtn.classList.replace('fa-play','fa-pause');
playBtn.setAttribute('title','Pause');
music.play();

}

//pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    
    music.pause();
}


//play or pause Event Listener

playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));


//UPDATE DOM 

function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`
    // music/jacinto-1.mp3
    image.src=`img/${song.name}.jpg`
    // img/jacinto-1.jpg"
}

//Current Song 

let songIndex=0;


function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }

    loadSong(songs[songIndex]);
    playSong();
}
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//On load ---select Firs Song 

loadSong(songs[songIndex]);

//update Progress Bar & Time

function updateProgressBar(e){
    if(isPlaying){
        //object Distructring 
        const{duration,currentTime}=e.srcElement;
        // console.log(duration,currentTime);
        // Update progress bar Width 
        // calculating the percentage 
        const progressPercent=((currentTime/duration)*100);
        progress.style.width=`${progressPercent}%`

        //calculate display for duration

         const durationMinutes=Math.floor(duration/60);
        //  console.log('minutes',durationMinutes)
        let durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`
        }
        console.log('seconds',durationSeconds);
        
//Delay switching duration Element to avoid Nan

if(durationSeconds){
    durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
}
//Calculate display for current


const currentMinutes=Math.floor(currentTime/60);
// console.log('minutes',currentMinutes)
let currentSeconds=Math.floor(currentTime%60);
if(currentSeconds<10){
   currentSeconds=`0${currentSeconds}`
}
// console.log('seconds',currentSeconds);
currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`

 
    }
}

//Set Progress Bar

function setProgressBar(e){
    // console.log(e);
    const width=this.clientWidth;
    // console.log('width',width);
    const clickX=e.offsetX;
    // console.log('clickX',clickX);
    const{duration}=music;
    // console.log(duration);
    // console.log((clickX/width));
    // console.log((clickX/width)*duration) // to caluate the song seconds
    music.currentTime=(clickX/width)*duration;
}

//Event Listeners

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);