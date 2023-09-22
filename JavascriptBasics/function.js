function formalGreeting(){
var greeting; 
var curr_date = new Date(); 
var currentTime = curr_date.getHours(); 
if(currentTime>=1 && currentTime<=12) {greeting = "Good Morning";} 
else if(currentTime>12 && currentTime<=18) {greeting = "Good Afternoon";} 
else if(currentTime>18 && currentTime<=24) {greeting = "Good Evening";}
return greeting; 
}

export default formalGreeting;  
