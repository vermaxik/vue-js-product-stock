var app = new Vue({
  el: '#app',
  data: {
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
    }
  }
})