const products = [
    { id: 1, name: "iPhone 15 Pro", category: "smartphones", price: 999.99, imageUrl: "iphone.jpg", stock: 10, rating: 4.8, description: "The latest iPhone with A17 Bionic chip, Pro camera system, and Dynamic Island." },
    { id: 2, name: "MacBook Air M3", category: "laptops", price: 1199.00, imageUrl: "macbook.jpg", stock: 5, rating: 4.9, description: "Supercharged by the M3 chip, this MacBook Air is incredibly thin and light, with a stunning Liquid Retina display." },
    { id: 3, name: "Sony WH-1000XM5", category: "headphones", price: 349.00, imageUrl: "sony.jpg", stock: 15, rating: 4.7, description: "Industry-leading noise canceling headphones with exceptional sound quality and comfortable design." },
    { id: 4, name: "Samsung Galaxy S24 Ultra", category: "smartphones", price: 1299.99, imageUrl: "Samsung-Galaxy-S24-Ultra-Titanium-Black (1.jpg", stock: 8, rating: 4.7, description: "The ultimate Galaxy phone with revolutionary AI features, a stunning display, and long-lasting battery." },
    { id: 5, name: "Dell XPS 15", category: "laptops", price: 1899.00, imageUrl: "Dell XPS 15.jpg", stock: 7, rating: 4.6, description: "Powerful and sleek laptop perfect for creative professionals, featuring a vibrant display and robust performance." },
    { id: 6, name: "Bose QuietComfort Earbuds II", category: "headphones", price: 299.00, imageUrl: "Bose QuietComfort Earbuds II.jpg", stock: 20, rating: 4.5, description: "World-class noise cancellation and a comfortable, secure fit from Bose." },
    { id: 7, name: "PlayStation 5", category: "gaming", price: 499.00, imageUrl: "PlayStation 5.jpg", stock: 3, rating: 4.9, description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation® games." },
    { id: 8, name: "Xbox Series X", category: "gaming", price: 499.00, imageUrl: "Xbox Series X.jpg", stock: 4, rating: 4.8, description: "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of gaming." },
    { id: 9, name: "Google Pixel 8 Pro", category: "smartphones", price: 899.00, imageUrl: "Google Pixel 8 Pro.jpg", stock: 12, rating: 4.6, description: "The ultimate Google phone, with the most advanced Pixel Camera and Google AI." },
    { id: 10, name: "Logitech MX Master 3S", category: "accessories", price: 99.99, imageUrl: "Logitech MX Master 3S.jpg", stock: 25, rating: 4.8, description: "An iconic mouse, remastered. For ultra-fast, precise scrolling and comfortable work." },
];

const users = [
    { email: "admin@techstore.com", password: "admin123", name: "Admin", role: "admin" },
    { email: "user@example.com", password: "user123", name: "Guest User", role: "customer" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
let currentViewMode = 'grid';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const featuredProductsDiv = document.getElementById('featuredProducts');
const cartCountSpan = document.getElementById('cartCount');
const cartItemsDiv = document.getElementById('cartItems');
const cartTotalSpan = document.getElementById('cartTotal');
const notificationDiv = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const productDetailModal = document.getElementById('productDetailModal');
const productDetailContent = document.getElementById('productDetailContent');
const cartModal = document.getElementById('cartModal');
const userActionsDiv = document.getElementById('userActions');
const userMenuDiv = document.getElementById('userMenu');
const userNameSpan = document.getElementById('userName');
const mobileMenu = document.getElementById('mobileMenu');
const productsLoading = document.getElementById('productsLoading');
const productCountSpan = document.getElementById('productCount');
const priceRangeInput = document.getElementById('priceRange');
const priceValueSpan = document.getElementById('priceValue');
const sortBySelect = document.getElementById('sortBy');
const adminSection = document.getElementById('adminSection');
const adminOverviewTab = document.getElementById('adminOverview');
const adminSidebar = document.getElementById('adminSidebar');
const adminTitle = document.getElementById('adminTitle');
const adminProductModal = document.getElementById('adminProductModal');
const adminProductModalTitle = document.getElementById('adminProductModalTitle');
const adminProductForm = document.getElementById('adminProductForm');
const adminProductIdInput = document.getElementById('adminProductId');
const adminProductNameInput = document.getElementById('adminProductName');
const adminProductPriceInput = document.getElementById('adminProductPrice');
const adminProductCategoryInput = document.getElementById('adminProductCategory');
const adminProductImageInput = document.getElementById('adminProductImage');
const adminProductStockInput = document.getElementById('adminProductStock');
const adminProductDescriptionInput = document.getElementById('adminProductDescription');

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderAllProducts();
    renderFeaturedProducts();
    updateCartCount();
    checkUserSession();
    if (priceRangeInput && priceValueSpan) {
        priceValueSpan.textContent = `$${priceRangeInput.value}`;
    }
    showSection('home');

    const adminOverviewTableBody = adminOverviewTab ? adminOverviewTab.querySelector('tbody') : null;
    if (adminOverviewTableBody) {
        adminOverviewTableBody.innerHTML = `
            <tr class="border-b">
                <td class="text-left py-2 px-4">#1001</td>
                <td class="text-left py-2 px-4">Alice Smith</td>
                <td class="text-left py-2 px-4">Wireless Headphones</td>
                <td class="text-left py-2 px-4">$79.99</td>
                <td class="text-left py-2 px-4"><span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Pending</span></td>
            </tr>
            <tr class="border-b">
                <td class="text-left py-2 px-4">#1002</td>
                <td class="text-left py-2 px-4">Bob Johnson</td>
                <td class="text-left py-2 px-4">MacBook Air M3</td>
                <td class="text-left py-2 px-4">$1199.00</td>
                <td class="text-left py-2 px-4"><span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Shipped</span></td>
            </tr>
            <tr class="border-b">
                <td class="text-left py-2 px-4">#1003</td>
                <td class="text-left py-2 px-4">Charlie Brown</td>
                <td class="text-left py-2 px-4">Gaming Mouse RGB</td>
                <td class="text-left py-2 px-4">$35.00</td>
                <td class="text-left py-2 px-4"><span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Delivered</span></td>
            </tr>
            <tr class="border-b">
                <td class="text-left py-2 px-4">#1004</td>
                <td class="text-left py-2 px-4">Diana Prince</td>
                <td class="text-left py-2 px-4">Sony WH-1000XM5</td>
                <td class="text-left py-2 px-4">$349.00</td>
                <td class="text-left py-2 px-4"><span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Pending</span></td>
            </tr>
        `;
        const overviewThs = adminOverviewTab.querySelectorAll('thead th');
        overviewThs.forEach(th => th.classList.add('px-4'));
    }
});

// --- Utility Functions ---

function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notificationDiv.className = `notification ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg show`;
    setTimeout(() => {
        notificationDiv.classList.remove('show');
    }, 3000);
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// --- User Authentication ---

function checkUserSession() {
    if (currentUser) {
        userActionsDiv.classList.add('hidden');
        userMenuDiv.classList.remove('hidden');
        userNameSpan.textContent = `Hi, ${currentUser.name}`;
    } else {
        userActionsDiv.classList.remove('hidden');
        userMenuDiv.classList.add('hidden');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification(`Logged in as ${user.name}!`);
        checkUserSession();
        closeModal('loginModal');
        showSection('home');
    } else {
        showNotification("Invalid credentials.", "error");
    }
}

function handleSignup(event) {
    event.preventDefault();
    const signupName = document.getElementById('signupName').value;
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;

    if (!signupName || !signupEmail || !signupPassword) {
        showNotification("All fields are required.", "error");
        return;
    }

    const existingUser = users.find(u => u.email === signupEmail);
    if (existingUser) {
        showNotification("This email is already registered. Please log in.", "error");
        return;
    }

    const newUser = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: "customer"
    };
    users.push(newUser);

    showNotification("Signup successful! You can now log in with your new account.");
    closeModal('signupModal');
    openModal('loginModal');
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    showNotification("Logged out successfully.");
    checkUserSession();
    showSection('home');
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
}

