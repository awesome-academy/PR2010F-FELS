
  const startingMinutes = 10;
  let time = startingMinutes * 60;

  const countdownEl = document.getElementById("countdown");

  setInterval(updateCountdown, 1000);

  function updateCountdown(){
    if(time != -1){
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;
      countdown.innerHTML = `${minutes} : ${seconds}`;
      time--;
  }

  function submitForm(){
    $(".form_of_dat").submit();
  }

  setTimeout(submitForm, startingMinutes*60000);
}