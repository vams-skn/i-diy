import apiKey from './key.js';

document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const searchQuery = document.getElementById('search-input').value;
    const combinedQuery = `${searchQuery} DIYs`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(combinedQuery)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayVideos(data.items);
    } catch (error) {
        console.error('Error fetching data from YouTube API:', error);
    }
}

function displayVideos(videos) {
    const videoResultsContainer = document.getElementById('video-results');
    videoResultsContainer.innerHTML = '';

    if (videos.length === 0) {
        videoResultsContainer.innerHTML = '<p>No videos found.</p>';
        return;
    }

    videos.forEach(video => {
        if (video.id.kind === 'youtube#video') {
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `
                <h4>${video.snippet.title}</h4>
                <iframe width="315" height="200" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${video.snippet.description}</p>
            `;
            videoResultsContainer.appendChild(videoElement);
        }
    });
}