import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import App from './App.vue'

//Import Vue APollo
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

// URL Endpoint
const httpLink = new HttpLink({
  uri: 'https://tontrends-gateway-service.herokuapp.com/tontrends-gateway-service/api/v1/graphql'
})


// instatiating the apolloclient and passing the httplink
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

//install the plugin
Vue.use(VueApollo);

// instantiating a new vue apollo client and setting the default client to a created client, loading is also set so we can update the ui as appropriate
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

new Vue({
    // Provide the instantiated apollo provider
    provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app')
