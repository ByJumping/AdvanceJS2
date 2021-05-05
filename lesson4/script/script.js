"Use strict";


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = []; //data
        this.allProducts = []; // массив экз товаров на основе this._goods

        // this._fetchGoods();
        // this._render();
        // this.totalSum();
        this._getGoods()
        .then((data) => {
          this._goods = data;
          this._render();
        });
    }

    // _fetchGoods() {
    //     this._goods = [
    //         {id: 1, title: 'Notebook', price: 20000},
    //         {id: 2, title: 'Mouse', price: 1500},
    //         {id: 3, title: 'Keyboard', price: 5000},
    //         {id: 4, title: 'Gamepad', price: 4500},
    //     ];
    // }

    _getGoods() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json()).catch(error => console.log(error));
      }

    _render() {
        const block = document.querySelector(this.container);

        for (const product of this._goods) {
            const productObject = new ProductItem(product);

            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    totalSum() {
        this._goods.reduce((sum, { price }) => sum + price, 0);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class = "product-item" data-id="${this.id}">
        <img src="${this.img}" alt="Some img">
        <dic class="desc">
        <h3>${this.title}</h3>
        <p>${this.price} \u20bd</p>
        <button class = "buy-btn">Купить</button>
        </div>
        </div>`;
    }
}

// Cart

class Cart {
    constructor(container = '.cart') {
        this.goods = [];
        this.container = container;
        this.render();
    }

    add() {
        // const btn = document.querySelectorAll('.buy-btn');
        // console.log(btn);
        // btn.forEach((element) => {
        //     element.addEventListener('click', (el) => {
        //         this.el = el;
        //         console.log(el);
        //     });
        // })
    }

    render() {
        
    }
} 


// CartItem

class CartItem {
    constructor(product) {
        this._title = product.title;
        this._price = product.price;
    }

    render() {
        return `<div class="cart">
        <div class="cart__item">
            <img src="https://via.placeholder.com/100x50" alt="">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class = "btn-del">Убрать</button>
                </div>
        </div>
    </div>`;
    }


}

new ProductList();
new Cart();