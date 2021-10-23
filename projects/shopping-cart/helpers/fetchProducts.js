const fetchProducts = async (query) => {
  // seu código aqui
  if (query) {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);

    return result.json();
  }
  throw new Error('You must provide an url');
};

// fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
