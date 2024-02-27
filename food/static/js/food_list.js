function randomfood() {
  var txt = document.getElementById('txt');
  const foods = document.querySelectorAll(".list-group li");
  const num = Math.floor(Math.random() * foods.length) ;
  const random = foods[num].innerText;
  txt.textContent = random;
}