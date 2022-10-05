import './style.scss';

import * as bootstrap from 'bootstrap';

let productLists = document.querySelector(".products")
let product = document.getElementsByClassName("products")[0].children;
let lists = Array.from(product)
let children = [...productLists.childNodes];
let products = [];
const range = document.querySelectorAll(".range-slider input");
const progress = document.querySelector(".range-slider .progress-slider");
let gap = 10;
let number = document.querySelectorAll(".progress-value");

    range.forEach(input=>{
        input.addEventListener("input",e=>{
            let minRange = parseInt(range[0].value);
            let maxRange = parseInt(range[1].value);
            showProduct(minRange,maxRange);
           if(maxRange - minRange < gap)
           {
            if(e.target.className === "range-min")
            {
                range[0].value = maxRange - gap;
            }else
            {
                range[1].value = minRange + gap;
            }
           }else
           {
            progress.style.left = (minRange / range[0].max) * 100 + "%";
            progress.style.right = 100 - (maxRange / range[1].max) * 100 + "%";
            number[0].innerText = minRange;
            number[1].innerText = maxRange;
           }
        })
    })

    let maxPrice = 0;
    let minPrice = 0;
    function findMax()
    {
        lists.forEach(item=>{
            if(Number(item.dataset.price )> maxPrice)
            {
                maxPrice = Number(item.dataset.price);
            }
        })
        console.log(maxPrice)
        return maxPrice;
    }
    function findMin()
    {
        lists.filter(item=>{
            if(Number(item.dataset.price ) != 0)
            {
                if(Number(item.dataset.price ) < maxPrice)
            {
                minPrice = Number(item.dataset.price);
            }
            }
        })
        return minPrice;
    }
       findMax();
       findMin();

function showProduct(min,max)
{
    let noti = document.querySelector(".noti-product");
    let lists = Array.from(product)
    lists.filter(item=>{
        if(item.dataset.price >= min && item.dataset.price <= max && item.dataset.price != 0)
        {
            // if(item.dataset.price >= min || item.dataset.price <= max){
            //     item.classList.remove("hide");
            //     item.classList.add("show");
            // }else
            // {
            //     item.classList.add("hide");
            // }
            item.classList.remove("hide");
            item.classList.add("show");
        }else if(item.dataset.price > min || item.dataset.price >= max || min>maxPrice || max<minPrice)
        {
            item.classList.remove("show");
            item.classList.add("hide");
            noti.classList.remove("hide")
            noti.classList.add("show")
        }else
        {
            item.classList.remove("show");
            item.classList.add("hide");
        }
    })
}


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


for(let child in children )
{
    if(child % 2 !== 0)
    {
        products.push(children[child]);
    }
}
products.forEach((value)=>{
        value.addEventListener("click", e => {
            if (e.path[2].classList.contains("col-12" || "col-lg-3")) {
                e.path[2].childNodes[1].childNodes[5].classList.add("show");
                e.path[2].childNodes[3].childNodes[5].classList.add("active");
                e.path[2].childNodes[3].childNodes[3].childNodes[0].classList.add("active")
            } else if (e.path[3].classList.contains("col-12" || "col-lg-3")) {
                e.path[3].childNodes[1].childNodes[5].classList.add("show");
                e.path[3].childNodes[3].childNodes[5].classList.add("active");
                e.path[3].childNodes[3].childNodes[3].childNodes[0].classList.add("active")
            }
        })
})
products.forEach((value)=>{
    value.addEventListener("mouseout",e=>{
        if (e.path[2].classList.contains("col-12"||"col-lg-3"))
        {
           setTimeout(_=>{
               e.path[2].childNodes[1].childNodes[5].classList.remove("show");
               e.path[2].childNodes[3].childNodes[5].classList.remove("active");
               e.path[2].childNodes[3].childNodes[3].childNodes[0].classList.remove("active")
           },1200)
        }else if(e.path[3].classList.contains("col-12"||"col-lg-3")) {
            setTimeout(_=>{
                e.path[3].childNodes[1].childNodes[5].classList.remove("show");
                e.path[3].childNodes[3].childNodes[5].classList.remove("active");
                e.path[3].childNodes[3].childNodes[3].childNodes[0].classList.remove("active")
            },1200)
        }
    })
})