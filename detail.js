import './style.scss';
import * as bootstrap from 'bootstrap';
import $, { each } from 'jquery'
window.jQuery = window.$ = $;

let searchBox = document.querySelector(".search-box");

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("bi-search") || e.target.classList.contains("searchInput")){
        searchBox.classList.remove("d-none");
    }
    else
    {
        searchBox.classList.add("d-none");
    }
})

let thumbnails = document.getElementsByClassName("thumbnail");
let activeImg = document.getElementsByClassName("thumbnail active");
let feature = document.getElementsByClassName("feature");

let eachThumbnail = Array.from(thumbnails);
for(let x of eachThumbnail)
{
    if(x.classList.contains("active"))
    {
        feature[0].src = x.src;
    }
}
for(let i = 0; i<thumbnails.length ; i++)
{
    thumbnails[i].addEventListener("mouseover",function(){
        if(activeImg.length > 0)
        {
            activeImg[0].classList.remove("active");
        }
            this.classList.add("active");
            document.getElementsByClassName("feature")[0].src = this.src
        if(activeImg.length > 0)
        {
            feature[0].src = this.src;
        }        
    })
}

let upBtn = document.querySelector(".upBtn");
let downBtn = document.querySelector(".downBtn");

try
{
    downBtn.addEventListener('click',function(e){    
        document.querySelector(".slider").scrollTop += 180;
    })
    upBtn.addEventListener('click',function(e){    
        document.querySelector(".slider").scrollTop -= 180;
    })
}catch(error)
{
    console.warn(error.message);
}


let leftBtn = document.querySelector(".leftBtn");
let rightBtn = document.querySelector(".rightBtn");

try{
    leftBtn.addEventListener('click',function(e){    
        document.querySelector(".slider").scrollLeft -= 180;
    })
    rightBtn.addEventListener('click',function(e){    
        document.querySelector(".slider").scrollLeft += 180;
    })
}catch(err)
{
    console.warn("there is no slider")
}

let qutyContainer = document.querySelector(".quantity-container");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");
let qtyInput = document.querySelector("#qtyInput");

    try{
        minus.addEventListener("click",qtyMinus);
        plus.addEventListener("click",qtyPlus);
    }catch(error)
    {
        console.warn(error);
    }

    function qtyMinus()
    {
        qtyInput.setAttribute("min",1);
        let value = qtyInput.valueAsNumber;
        let min = Number(qtyInput.getAttribute("min"))
        if(value > min)
        {
            qtyInput.value --;
        }else
        {
            return false;
        }
    }

    function qtyPlus()
    {
        let max = Number(qtyInput.getAttribute("max"))
        let value = qtyInput.valueAsNumber;
        if(value < max)
        {
            qtyInput.value++
        }
    }

    qutyContainer.addEventListener("submit",e=>{
        e.preventDefault();
        let max = Number(qtyInput.getAttribute("max"))
        let value = Number(qutyContainer.quantity.value);
        if( value < 1)
        {
           qtyInput.value = 1;
           console.log("sorry we are not allow to use the number that is less than the minimum number");
        }else if(value > max)
        {
            qtyInput.value = max;
            console.log("sorry we are not allow to use the number that is greater than the maximum number");
        }
    })

    let table = document.querySelector("table tbody");
    let cartLists  = [...table.children];
    let coupon = cartLists.pop();

    cartLists.forEach((cartlist,index)=>{
        let qtyInput = cartlist.querySelector("#qtyInput");
        let plusBtn = cartlist.querySelector("#cart-plus");
        let minusBtn = cartlist.querySelector("#cart-minus");
        
        plusBtn.addEventListener("click",cartPlus)
        minusBtn.addEventListener("click",cartMinus)

        function cartPlus()
        {
        let max = Number(qtyInput.getAttribute("max"))
        let value = qtyInput.valueAsNumber;
        let price = cartlist.querySelector("#item-price");
        let num = cartlist.querySelector("#unit-price").getAttribute("data-unit-price");
        if(value < max)
        {
            qtyInput.value++;
          let value = qtyInput.value 
          let result = Number(num)*value;
          price.innerText = `$${result.toFixed(1)}`;
        }
        toCalc();
        }

        function cartMinus()
        {
            qtyInput.setAttribute("min",1);
            let min = Number(qtyInput.getAttribute("min"))
            let value = qtyInput.valueAsNumber;
            let price = cartlist.querySelector("#item-price");
            let num =  cartlist.querySelector("#unit-price").getAttribute("data-unit-price");
            if(value > min)
            {
            qtyInput.value --;
            let value = qtyInput.value;
            let result = Number(num)*value;
            price.innerText = `$${result.toFixed(1)}`;
            }
            toCalc();
        }
       
        function toCalc()
        {
            let getPrices = document.querySelectorAll("#item-price");
            let checkPrices = [...getPrices];
            let subTotal = document.querySelector(".subtotal");
            let tax = document.querySelector(".tax");
            let total = checkPrices.map(price=>price.innerText.replace("$","")).reduce((x,y)=>Number(x)+Number(y));
            subTotal.innerText = `$${total.toFixed(1)}`;
            let result = document.querySelector("#total");
            result.innerText = `$ ${Number(subTotal.innerText.replace("$",""))+Number(tax.innerText.replace("$",""))}`
        }
        toCalc();
    })
    