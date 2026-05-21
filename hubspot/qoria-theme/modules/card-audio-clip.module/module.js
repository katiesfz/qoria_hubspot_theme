document.addEventListener('DOMContentLoaded', function() {
    function managePodcastAudioCards() {
        // Global tracking to ensure only one audio plays at a time
        let activeAudio = null;
        let activeCard = null;

        // Helper to format seconds into MM:SS
        function formatTime(seconds) {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
        }

        // Setup duration display for an audio element
        function setupDuration(card, audio) {
            function setDuration() {
                if (audio && audio.duration && !isNaN(audio.duration)) {
                    const formattedTime = formatTime(audio.duration);
                    const totalTimeDefault = card.querySelector('.total-time-default');
                    const totalTimeActive = card.querySelector('.total-time-active');
                    if (totalTimeDefault) totalTimeDefault.innerText = formattedTime;
                    if (totalTimeActive) totalTimeActive.innerText = formattedTime;
                }
            }

            if (audio.readyState >= 1) {
                setDuration();
            } else {
                audio.addEventListener('loadedmetadata', setDuration);
            }
        }

        // Setup play/pause functionality for an audio card
        function setupPlayPause(card, audio) {
            const playBtn = card.querySelector('.play-btn-round');
            const pauseBtn = card.querySelector('.pause-btn-large');

            function togglePlay() {
                // Stop global playing audio if it's not the one we just clicked
                if (activeAudio && activeAudio !== audio) {
                    activeAudio.pause();
                    if (activeCard) activeCard.classList.remove('is-active');
                }

                if (card.classList.contains('is-active')) {
                    // Pause it
                    card.classList.remove('is-active');
                    audio.pause();
                    activeAudio = null;
                    activeCard = null;
                } else {
                    // Play it
                    card.classList.add('is-active');
                    audio.play().catch(e => console.error("Audio play failed:", e));
                    activeAudio = audio;
                    activeCard = card;
                }
            }

            if (playBtn) playBtn.addEventListener('click', togglePlay);
            if (pauseBtn) pauseBtn.addEventListener('click', togglePlay);
        }

        // Setup seeker and time display updates for an audio element
        function setupSeeker(card, audio) {
            const seeker = card.querySelector('.range-slider input[type="range"]');
            const seekerContainer = card.querySelector('.range-slider');
            const timeDisplay = card.querySelector('.current-time');

            // Update Seeker and Timestamps as audio plays
            audio.addEventListener('timeupdate', function() {
                if (audio.duration) {
                    const percentage = (audio.currentTime / audio.duration) * 100;
                    if (seeker) seeker.value = percentage;
                    if (seekerContainer) seekerContainer.style.setProperty('--value', Number(percentage.toFixed(2)));
                    if (seekerContainer) seekerContainer.style.setProperty('--text-value', percentage.toFixed(2));
                    if (timeDisplay) timeDisplay.innerText = formatTime(audio.currentTime);
                }
            });

            // Allow user to drag seeker to skip through audio
            if (seeker) {
                seeker.addEventListener('input', function() {
                    if (audio.duration) {
                        const time = (seeker.value / 100) * audio.duration;
                        audio.currentTime = time;
                    }
                });
            }
        }

        // Find all instances of the Audio Card on the page
        const cards = document.querySelectorAll('.podcast-audio-card');

        cards.forEach(function(card) {
            const audio = card.querySelector('audio');

            // Make sure audio exists before setting up
            if (audio) {
                setupDuration(card, audio);
                setupPlayPause(card, audio);
                setupSeeker(card, audio);
            }
        });
    }

    managePodcastAudioCards();
});
