import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Star, Heart, Filter, X, Check, Eye, Package, CreditCard, Home, ChevronDown } from 'lucide-react';

const SneakerStore = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  
  // Симуляція даних товарів (замість запиту до сервера)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nike Air Max 270",
      brand: "Nike",
      price: 4500,
      originalPrice: 5200,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      sizes: [38, 39, 40, 41, 42, 43, 44],
      description: "Революційна технологія Air Max 270 забезпечує неперевершений комфорт протягом всього дня.",
      features: ["Повітряна подушка Air Max", "М'яка підошва", "Дихаючий матеріал", "Стильний дизайн"],
      inStock: true,
      category: "lifestyle"
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      brand: "Adidas",
      price: 6200,
      originalPrice: 7000,
      image: "https://static.ftshp.digital/img/p/7/2/9/8/8/6/729886.jpg",
      rating: 4.9,
      reviews: 89,
      sizes: [38, 39, 40, 41, 42, 43],
      description: "Найкращі кросівки для бігу з технологією Boost для максимального повернення енергії.",
      features: ["Технологія Boost", "Primeknit верх", "Continental гума", "Адаптивна посадка"],
      inStock: true,
      category: "running"
    },
    {
      id: 3,
      name: "Jordan 1 Retro High",
      brand: "Jordan",
      price: 8900,
      originalPrice: 9500,
      image: "https://casual-shop.in.ua/image/cache/sale13/images/_prod/img01_-1--4--img04-1200x750.jpg",
      rating: 4.7,
      reviews: 256,
      sizes: [39, 40, 41, 42, 43, 44, 45],
      description: "Легендарні кросівки, що поєднують баскетбольну спадщину з вуличною модою.",
      features: ["Класичний дизайн", "Шкіряний верх", "Air-Sol підошва", "Ретро стиль"],
      inStock: true,
      category: "basketball"
    },
    {
      id: 4,
      name: "Puma RS-X",
      brand: "Puma",
      price: 3800,
      originalPrice: 4200,
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/391040/01/fnd/UKR/w/1000/h/1000/fmt/png",
      rating: 4.5,
      reviews: 67,
      sizes: [38, 39, 40, 41, 42, 43],
      description: "Футуристичний дизайн з елементами ретро для справжніх модників.",
      features: ["RS технологія", "Товста підошва", "Яскравий дизайн", "Легкий вага"],
      inStock: false,
      category: "lifestyle"
    },
    {
      id: 5,
      name: "New Balance 990v5",
      brand: "New Balance",
      price: 7200,
      originalPrice: 8000,
      image: "https://lishop.store/image/cache/products/4/4/6/new-balance-990-v5-grey-2-1000x1000.jpg",
      rating: 4.6,
      reviews: 143,
      sizes: [38, 39, 40, 41, 42, 43, 44],
      description: "Преміум кросівки Made in USA з неперевершеною якістю та комфортом.",
      features: ["Made in USA", "ENCAP технологія", "Pigskin/mesh верх", "Класичний стиль"],
      inStock: true,
      category: "lifestyle"
    },
    {
      id: 6,
      name: "Off-White Out Of Office Calf Leather",
      brand: "Off-White",
      price: 17000,
      originalPrice: 19500,
      image: "https://static.ftshp.digital/img/p/1/3/1/0/9/5/0/1310950.jpg",
      rating: 4.3,
      reviews: 89,
      sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
      description: "Світовий бренд який постійно вражає своїми новинками",
      features: ["Натуральна шкіра", "Гумова підошва", "Універсальний стиль"],
      inStock: true,
      category: "casual"
    }
  ]);

  // Симуляція періодичного оновлення (AJAX)
  useEffect(() => {
    const interval = setInterval(() => {
      // Симулюємо оновлення наявності товарів
      setProducts(prev => prev.map(p => ({
        ...p,
        inStock: Math.random() > 0.1 // 90% шанс що товар в наявності
      })));
    }, 30000); // Оновлення кожні 30 секунд

    return () => clearInterval(interval);
  }, []);

  // Фільтрація товарів
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    
    return matchesSearch && matchesPrice && matchesBrand;
  });

  // Компонент форми входу
  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      if (!email.trim()) newErrors.email = "Email обов'язковий";
      if (!email.includes('@')) newErrors.email = "Неправильний формат email";
      if (!password.trim()) newErrors.password = "Пароль обов'язковий";
      if (password.length < 6) newErrors.password = "Пароль має бути мінімум 6 символів";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        setCurrentUser({ email, name: email.split('@')[0] });
        setShowLoginModal(false);
        setEmail('');
        setPassword('');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="your@email.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="••••••••"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Увійти
        </button>
      </form>
    );
  };

  // Компонент форми реєстрації
  const RegisterForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";
      if (!formData.email.trim()) newErrors.email = "Email обов'язковий";
      if (!formData.email.includes('@')) newErrors.email = "Неправильний формат email";
      if (!formData.password.trim()) newErrors.password = "Пароль обов'язковий";
      if (formData.password.length < 6) newErrors.password = "Пароль має бути мінімум 6 символів";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Паролі не збігаються";
      if (!formData.phone.trim()) newErrors.phone = "Телефон обов'язковий";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        setCurrentUser({ email: formData.email, name: formData.name });
        setShowRegisterModal(false);
        setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ім'я</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Ваше ім'я"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="your@email.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Телефон</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="+380 XX XXX XX XX"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Пароль</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="••••••••"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Підтвердження паролю</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Зареєструватися
        </button>
      </form>
    );
  };

  const addToCart = (product, size) => {
    if (!size) {
      alert("Будь ласка, оберіть розмір");
      return;
    }
    
    const cartItem = {
      ...product,
      size,
      quantity: 1,
      cartId: `${product.id}-${size}`
    };
    
    const existingItem = cart.find(item => item.cartId === cartItem.cartId);
    if (existingItem) {
      setCart(cart.map(item => 
        item.cartId === cartItem.cartId 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, cartItem]);
    }
    
    setSelectedProduct(null);
    setShowProductModal(false);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const createOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleDateString('uk-UA'),
      status: 'В обробці'
    };
    
    setOrders([...orders, newOrder]);
    setCart([]);
    setActiveTab('orders');
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <span className="text-primary">Sneaker</span>Shop
          </a>
          
          <div className="d-flex align-items-center gap-3">
            <div className="input-group" style={{width: '300px'}}>
              <input
                type="text"
                className="form-control"
                placeholder="Пошук кросівок..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-light">
                <Search size={16} />
              </button>
            </div>
            
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-light position-relative"
                onClick={() => setActiveTab('cart')}
              >
                <ShoppingCart size={18} />
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              
              <button 
                className="btn btn-outline-light position-relative"
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
                  </span>
                )}
              </button>
              
              {currentUser ? (
                <div className="dropdown">
                  <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                    <User size={18} className="me-1" />
                    {currentUser.name}
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => setActiveTab('orders')}>Мої замовлення</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setCurrentUser(null)}>Вийти</a></li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-light" onClick={() => setShowLoginModal(true)}>
                    Увійти
                  </button>
                  <button className="btn btn-primary" onClick={() => setShowRegisterModal(true)}>
                    Реєстрація
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <div className="border-bottom bg-white">
        <div className="container">
          <nav className="nav nav-pills nav-justified py-3">
            <button 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={16} className="me-1" />
              Головна
            </button>
            <button 
              className={`nav-link ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              <ShoppingCart size={16} className="me-1" />
              Кошик ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
            <button 
              className={`nav-link ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart size={16} className="me-1" />
              Список бажань ({wishlist.length})
            </button>
            {currentUser && (
              <button 
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={16} className="me-1" />
                Замовлення ({orders.length})
              </button>
            )}
          </nav>
        </div>
      </div>

      <div className="container py-4">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="row">
            {/* Filters Sidebar */}
            <div className="col-lg-3 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <Filter size={18} className="me-2" />
                    Фільтри
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">Ціна (грн)</label>
                    <div className="d-flex gap-2 mb-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Від"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="До"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Бренд</label>
                    <select 
                      className="form-select"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value="">Всі бренди</option>
                      <option value="Nike">Nike</option>
                      <option value="Adidas">Adidas</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Puma">Puma</option>
                      <option value="New Balance">New Balance</option>
                      <option value="Off-White">Off-White</option>
                    </select>
                  </div>
                  
                  <button 
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setPriceRange([0, 10000]);
                      setSelectedBrand('');
                      setSearchTerm('');
                    }}
                  >
                    Скинути фільтри
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Каталог кросівок</h2>
                <span className="text-muted">Знайдено: {filteredProducts.length} товарів</span>
              </div>
              
              <div className="row">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="position-relative">
                        <img 
                          src={product.image} 
                          className="card-img-top" 
                          alt={product.name}
                          style={{height: '250px', objectFit: 'cover'}}
                        />
                        {!product.inStock && (
                          <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded">
                            Немає в наявності
                          </div>
                        )}
                        <button 
                          className={`position-absolute top-0 start-0 btn btn-sm m-2 ${
                            wishlist.find(item => item.id === product.id) ? 'btn-danger' : 'btn-outline-light'
                          }`}
                          onClick={() => toggleWishlist(product)}
                        >
                          <Heart size={16} />
                        </button>
                      </div>
                      
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{product.name}</h6>
                        <p className="text-muted small mb-2">{product.brand}</p>
                        
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex align-items-center me-3">
                            <Star size={14} className="text-warning me-1" />
                            <span className="small">{product.rating}</span>
                          </div>
                          <span className="small text-muted">({product.reviews} відгуків)</span>
                        </div>
                        
                        <div className="d-flex align-items-center mb-3">
                          <span className="h5 text-primary mb-0 me-2">{product.price} грн</span>
                          <span className="text-muted text-decoration-line-through small">
                            {product.originalPrice} грн
                          </span>
                        </div>
                        
                        <div className="mt-auto">
                          <button 
                            className="btn btn-outline-primary btn-sm w-100 mb-2"
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowProductModal(true);
                            }}
                          >
                            <Eye size={16} className="me-1" />
                            Детальніше
                          </button>
                          
                          <button 
                            className="btn btn-primary btn-sm w-100"
                            disabled={!product.inStock}
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowProductModal(true);
                            }}
                          >
                            <ShoppingCart size={16} className="me-1" />
                            {product.inStock ? 'До кошика' : 'Немає в наявності'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div>
            <h2 className="mb-4">Кошик</h2>
            {cart.length === 0 ? (
              <div className="text-center py-5">
                <ShoppingCart size={64} className="text-muted mb-3" />
                <h4>Ваш кошик порожній</h4>
                <p className="text-muted">Додайте товари до кошика, щоб продовжити покупки</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('home')}>
                  Перейти до каталогу
                </button>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-8">
                  {cart.map(item => (
                    <div key={item.cartId} className="card mb-3">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-3">
                          <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="text-muted">Розмір: {item.size}</p>
                            <p className="text-primary fw-bold">{item.price} грн</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card-body text-end">
                            <div className="input-group mb-2" style={{width: '120px', marginLeft: 'auto'}}>
                              <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => {
                                  const newCart = cart.map(cartItem => 
                                    cartItem.cartId === item.cartId && cartItem.quantity > 1
                                      ? {...cartItem, quantity: cartItem.quantity - 1}
                                      : cartItem
                                  );
                                  setCart(newCart);
                                }}
                              >
                                -
                              </button>
                              <input 
                                type="text" 
                                className="form-control text-center" 
                                value={item.quantity}
                                readOnly 
                              />
                              <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => {
                                  const newCart = cart.map(cartItem => 
                                    cartItem.cartId === item.cartId
                                      ? {...cartItem, quantity: cartItem.quantity + 1}
                                      : cartItem
                                  );
                                  setCart(newCart);
                                }}
                              >
                                +
                              </button>
                            </div>
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeFromCart(item.cartId)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Підсумок замовлення</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Товарів:</span>
                        <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Сума:</span>
                        <span>{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} грн</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span>Доставка:</span>
                        <span className="text-success">Безкоштовно</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-3">
                        <strong>До сплати:</strong>
                        <strong className="text-primary">
                          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} грн
                        </strong>
                      </div>
                      {currentUser ? (
                        <button className="btn btn-success w-100" onClick={createOrder}>
                          <CreditCard size={16} className="me-1" />
                          Оформити замовлення
                        </button>
                      ) : (
                        <div>
                          <p className="small text-muted mb-2">Увійдіть, щоб оформити замовлення</p>
                          <button className="btn btn-primary w-100" onClick={() => setShowLoginModal(true)}>
                            Увійти
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="mb-4">Список бажань</h2>
            {wishlist.length === 0 ? (
              <div className="text-center py-5">
                <Heart size={64} className="text-muted mb-3" />
                <h4>Ваш список бажань порожній</h4>
                <p className="text-muted">Додайте товари до списку бажань, натиснувши на серце</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('home')}>
                  Перейти до каталогу
                </button>
              </div>
            ) : (
              <div className="row">
                {wishlist.map(product => (
                  <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="position-relative">
                        <img 
                          src={product.image} 
                          className="card-img-top" 
                          alt={product.name}
                          style={{height: '250px', objectFit: 'cover'}}
                        />
                        <button 
                          className="position-absolute top-0 start-0 btn btn-danger btn-sm m-2"
                          onClick={() => toggleWishlist(product)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{product.name}</h6>
                        <p className="text-muted small mb-2">{product.brand}</p>
                        
                        <div className="d-flex align-items-center mb-3">
                          <span className="h5 text-primary mb-0 me-2">{product.price} грн</span>
                          <span className="text-muted text-decoration-line-through small">
                            {product.originalPrice} грн
                          </span>
                        </div>
                        
                        <div className="mt-auto">
                          <button 
                            className="btn btn-primary w-100"
                            disabled={!product.inStock}
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowProductModal(true);
                            }}
                          >
                            <ShoppingCart size={16} className="me-1" />
                            {product.inStock ? 'До кошика' : 'Немає в наявності'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && currentUser && (
          <div>
            <h2 className="mb-4">Мої замовлення</h2>
            {orders.length === 0 ? (
              <div className="text-center py-5">
                <Package size={64} className="text-muted mb-3" />
                <h4>У вас поки немає замовлень</h4>
                <p className="text-muted">Після оформлення замовлення воно з'явиться тут</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('home')}>
                  Почати покупки
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="card mb-3">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Замовлення #{order.id}</h6>
                          <small className="text-muted">Дата: {order.date}</small>
                        </div>
                        <span className="badge bg-warning">{order.status}</span>
                      </div>
                    </div>
                    <div className="card-body">
                      {order.items.map(item => (
                        <div key={item.cartId} className="d-flex align-items-center mb-2">
                          <img src={item.image} alt={item.name} className="me-3" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                          <div className="flex-grow-1">
                            <div className="fw-medium">{item.name}</div>
                            <small className="text-muted">Розмір: {item.size}, Кількість: {item.quantity}</small>
                          </div>
                          <div className="text-primary fw-bold">{item.price * item.quantity} грн</div>
                        </div>
                      ))}
                      <hr />
                      <div className="text-end">
                        <strong>Загальна сума: {order.total} грн</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && selectedProduct && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button 
                  className="btn-close"
                  onClick={() => {
                    setShowProductModal(false);
                    setSelectedProduct(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img 
                      src={selectedProduct.image} 
                      className="img-fluid rounded"
                      alt={selectedProduct.name}
                    />
                  </div>
                  <div className="col-md-6">
                    <h4 className="text-primary">{selectedProduct.price} грн</h4>
                    <p className="text-muted text-decoration-line-through">
                      {selectedProduct.originalPrice} грн
                    </p>
                    
                    <div className="d-flex align-items-center mb-3">
                      <div className="d-flex align-items-center me-3">
                        <Star size={16} className="text-warning me-1" />
                        <span>{selectedProduct.rating}</span>
                      </div>
                      <span className="text-muted">({selectedProduct.reviews} відгуків)</span>
                    </div>
                    
                    <p>{selectedProduct.description}</p>
                    
                    <h6>Особливості:</h6>
                    <ul className="list-unstyled">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="mb-1">
                          <Check size={16} className="text-success me-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {selectedProduct.inStock && (
                      <div className="mb-3">
                        <label className="form-label">Розмір:</label>
                        <select 
                          className="form-select"
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                        >
                          <option value="">Оберіть розмір</option>
                          {selectedProduct.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => toggleWishlist(selectedProduct)}
                >
                  <Heart size={16} className="me-1" />
                  {wishlist.find(item => item.id === selectedProduct.id) ? 'Видалити з бажань' : 'До списку бажань'}
                </button>
                {selectedProduct.inStock && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => addToCart(selectedProduct, selectedSize)}
                  >
                    <ShoppingCart size={16} className="me-1" />
                    Додати до кошика
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Вхід до акаунту</h5>
                <button 
                  className="btn-close"
                  onClick={() => setShowLoginModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <LoginForm />
              </div>
              <div className="modal-footer">
                <p className="text-muted small">
                  Немає акаунту?{' '}
                  <button 
                    className="btn btn-link p-0"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowRegisterModal(true);
                    }}
                  >
                    Зареєструватися
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Реєстрація</h5>
                <button 
                  className="btn-close"
                  onClick={() => setShowRegisterModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <RegisterForm />
              </div>
              <div className="modal-footer">
                <p className="text-muted small">
                  Вже маєте акаунт?{' '}
                  <button 
                    className="btn btn-link p-0"
                    onClick={() => {
                      setShowRegisterModal(false);
                      setShowLoginModal(true);
                    }}
                  >
                    Увійти
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SneakerStore;