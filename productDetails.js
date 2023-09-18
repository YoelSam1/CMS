
const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get("id")

async function fetchSingleData() {
    try {
        const response = await fetch('http://localhost:10004/wp-json/wc/store/products'+`/${productId}`);
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err)
    }
        
  }

  async function fetchFeaturedProducts() {
    try {
        const response = await fetch('http://localhost:10004/wp-json/wc/store/products?featured=true');
        const data = await response.json();
        //console.log(data)
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
            <div class="detail">
                <h3>${name}</h3>
                <p>${prices.currency_prefix}${(prices.price / 100).toFixed(2)}</p>
                <button>Add to Card</button>
            </div>
        </div>
    `
}

renderData()

async function renderFeaturedData() {
    const featuredCon = document.querySelector('.featured-container');
    let data = await fetchFeaturedProducts();
   
    // this id is going to exist only in product detail page
    // if it exists filter and remove the product

    data = data.filter(d => d.id  != productId)
    console.log(data)
    render(data, featuredCon)
}
renderFeaturedData()