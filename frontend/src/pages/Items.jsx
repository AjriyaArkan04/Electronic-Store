import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function ProductCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center border border-blue-100 hover:border-blue-300 p-4">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Electronics</p>
      <h3 className="text-sm font-semibold text-gray-900 leading-snug flex-1">{item.name}</h3>
      <span className="mt-3 text-base font-extrabold text-blue-600">${item.price}</span>
    </div>
  )
}

function Items() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await api.get('/items')
      if (response.data.success) {
        setItems(response.data.payload || [])
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-blue-400 font-medium">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-600 sticky top-0 z-10 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-blue-500 border border-blue-400 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:bg-blue-700 focus:border-white focus:ring-2 focus:ring-white/30 transition"
            />
          </div>

          <button
            onClick={handleLogout}
            className="ml-auto text-xs font-bold text-blue-100 hover:text-white border border-blue-400 hover:border-white px-4 py-2 rounded-xl transition"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Sub-header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-base font-bold text-gray-900">All Products</h1>
          <p className="text-xs text-blue-400 font-medium mt-0.5">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'} available
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold">No products found</p>
            <p className="text-blue-400 text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </main>

      <footer className="border-t border-blue-200 bg-white px-6 py-4 text-center">
        <p className="text-xs text-blue-300">© 2025 All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Items