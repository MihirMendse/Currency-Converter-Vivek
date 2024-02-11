let dropDowns = document.getElementsByClassName('slt');
let getResult = document.getElementById('Btn');
let Input = document.getElementById('Ipt');
let fromCurrCode = document.getElementById("From");
let toCurrCode = document.getElementById("To");
let result = document.getElementById('msg');

for(let dD of dropDowns){
    for(let currC in countryList){
        let newOption = document.createElement('option');
        newOption.textContent = currC;
        newOption.value = currC;

        if(dD.name === "from"  &&  currC === "USD"){
            newOption.selected = "selected";
        } else if(dD.name === "to"  &&  currC === "INR"){
            newOption.selected = "selected";
        }
        dD.append(newOption);
    }

    dD.addEventListener("change", updateFlag);
}

function updateFlag(e){
    let currCode = e.currentTarget.value;
    let countryCode = countryList[currCode];
    let Img = e.currentTarget.previousElementSibling;
    Img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

getResult.addEventListener('click', (e) => {
    e.preventDefault();
    updateResult();
})

async function updateResult(){
    let amt = Input.value;

    if(amt === "" || amt<1){
        amt = 1;
        Input.value = '1';
    }

    let fromCurrLower = fromCurrCode.value.toLowerCase();
    let toCurrLower = toCurrCode.value.toLowerCase();
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrLower}/${toCurrLower}.json`;

    let response = await fetch(url);
    let data = await response.json();

    let rate = data[toCurrLower];

    let output = amt*rate;

    result.textContent = `${amt} ${fromCurrCode.value}  =  ${output} ${toCurrCode.value}`;
}

window.addEventListener('load', updateResult);


