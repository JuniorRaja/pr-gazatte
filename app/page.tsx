import StickyNav from '@/components/StickyNav'
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
import SectionTracker from '@/components/SectionTracker'

const SECTION_IDS = [
  'op-ed',
  'tech',
  'career',
  'lab',
  'photos',
  'books',
  'travel',
  'hobbies',
  'contact',
  'footer',
]

export default function Home() {
  return (
    <main>
      <SectionTracker sectionIds={SECTION_IDS} />
      <StickyNav />
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
