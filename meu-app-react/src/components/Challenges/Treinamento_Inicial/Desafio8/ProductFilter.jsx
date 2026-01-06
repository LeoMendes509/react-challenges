import { useState } from "react";
import "./ProductFilter.css";

// Base de dados expandida com itens de hardware, periféricos e consoles.
const MOCK_PRODUCTS = [
  { id: 1, name: "NVIDIA RTX 4090 24GB", price: 12500, category: "Hardware", inStock: true },
  { id: 2, name: "PlayStation 5 Pro", price: 6500, category: "Consoles", inStock: true },
  { id: 3, name: "MacBook Pro M3 Max", price: 34500, category: "Laptops", inStock: false },
  { id: 4, name: "Monitor Odyssey G9 49\"", price: 8900, category: "Monitors", inStock: true },
  { id: 5, name: "iPhone 15 Pro Max", price: 9200, category: "Smartphones", inStock: true },
  { id: 6, name: "Intel Core i9-14900K", price: 3200, category: "Hardware", inStock: true },
  { id: 7, name: "Xbox Series X - 1TB", price: 4200, category: "Consoles", inStock: true },
  { id: 8, name: "Logitech G502 X Plus", price: 800, category: "Accessories", inStock: true },
  { id: 9, name: "Secretlab TITAN Evo", price: 3500, category: "Furniture", inStock: true },
  { id: 10, name: "Meta Quest 3 512GB", price: 4900, category: "Tech", inStock: true },
  { id: 11, name: "ASUS ROG Swift 360Hz", price: 4500, category: "Monitors", inStock: false },
  { id: 12, name: "Ryzen 9 7950X3D", price: 5200, category: "Hardware", inStock: true },
  { id: 13, name: "Elgato Stream Deck MK.2", price: 950, category: "Accessories", inStock: true },
  { id: 14, name: "Nintendo Switch OLED", price: 2200, category: "Consoles", inStock: true },
  { id: 15, name: "Sony DualSense Edge", price: 1450, category: "Consoles", inStock: true },
  { id: 16, name: "Samsung 990 Pro 2TB", price: 1100, category: "Hardware", inStock: true },
  { id: 17, name: "GoPro Hero 12 Black", price: 2800, category: "Tech", inStock: true },
  { id: 18, name: "DJI Mini 4 Pro Drone", price: 7500, category: "Tech", inStock: true },
  { id: 19, name: "Herman Miller Embody", price: 12000, category: "Furniture", inStock: false },
  { id: 20, name: "Apple Vision Pro", price: 28000, category: "Tech", inStock: true },
];

function ProductFilter() {
  // Estados que controlam os valores dos filtros e a alternância de visualização das telas.
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState(35000);
  const [viewResults, setViewResults] = useState(false);

  // Mapeia os produtos para gerar uma lista de categorias sem repetições.
  const categories = ["All", ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  // Filtra a lista original comparando cada produto com todos os estados de filtro ativos.
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesStock = onlyInStock ? product.inStock : true;
    const matchesPrice = product.price <= maxPrice;
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesStock && matchesPrice && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  // Retorna todos os estados de filtragem para seus valores originais.
  const resetFilters = () => {
    setSearch("");
    setSortBy("Featured");
    setSelectedCategory("All");
    setOnlyInStock(false);
    setMaxPrice(35000);
  };

  // Visão inicial: Formulário de configuração dos filtros de busca.
  if (!viewResults) {
    return (
      <div className="p8-card p8-animation-in">
        <div className="p8-header">
          <div className="p8-header-info">
            <span className="p8-blue-accent"></span>
            <p>Product Filters</p>
          </div>
          <button className="p8-close-btn" onClick={resetFilters}>✕</button>
        </div>

        <div className="p8-body">
          {/* Seção de busca textual com ícone posicionado internamente. */}
          <div className="p8-section">
            <div className="p8-search-container">
              <span className="p8-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </div>
          </div>

          {/* Agrupamento flexível para exibir Sort e Category na mesma linha. */}
          <div className="p8-flex-row">
            <div className="p8-section flex-1">
              <label>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="p8-section flex-1">
              <label>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          {/* Campo de seleção para disponibilidade com o checkbox vindo antes do texto. */}
          <div className="p8-section">
            <label className="p8-checkbox-label">
              <input 
                type="checkbox" 
                checked={onlyInStock} 
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              <span>In stock only</span>
            </label>
          </div>

          {/* Slider de controle de preço com exibição dinâmica do valor máximo. */}
          <div className="p8-section">
            <div className="p8-price-header">
              <label>Max Price</label>
              <span className="p8-price-tag">$ {maxPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="35000" 
              step="500" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))} 
              className="p8-slider" 
            />
          </div>
        </div>

        <div className="p8-footer">
          <button className="p8-btn-reset" onClick={resetFilters}>Reset</button>
          <button className="p8-btn-apply" onClick={() => setViewResults(true)}>Apply Filters</button>
        </div>
      </div>
    );
  }

  // Visão de resultados: Lista os itens filtrados com botões reduzidos de navegação.
  return (
    <div className="p8-card p8-animation-in">
      <div className="p8-header">
        <div className="p8-header-info">
          <span className="p8-blue-accent"></span>
          <p>Found {filteredProducts.length} results</p>
        </div>
        <button className="p8-back-link" onClick={() => setViewResults(false)}>← Back</button>
      </div>

      <div className="p8-body p8-results-body">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="p8-product-row">
              <div className="p8-row-main">
                <strong>{p.name}</strong>
                <span>{p.category}</span>
              </div>
              <div className="p8-row-side">
                <p>R$ {p.price.toLocaleString()}</p>
                {!p.inStock && <small className="p8-out">Out of Stock</small>}
              </div>
            </div>
          ))
        ) : (
          <div className="p8-empty">No items match your criteria.</div>
        )}
      </div>
      
      <div className="p8-footer">
        <button className="p8-btn-edit" onClick={() => setViewResults(false)}>Edit Filters</button>
      </div>
    </div>
  );
}

export default ProductFilter;