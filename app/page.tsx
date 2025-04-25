"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import SearchBar from "@/components/SearchBar"
import FilterPanel from "../components/filters/FilterPanel"
import DoctorList from "../components/DoctorList"
import { fetchDoctors } from "../lib/api"
import { Doctor, FilterState } from "../lib/types"
import { 
  filterDoctors, 
  sortDoctors, 
  getUniqueSpecialties, 
  urlParamsToFilterState,
  filterStateToUrlParams
} from "@/lib/utils"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [loading, setLoading] = useState(true)
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [specialties, setSpecialties] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    consultationMode: null,
    specialties: [],
    sortBy: null
  })

  // Initial data fetching
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true)
      try {
        const data = await fetchDoctors()
        setAllDoctors(data)
        setSpecialties(getUniqueSpecialties(data))
        toast.success('Doctors loaded successfully')
      } catch (error) {
        toast.error('Failed to load doctors')
      } finally {
        setLoading(false)
      }
    }
    
    loadDoctors()
  }, [])

  // Handle URL params on first load
  useEffect(() => {
    if (allDoctors.length > 0 && searchParams) {
      const urlFilters = urlParamsToFilterState(searchParams)
      setFilters(urlFilters)
    }
  }, [allDoctors.length, searchParams])

  // Apply filters when they change
  useEffect(() => {
    if (allDoctors.length > 0) {
      const filtered = filterDoctors(allDoctors, filters)
      const sorted = sortDoctors(filtered, filters.sortBy)
      setFilteredDoctors(sorted)
      
      // Update URL
      const params = filterStateToUrlParams(filters)
      router.push(`?${params.toString()}`, { scroll: false })
    }
  }, [filters, allDoctors, router])

  // Filter handlers
  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
  }

  const handleConsultationChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      consultationMode: prev.consultationMode === value ? null : value
    }))
  }

  const handleSpecialtyChange = (specialty: string) => {
    setFilters(prev => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
      
      return { ...prev, specialties }
    })
  }

  const handleSortChange = (value: 'fees' | 'experience' | null) => {
    setFilters(prev => ({
      ...prev,
      sortBy: prev.sortBy === value ? null : value
    }))
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
        <p className="text-gray-600">Search from our network of qualified medical professionals</p>
      </div>
      
      <div className="mb-8">
        <SearchBar 
          doctors={allDoctors} 
          searchTerm={filters.search} 
          onSearchChange={handleSearchChange} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="md:col-span-1">
          <FilterPanel 
            specialties={specialties}
            filters={filters}
            onConsultationChange={handleConsultationChange}
            onSpecialtyChange={handleSpecialtyChange}
            onSortChange={handleSortChange}
          />
        </div>
        
        {/* Doctor List */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <p className="text-gray-700">
                  <span className="font-medium">{filteredDoctors.length}</span> doctors found
                  {filters.search && ` for "${filters.search}"`}
                </p>
              </div>
              <DoctorList doctors={filteredDoctors} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}