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

   try{
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
   }catch(err){}

    let table = document.querySelector(".cart-list tbody");
    try{
        let cartLists  = [...table.children];
        let coupon = cartLists.pop();
        cartLists.forEach((cartlist,index)=>{
            let qtyInput = cartlist.querySelector("#qtyInput");
            const plusBtn = cartlist.querySelector("#cart-plus");
            const minusBtn = cartlist.querySelector("#cart-minus");
            const remove = cartlist.querySelector("#removeBtn");
            const showNoProd = document.querySelector(".no-product");
            const hideCoupon = document.querySelector(".hidecoupon");
            const proceed = document.querySelector(".proceed");
            
            plusBtn.addEventListener("click",cartPlus)
            minusBtn.addEventListener("click",cartMinus)
            remove.addEventListener("click",(e)=>{
                e.target.parentElement.parentElement.parentElement.remove()
                toCalc();
                checkCartList();
            })
    
            function cartPlus()
            {
            let max = Number(qtyInput.getAttribute("max"))
            let value = qtyInput.valueAsNumber;
            let currentPrice = cartlist.querySelector("#item-price");
            let unitPrice = cartlist.querySelector("#unit-price").getAttribute("data-unit-price");
            if(value < max)
            {
                qtyInput.value++;
              let value = qtyInput.value 
              let result = Number(unitPrice)*value;
              currentPrice.innerText = `$${result.toFixed(1)}`;
            }
            toCalc();
            }
    
            function cartMinus()
            {
                qtyInput.setAttribute("min",1);
                let min = Number(qtyInput.getAttribute("min"))
                let value = qtyInput.valueAsNumber;
                let currentPrice = cartlist.querySelector("#item-price");
                let unitPrice =  cartlist.querySelector("#unit-price").getAttribute("data-unit-price");
                if(value > min)
                {
                qtyInput.value --;
                let value = qtyInput.value;
                let result = Number(unitPrice)*value;
                currentPrice.innerText = `$${result.toFixed(1)}`;
                }
                toCalc();
            }
           
            function toCalc()
            {
                let getPrices = document.querySelectorAll("#item-price");
                let checkPrices = [...getPrices];
                let subTotal = document.querySelector(".subtotal");
                let tax = document.querySelector(".tax");
                let result = document.querySelector("#total");
                let currentPrice = cartlist.querySelector("#item-price");
    
                if(checkPrices.length > 1)
                {
                let total = checkPrices.map(price=>price.innerText.replace("$","")).reduce((x,y)=>Number(x)+Number(y));
                subTotal.innerText = `$${total.toFixed(1)}`;
                result.innerText = `$ ${Number(subTotal.innerText.replace("$",""))+Number(tax.innerText.replace("$",""))}`
                }else if(checkPrices.length == 1)
                {
                    subTotal.innerText = currentPrice.innerText;
                    result.innerText = `$ ${Number(subTotal.innerText.replace("$",""))+Number(tax.innerText.replace("$",""))}`
                }else
                {
                    subTotal.innerText = `$ 0`;
                    result.innerText = `$ 0`;
                }
            }
            
            function checkCartList()
            {
                cartLists.shift()
               if( cartLists.length == 1 )
               {
                showNoProd.classList.remove("d-none");
                hideCoupon.classList.add("d-none");
                proceed.remove();
                proceed.classList.add("disabled")
               }
            }
            toCalc();
        })
    }catch(err){}

    let couponBtn = document.querySelector("#coupon-btn");
    let coupon = document.querySelector(".coupon-box")
    couponBtn.addEventListener("click",_=>{
        coupon.classList.toggle("active");
    })

    let checkAdd = document.querySelector("#anotherAdd");
    let diffAdd = document.querySelector(".differ-address")
    checkAdd.addEventListener("click",e=>{
       let checked =  checkAdd.checked;
        if(checked)
        {
            diffAdd.classList.remove("d-none");
        }
        else
        {
            diffAdd.classList.add("d-none");
        }
    })
