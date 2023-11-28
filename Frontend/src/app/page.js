import Link from 'next/link'
import React from 'react'

const MainPage = () => {
  return (
    <div>
      <Link href="/admin/pages/dashboard"
        style={{ color: "red" }}
      >Dashboard</Link>
    </div>
  )
}

export default MainPage