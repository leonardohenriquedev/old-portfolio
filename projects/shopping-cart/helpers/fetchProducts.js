const fetchProducts = async( query ) => {
  if ( query.length === 0 ) {
    const result = await fetch( `https://api.mercadolibre.com/sites/MLB/search?q=macbook` );
    return result.json();
  }
  if ( query.length === 1 ) {
    const result = await fetch( `https://api.mercadolibre.com/sites/MLB/search?q=macbook` );
    return result.json();
  }
  if ( query ) {
    const result = await fetch( `https://api.mercadolibre.com/sites/MLB/search?q=${query}` );

    return result.json();
  }
};

// fetchProducts();

if ( typeof module !== 'undefined' ) {
  module.exports = {
    fetchProducts,
  };
}