function showAdminDashboard() {
    if (currentUser && currentUser.role === 'admin') {
        showSection('adminSection');
        showAdminTab('overview');
    } else {
        showNotification("Access denied. Admin privileges required.", "error");
    }
}

function toggleAdminSidebar() {
    adminSidebar.classList.toggle('closed');
}

function showAdminTab(tabName) {
    document.querySelectorAll('.admin-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('border-r-2', 'border-purple-600'));

    let tabToShow;
    let title;

    switch (tabName) {
        case 'overview':
            tabToShow = adminOverviewTab;
            title = "Overview";
            break;
        case 'products':
            tabToShow = document.getElementById('adminProductsTab') || createAdminProductsTab();
            title = "Product Management";
            break;
        case 'orders':
            tabToShow = document.getElementById('adminOrdersTab') || createAdminOrdersTab();
            title = "Order Management";
            break;
        case 'customers':
            tabToShow = document.getElementById('adminCustomersTab') || createAdminCustomersTab();
            title = "Customer Management";
            break;
        case 'analytics':
            tabToShow = document.getElementById('adminAnalyticsTab') || createAdminAnalyticsTab();
            title = "Sales Analytics";
            break;
        default:
            tabToShow = adminOverviewTab;
            title = "Overview";
    }
    tabToShow.classList.remove('hidden');
    document.querySelector(`.admin-tab[onclick="showAdminTab('${tabName}')"]`).classList.add('border-r-2', 'border-purple-600');
    adminTitle.textContent = title;
}

function createAdminProductsTab() {
    let tab = document.getElementById('adminProductsTab');
    if (!tab) {
        tab = document.createElement('div');
        tab.id = 'adminProductsTab';
        tab.className = 'admin-content p-6 hidden';
        tab.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Products List</h3>
                <button onclick="openAdminProductModal('add')" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Add New Product</button>
            </div>
            <div class="bg-white rounded-lg shadow overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-700">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">ID</th>
                            <th scope="col" class="px-6 py-3">Name</th>
                            <th scope="col" class="px-6 py-3">Price</th>
                            <th scope="col" class="px-6 py-3">Category</th>
                            <th scope="col" class="px-6 py-3">Stock</th>
                            <th scope="col" class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="adminProductsTableBody">
                    </tbody>
                </table>
            </div>
        `;
        adminSection.querySelector('main').appendChild(tab);
    }
    renderAdminProducts();
    return tab;
}

function renderAdminProducts() {
    const adminProductsTableBody = document.getElementById('adminProductsTableBody');
    if (!adminProductsTableBody) return;
    adminProductsTableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'bg-white border-b hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${product.id}</td>
            <td class="px-6 py-4">${product.name}</td>
            <td class="px-6 py-4">$${product.price.toFixed(2)}</td>
            <td class="px-6 py-4">${product.category}</td>
            <td class="px-6 py-4">${product.stock}</td>
            <td class="px-6 py-4">
                <button onclick="openAdminProductModal('edit', ${product.id})" class="font-medium text-blue-600 hover:underline mr-3">Edit</button>
                <button onclick="deleteProduct(${product.id})" class="font-medium text-red-600 hover:underline">Delete</button>
            </td>
        `;
        adminProductsTableBody.appendChild(row);
    });
}

