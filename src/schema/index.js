// @ts-check

import Status from "./status"
import Article from "./article"
import Articles from "./articles"
import Artwork from "./artwork"
import Artworks from "./artworks"
import Artist from "./artist"
import Artists from "./artists"
import Collection from "./collection"
import ExternalPartner from "./external_partner"
import Fair from "./fair"
import Fairs from "./fairs"
import Gene from "./gene"
import GeneFamilies from "./gene_families"
import GeneFamily from "./gene_family"
import HomePage from "./home"
import OrderedSet from "./ordered_set"
import OrderedSets from "./ordered_sets"
import Profile from "./profile"
import Partner from "./partner"
import Partners from "./partners"
import FilterPartners from "./filter_partners"
import filterArtworks from "./filter_artworks"
import FilterSaleArtworks from "./filter_sale_artworks"
import FollowArtist from "./me/follow_artist"
import FollowGene from "./me/follow_gene"
import PartnerCategory from "./partner_category"
import PartnerCategories from "./partner_categories"
import PartnerShow from "./partner_show"
import PartnerShows from "./partner_shows"
import PopularArtists from "./artists/popular"
import Sale from "./sale/index"
import Sales from "./sales"
import SaleArtwork from "./sale_artwork"
import SaleArtworks from "./sale_artworks"
import Search from "./search"
import Services from "./services"
import Show from "./show"
import SuggestedGenes from "./suggested_genes"
import Tag from "./tag"
import TrendingArtists from "./artists/trending"
import MatchArtist from "./match/artist"
import MatchGene from "./match/gene"
import Me from "./me"

import UpdateConversationMutation from "./me/conversation/update_conversation_mutation"
import SendConversationMessageMutation from "./me/conversation/send_message_mutation"
import UpdateCollectorProfile from "./me/update_collector_profile"
import CreateSubmissionMutation from "./me/consignments/create_submission_mutation"
import UpdateSubmissionMutation from "./me/consignments/update_submission_mutation"
import AddAssetToConsignmentSubmission from "./me/consignments/add_asset_to_submission_mutation"
import SaveArtworkMutation from "./me/save_artwork_mutation"
import CreateAssetRequestLoader from "./asset_uploads/create_asset_request_mutation"
import CreateGeminiEntryForAsset from "./asset_uploads/finalize_asset_mutation"
import UpdateMyUserProfileMutation from "./me/update_me_mutation"

import CausalityJWT from "./causality_jwt"
import ObjectIdentification from "./object_identification"
import { GraphQLSchema, GraphQLObjectType } from "graphql"

const { ENABLE_SCHEMA_STITCHING } = process.env
const enableSchemaStitching = ENABLE_SCHEMA_STITCHING === "true"

const rootFields = {
  article: Article,
  articles: Articles,
  artwork: Artwork,
  artworks: Artworks,
  artist: Artist,
  artists: Artists,
  causality_jwt: CausalityJWT,
  collection: Collection,
  external_partner: ExternalPartner,
  fair: Fair,
  fairs: Fairs,
  filter_partners: FilterPartners,
  filter_artworks: filterArtworks(),
  filter_sale_artworks: FilterSaleArtworks,
  gene: Gene,
  suggested_genes: SuggestedGenes,
  gene_families: GeneFamilies,
  gene_family: GeneFamily,
  home_page: HomePage,
  match_artist: MatchArtist,
  match_gene: MatchGene,
  me: Me,
  node: ObjectIdentification.NodeField,
  ordered_set: OrderedSet,
  ordered_sets: OrderedSets,
  partner: Partner,
  partner_categories: PartnerCategories,
  partner_category: PartnerCategory,
  partner_show: PartnerShow,
  partner_shows: PartnerShows,
  partners: Partners,
  profile: Profile,
  sale: Sale,
  sale_artwork: SaleArtwork,
  sale_artworks: SaleArtworks,
  sales: Sales,
  search: Search,
  services: Services,
  show: Show,
  status: Status,
  tag: Tag,
  trending_artists: TrendingArtists,
  popular_artists: PopularArtists,
}

const ViewerType = new GraphQLObjectType({
  name: "Viewer",
  description: "A wildcard used to support complex root queries in Relay",
  fields: rootFields,
})

const Viewer = {
  type: ViewerType,
  description: "A wildcard used to support complex root queries in Relay",
  resolve: x => x,
}

const convectionMutations = enableSchemaStitching
  ? {}
  : {
      createConsignmentSubmission: CreateSubmissionMutation,
      updateConsignmentSubmission: UpdateSubmissionMutation,
      addAssetToConsignmentSubmission: AddAssetToConsignmentSubmission,
    }

const schema = new GraphQLSchema({
  allowedLegacyNames: ["__id"],
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      followArtist: FollowArtist,
      followGene: FollowGene,
      updateCollectorProfile: UpdateCollectorProfile,
      updateMyUserProfile: UpdateMyUserProfileMutation,
      updateConversation: UpdateConversationMutation,
      sendConversationMessage: SendConversationMessageMutation,
      saveArtwork: SaveArtworkMutation,
      requestCredentialsForAssetUpload: CreateAssetRequestLoader,
      createGeminiEntryForAsset: CreateGeminiEntryForAsset,
      ...convectionMutations,
    },
  }),
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...rootFields,
      viewer: Viewer,
    },
  }),
})

export default schema
