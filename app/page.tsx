import Masthead from '@/components/sections/Masthead'
import OpEd from '@/components/sections/OpEd'
import TechDesk from '@/components/sections/TechDesk'
import BusinessPages from '@/components/sections/BusinessPages'
import LabReport from '@/components/sections/LabReport'
import PhotoDesk from '@/components/sections/PhotoDesk'
import BooksReview from '@/components/sections/BooksReview'
import Travel from '@/components/sections/Travel'
import OffDuty from '@/components/sections/OffDuty'
import Classifieds from '@/components/sections/Classifieds'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Masthead />
      <OpEd />
      <TechDesk />
      <BusinessPages />
      <LabReport />
      <PhotoDesk />
      <BooksReview />
      <Travel />
      <OffDuty />
      <Classifieds />
      <Footer />
    </main>
  )
}