function openAdminProductModal(mode, productId = null) {
    adminProductForm.reset();
    adminProductIdInput.value = '';

    if (mode === 'add') {
        adminProductModalTitle.textContent = 'Add New Product';
    } else if (mode === 'edit' && productId !== null) {
        adminProductModalTitle.textContent = 'Edit Product';
        const product = products.find(p => p.id === productId);
        if (product) {
            adminProductIdInput.value = product.id;
            adminProductNameInput.value = product.name;
            adminProductPriceInput.value = product.price;
            adminProductCategoryInput.value = product.category;
            adminProductImageInput.value = product.imageUrl;
            adminProductStockInput.value = product.stock;
            adminProductDescriptionInput.value = product.description;
        }
    }
    openModal('adminProductModal');
}

function handleAdminProductForm(event) {
    event.preventDefault();
    const id = adminProductIdInput.value ? parseInt(adminProductIdInput.value) : null;
    const name = adminProductNameInput.value;
    const price = parseFloat(adminProductPriceInput.value);
    const category = adminProductCategoryInput.value;
    const imageUrl = adminProductImageInput.value;
    const stock = parseInt(adminProductStockInput.value);
    const description = adminProductDescriptionInput.value;

    if (id) {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], name, price, category, imageUrl, stock, description };
            showNotification("Product updated successfully!");
        }
    } else {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, name, price, category, imageUrl, stock, description, rating: 0 });
        showNotification("Product added successfully!");
    }
    renderAllProducts();
    renderFeaturedProducts();
    renderAdminProducts();
    closeModal('adminProductModal');
}

function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        const initialLength = products.length;
        products = products.filter(p => p.id !== productId);
        if (products.length < initialLength) {
            showNotification("Product deleted successfully.");
            renderAllProducts();
            renderFeaturedProducts();
            renderAdminProducts();
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartModal();
        } else {
            showNotification("Product not found.", "error");
        }
    }
}

