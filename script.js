class Product {
    constructor(title, url, price, desc) {
        this.title = title;
        this.url = url;
        this.price = price;
        this.desc = desc;
    }
}

const products = [
    new Product(
        "A Pillow",
        "https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGlsbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        19.99,
        "A nice pillow."
    ),
    new Product(
        "A Carpet",
        "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FycGV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        89.99,
        "A carpet which you might like - or not."
    ),
]

class ProductItem {
    constructor(product) {
        this.product = product
    }

    addToCart() {
        console.log(this.product)
    }

    render(prodList) {
        const prodEl = document.createElement("li")
        prodEl.className = "product-item"
        prodEl.innerHTML= `
            <div>
                <img src="${this.product.url}" alt="${this.product.title}"/>
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.desc}</p>
                    <button>Add to Cart</div>
                </div>
            </div>
        `

        const addCartButton = prodEl.querySelector("button")
        addCartButton.addEventListener("click", this.addToCart.bind(this))

        return prodEl
        // prodList.append(prodEl)
    }
}

class ProductList {
    products = products
    render() {
        const renderHook = document.querySelector("#app")
        const prodList = document.createElement("ul")
        prodList.className = "product-list"
        this.products.forEach(prod => {
            // const productItem = new ProductItem(prod)
            // productItem.render(prodList)
            const productItem = new ProductItem(prod)
            const prodEl = productItem.render()
            prodList.append(prodEl)
        })
        renderHook.append(prodList)
    }
}

const productList = new ProductList()
productList.render()

