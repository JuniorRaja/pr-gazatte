'use client'

import { useEffect, useState } from 'react'

const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

function getISTDateStr() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  return `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
}

export default function MastheadDate({ serverDate }: { serverDate: string }) {
  const [date, setDate] = useState(serverDate)
  useEffect(() => { setDate(getISTDateStr()) }, [])
  return <span suppressHydrationWarning>{date}</span>
}
