const BASE_URL = 'http://yoel-site.local/wp-json/wc/store/products';

const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get("id")

async function fetchSingleData() {
    try {
        const response = await fetch(BASE_URL+`/${productId}`);
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err)
    }
        
  }

    
async function renderData() {
    const mainContainer = document.querySelector('#product-container');
    const data = await fetchSingleData();
    console.log(data)
   
    const {id,name, images, prices} = data
    mainContainer.innerHTML = `
        <div>
            <h1>${name}</h1>
            <div class="imgCon" product_id="${id}">
                <img src="${images[0].thumbnail}" alt="" />
            </div>
            <p>${prices.currency_prefix}${(prices.price / 100).toFixed(2)}</p>
            <button>Add to Card</button>
        </div>
    `
}

renderData()