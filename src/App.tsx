import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, Heart, Leaf, Minus, Plus, Search, ShoppingBag, Sparkles, X } from 'lucide-react'

type Product = {
  id: number
  name: string
  maker: string
  category: string
  price: number
  material: string
  image: string
  color: string
}

const products: Product[] = [
  { id: 1, name: 'Woven day basket', maker: 'Amina’s Studio', category: 'Home', price: 42, material: 'Locally gathered reeds', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85', color: 'sand' },
  { id: 2, name: 'Indigo everyday scarf', maker: 'Thread & Tide', category: 'Wearables', price: 58, material: 'Natural-dyed cotton', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=85', color: 'blue' },
  { id: 3, name: 'Small-batch stoneware', maker: 'Clay by Nia', category: 'Home', price: 36, material: 'Locally sourced clay', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85', color: 'clay' },
  { id: 4, name: 'Botanical paper journal', maker: 'Field Notes Press', category: 'Paper goods', price: 24, material: 'Recycled cotton paper', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85', color: 'sage' },
  { id: 5, name: 'Carved olivewood spoon', maker: 'Woodfolk Workshop', category: 'Home', price: 29, material: 'Offcut olivewood', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85', color: 'wood' },
  { id: 6, name: 'Patchwork market tote', maker: 'Mending Circle', category: 'Wearables', price: 48, material: 'Repurposed fabric', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85', color: 'rose' },
]

const categories = ['Everything', 'Home', 'Wearables', 'Paper goods']
type Cart = Record<number, number>

function readCart(): Cart {
  try {
    const saved = localStorage.getItem('openhuman-demo-cart')
    return saved ? JSON.parse(saved) as Cart : {}
  } catch {
    return {}
  }
}

export default function App() {
  const [category, setCategory] = useState('Everything')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Cart>(readCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Everything' || product.category === category
    const matchesQuery = `${product.name} ${product.maker} ${product.material}`.toLowerCase().includes(query.toLowerCase().trim())
    return matchesCategory && matchesQuery
  }), [category, query])

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0)
  const cartProducts = products.filter((product) => cart[product.id])

  function updateCart(productId: number, amount: number) {
    setCart((current) => {
      const next = { ...current }
      const quantity = (next[productId] ?? 0) + amount
      if (quantity <= 0) delete next[productId]
      else next[productId] = quantity
      try { localStorage.setItem('openhuman-demo-cart', JSON.stringify(next)) } catch { /* Storage is optional. */ }
      return next
    })
  }

  function addToBag(product: Product) {
    updateCart(product.id, 1)
    setNotice(`${product.name} added to your bag`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  return (
    <div className="site-shell">
      <div className="announcement"><Sparkles size={14} /> A little more meaning in every thing <span>—</span> meet the makers behind the work</div>
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="OpenHuman Market home"><span className="brand-mark">o</span><span>openhuman<span className="wordmark-light"> market</span></span></a>
        <nav className="main-nav" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#principles">Better by nature</a></nav>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cartCount} items`}><ShoppingBag size={19} /><span>Bag</span><b>{cartCount}</b></button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> A marketplace with people at its heart</span><h1>Good things,<br /><em>made by hand.</em></h1><p>Meet independent makers. Find pieces with a story. Help keep good craft — and the people behind it — thriving.</p><a className="button button-dark" href="#shop">Find your next favourite <ArrowRight size={17} /></a><div className="hero-footnote"><span className="tiny-avatars"><i>A</i><i>N</i><i>M</i></span><span>A community of makers, making a living their own way.</span></div></div>
          <div className="hero-art" aria-label="Artisan-made pottery and woven goods"><div className="hero-image" /><div className="floating-note"><span className="note-icon"><Leaf size={17} /></span><span><b>Made with intention</b><small>Thoughtful materials, lasting craft</small></span></div><div className="hero-stamp">made<br />with<br /><em>heart</em><span>✳</span></div></div>
          <div className="hero-index">01 <span /> 03</div>
        </section>

        <section className="values-strip" id="principles"><div><span className="value-icon">✳</span><span><b>People over platforms</b><small>Made to support makers, first</small></span></div><div><span className="value-icon">↻</span><span><b>Considered by nature</b><small>Reuse, repair, and make things last</small></span></div><div><span className="value-icon">♡</span><span><b>Made to be treasured</b><small>Small batches, meaningful things</small></span></div></section>

        <section className="shop-section" id="shop"><div className="section-heading"><div><span className="eyebrow">A good place to begin</span><h2>Find something <em>one of a kind.</em></h2></div><a className="text-link" href="#makers">Meet our makers <ArrowDownRight size={17} /></a></div>
          <div className="shop-controls"><div className="category-tabs" role="group" aria-label="Filter by category">{categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div><label className="search-box"><Search size={17} /><span className="visually-hidden">Search products, makers, or materials</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the good stuff" /></label></div>
          {filtered.length ? <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className={`product-image ${product.color}`}><img src={product.image} alt={`${product.name}, handmade by ${product.maker}`} loading="lazy" /><button className="favorite-button" aria-label={`Save ${product.name} for later`} onClick={(event) => { const button = event.currentTarget; button.classList.toggle('is-loved'); button.setAttribute('aria-pressed', String(button.classList.contains('is-loved'))) }} aria-pressed="false"><Heart size={17} /></button><span className="product-tag">Small batch</span></div><div className="product-info"><div className="product-title-row"><div><h3>{product.name}</h3><p>by {product.maker}</p></div><span className="price">${product.price}</span></div><div className="product-meta"><span><Leaf size={13} /> {product.material}</span><button onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}><Plus size={16} /><span>Add</span></button></div></div></article>)}</div> : <div className="empty-results"><span>Nothing here just yet.</span><p>Try another search or choose a different category.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('Everything') }}>Show everything <ArrowRight size={16} /></button></div>}
        </section>

        <section className="maker-banner" id="story"><div className="maker-image" /><div className="maker-copy"><span className="eyebrow">The hands behind the handmade</span><h2>Every piece has<br />a <em>person</em> behind it.</h2><p>We believe the best way to shop is to know who made what you bring home. This is a space for independent artisans to be seen, valued, and paid fairly.</p><a className="button button-light" href="#makers">The people behind the pieces <ArrowRight size={17} /></a></div><span className="banner-spark">✳</span></section>

        <section className="maker-invite" id="makers"><span className="eyebrow">Are you an independent maker?</span><h2>Your craft deserves<br /><em>to find its people.</em></h2><p>We’re building a more welcoming way to share and sell handmade work. The marketplace is an early prototype — come help shape what it becomes.</p><a className="button button-dark" href="https://github.com/LiShan-Foundation/openhuman-marketplace" target="_blank" rel="noreferrer">Help us build it <ArrowRight size={17} /></a></section>
      </main>

      <footer className="footer"><a className="wordmark" href="#home"><span className="brand-mark">o</span><span>openhuman<span className="wordmark-light"> market</span></span></a><span>Made for people. Mindful of the planet.</span><a href="https://github.com/LiShan-Foundation/openhuman-marketplace">Open source on GitHub ↗</a><small>© 2026 OpenHuman Market · Early prototype</small></footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><span className="eyebrow">Your good finds</span><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X /></button></div>{cartProducts.length ? <><div className="cart-items">{cartProducts.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div className="cart-item-details"><b>{product.name}</b><small>by {product.maker}</small><span>${product.price}</span><div className="quantity-control"><button aria-label={`Remove one ${product.name}`} onClick={() => updateCart(product.id, -1)}><Minus size={13} /></button><span>{cart[product.id]}</span><button aria-label={`Add one ${product.name}`} onClick={() => updateCart(product.id, 1)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-summary"><p><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></p><small>Demo only — checkout and shipping are not available yet.</small><button className="button button-dark checkout-button" onClick={() => setCartOpen(false)}>Continue exploring <ArrowRight size={17} /></button></div></> : <div className="cart-empty"><span className="empty-bag"><ShoppingBag size={25} /></span><h3>Your bag is taking a breather.</h3><p>When something catches your eye, you’ll find it here.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Explore the market <ArrowRight size={16} /></button></div>}</aside></div>}
    </div>
  )
}
