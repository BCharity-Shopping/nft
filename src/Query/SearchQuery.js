import {gql} from '@apollo/client';
const SearchQuery = gql`
  query MyQuery($search: String) {
    atomicassets_assets(
      limit: 50
      where: {atomicassets_collection: {collection_name: {_gte: $search}}}
    ) {
      asset_id
      owner
      immutable_data
      atomicassets_collection {
        collection_name
        data
      }
      atomicassets_template {
        template_id
        immutable_data
        atomicmarket_template_prices {
          median
        }
      }
    }
  }
`;

export default SearchQuery;
