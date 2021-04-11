const key = "AIzaSyBfJD0MxT1omFdL251PB2iyN9ehiUZPLEg";
const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&key=' + key + '&q=';
const relatedTo = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&key=' + key + '&relatedToVideoId=';

const button = document.querySelector('button');
const input = document.querySelector('input');
const video_list = document.querySelector('.video-list');
const iframe = document.querySelector('iframe');

const playVideo = videoId => {
    console.log(videoId);
    iframe.setAttribute("src", 'https://www.youtube.com/embed/' + videoId);
    iframe.setAttribute("class", "visible");
    getVideos(videoId);
}


const createVideo = (video) => {
    const videoElement = document.createElement('div');
    const image = document.createElement('img');
    const text = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    
    
    image.setAttribute('src', video.snippet.thumbnails.default.url);
    title.textContent = video.snippet.title;
    description.textContent = video.snippet.description;
    videoElement.appendChild(image);
    videoElement.appendChild(title);
    text.appendChild(title);
    text.appendChild(description);
    videoElement.appendChild(text);

    videoElement.addEventListener('click', () => playVideo(video.id.videoId));
    video_list.appendChild(videoElement);

}

const listVideos = (videos) => {
    video_list.innerHTML = '';
    input.value= '';    
    videos.forEach(video => video.snippet && createVideo(video));
}

function getVideos(videoId){
    const req = new XMLHttpRequest();
    const path = videoId ? relatedTo + videoId : url + input.value
    req.open('GET', path);
      
    req.onload = function(){
        listVideos(JSON.parse(req.responseText).items)
        input.value = '';
    }
    req.send();   
}


button.addEventListener('click', () =>{
    iframe.classList.remove('visible');
    input.value && getVideos();
});


