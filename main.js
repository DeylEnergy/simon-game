$(document).ready(() => {
  const blocks = ['green', 'red', 'blue', 'yellow'];
  let succession = [];
  let preventGame = false;
  $('.quarter-circle').on('click', (e) => {
    if (preventGame){
      clickOnBlock(e.target.id);
    }
    makeClick(true);
  });

  // callbacks
  let clickOnBlock = block => {
    flashClickedBlock(block);
  }


  // main
  let makeClick = (step=false) => {
    if (succession.length == 0){
      addNewBlock();
    }
    console.log(succession);
    index = 0;
    let interval = setInterval(()=> {
      clickOnBlock(succession[index]);
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
    return Math.floor(Math.random() * 4) ;
  }
  let addNewBlock = () => {
    succession.push(blocks[selectRandomBlockId()]);
  }
});
