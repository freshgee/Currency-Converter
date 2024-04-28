const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


document.addEventListener("load" , () => {

})

for(let select of dropdowns){
    for(currCode in countryList){
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from"  && currCode == "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to"  && currCode == "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
  let currCode = element.value;
     let countrycode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
};


btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() => {
let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
 let response = await fetch(URL);
 let data = await response.json();
 let rate = data[tocurr.value.toLowerCase()];
 console.log(rate);

let finalAmount = amtval * rate;
msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
}

