"use client";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";
import CategoryProductCard from "../../../components/CategoryProductCard";
import { productList } from "../../../data/products";
import FilterSidebar from "../../../components/FilterSidebar";
import NewsletterSignup from "../../../components/NewsletterSignup";
import Footer from "../../../components/Footer";

export default function CategoryPage() {
  const params = useParams();
  const category = (Array.isArray(params.category) ? params.category[0] : params.category) || 'all';
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All';

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Popular");
  const [page, setPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState([0, 500]);
  const [showPrompt, setShowPrompt] = useState(false);
  const PRODUCTS_PER_PAGE = 9;

  const handleSizeClick = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setPage(1);
  };
  
  const handleStyleClick = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
    setPage(1);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setSelectedPrice(value as [number, number]);
    }
    setPage(1);
  };

  const filtered = productList.filter(p => {
    const categoryMatch = category === 'all' || p.style.toLowerCase() === category.toLowerCase();
    const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(p.style);
    
    return (
      categoryMatch &&
      styleMatch &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price >= selectedPrice[0] &&
      p.price <= selectedPrice[1] &&
      (selectedSizes.length === 0 || selectedSizes.includes(p.size))
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Newest") return new Date(b.id).getTime() - new Date(a.id).getTime();
    return b.rating - a.rating || a.price - b.price;
  });

  const totalPages = Math.ceil(sorted.length / PRODUCTS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (showPrompt) {
      const timer = setTimeout(() => setShowPrompt(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showPrompt]);

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-neutral-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold">{categoryName}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">{categoryName}</h1>
          <p className="text-gray-600">Discover our collection of {categoryName.toLowerCase()} products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar 
              selectedSizes={selectedSizes}
              handleSizeClick={handleSizeClick}
              selectedStyles={selectedStyles}
              handleStyleClick={handleStyleClick}
              selectedPrice={selectedPrice}
              handlePriceChange={handlePriceChange}
              showStyleFilter={true}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 placeholder:text-gray-600 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <select
                      className="appearance-none px-4 py-2 pr-10 rounded-lg border border-gray-300 text-sm font-semibold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
                      value={sort}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
                    >
                      <option>Most Popular</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  {paginated.length} of {filtered.length} products
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <CategoryProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={() => {
                      setShowPrompt(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2">
                  <button
                    className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                    <button
                      key={num}
                      className={`px-3 py-2 rounded-md font-medium transition-colors ${
                        page === num 
                          ? 'bg-black text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setPage(num)}
                    >
                      {num}
                    </button>
                  ))}
                  
                  <button
                    className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Newsletter Section - Full Width */}
      <NewsletterSignup />
      
      <Footer />
      
      {/* Add to Cart Notification */}
      <div className={`fixed top-8 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${showPrompt ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-black text-white px-6 py-3 rounded-full shadow-lg font-bold text-base flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to cart!
        </div>
      </div>
    </div>
  );
} 