function createAdminOrdersTab() {
    let tab = document.getElementById('adminOrdersTab');
    if (!tab) {
        tab = document.createElement('div');
        tab.id = 'adminOrdersTab';
        tab.className = 'admin-content p-6 hidden';
        tab.innerHTML = `
            <h3 class="text-2xl font-bold mb-6">Order Management</h3>
            <div class="bg-white rounded-lg shadow p-6">
                <p class="text-gray-600">This section will display a list of all orders, their statuses, and allow for order processing.</p>
                <ul class="mt-4 space-y-2 text-gray-700">
                    <li><strong>Order #1001:</strong> John Doe - Pending</li>
                    <li><strong>Order #1002:</strong> Jane Smith - Shipped</li>
                    <li><strong>Order #1003:</strong> Robert Brown - Delivered</li>
                </ul>
            </div>
        `;
        adminSection.querySelector('main').appendChild(tab);
    }
    return tab;
}

function createAdminCustomersTab() {
    let tab = document.getElementById('adminCustomersTab');
    if (!tab) {
        tab = document.createElement('div');
        tab.id = 'adminCustomersTab';
        tab.className = 'admin-content p-6 hidden';
        tab.innerHTML = `
            <h3 class="text-2xl font-bold mb-6">Customer Management</h3>
            <div class="bg-white rounded-lg shadow p-6">
                <p class="text-gray-600">This section will show customer details, purchase history, and contact information.</p>
                <ul class="mt-4 space-y-2 text-gray-700">
                    <li><strong>John Doe:</strong> john.doe@example.com (5 orders)</li>
                    <li><strong>Jane Smith:</strong> jane.smith@example.com (8 orders)</li>
                    <li><strong>Robert Brown:</strong> robert.b@example.com (2 orders)</li>
                </ul>
            </div>
        `;
        adminSection.querySelector('main').appendChild(tab);
    }
    return tab;
}

function createAdminAnalyticsTab() {
    let tab = document.getElementById('adminAnalyticsTab');
    if (!tab) {
        tab = document.createElement('div');
        tab.id = 'adminAnalyticsTab';
        tab.className = 'admin-content p-6 hidden';
        tab.innerHTML = `
            <h3 class="text-2xl font-bold mb-6">Sales Analytics</h3>
            <div class="bg-white rounded-lg shadow p-6">
                <p class="text-gray-600">This section will display charts and graphs for sales trends, popular products, and customer behavior.</p>
                <div class="mt-4 text-gray-700">
                    <p><strong>Total Revenue (Last 30 Days):</strong> $15,000</p>
                    <p><strong>Most Popular Product:</strong> iPhone 15 Pro</p>
                    <p><strong>Conversion Rate:</strong> 2.5%</p>
                </div>
                <p class="mt-4 text-sm text-gray-500">Charts (e.g., using Chart.js) would go here in a real application.</p>
            </div>
        `;
        adminSection.querySelector('main').appendChild(tab);
    }
    return tab;
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(`${sectionId}Section`).classList.remove('hidden');

    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

function setViewMode(mode) {
    currentViewMode = mode;
    if (mode === 'grid') {
        productsGrid.classList.remove('grid-cols-1');
        productsGrid.classList.add('md:grid-cols-2', 'lg:grid-cols-3');
        gridViewBtn.classList.add('bg-purple-600', 'text-white');
        listViewBtn.classList.remove('bg-purple-600', 'text-white');
        listViewBtn.classList.add('bg-gray-200', 'text-gray-600');
    } else {
        productsGrid.classList.remove('md:grid-cols-2', 'lg:grid-cols-3');
        productsGrid.classList.add('grid-cols-1');
        listViewBtn.classList.add('bg-purple-600', 'text-white');
        gridViewBtn.classList.remove('bg-purple-600', 'text-white');
        gridViewBtn.classList.add('bg-gray-200', 'text-gray-600');
    }
    applyFilters();
}

function renderProductCard(product) {
    const isGridView = currentViewMode === 'grid';
    const cardHtml = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover cursor-pointer ${isGridView ? '' : 'flex flex-row items-center space-x-4 p-4'}">
            <img src="${product.imageUrl}" alt="${product.name}" class="${isGridView ? 'w-full h-48' : 'w-32 h-32'} object-cover ${isGridView ? 'rounded-t-lg' : 'rounded-lg flex-shrink-0'}" onclick="showProductDetail(${product.id})">
            <div class="${isGridView ? 'p-6' : 'flex-grow p-2'}">
                <h3 class="text-xl font-bold mb-2 truncate">${product.name}</h3>
                <p class="text-gray-600 mb-4 ${isGridView ? '' : 'hidden md:block'}">${product.description.substring(0, 70)}...</p>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-2xl font-bold text-purple-600">$${product.price.toFixed(2)}</span>
                    <span class="text-yellow-500 text-sm">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        (${product.rating.toFixed(1)})
                    </span>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `;
    return cardHtml;
}

function renderAllProducts(filteredProducts = products) {
    productsLoading.classList.remove('hidden');
    productsGrid.innerHTML = '';
    productCountSpan.textContent = `${filteredProducts.length} products`;

    setTimeout(() => {
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">No products found matching your criteria.</p>';
        } else {
            filteredProducts.forEach(product => {
                productsGrid.innerHTML += renderProductCard(product);
            });
        }
        productsLoading.classList.add('hidden');
    }, 500);
}

function renderFeaturedProducts() {
    const featured = products.filter(p => p.rating >= 4.5).slice(0, 4);
    if (!featuredProductsDiv) return;
    featuredProductsDiv.innerHTML = '';
    featured.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-lg overflow-hidden card-hover';
        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 object-cover cursor-pointer" onclick="showProductDetail(${product.id})">
            <div class="p-4">
                <h3 class="text-lg font-bold truncate">${product.name}</h3>
                <p class="text-gray-700">$${product.price.toFixed(2)}</p>
                <div class="flex items-center text-yellow-500 text-sm">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    <span class="ml-1 text-gray-600">(${product.rating.toFixed(1)})</span>
                </div>
                <button onclick="addToCart(${product.id})" class="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${product.stock === 0 ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        `;
        featuredProductsDiv.appendChild(card);
    });
}

