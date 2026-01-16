'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function Home() {
  const [rooms, setRooms] = useState<any[]>([])
  const [location, setLocation] = useState('')

  const fetchRooms = async () => {
    const supabase = getSupabaseClient()

    let query = supabase.from('rooms').select('*')

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    const { data } = await query
    setRooms(data || [])
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room Finder</h1>

      <input
        placeholder="Search by location"
        className="border p-2 mb-4 w-full"
        onChange={(e) => setLocation(e.target.value)}
      />

      <button
        onClick={fetchRooms}
        className="bg-black text-white px-4 py-2 mb-6"
      >
        Search
      </button>

      <div className="grid md:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room.id} className="border p-4 rounded">
            <h2 className="font-bold">{room.title}</h2>
            <p>{room.location}</p>
            <p>₹{room.rent_price}</p>
            <p>{room.property_type}</p>
            <p>{room.tenant_preference}</p>
            <p>📞 {room.contact_number}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
