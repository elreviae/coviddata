moment.locale('en');
function menuFunction() {
    var x = document.getElementById("respMenu");
    if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
    } else { 
          x.className = x.className.replace(" w3-show", "");
    }
}