function applyFilters() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    const maxPrice = parseFloat(priceRangeInput.value);
    const sortBy = sortBySelect.value;

    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
                                 product.description.toLowerCase().includes(searchQuery);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating-high':
                return b.rating - a.rating;
            case 'rating-low':
                return a.rating - b.rating;
            default:
                return 0;
        }
    });

    renderAllProducts(filtered);
}

function clearFilters() {
    searchInput.value = '';
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    priceRangeInput.value = priceRangeInput.max;
    priceValueSpan.textContent = `$${priceRangeInput.max}`;
    sortBySelect.value = 'name-asc';
    applyFilters();
}

function filterByCategory(category) {
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    const targetCheckbox = document.querySelector(`.category-filter[value="${category}"]`);
    if (targetCheckbox) {
        targetCheckbox.checked = true;
    }
    showSection('products');
    applyFilters();
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    productDetailContent.innerHTML = `
        <div class="md:w-1/2">
            <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-auto object-cover rounded-lg shadow-md">
        </div>
        <div class="md:w-1/2">
            <h3 class="text-3xl font-bold text-gray-800 mb-2">${product.name}</h3>
            <p class="text-purple-600 text-lg font-semibold mb-3">$${product.price.toFixed(2)}</p>
            <div class="flex items-center text-yellow-500 mb-4">
                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                <span class="ml-2 text-gray-600">(${product.rating.toFixed(1)} / 5)</span>
            </div>
            <p class="text-gray-700 mb-6">${product.description}</p>
            <div class="flex items-center justify-between mb-4">
                <span class="text-gray-700">Stock: ${product.stock > 0 ? `<span class="text-green-600">${product.stock} in stock</span>` : `<span class="text-red-600">Out of Stock</span>`}</span>
                <button onclick="addToCart(${product.id})" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `;
    openModal('productDetailModal');
}

// --- Cart Functions ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) {
        showNotification("Product is out of stock!", "error");
        return;
    }
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
            showNotification(`${product.name} quantity updated in cart.`);
        } else {
            showNotification(`Cannot add more. Maximum stock for ${product.name} reached.`, "error");
        }
    } else {
        cart.push({ ...product, quantity: 1 });
        showNotification(`${product.name} added to cart!`);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountSpan.textContent = totalItems;
}

