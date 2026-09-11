 { useState } from "react";

const products = [
  {
    id: 1,
    name: "Kids Drawing Set",
    price: 850,
    category: "Stationery",
    age: "4-8 years",
    type: "new",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80",
    tags: ["drawing", "art", "crayons"]
  },
  {
    id: 2,
    name: "Building Blocks",
    price: 1200,
    category: "Toys",
    age: "3-6 years",
    type: "new",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
    tags: ["toy", "blocks", "building"]
  },
  {
    id: 3,
    name: "Animal Story Books",
    price: 650,
    category: "Books",
    age: "3-7 years",
    type: "new",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    tags: ["book", "story", "reading"]
  },
  {
    id: 4,
    name: "Kids Drinking Mug",
    price: 450,
    category: "Utensils",
    age: "2-6 years",
    type: "new",
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80",
    tags: ["cup", "mug", "drinking"]
  },
  {
    id: 5,
    name: "Kids Study Table",
    price: 2500,
    category: "Furniture",
    age: "5-12 years",
    type: "used",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80",
    tags: ["table", "study", "desk"]
  },
  {
    id: 6,
    name: "Teddy Bear",
    price: 0,
    category: "Toys",
    age: "2-6 years",
    type: "giveaway",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    tags: ["toy", "teddy", "soft"]
  },
  {
    id: 7,
    name: "Colour Pencil Set",
    price: 390,
    category: "Stationery",
    age: "4-12 years",
    type: "new",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    tags: ["drawing", "pencils", "art"]
  },
  {
    id: 8,
    name: "Kids Backpack",
    price: 1100,
    category: "Bags",
    age: "5-10 years",
    type: "used",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    tags: ["bag", "school", "backpack"]
  }
];

function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [basket, setBasket] = useState([]);
  const [search, setSearch] = useState("");

  const addToBasket = (product) => {
    setBasket([...basket, product]);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    if (page === "new") return product.type === "new";
    if (page === "used") return product.type === "used";
    if (page === "giveaway") return product.type === "giveaway";
    return false;
  }).filter((product) => {
    const text = `
      ${product.name}
      ${product.category}
      ${product.age}
      ${product.tags.join(" ")}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="app">

      {/* HOME */}
      {page === "home" && (
        <HomePage setPage={setPage} />
      )}

      {/* PRODUCT PAGE */}
      {page !== "home" && (
        <div className="marketplace">

          <header className="top">
            <button
              className="back-button"
              onClick={() => setPage("home")}
            >
              ←
            </button>

            <div>
              <h1>
                {page === "new" && "New Items"}
                {page === "used" && "Used Items"}
                {page === "giveaway" && "Give Away"}
              </h1>

              <p>
                Find something special for little ones
              </p>
            </div>
          </header>

          {/* USED WARNING */}
          {page === "used" && (
            <div className="warning">
              Actual Product may look different than the image.
            </div>
          )}

          {/* SEARCH */}
          <div className="search-area">
            <input
              type="text"
              placeholder="Search toys, books, drawing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>
              Filter
            </button>
          </div>

          {/* PRODUCTS */}
          <div className="products">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}

          </div>

          {filteredProducts.length === 0 && (
            <div className="empty">
              <h2>No little treasures found.</h2>
              <p>Try another search.</p>
            </div>
          )}
        </div>
      )}

      {/* PRODUCT DETAILS */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          close={() => setSelectedProduct(null)}
          buy={() => addToBasket(selectedProduct)}
        />
      )}

      {/* BASKET */}
      {basket.length > 0 && (
        <div className="basket">

          <div>
            <strong>My Basket</strong>
            <span>{basket.length} item(s)</span>
          </div>

          <button
            onClick={() => {
              alert("Checkout will be connected later.");
            }}
          >
            Continue
          </button>

        </div>
      )}

    </div>
  );
}


/* HOME PAGE */

function HomePage({ setPage }) {
  return (
    <main className="home">

      <div className="logo">
        <div className="logo-box">K</div>

        <div>
          <strong>Kilkari</strong>
          <span>Little treasures</span>
        </div>
      </div>

      <section className="hero">

        <span className="small-label">
          Welcome to Kilkari
        </span>

        <h1>
          Find little things
          <br />
          <span>they'll love.</span>
        </h1>

        <p>
          Discover new products, pre-loved items
          and free treasures for children.
        </p>

      </section>


      <section className="category-container">

        <CategoryCard
          title="New Items"
          text="Fresh products ready to play"
          emoji="🧸"
          className="new"
          onClick={() => setPage("new")}
        />

        <CategoryCard
          title="Used Items"
          text="Good things deserve another home"
          emoji="🚂"
          className="used"
          onClick={() => setPage("used")}
        />

        <CategoryCard
          title="Give Away"
          text="Little treasures for free"
          emoji="🎁"
          className="give"
          onClick={() => setPage("giveaway")}
        />

      </section>

    </main>
  );
}


/* CATEGORY CARD */

function CategoryCard({
  title,
  text,
  emoji,
  className,
  onClick
}) {
  return (
    <button
      className={`category-card ${className}`}
      onClick={onClick}
    >

      <div className="emoji">
        {emoji}
      </div>

      <div>
        <small>Explore</small>

        <h2>{title}</h2>

        <p>{text}</p>
      </div>

      <span className="arrow">
        →
      </span>

    </button>
  );
}


/* PRODUCT CARD */

function ProductCard({ product, onClick }) {
  return (
    <button
      className="product-card"
      onClick={onClick}
    >

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        {product.price === 0 && (
          <span className="free">
            FREE
          </span>
        )}

      </div>

      <div className="product-info">

        <small>
          {product.category}
        </small>

        <h3>
          {product.name}
        </h3>

        <div className="product-bottom">

          <strong>
            {product.price === 0
              ? "Free"
              : `Rs. ${product.price}`}
          </strong>

          <span>
            {product.age}
          </span>

        </div>

      </div>

    </button>
  );
}


/* PRODUCT DETAILS */

function ProductDetails({
  product,
  close,
  buy
}) {
  return (
    <div className="modal">

      <div className="details">

        <button
          className="close"
          onClick={close}
        >
          ×
        </button>

        <img
          className="details-image"
          src={product.image}
          alt={product.name}
        />

        <div className="details-content">

          <small>
            {product.category}
          </small>

          <h2>
            {product.name}
          </h2>

          <h3>
            {product.price === 0
              ? "FREE"
              : `Rs. ${product.price}`}
          </h3>

          <div className="facts">

            <span>
              Age
              <strong>{product.age}</strong>
            </span>

            <span>
              Type
              <strong>
                {product.type === "new"
                  ? "New"
                  : product.type === "used"
                  ? "Used"
                  : "Give Away"}
              </strong>
            </span>

          </div>

          <p>
            A lovely product for children.
            More product information can be
            connected to the backend later.
          </p>

          <div className="tags">

            {product.tags.map((tag) => (
              <span key={tag}>
                #{tag}
              </span>
            ))}

          </div>

          {product.type === "giveaway" && (
            <div className="pickup">
              <strong>
                Pickup / Delivery
              </strong>

              <p>
                Pickup available from seller.
                Delivery terms can be added later.
              </p>
            </div>
          )}

          <button
            className="buy-button"
            onClick={buy}
          >
            {product.price === 0
              ? "Get this treasure"
              : "Buy Now"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;
