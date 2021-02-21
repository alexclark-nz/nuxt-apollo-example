<template>
  <!-- eslint-disable -->
  <div>
    <form
      action=""
      @submit.prevent="search"
      class="flex items-center mb-4"
    >
      <input
        type="text"
        name="Search"
        id="Search"
        class="border border-gray-600 rounded py-2 px-4 mr-2"
        v-model="searchText"
        placeholder="Enter your search term"
      >
      <button
        type="submit"
        class="bg-green-200 px-4 py-2"
      >Search</button>
    </form>

    <div v-if="loading">Loading..</div>
    <div
      v-if="hasSearched"
      class="mb-8"
    >
      <div v-if="results.length">
        <p class="font-bold">Your search results:</p>
        <div
          v-for="product in results"
          :key="product.id"
        >
          {{ product.title }}
        </div>
      </div>
      <p
        class="font-bold"
        v-else
      >No results found.</p>
    </div>

    <nav class="flex space-x-4 mb-8">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/categories/${cat.slug}`"
        class="bg-gray-200 rounded p-4"
      >
        {{ cat.title }}
      </NuxtLink>
    </nav>

    <div class="grid grid-cols-4 gap-8">
      <div
        v-for="product in products"
        :key="product.id"
      >
        {{ product.title }}
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const PRODUCTS_QUERY = gql`
  query PRODUCTS_QUERY {
    products(limit: 25) {
      id
      title
    }
  }
`

const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY {
    categories {
      id
      slug
      title
    }
  }
`

const SEARCH_QUERY = gql`
  query PRODUCTS_QUERY($search: String) {
    products(search: $search) {
      title
    }
  }
`

export default {
  /**
   * The apollo helper finds results server-side (or statically generated)
   * We can use the apollo helpers "Smart queries" like this,
   * or use Nuxt's asyncData method (see /pages/categories/_slug.vue)
   */
  apollo: {
    products: {
      query: PRODUCTS_QUERY,
      prefetch: true,
    },

    categories: {
      query: CATEGORIES_QUERY,
      prefetch: true,
    },
  },

  data() {
    return {
      searchText: '',
      loading: false,
      results: [],
      hasSearched: false,
    }
  },

  methods: {
    /**
     * Search is handled client-side
     */
    async search() {
      this.loading = true

      const res = await this.$apollo.query({
        query: SEARCH_QUERY,
        variables: {
          search: this.searchText,
        },
      })

      if (res) {
        this.loading = false
        this.hasSearched = true
      }

      const { products } = res.data
      this.results = products
    },
  },
}
</script>
