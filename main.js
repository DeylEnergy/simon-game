$(document).ready(() => {
  const blocks = ['green', 'red', 'blue', 'yellow'];
  let succession = [];
  let round = 0;
  let gameIsAvailable = true;
  let strictMode = false;

  $('#start-game').on('click', e => {
    makeClicks();
    if (gameIsAvailable){
      $('#input-display').text('01');
      $('.quarter-circle').on('click', e => {
        clickOnBlock(e.target.id);
      });
    }
  });

  // callbacks
  let clickOnBlock = block => {
    flashClickedBlock(block);
    if (block == succession[round]){
      round++;
    } else {
      round = 0;
      playAndNext();
    }

    if (succession.length == round){
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

  // helpers
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
});
