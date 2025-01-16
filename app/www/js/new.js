function filterBills(type){
  let categoryBill = type;

  let btns = document.querySelectorAll('.hn-btns-filters');
  btns.forEach(function (item){
    item.style.backgroundColor = "white";
    item.style.color = "black";
  });

  let activeFilter = document.getElementById(`hnfc-${type}`);
  activeFilter.style.backgroundColor = "#448060";
  activeFilter.style.color = "white";
}

let quantValue = 0;

function quantUpdate() {
  document.getElementById('hn-quant-value').textContent = quantValue;
}

function increment(){
  if(quantValue >= 0){
    quantValue++;
    quantUpdate();
  }
}
function decrement(){
  if(quantValue >= 1){
    quantValue--;
    quantUpdate();
  }
}