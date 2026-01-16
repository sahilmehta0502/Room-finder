'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function Dashboard() {
  const [rooms, setRooms] = useState<any[]>([])
  const router = useRouter()

  const fetchRooms = async () => {
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return router.push('/login')

    const { data } = await supabase
      .from('rooms')
      .select('*')
      .eq('owner_id', user.id)

    setRooms(data || [])
  }

  const deleteRoom = async (id: string) => {
    const supabase = getSupabaseClient()
    await supabase.from('rooms').delete().eq('id', id)
    fetchRooms()
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Rooms</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room.id} className="border p-4">
            <h2>{room.title}</h2>
            <p>{room.location}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => router.push(`/owner/edit-room/${room.id}`)}
                className="bg-blue-600 text-white px-3 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => deleteRoom(room.id)}
                className="bg-red-600 text-white px-3 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
