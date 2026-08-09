async function checkLiveStream(){
    const container = document.getElementById("stream-container");
    const statusText = document.getElementById("stream-status");

    if (!container || !statusText)
        console.log("Could not find stream-container or stream-status");

    try {
        const configRes = await fetch('/api/config');
        const config = await configRes.json();
        const CHANNEL_ID = config.youtubeChannelId;
        const API_KEY = config.youtubeApiKey;

        const BASE = "PLACEHOLDER_TO_AVOID_TOO_MANY_REQUESTS"
        // const BASE = "https://www.googleapis.com/youtube/v3";

        //includes live videos
        // const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;
        //difference: eventype:live is removed, order changed to most recent, max # of videos is now 6
        //const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=6&key=${API_KEY}`;

        const liveResponse = await fetch(BASE + `/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`);
        const videosResponse = await fetch(BASE + `/search?part=snippet&channelId=${CHANNEL_ID}&eventType=completed&type=video&key=${API_KEY}`);

        let data = {};
        
        if (liveResponse.ok)
            data = await liveResponse.json();
          else if (videosResponse.ok && !liveResponse.ok) {
            data = await videosResponse.json();
            console.log('Response status: ', liveResponse.status, liveResponse.statusText)
          }
          else {
            console.log('Response status: ', videosResponse.status, videosResponse.statusText)
          }

        if (data.error) {
            console.error('YouTube API Error:', data.error.message);
            statusText.textContext = '';
            return;
        }

    const liveVideos = data.items;

    if (liveVideos && liveVideos.length > 0) {
      const videoId = liveVideos[0].id.videoId;
      const streamTitle = liveVideos[0].snippet.title;
      const liveStatus = liveVideos[0].snippet.liveBroadCastContent ? "🔴 LIVE NOW" : "Past Livestream";

      container.innerHTML = `
        <p class="text-sky-400 font-bold text-lg mb-4">
        ${liveStatus} ${streamTitle}</p>
        <div class="relative w-full" style="padding-top: 56.25%;">
          <iframe
            class="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1"
            title="${streamTitle}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <button class="inline-block mt-6 text-white border-white border-2 px-6 py-3 rounded-[22px] lg:text-xl font-semibold">
        <a
          href="https://www.youtube.com/watch?v=${videoId}"
          target="_blank"
          class=""
        >
          <i class="fa-brands fa-youtube"></i> Watch on YouTube
        </a>
        </button>
      `;
    } else {
      // Not live right now
      statusText.innerHTML = `
        <span class="text-gray-400">DJ I-Slice is not live right now.</span><br/>
        <button class="inline-block mt-6 text-white border-white border-2 px-6 py-3 rounded-[22px] lg:text-xl font-semibold">
          <a href="https://www.youtube.com/@DjI-Slice" target="_blank">
            <i class="fa-brands fa-youtube"></i> Subscribe for updates
          </a>
        </button>
      `;
    }

  } catch (error) {
    console.error('Failed to fetch live stream data:', error);
    statusText.textContent = ''; // Silently fail — don't show errors to visitors
  }
}

// Run on page load
checkLiveStream();

// Re-check every 3 minutes (180,000 ms) so the section auto-updates
setInterval(checkLiveStream, 180000);