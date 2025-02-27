import algoliasearch from "algoliasearch"

const client = algoliasearch(process.env.ALGOLIA_APP_ID as string, process.env.ADMIN_API_KEY as string)
const reportIndex = client.initIndex("dev_REPORTS")

export { reportIndex }