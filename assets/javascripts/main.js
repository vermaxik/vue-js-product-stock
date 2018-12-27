Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image">
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else 
           :style="{ textDecoration: 'line-through' }">Out of Stock</p>

        <ul>
          <li v-for="detail in details">
            {{ detail }}
          </li>
        </ul>

        <p>Shipping {{shipping}}</p>

        <div v-for="(variant, index) in variants"
             :key="variant.variantId"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
        </div>

        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
          Add to Cart
        </button>

        <div class="cart">
          <p>Cart({{cart}})</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      brand: 'Vue',
      product: 'Socks',
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2245,
          variantColor: "green",
          variantImage: './assets/images/green-socks.jpg',
          variantQuantity: 10,
        },
        {
          variantId: 2247,
          variantColor: "blue",
          variantImage: './assets/images/blue-socks.jpg',
          variantQuantity: 0
        }
      ],
      cart: 0
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },

    image() {
      return this.variants[this.selectedVariant].variantImage
    },

    inStock() {
      return this.variants[this.selectedVariant].variantQuantity >= 10
    },

    shipping() {
      return this.premium ? "Free" : "$2.99"
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false
  }
})