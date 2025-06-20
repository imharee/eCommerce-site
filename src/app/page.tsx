import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">E-commerce Store</h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-6">Discover the best products at unbeatable prices</p>
        <button className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition">Shop Now</button>
      </section>
      {/* Product Grid Placeholder */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* ProductCard components will go here */}
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </main>
      {/* Footer Placeholder */}
      <footer className="w-full py-6 text-center text-gray-500 border-t">© 2024 E-commerce Store. All rights reserved.</footer>
    </div>
  );
}
