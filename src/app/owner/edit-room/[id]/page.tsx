'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditRoom() {
  const { id } = useParams()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [rent, setRent] = useState('')

  useEffect(() => {
    supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title)
          setLocation(data.location)
          setRent(data.rent_price)
        }
      })
  }, [id])

  const updateRoom = async () => {
    await supabase
      .from('rooms')
      .update({
        title,
        location,
        rent_price: Number(rent),
      })
      .eq('id', id)

    router.push('/owner/dashboard')
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-3">
      <h1 className="text-xl font-bold">Edit Room</h1>

      <input className="border p-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="border p-2 w-full" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input className="border p-2 w-full" value={rent} onChange={(e) => setRent(e.target.value)} />

      <button onClick={updateRoom} className="bg-black text-white p-2 w-full">
        Update
      </button>
    </div>
  )
}
