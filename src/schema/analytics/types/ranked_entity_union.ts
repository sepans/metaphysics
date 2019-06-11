import { GraphQLUnionType, GraphQLOutputType, GraphQLObjectType } from "graphql"
import Artwork from "schema/artwork"
import PartnerShow from "schema/partner_show"
import { ArtistType } from "schema/artist"

export const RankedEntityUnionType = new GraphQLUnionType({
  name: "RankedEntityUnion",
  types: [
    PartnerShow.type as GraphQLObjectType,
    Artwork.type as GraphQLObjectType,
    ArtistType,
  ],
  resolveType: obj => {
    console.log("RESOLVE RankedEntity", obj)
    let type: GraphQLObjectType = Artwork.type as GraphQLObjectType
    switch (obj.__typename) {
      case "Show":
        type = PartnerShow.type as GraphQLObjectType
        break
      case "Artist":
        type = ArtistType
        break
    }
    return type
  },
})
