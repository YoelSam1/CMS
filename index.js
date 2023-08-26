const BASE_URL = 'http://localhost:10004/wp-json/wc/store/products';

const V_KEY = 'ck_f27c1aed10ab65ccc254f16a62da0f8dccbb9773';
const V_SECRET = 'cs_21541c30fa1dcc8215e8ec9638e3e74b85117c6c';


async function fetchData() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        //console.log(data)
        return data;
    } catch(err) {
        console.log(err)
    }
        
  }

        
  
async function renderData() {
    const mainContainer = document.querySelector('.main-container');
    const data = await fetchData();
    render(data, mainContainer)
}
function render(data, container){
    data.forEach(element => {
        const {id,name, images, prices} = element
        container.innerHTML += `
            <div class="card">
                <div class="imgCon" product_id="${id}">
                    <img src="${images[0].thumbnail}" alt="" />
                </div>
                <div class="detail">
                    <h3>${name}</h3>
                    <p>${prices.currency_prefix}${(prices.price / 100).toFixed(2)}</p>
                    <button>Add to Card</button>
                </div>
            </div>
        `
    });

    let imgConEls= document.getElementsByClassName("imgCon")

   for (let i = 0; i < imgConEls.length; i++) {
    const singleImgCon = imgConEls[i];
    let id = singleImgCon.getAttribute("product_id")

    singleImgCon.addEventListener("click", () => {
       window.location.href = `/productDetails.html?id=${id}`
    })
   }
}

renderData()








