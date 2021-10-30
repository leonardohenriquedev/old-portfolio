const numberToMoeda = ( num ) => {
  if ( isNaN( num ) ) return "NaN";
  num = parseFloat( num );
  return num.toLocaleString( "pt-br", { style: "currency", currency: "BRL" } );
};

function createProductImageElement( imageSource ) {
  const img = document.createElement( 'img' );
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement( element, className, innerText ) {
  const e = document.createElement( element );
  e.className = className;
  e.innerText = innerText;
  return e;
}

async function createProductItemElement( { sku, name, image } ) {
  let obj = await fetchItem( sku );

  const section = document.createElement( 'section' );
  section.className = 'item';
  section.appendChild( createCustomElement( 'span', 'item__sku', sku ) );
  section.appendChild( createProductImageElement( image ) );
  section.appendChild( createCustomElement( 'span', 'item__title', name ) );

  section.appendChild( createCustomElement( 'span', 'price', `${numberToMoeda(obj.price)}` ) );

  section.appendChild( createCustomElement( 'button', 'item__add', 'Adicionar ao carrinho!' ) );

  return section;
}

const cartItems = document.querySelector( '.cart__items' );
const cart = document.querySelector( '.cart' );

async function cartItemClickListener( event ) {
  for ( let index = 0; index < cartItems.children.length; index += 1 ) {
    if ( cartItems.children[ index ] === event.target.parentElement ) {
      cartItems.removeChild( cartItems.children[ index ] );
    }
  }

  let id = event.target.parentElement.children[ 1 ].innerHTML;
  id = await fetchItem( id );

  cart.lastElementChild
    .lastElementChild
    .innerText = ( Number( cart.lastElementChild.lastElementChild.innerText ) - id.price );

  localStorage.setItem( 'cartValue', cart.lastElementChild.innerHTML );

  saveCartItems( cartItems.innerHTML );
}

async function createCartItemElement( { sku, name, salePrice } ) {
  let obj = await fetchItem( sku );
  const div = document.createElement( 'div' );
  div.className = 'cart__item';
  div.innerHTML = `<img src="${obj.thumbnail}" alt=""><div class='sku'>${sku}</div>${`<a href="${obj.permalink}" target="_blank">${name}</a>`}<br><br>Valor do item: R$${salePrice}<br><button>Remover</button>`;
  div.children[ 6 ].addEventListener( 'click', cartItemClickListener );


  return div;
}

const createCartItems = async( item ) => {
  const sku = item.id;
  const name = item.title;
  const salePrice = item.price;
  cartItems.appendChild( await createCartItemElement( { sku, name, salePrice } ) );
  saveCartItems( cartItems.innerHTML );
};

const addCartValue = ( item ) => {
  if ( cart.lastElementChild.lastElementChild === null ) {
    const priceCartContainer = document.createElement( 'div' );
    priceCartContainer.classList = 'total-value';
    const text = document.createElement( 'span' );
    text.innerHTML = `Valor Total: R$ `;
    const price = document.createElement( 'span' );
    price.className = 'total-price';
    price.innerText = `${item.price}`;
    priceCartContainer.appendChild( text );
    priceCartContainer.appendChild( price );
    cart.appendChild( priceCartContainer );
    localStorage.setItem( 'cartValue', cart.lastElementChild.innerHTML );
  } else {
    cart.lastElementChild.lastElementChild
      .innerText = ( parseFloat( cart.lastElementChild.lastElementChild.innerText ) + item.price ).toFixed( 2 );
    localStorage.setItem( 'cartValue', cart.lastElementChild.innerHTML );
  }
};

const addToCart = async( event ) => {
  if ( !document.querySelector( '.empty-cart' ) ) {
    let btnClear = document.createElement( 'button' );
    btnClear.innerHTML = 'Esvaziar Carrinho'
    btnClear.classList = 'empty-cart';
    cart.appendChild( btnClear );
    btnClear.addEventListener( 'click', () => {
      for ( let index = 0; index < cartItems.children.length; index = 0 ) {
        cartItems.removeChild( cartItems.children[ index ] );
      }
      cart.lastElementChild.lastElementChild
        .innerText = 0;
      saveCartItems( cartItems.innerHTML );
      localStorage.setItem( 'cartValue', cart.lastElementChild.innerHTML );
      cart.removeChild( cart.children[ 4 ] )
      cart.removeChild( cart.children[ 3 ] )
      localStorage.setItem( 'btnClear', btnClear );
    } );
    localStorage.setItem( 'btnClear', btnClear );

  }
  const id = event.target.parentElement.firstElementChild.innerText;
  const item = await fetchItem( id );
  createCartItems( item );
  addCartValue( item );
};



const generateItems = async( input = 'iphone' ) => {
  const items = await fetchProducts( input );
  const newItems = [];

  for ( let index = 0; index < 44; index++ ) {
    const sku = items.results[ index ].id;
    const name = items.results[ index ].title;
    const image = items.results[ index ].thumbnail;
    newItems.push( { sku, name, image } );
  }
  return newItems;
};

const sectionItem = document.querySelector( '.items' );

const createSections = async(input) => {

  const listItem = await generateItems( input );
  listItem.forEach( async( item, index ) => {

    let test = await createProductItemElement( item );
    sectionItem.appendChild( test );
    setTimeout( () => {
      const buttonAdd = document.querySelectorAll( '.item__add' )[ index ];
      buttonAdd.addEventListener( 'click', addToCart );
    }, 1000 );
  } );
  sectionItem.removeChild( sectionItem.children[ 0 ] );
};

const loadCartItems = () => {
  cartItems.innerHTML = getSavedCartItems();

  for ( let index = 0; index < cartItems.children.length; index += 1 ) {
    cartItems.children[ index ].children[ 6 ].addEventListener( 'click', cartItemClickListener );
  }

  const container = document.createElement( 'div' );
  container.innerHTML = localStorage.getItem( 'cartValue' );
  if ( localStorage.getItem( 'cartValue' ) ) {
    container.classList = 'total-value'
  }
  cart.appendChild( container );
};


if ( document.querySelector( '.empty-cart' ) ) {
  const clearButton = document.querySelector( '.empty-cart' );
  clearButton.addEventListener( 'click', () => {
    for ( let index = 0; index < cartItems.children.length; index = 0 ) {
      cartItems.removeChild( cartItems.children[ index ] );
    }
    cart.lastElementChild.lastElementChild
      .innerText = 0;
    localStorage.setItem( 'cartValue', cart.lastElementChild.innerHTML );
    saveCartItems( cartItems.innerHTML );
    // console.log('testee')
  } );
}

window.onload = () => {
  const loading = document.createElement( 'p' );
  loading.classList = 'loading';
  loading.innerText = 'carregando...';
  sectionItem.appendChild( loading );

  createSections();

  let input = document.getElementsByTagName( 'input' )[ 0 ];
  input.addEventListener( 'keypress', ( event ) => {
    if ( event.key == 'Enter' ) {
      sectionItem.innerHTML = '';
      loading.classList = 'loading';
      loading.innerText = 'carregando...';
      sectionItem.appendChild( loading );

      createSections( input.value);
    }
  } )

  if ( localStorage.getItem( 'btnClear' ) ) {
    if ( !document.querySelector( '.empty-cart' ) ) {
      let btnClear = document.createElement( 'button' );
      btnClear.innerHTML = 'Esvaziar Carrinho'
      btnClear.classList = 'empty-cart';
      cart.appendChild( btnClear );
      btnClear.addEventListener( 'click', () => {
        for ( let index = 0; index < cartItems.children.length; index = 0 ) {
          cartItems.removeChild( cartItems.children[ index ] );
        }
        cart.lastElementChild.lastElementChild
          .innerText = 0;
        localStorage.setItem( 'cartValue', cart.lastElementChild.innerHTML );
        saveCartItems( cartItems.innerHTML );

        cart.removeChild( cart.children[ 3 ] )
        cart.removeChild( cart.children[ 2 ] )
  
      } );
    }
  }
  
  loadCartItems();
};
