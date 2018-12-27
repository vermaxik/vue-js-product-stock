var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/images/green-socks.jpg',
    link: '#link_to_socks',
    inStock: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2245,
        variantColor: "green",
        variantImage: './assets/images/green-socks.jpg',
      },
      {
        variantId: 2247,
        variantColor: "blue",
        variantImage: './assets/images/blue-socks.jpg',
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(variantImage) {
      this.image = variantImage
    }
  }
})