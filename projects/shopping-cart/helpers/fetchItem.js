const fetchItem = async( id ) => {
  if ( id ) {
    let result = await fetch( `https://api.mercadolibre.com/items/${id}` );
    result = await result.json();
    return result;
  }
  throw new Error( 'You must provide an url' );
};

if ( typeof module !== 'undefined' ) {
  module.exports = {
    fetchItem,
  };
}
