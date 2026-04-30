import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function ProductCard({ item, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editPrice, setEditPrice] = useState(item.price)
  const [editStock, setEditStock] = useState(item.stock)

  const handleSave = () => {
    if (editStock < 0) {
      alert('Stock cannot be less than 0')
      return
    }
    onEdit(item.id, { price: parseFloat(editPrice), stock: parseInt(editStock) })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditPrice(item.price)
    setEditStock(item.stock)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-lg transition-all duration-200 flex flex-col items-center text-center border border-blue-300 p-4">
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Electronics</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug flex-1">{item.name}</h3>
        <div className="mt-3 flex flex-col gap-2 w-full">
          <div>
            <label className="text-xs text-gray-500">Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-blue-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Stock</label>
            <input
              type="number"
              value={editStock}
              onChange={(e) => setEditStock(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-blue-200 rounded-lg"
            />
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <button
            onClick={handleSave}
            className="text-xs font-bold text-green-600 hover:text-green-800 border border-green-200 px-2 py-1 rounded-lg transition"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="text-xs font-bold text-gray-500 hover:text-gray-700 border border-gray-200 px-2 py-1 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center border border-blue-100 hover:border-blue-300 p-4">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Electronics</p>
      <h3 className="text-sm font-semibold text-gray-900 leading-snug flex-1">{item.name}</h3>
      <span className="mt-3 text-base font-extrabold text-blue-600">${item.price}</span>
      <span className="mt-1 text-xs text-gray-500">Stock: {item.stock}</span>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs font-bold text-blue-500 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-3 py-1 rounded-xl transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-xs font-bold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1 rounded-xl transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

function Admin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [search, setSearch] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', price: '', stock: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') {
      navigate('/login')
      return
    }
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
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newItem.name || !newItem.price || !newItem.stock) {
      setError('All fields are required')
      return
    }

    const stockValue = parseInt(newItem.stock)
    if (stockValue < 0) {
      setError('Stock cannot be less than 0')
      return
    }

    try {
      const response = await api.post('/items', {
        name: newItem.name,
        price: parseFloat(newItem.price),
        stock: stockValue
      })

      if (response.data.success) {
        setSuccess('Item added successfully')
        setNewItem({ name: '', price: '', stock: '' })
        setShowAddForm(false)
        fetchItems()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item')
    }
  }

  const handleEditItem = async (id, updateData) => {
    setError('')
    setSuccess('')

    try {
      const response = await api.put(`/items/${id}`, updateData)

      if (response.data.success) {
        setSuccess('Item updated successfully')
        fetchItems()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item')
    }
  }

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    setError('')
    setSuccess('')

    try {
      const response = await api.delete(`/items/${id}`)

      if (response.data.success) {
        setSuccess('Item deleted successfully')
        fetchItems()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item')
    }
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
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-bold text-white hover:bg-blue-700 border border-white px-4 py-2 rounded-xl transition"
          >
            {showAddForm ? 'Cancel' : '+ Add Item'}
          </button>

          <button
            onClick={handleLogout}
            className="text-xs font-bold text-blue-100 hover:text-white border border-blue-400 hover:border-white px-4 py-2 rounded-xl transition"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="bg-white border-b border-blue-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <h2 className="text-base font-bold text-gray-900 mb-4">Add New Item</h2>
            
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl">
                {success}
              </div>
            )}

            <form onSubmit={handleAddItem} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-blue-50 border border-blue-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="Item name"
                  required
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-blue-50 border border-blue-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="w-24">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock</label>
                <input
                  type="number"
                  min="0"
                  value={newItem.stock}
                  onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-blue-50 border border-blue-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="0"
                  required
                />
              </div>
              <button
                type="submit"
                className="py-2.5 px-6 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sub-header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base font-bold text-gray-900">Admin - Manage Products</h1>
            <p className="text-xs text-blue-400 font-medium mt-0.5">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'} available
            </p>
          </div>
          <Link
            to="/items"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            View as Customer
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {error && !showAddForm && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {success && !showAddForm && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl">
            {success}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <ProductCard key={item.id} item={item} onEdit={handleEditItem} onDelete={handleDeleteItem} />
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

export default Admin
