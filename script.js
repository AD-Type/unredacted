document.addEventListener('DOMContentLoaded', () => {
    const targetDateStr = "2026-04-26T18:30:00+02:00";
    const targetTimeValue = new Date(targetDateStr).getTime();

    const timerElem = document.getElementById("timer");
    const labelElem = document.getElementById("status-label");
    const tickSound = document.getElementById("tick-sound");
    const ambientSound = document.getElementById("ambient-sound"); 
    const redOverlay = document.getElementById("red-alert-overlay");

    let eventStarted = false;

    document.body.addEventListener('click', () => {
        if (tickSound) { tickSound.play().then(() => tickSound.pause()).catch(() => {}); }
        if (ambientSound) { ambientSound.play().then(() => ambientSound.pause()).catch(() => {}); }
    }, { once: true });

    function runCountdown() {
        const now = new Date().getTime();
        const difference = targetTimeValue - now;

        if (!timerElem) return;

        if (difference <= 0) {
            timerElem.innerText = "00:00:00:00";
            if (labelElem) labelElem.innerText = "It has Begun";
            
            if (!eventStarted) {
                eventStarted = true;
                if (redOverlay) redOverlay.classList.add('active'); 
                if (tickSound) tickSound.pause(); 

                if (ambientSound) {
                    ambientSound.currentTime = 0;
                    ambientSound.loop = true; 
                    ambientSound.play().catch(e => console.error("Audio blocked!"));
                }
            }
            clearInterval(timerInterval);
            return;
        }

        if (tickSound) {
            tickSound.currentTime = 0;
            tickSound.play().catch(e => {}); 
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        const zeroPad = (num) => num.toString().padStart(2, '0');
        timerElem.innerText = `${zeroPad(d)}:${zeroPad(h)}:${zeroPad(m)}:${zeroPad(s)}`;
    }

    runCountdown();
    const timerInterval = setInterval(runCountdown, 1000);
});