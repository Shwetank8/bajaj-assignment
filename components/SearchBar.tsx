"use client"

import { useState, useEffect, useRef } from 'react'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { Doctor } from '../lib/types'

interface SearchBarProps {
  doctors: Doctor[]
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function SearchBar({ doctors, searchTerm, onSearchChange }: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Doctor[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
      return
    }

    const lowerCaseSearch = searchTerm.toLowerCase()
    const matchedDoctors = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(lowerCaseSearch))
      .slice(0, 3) // Show only top 3 suggestions

    setSuggestions(matchedDoctors)
    
    if (matchedDoctors.length > 0 && searchTerm.trim() !== '') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [searchTerm, doctors])

  const handleSelect = (doctorName: string) => {
    onSearchChange(doctorName)
    setOpen(false)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full max-w-md mx-auto" ref={inputRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          data-testid="autocomplete-input"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onValueChange={(value) => {
            onSearchChange(value)
            setOpen(true)
          }}
          className="h-11"
        />
        {open && suggestions.length > 0 && (
          <CommandList className="absolute w-full bg-white rounded-b-lg shadow-lg z-10 max-h-52">
            <CommandGroup>
              {suggestions.map((doctor) => (
                <CommandItem
                  key={doctor.id}
                  data-testid="suggestion-item"
                  onSelect={() => handleSelect(doctor.name)}
                  className="cursor-pointer hover:bg-muted"
                >
                  {doctor.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  )
}