function updateCartModal() {
    cartItemsDiv.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center mb-4';
            itemElement.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                    <div>
                        <h4 class="font-bold">${item.name}</h4>
                        <span class="text-purple-600">$${item.price.toFixed(2)}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="changeQuantity(${item.id}, -1)" class="bg-gray-200 text-gray-700 px-2 py-1 rounded">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="bg-gray-200 text-gray-700 px-2 py-1 rounded">+</button>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 ml-4"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartItemsDiv.appendChild(itemElement);
            total += item.price * item.quantity;
        });
    }
    cartTotalSpan.textContent = total.toFixed(2);
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.classList.toggle('opacity-50', cart.length === 0);
        checkoutBtn.classList.toggle('cursor-not-allowed', cart.length === 0);
    }
}

function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;
    const product = products.find(p => p.id === productId);

    if (change === 1) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else {
            showNotification(`Cannot add more. Maximum stock for ${product.name} reached.`, "error");
        }
    } else if (change === -1) {
        cartItem.quantity--;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification("Item removed from cart.");
    updateCartCount();
    updateCartModal();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    // Close the cart modal and open the payment modal
    closeModal('cartModal');
    openModal('paymentModal');
    console.log("Proceeding to payment...");
}

function handlePayment(event) {
    // Prevent the default form submission which reloads the page
    event.preventDefault();

    console.log("Processing payment...");

    // Get the dedicated payment success notification element
    const paymentSuccessNotification = document.getElementById('paymentSuccessNotification');
    const notificationSpan = paymentSuccessNotification ? paymentSuccessNotification.querySelector('span') : null;

    // Show the "Processing your order..." message immediately
    if (notificationSpan) {
        notificationSpan.textContent = "Processing your order...";
        paymentSuccessNotification.classList.remove('hidden', 'bg-green-500'); // Remove hidden and old color
        paymentSuccessNotification.classList.add('show', 'bg-blue-500'); // Add show and a 'processing' color
    } else if (typeof showNotification === 'function') {
        // Fallback to the general notification if specific div is not found/used
        showNotification("Processing your order...", 'info');
    }


    // Simulate a short payment processing delay (e.g., 500ms)
    setTimeout(() => {
        // Immediately after "processing," clear the cart and update displays
        cart.length = 0; // Clear the cart array
        localStorage.removeItem('cart'); // Clear cart from browser storage
        updateCartCount(); // Update the cart icon count
        updateCartModal(); // Refresh the cart modal display
        closeModal('paymentModal'); // Close the payment modal

        // Now, update the notification to show "Order successful!"
        if (notificationSpan) {
            notificationSpan.textContent = "Order successful! Thank you for purchasing.";
            // Ensure it's visible and correctly styled for success
            paymentSuccessNotification.classList.remove('bg-blue-500'); // Remove processing color
            paymentSuccessNotification.classList.add('bg-green-500'); // Add success color
            paymentSuccessNotification.classList.add('show'); // Ensure it's shown if it somehow got hidden
        } else if (typeof showNotification === 'function') {
            // Fallback to the general notification if specific div is not found/used
            showNotification("Order successful! Thank you for purchasing.");
        }

        console.log("Payment successful. Thank you for shopping! Redirecting now.");

        // Set a timer to redirect to the home page AND hide the notification.
        // This timer will now run 2 seconds after the "Order successful" message appears,
        // making the total time from "Pay Now" click to redirect approximately 2.5 seconds (0.5s processing + 2s waiting for redirect).
        setTimeout(() => {
            // Hide the specific payment success notification before redirecting
            if (paymentSuccessNotification) {
                paymentSuccessNotification.classList.remove('show');
                paymentSuccessNotification.classList.add('hidden');
            }

            // Redirect to the home page (assuming 'showSection' function exists)
            showSection('home');
            console.log("Redirected to home page.");
        }, 2000); // Changed from 1500ms to 2000ms (2 seconds)
    }, 500); // 500ms = 0.5 seconds (simulated processing time)
}


function togglePaymentFields() {
    const debitCardFields = document.getElementById('debitCardFields');
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (paymentMethod === 'debitcard') {
        debitCardFields.classList.remove('hidden');
    } else {
        debitCardFields.classList.add('hidden');
    }
}

// Call this function once when the page loads to set the initial state
document.addEventListener('DOMContentLoaded', () => {
    togglePaymentFields();
});


// Event Listeners
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('signupForm').addEventListener('submit', handleSignup);
document.getElementById('adminProductForm').addEventListener('submit', handleAdminProductForm);