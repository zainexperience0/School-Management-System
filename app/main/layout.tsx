"use client"
import { Navbar } from '@/components/Navbar'

const MainLayout = ({children}: {children: React.ReactNode}) => {
 
  return (
    <div>
        <Navbar/>
        <main className='mt-10'>
            {children}
        </main>
    </div>
  )
}

export default MainLayout