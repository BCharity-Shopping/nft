(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66583f29"],{"4c15":function(e,a,i){},cb90:function(e,a,i){"use strict";i("4c15")},cf81:function(e,a){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"atomicmarket_sales"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"bigint"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"atomicmarket_sales"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"sale_id"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"_eq"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}]}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sale_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"seller"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"listing_price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"listing_symbol"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"offer_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"atomicmarket_token"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"token_precision"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"atomicassets_offer"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"atomicassets_offers_assets"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"atomicassets_asset"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"atomicassets_asset_data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"asset_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"collection_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"schema_name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"atomicassets_template"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issued_supply"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"template_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"immutable_data"},arguments:[],directives:[]}]}}]}}]}}]}}]}}]}}],loc:{start:0,end:768}};i.loc.source={body:"query atomicmarket_sales($id: bigint!) {\n    atomicmarket_sales(where: {sale_id: {_eq: $id}}) {\n        sale_id\n        seller\n        listing_price\n        listing_symbol\n        offer_id\n        atomicmarket_token {\n            token_precision\n        }\n        atomicassets_offer {\n            atomicassets_offers_assets {\n                atomicassets_asset {\n                    atomicassets_asset_data {\n                        asset_id\n                        collection_name\n                        schema_name\n                    }\n                    atomicassets_template {\n                        issued_supply\n                        template_id\n                        immutable_data\n                    }\n                }\n            }\n        }\n    }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function t(e,a){if("FragmentSpread"===e.kind)a.add(e.name.value);else if("VariableDefinition"===e.kind){var i=e.type;"NamedType"===i.kind&&a.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){t(e,a)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){t(e,a)})),e.definitions&&e.definitions.forEach((function(e){t(e,a)}))}var n={};function s(e,a){for(var i=0;i<e.definitions.length;i++){var t=e.definitions[i];if(t.name&&t.name.value==a)return t}}function l(e,a){var i={kind:e.kind,definitions:[s(e,a)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var t=n[a]||new Set,l=new Set,d=new Set;t.forEach((function(e){d.add(e)}));while(d.size>0){var c=d;d=new Set,c.forEach((function(e){if(!l.has(e)){l.add(e);var a=n[e]||new Set;a.forEach((function(e){d.add(e)}))}}))}return l.forEach((function(a){var t=s(e,a);t&&i.definitions.push(t)})),i}(function(){i.definitions.forEach((function(e){if(e.name){var a=new Set;t(e,a),n[e.name.value]=a}}))})(),e.exports=i,e.exports["atomicmarket_sales"]=l(i,"atomicmarket_sales")},fbb2:function(e,a,i){"use strict";i.r(a);var t=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"Sales"},[t("router-link",{attrs:{to:"/MarketPlace"}},[t("div",{staticClass:"Breadcrumbs grey-color"},[t("h2",[e._v("Return to Market")])])]),t("h1",[e._v("Sale:#"+e._s(e.id))]),t("div",{staticClass:"main-block w-100"},[t("div",{staticClass:"row"},[t("div",{staticClass:"grid text-center px-0 MobileCardDesign"},[t("div",{staticClass:"picture-wrapper"},[t("ApolloQuery",{attrs:{query:i("cf81"),variables:{id:e.id}},scopedSlots:e._u([{key:"default",fn:function(a){var i=a.result.data;return[i?t("div",[t("b-card",{staticClass:"large-card"},[t("p",[e._v("Listing_Price:"+e._s(i.atomicmarket_sales[0].listing_price))]),t("p",[e._v(e._s(i.atomicmarket_sales[0].listing_symbol))]),t("p",[e._v("Seller: "+e._s(i.atomicmarket_sales[0].seller))]),t("p",[e._v("OfferId:"+e._s(i.atomicmarket_sales[0].offer_id))]),t("p",[e._v("Maximum Mint:"+e._s(i.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template.issued_supply))]),t("p",[e._v("Collection Name: "+e._s(i.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_asset_data.collection_name))]),t("p",[e._v("Schema Name: "+e._s(i.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_asset_data.schema_name))])])],1):e._e()]}}])})],1)]),t("p",[e._v("hello world")])])]),t("router-view")],1)},n=[],s=(i("96cf"),i("1da1")),l=i("a18c"),d=i("bc3a"),c=i.n(d),r={name:"sales",data:function(){return{id:0,exchangePriceUSD:void 0}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:c.a.get("https://api.coingecko.com/api/v3/coins/wax?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false").then((function(a){e.exchangePriceUSD=a.data.market_data.current_price.usd}));case 1:case"end":return a.stop()}}),a)})))()},created:function(){this.id=this.$route.params.id},methods:{navigate:function(){l["a"].go(-1)}}},o=r,m=(i("cb90"),i("2877")),u=Object(m["a"])(o,t,n,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-66583f29.89d9618c.js.map