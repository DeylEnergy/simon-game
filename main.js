$(document).ready(() => {
  const blocks = ['green', 'red', 'blue', 'yellow'];
  let succession = [];
  let round = 0;
  let gameIsAvailable = false;
  let strictMode = false;

  $('#switch-runner').on('click', () => {
    if (gameIsAvailable){
      $('#switch-runner').animate({"margin-left":'0'});
      resetAll();
      gameIsAvailable = false;
    } else {
      $('#switch-runner').animate({'margin-left':'32px'});
      $('#strict-mode').on('click', () => {
        if (strictMode){
          strictMode = false;
          $('#strict-mode').css('border-color', '#424242');
        } else {
          strictMode = true;
          $('#strict-mode').css('border-color', '#a3a3a3');
        }
      });
      gameIsAvailable = true;
      initGame();
    }
  });


  let clickOnBlock = block => {
    flashClickedBlock(block);
    if (block == succession[round]){
      round++;
    } else {
      round = 0;
      if (!strictMode){
        const message = $('#input-display').text();
        flashError(message);
        playAndNext();
      } else {
        flashError('00');
        resetAll();
        playAndNext();
        return;
      }
    }

    if (succession.length == round){
      $('#input-display').text(getScores());
      round = 0;
      playAndNext(true);
    }
  }

  // main
  let initGame = () => {
    $('#start-game').on('click', e => {
      if (gameIsAvailable){
        makeClicks();
        $('#input-display').text('00');
        $('.quarter-circle').on('click', e => {
          clickOnBlock(e.target.id);
        });
      }
      $('#start-game').off('click');
    });
  }
  let makeClicks = (step=false) => {
    return new Promise((resolve, reject) => {
      if (succession.length == 0){
        addNewBlock();
      }
      index = 0;
      let interval = setInterval(()=> {
        if (gameIsAvailable){
          flashClickedBlock(succession[index]);
          index++;
          if (index == succession.length){
            resolve();
            clearInterval(interval);
          }
        } else {
          resetAll();
          clearInterval(interval);
          return;
        }
      }, 1000)
      if (step){
        addNewBlock();
      }
    });
  }
  let flashClickedBlock = (block) => {
    $('#'+block).css('opacity', '0.6');
    buttonSound(block);
    let counter = 0;
    let interval = setInterval(()=> {
      counter++;
      if(counter == 1){
        $('#'+block).css('opacity', '1');
      }
      clearInterval(interval);
    }, 400);
  }
  let selectRandomBlockId = () => {
    return Math.floor(Math.random() * 4);
  }
  let addNewBlock = () => {
    succession.push(blocks[selectRandomBlockId()]);
  }
  let playAndNext = (next=false) => {
    $('.quarter-circle').off('click');
    setTimeout(() => {
      makeClicks(next).then(() => {
        $('.quarter-circle').on('click', e => {
          clickOnBlock(e.target.id);
        });
      });
    }, 2000);
  }
  let getScores = () => {
    let nextScore = round;
    if (nextScore < 10){
      nextScore = '0' + nextScore;
    }
    return nextScore;
  }
  let flashError = (before) => {
    $('#input-display').text('!!');
    setTimeout(() => {
      $('#input-display').text(before);
    }, 2000);
  }
  let resetAll = () => {
    $('.quarter-circle').off('click');
    round = 0;
    succession = [];
    $('#input-display').text('--');
    $('#start-game').off('click');
  }
  let buttonSound = (button) => {
    let element = document.getElementById(button + '-audio');
    element.play();
  }
});
