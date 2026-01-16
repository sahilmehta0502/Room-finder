'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AddRoom() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [rent, setRent] = useState('')
  const [type, setType] = useState('')
  const [tenant, setTenant] = useState('')
  const [contact, setContact] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    })
  }, [router])

  if (loading) return <p className="p-6">Checking authentication...</p>

  const submitRoom = async () => {
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) return alert('Login required')

    const user = sessionData.session.user

    const { error } = await supabase.from('rooms').insert({
      owner_id: user.id,
      title,
      location,
      rent_price: Number(rent),
      property_type: type,
      tenant_preference: tenant,
      contact_number: contact,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Room added successfully')
      router.push('/owner/dashboard')
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-3">
      <h1 className="text-xl font-bold">Add Room</h1>

      <input className="border p-2 w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Rent" type="number" value={rent} onChange={(e) => setRent(e.target.value)} />

      <select className="border p-2 w-full" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Property Type</option>
        <option>1 BHK</option>
        <option>2 BHK</option>
        <option>3 BHK</option>
      </select>

      <select className="border p-2 w-full" value={tenant} onChange={(e) => setTenant(e.target.value)}>
        <option value="">Tenant Preference</option>
        <option>Bachelor</option>
        <option>Family</option>
        <option>Girls</option>
        <option>Working</option>
      </select>

      <input className="border p-2 w-full" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />

      <button onClick={submitRoom} className="bg-black text-white p-2 w-full">
        Submit
      </button>
    </div>
  )
}
