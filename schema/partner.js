import _ from 'lodash';
import gravity from '../lib/loaders/gravity';
import cached from './fields/cached';
import Profile from './profile';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';

let PartnerType = new GraphQLObjectType({
  name: 'Partner',
  fields: () => ({
    cached: cached,
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    initials: {
      type: GraphQLString,
      resolve: ({ name }) => _.take(name.replace(/[^A-Z]/g, ''), 3).join('')
    },
    profile: {
      type: Profile.type,
      resolve: ({ default_profile_id }) => gravity(`profile/${default_profile_id}`)
    }
  })
});

let Partner = {
  type: PartnerType,
  description: 'A Partner',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The slug or ID of the Partner'
    }
  },
  resolve: (root, { id }) => gravity(`partner/${id}`)
};

export default Partner;
