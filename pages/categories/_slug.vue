<template>
  <!-- eslint-disable -->
  <div class="flex flex-col items-start space-y-4">
    <h1 class="font-bold text-2xl">{{ category.title }}</h1>
    <NuxtLink
      to="/"
      class="bg-gray-200 rounded p-4"
    >
      Go home
    </NuxtLink>

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

const CATEGORY_QUERY = gql`
  query CATEGORY_QUERY($slug: [String]) {
    category(slug: $slug) {
      id
      title
    }
  }
`

const PRODUCTS_QUERY = gql`
  query PRODUCTS_QUERY($category: CategoryCriteriaInput) {
    products(relatedToCategories: $category) {
      id
      title
    }
  }
`

export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient
    const { slug } = params

    const categoryResponse = await client.query({
      query: CATEGORY_QUERY,
      variables: {
        slug,
      },
    })

    const productsResponse = await client.query({
      query: PRODUCTS_QUERY,
      variables: {
        category: { slug },
      },
    })

    const { category } = categoryResponse.data
    const { products } = productsResponse.data

    return {
      products,
      category,
    }
  },
}
</script>
