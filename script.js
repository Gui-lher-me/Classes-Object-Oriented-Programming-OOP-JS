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

class ElementAttribute {
    constructor(name, value) {
        this.name = name
        this.value = value
    }
}

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag)
        if(cssClasses) {
            rootElement.className = cssClasses
        }
        if(attributes && attributes.length > 0) {
            attributes.forEach(attr => {
                rootElement.setAttribute(attr.name, attr.value)
            })
        }
        document.querySelector(`#${this.hookId}`).append(rootElement)
        return rootElement
    }
}

class ShoppingCart extends Component {
    constructor(renderHookId) {
        super(renderHookId)
    }

    items = []

    /**
     * @param {any} value
     */
    set cartItems(value) {
        this.items = value
        this.totalOutput.innerHTML = `Total: \$${this.totalAmount.toFixed(2)}`
    }

    get totalAmount() {
        const sum = this.items
            .reduce((accumulator, item) => {
                return accumulator + item.price
            }, 0)
        return sum
    }

    addProduct(product) {
        const updatedItems = [...this.items]
        updatedItems.push(product)
        this.cartItems = updatedItems
    }

    render() {
        const cartEl = this.createRootElement("section", "cart")
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `
        this.totalOutput = cartEl.querySelector("h2")
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId)
        this.product = product
    }

    addToCart() {
        App.addProductToCart(this.product)
    }

    render() {
        const prodEl = this.createRootElement("li", "product-item")

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
    }
}

class ProductList extends Component {
    constructor(renderHookId) {
        super(renderHookId)
    }

    products = products

    render() {
        this.createRootElement("ul", "product-list", [
            new ElementAttribute("id", "prod-list")
        ])
        
        this.products.forEach(prod => {
            const productItem = new ProductItem(prod, "prod-list")
            productItem.render()
        })
    }
}

class Shop {
    render() {

        this.cart = new ShoppingCart("app")
        this.cart.render()

        const productList = new ProductList("app")
        productList.render()

    }
}

class App {
    static cart

    static init() {
        const shop = new Shop()
        shop.render()
        this.cart = shop.cart
    }

    static addProductToCart(product) {
        this.cart.addProduct(product)
    }
}

App.init()

