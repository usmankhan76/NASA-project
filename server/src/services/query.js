const DEFAULT_PAGE_NUMBER=1;
const DEFAULT_PAGE_LIMIT=0;// if we make it zero the mongo will return all of the documents in the collection

function paginationUsingQuery(query) {
    const limit=Math.abs(query.limit) ||DEFAULT_PAGE_LIMIT  ;
    const page=Math.abs(query.page) ||DEFAULT_PAGE_NUMBER ;
    const skip=(page-1)*limit  ;
    return{
        limit,
        skip,
    }
}
module.exports={paginationUsingQuery,}