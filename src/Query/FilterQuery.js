import {gql} from '@apollo/client';

const FilterQuery = gql`
  query MyQuery($collectionName: String) {
    atomicassets_collections(
      distinct_on: collection_name
      where: {collection_name: {_gte: $collectionName}}
    ) {
      author
      collection_name
    }
  }
`;
export default FilterQuery;
