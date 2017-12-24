$(document).ready(() => {
  const blocks = ['green', 'red', 'blue', 'yellow'];
  let succession = ['red'];
  let round = 0;
  let gameIsAvailable = true;
  let strictMode = false;

  $('#start-game').on('click', e => {
    if (gameIsAvailable){
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
      setTimeout(makeClicks, 2000);
    }

    if (succession.length == round){
      round = 0;
      setTimeout(() => makeClicks(true), 2000);
    }
  }


  // main
  let makeClicks = (step=false) => {
    if (succession.length == 0){
      addNewBlock();
    }
    index = 0;
    let interval = setInterval(()=> {
      flashClickedBlock(succession[index]);
      index++;
      if (index == succession.length){
        clearInterval(interval);
      }
    }, 1000)
    if (step){
      addNewBlock();
    }
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
});
