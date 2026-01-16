'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function AddRoom() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [rent, setRent] = useState('')
  const [type, setType] = useState('')
  const [tenant, setTenant] = useState('')
  const [contact, setContact] = useState('')

  const submitRoom = async () => {
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return alert('Login required')

    const { error } = await supabase.from('rooms').insert({
      owner_id: user.id,
      title,
      location,
      rent_price: Number(rent),
      property_type: type,
      tenant_preference: tenant,
      contact_number: contact,
    })

    if (error) alert(error.message)
    else {
      alert('Room added successfully')
      router.push('/owner/dashboard')
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-3">
      <h1 className="text-xl font-bold">Add Room</h1>

      <input className="border p-2 w-full" placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Location" onChange={e => setLocation(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Rent" onChange={e => setRent(e.target.value)} />

      <select className="border p-2 w-full" onChange={e => setType(e.target.value)}>
        <option value="">Property Type</option>
        <option>1 BHK</option>
        <option>2 BHK</option>
      </select>

      <select className="border p-2 w-full" onChange={e => setTenant(e.target.value)}>
        <option value="">Tenant Preference</option>
        <option>Bachelor</option>
        <option>Family</option>
      </select>

      <input className="border p-2 w-full" placeholder="Contact Number" onChange={e => setContact(e.target.value)} />

      <button onClick={submitRoom} className="bg-black text-white p-2 w-full">
        Submit
      </button>
    </div>
  )
}
