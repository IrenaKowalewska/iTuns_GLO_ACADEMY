export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');
    const playList = ['hello', 'flow', 'speed'];
    let trackIndex = 0;


    const loadTrack = () => {
        const isPaused = audioPlayer.paused;
        const track = playList[trackIndex ];

        audioImg.src = `./audio/${track}.jpg`;
        audioPlayer.src = `./audio/${track}.mp3`;
        audioHeader.textContent = track.toLocaleUpperCase();

        if (isPaused) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }

        audioPlayer.addEventListener('canplay', () => {
            updateTime(); //чтоб отображалось время трека при перемотке
        });
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
        if (trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const addZero = n => n < 10 ? '0' + n : n;

    const updateTime = () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';
        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';
        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';
        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        const track = playList[trackIndex ];

        audioHeader.textContent = track.toLocaleUpperCase();

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if(audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }
        if (target.classList.contains('audio-button__prev')){
            prevTrack();
        }
        if (target.classList.contains('audio-button__next')){
            nextTrack();
        }
    });

    // у audio есть событие ended, для переключения в начало списка с треками

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play(); //т.к. сработает isPaused
    });

    audioPlayer.addEventListener('timeupdate', updateTime);

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });
    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
    });

    audioPlayer.volume = 0.3;
    audioVolume.value = audioPlayer.volume * 100;

    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };
};