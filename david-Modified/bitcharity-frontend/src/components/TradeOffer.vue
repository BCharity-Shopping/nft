<template>
  <div class="trade-offer">
    <div>
      <h4>{{ this.account_name }}</h4>
    </div>
    <div>
      <ApolloQuery
      :query="require('../graphQL/getAccountInventory.gql')"
      :variables="{owner:o}"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <div v-if="data.atomicassets_assets.length!=0">
              <div class="cards">
                <div v-for="asset in data.atomicassets_assets" :key="asset.asset_id">
                  <AssetSmallCard class="unselected" :id="'asset'+asset.asset_id+role" :asset_id="asset.asset_id" :asset="asset" @click.native="toggleOfferAsset(asset.asset_id)"/>
                </div>
              </div>
            </div>
          </div>
          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
  </div>
  </div>
</template>

<script>
import AssetSmallCard from '@/components/AssetSmallCard.vue'
export default {
  name: 'TradeOffer',
  props: ['account_name','role'],
  components: {
    AssetSmallCard
  },
  data () {
    return {
      owner: this.account_name,
      selectedAssets: [],
      key: 0
    }
  },
  methods: {
    toggleOfferAsset(asset_id) {
      var id = "asset" + asset_id + this.role
      if(this.selectedAssets.includes(asset_id)){
        this.selectedAssets.splice(this.selectedAssets.indexOf(asset_id), 1)
        document.getElementById(id).className = "unselected"
      }
      else {
        this.selectedAssets.push(asset_id)
        document.getElementById(id).className = "selected"
      }
      console.log("clicked " + asset_id + " on " + this.role);
      console.log(this.selectedAssets);
    },
    click(){
      this.selectedAssets.push({"accountName":this.owner});
      return this.selectedAssets;
    }
    
  },
  computed: {
    o: function() {
      console.log("it is "+this.owner)
      return this.owner
    }
  }
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.unselected {
  background-color: transparent;
  box-shadow: 0px 0px 10px 1px #262626;
  border-radius: 15px;
}
.selected {
  background-color: transparent;
  box-shadow: 0px 0px 10px 1px orange;
  border-radius: 15px;
}
</style>