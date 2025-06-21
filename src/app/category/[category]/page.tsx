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
      <div className="max-w-[1240px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold">{categoryName}</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
            selectedSizes={selectedSizes}
            handleSizeClick={handleSizeClick}
            selectedStyles={selectedStyles}
            handleStyleClick={handleStyleClick}
            selectedPrice={selectedPrice}
            handlePriceChange={handlePriceChange}
            showStyleFilter={true}
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-3xl font-bold text-black">{categoryName}</h1>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black w-48 text-sm"
                />
                <span className="text-sm text-neutral-500">Showing {paginated.length} of {filtered.length} Products</span>
                <div className="relative">
                  <select
                    className="appearance-none rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition cursor-pointer pr-8"
                    value={sort}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
                  >
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 disabled:opacity-50 hover:bg-neutral-100"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-lg border border-neutral-300 font-bold flex items-center justify-center transition ${page === num ? 'bg-black text-white' : 'bg-white text-neutral-700 hover:bg-black hover:text-white'}`}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 disabled:opacity-50 hover:bg-neutral-100"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
              </div>
            )}
            <div className="mt-24">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className={`fixed top-8 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${showPrompt ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-black text-white px-6 py-3 rounded-full shadow-lg font-bold text-base">
          Added to cart!
        </div>
      </div>
    </div>
  );
} 