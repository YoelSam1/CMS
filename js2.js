const BASE_URL = 'http://yoel-site.local/wp-json/wc/store/products';

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
async function fetchSingleData(id) {
    try {
        const response = await fetch(BASE_URL+`/${id}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch(err) {
        console.log(err)
    }
        
  }
  
async function renderData() {
    const mainContainer = document.querySelector('#main-container');
    const data = await fetchData();
    console.log(data)
    data.forEach(element => {
        const {name, images, prices} = element

        let discount = prices.regular_price != prices.sale_price 
        let price = discount
                    ? (prices.sale_price /100).toFixed(2)
                    : (prices.reqular_price / 100).toFixed(2)
        let dd = discount ? (prices.reqular_price / 100).toFixed(2) : ""
                    

        mainContainer.innerHTML += `
            <div>
                <div class="imgCon">
                    <img src="${images[0].thumbnail}" alt="" />
                </div>
                <h4>${name}</h4>
                <div>
                    ${dd}
                    <p>${prices.currency_prefix}${price}</p>
                </div>
                <button>Add to Card</button>
            </div>
        `
    });
}


renderData()
fetchSingleData(223)
