$(document).ready(() => {
  const blocks = ['green', 'red', 'blue', 'yellow'];
  let succession = [];
  let round = 0;
  let gameIsAvailable = false;
  let strictMode = false;

  $('#switch-runner').on('click', () => {
    if (gameIsAvailable){
      $('#switch-runner').animate({"margin-left":'0'});
      gameIsAvailable = false;
    } else {
      $('#switch-runner').animate({"margin-left":'32px'});
      gameIsAvailable = true;
    }
  });
  $('#start-game').on('click', e => {
    if (gameIsAvailable){
      makeClicks();
      $('#input-display').text('00');
      $('.quarter-circle').on('click', e => {
        clickOnBlock(e.target.id);
      });
    }
  });

  let clickOnBlock = block => {
    flashClickedBlock(block);
    if (block == succession[round]){
      round++;
    } else {
      round = 0;
      playAndNext();
    }

    if (succession.length == round){
      $('#input-display').text(getScores());
      round = 0;
      playAndNext(true);
    }
  }


  // main
  let makeClicks = (step=false) => {
    return new Promise((resolve, reject) => {
      if (succession.length == 0){
        addNewBlock();
      }
      index = 0;
      let interval = setInterval(()=> {
        flashClickedBlock(succession[index]);
        index++;
        if (index == succession.length){
          resolve();
          clearInterval(interval);
        }
      }, 1000)
      if (step){
        addNewBlock();
      }
    });
  }
  let flashClickedBlock = (block) => {
    $('#'+block).css('opacity', '0.6');
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
    let current = parseInt($('#input-display').text());
    let nextScore = current + 1;
    if (nextScore < 10){
      nextScore = '0' + nextScore;
    }
    return nextScore;
  }
});
