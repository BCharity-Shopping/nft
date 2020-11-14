import {gql} from '@apollo/client';

const MyQuery = gql`
  query MyQuery($order_by: order_by, $offset: Int) {
    atomicassets_assets(
      limit: 20
      order_by: {minted_at_time: $order_by}
      offset: $offset
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

export default MyQuery;
