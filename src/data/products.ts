export const productList = [
    { 
      id: "1", 
      name: "Gradient Graphic T-shirt", 
      rating: 4.5, 
      reviews: 451,
      price: 260, 
      oldPrice: 300, 
      discount: 40, 
      imageUrl: "/images/product1.png", 
      imageUrls: [
        '/images/product-detail-1.png',
        '/images/product-detail-2.png',
        '/images/product-detail-3.png',
        '/images/product-detail-4.png',
      ],
      color: "White",
      colors: [
        { name: 'Olive Green', value: '#4B5320' },
        { name: 'Black', value: '#222222' },
        { name: 'Navy', value: '#232946' },
        { name: 'White', value: '#F4F4F4' },
      ],
      size: "Large", 
      sizes: ['Small', 'Medium', 'Large', 'X-Large'],
      type: "T-shirts", 
      style: "Casual",
      description: 'A premium t-shirt for designers. Soft, stylish, and made for creative minds.',
      details: [
        '100% Cotton',
        'Machine wash cold',
        'Do not bleach',
        'Tumble dry low',
        'Imported',
      ],
      faqs: [
        { q: 'Is this t-shirt true to size?', a: 'Yes, it fits true to size.' },
        { q: 'Can I return the product?', a: 'Yes, within 30 days of purchase.' },
      ],
    },
    { id: "2", name: "Polo with Tipping Details", rating: 4.5, price: 180, oldPrice: null, discount: null, imageUrl: "/images/product2.png", color: "Red", size: "Medium", type: "Shirts", style: "Formal" },
    { id: "3", name: "Black Striped T-shirt", rating: 5, price: 120, oldPrice: 160, discount: 30, imageUrl: "/images/product3.png", color: "Black", size: "X-Large", type: "T-shirts", style: "Casual" },
    { id: "4", name: "Skinny Fit Jeans", rating: 3.5, price: 240, oldPrice: 260, discount: 20, imageUrl: "/images/product4.png", color: "Blue", size: "Large", type: "Jeans", style: "Casual" },
    { id: "5", name: "Checkered Shirt", rating: 4.5, price: 180, oldPrice: null, discount: null, imageUrl: "/images/product5.png", color: "Red", size: "Medium", type: "Shirts", style: "Formal" },
    { id: "6", name: "Sleeve Striped T-shirt", rating: 4.5, price: 130, oldPrice: 160, discount: 30, imageUrl: "/images/product6.png", color: "Black", size: "Large", type: "T-shirts", style: "Casual" },
    { id: "7", name: "Vertical Striped Shirt", rating: 5, price: 212, oldPrice: 232, discount: 20, imageUrl: "/images/product7.png", color: "Green", size: "Large", type: "Shirts", style: "Formal" },
    { id: "8", name: "Courage Graphic T-shirt", rating: 4, price: 145, oldPrice: null, discount: null, imageUrl: "/images/product8.png", color: "White", size: "Medium", type: "Polo", style: "Casual" },
    { id: "9", name: "Loose Fit Bermuda Shorts", rating: 4.2, price: 80, oldPrice: null, discount: null, imageUrl: "/images/product9.png", color: "Gray", size: "Large", type: "Hoodie", style: "Gym" },
  ];
  
  export const reviews = [
    {
      name: 'Sam D.',
      date: 'August 14, 2023',
      rating: 5,
      text: 'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt.',
    },
    {
      name: 'Alex M.',
      date: 'August 15, 2023',
      rating: 5,
      text: 'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.',
    },
    {
      name: 'Ethan R.',
      date: 'August 16, 2023',
      rating: 4,
      text: 'Great fit and feel. Would recommend to anyone who loves unique graphic tees.',
    },
  ];
  
  export const recommendations = [
    {
      id: '2',
      name: 'Polo with Tipping Details',
      price: 180,
      imageUrl: '/images/recommendation-1.png',
    },
    {
      id: '3',
      name: 'Black Striped T-shirt',
      price: 120,
      imageUrl: '/images/recommendation-2.png',
    },
    {
      id: '4',
      name: 'Skinny Fit Jeans',
      price: 240,
      imageUrl: '/images/recommendation-3.png',
    },
  ]; 