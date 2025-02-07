'use client'
import { useEffect, useState } from 'react'

export default function UserRole() {
  const [data, setData] = useState(null)
  const [role, setRole] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/role')
        if (!response.ok) {
          throw new Error('API request failed')
        }
        const result = await response.json()
        setData(result)
        setRole(result.role)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-blue-500 font-medium">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg mt-8 p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">User Role</h2>
      <div className="text-gray-700">
        {role === null ? (
          <p className="text-yellow-600 font-medium">역할이 없습니다.</p>
        ) : (
          <p className="text-green-600 font-medium">역할: {role}</p>
        )}
      </div>
    </div>
  )
}
