var numberOfDrum = document.querySelectorAll(".drum").length;

for(var i = 0; i < numberOfDrum; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);
  function handleClick(){
    var buttonValue = this.innerHTML;
    makeSound(buttonValue);
    buttonAnimation(buttonValue);
  }
}

document.addEventListener("keypress", function(event){
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key){
  switch (key) {
    case "w":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
    case "a":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
    case "s":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
    case "d":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
    case "j":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
    case "k":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
    case "l":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
    default:
  }
}

function buttonAnimation(key){
  var activeButton = document.querySelector("."+key);
  activeButton.classList.add("pressed");
  setTimeout(removeClass, 100);
  function removeClass(){
    activeButton.classList.remove("pressed");
  }
}
