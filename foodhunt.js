score = 0;
cross = true;

audiorun = new Audio('music1.mp3');
audiogo = new Audio('gameover.mp3');
audioplus = new Audio('plus.mp3');
setTimeout(() => {
    audiorun.play();
}, 800);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    if (e.keyCode == 38) {
        man = document.querySelector('.man');
        man.classList.add('animateMan');
        setTimeout(() => {
            man.classList.remove("animateMan");
        }, 700);
    }
    if (e.keyCode == 39) {
        man = document.querySelector('.man');
        manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = manX + 120 + 'px';
    }
    if (e.keyCode == 37) {
        man = document.querySelector(".man");
        manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = (manX - 120) + 'px';
    }
}

setInterval(() => {
    man = document.querySelector('.man');
    gameOver = document.querySelector('.gameOver');
    cactus = document.querySelector('.cactus');
    apple = document.querySelector('.apple');
    pumpkin = document.querySelector('.pumpkin');

    dx = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(man, null).getPropertyValue('top'));

    cx = parseInt(window.getComputedStyle(cactus, null).getPropertyValue('left'));
    cy = parseInt(window.getComputedStyle(cactus, null).getPropertyValue('top'));

    ax = parseInt(window.getComputedStyle(apple, null).getPropertyValue('left'));
    px = parseInt(window.getComputedStyle(pumpkin, null).getPropertyValue('left'));


    offsetX = Math.abs(dx - cx);
    offsetY = Math.abs(dy - cy);
    // console.log(offsetX, offsetY);
    if (offsetX < 120 && offsetY < 60) {
        gameOver.innerHTML = "<span style='font-size: 50px; '> Game Over - Reload to Play Again </span>";
        cactus.classList.remove('anicacti');
        man.classList.remove('animateMan');
        man.style.left = 120 + 'px';
        audiogo.play();
        setTimeout(() => {
            audiorun.pause();
            audiogo.pause();
        }, 1000);
    }
    else if (offsetX < 160 && cross) {
        score += 10;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(cactus, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.2;
            cactus.style.animationDuration = newDur + 's';
            console.log('New Animation Duration : ', newDur);

        }, 500);
    }
    offsetA = Math.abs(dx - ax);
    offsetP = Math.abs(dx - px);
    console.log(offsetA, offsetP);
    if (offsetA == 1 && cross) {
        score += 50;
        updateScore(score);
        audioplus.play();
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 2000);
    }
    if (offsetP == 51 && cross) {
        score += 100;
        updateScore(score);
        audioplus.play();
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 2000);
    }
}, 10);
function updateScore(score) {
    scount.innerHTML = 'Your Score:' + score;
    // here scount is always an ID ,not class.
}

