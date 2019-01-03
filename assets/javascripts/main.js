var eventBus = new Vue()

Vue.component('product-review', {
  template: `
  <div>
    <div v-if="errors.length">
      <ul>
        <li v-for="error in errors">{{error}}</li>
      </ul>
    </div>
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>
  </div>`,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        eventBus.$emit('review-submited', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        if(!this.name) this.errors.push("Name is required")
        if(!this.review) this.errors.push("Review is required")
        if(!this.rating) this.errors.push("Rating is required")
      }
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <span class="tab"
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab">{{tab}}</span>


      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reivews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>Name: {{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>Review: {{review.review}}</p>
          </li>
        </ul>
      </div>

      <product-review  v-show="selectedTab === 'Make a Review'"
                       @review-submited></product-review>
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
      default: true
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
      </div>

      <product-tabs :reviews="reviews"></product-tabs>
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
          variantQuantity: 12
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
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
  },
  mounted() {
    eventBus.$on('review-submited', review => {
      this.reviews.push(review)
    })
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})
