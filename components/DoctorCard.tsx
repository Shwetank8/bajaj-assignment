import { Doctor } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Star, Calendar, DollarSign, MapPin } from "lucide-react"
import Image from "next/image"

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  if (!doctor) {
    return null;
  }

  const {
    name = '',
    specialities = [],
    experience = 0,
    fees = 0,
    ratings = 0,
    location = '',
    photo = 'https://via.placeholder.com/150',
    
  } = doctor;

  return (
    <Card 
      className="mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300"
      data-testid="doctor-card"
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <Image src={doctor.photo} alt={name} width={150} height={150} className="w-full h-48 object-cover md:w-1/4" />
          
          
          {/* Doctor Details */}
          <div className="p-6 flex-1">
            <h3 
              className="text-xl font-bold text-gray-900 mb-2"
              data-testid="doctor-name"
            >
              {name}
            </h3>
            
            <div className="mb-3" data-testid="doctor-specialty">
              <div className="flex flex-wrap gap-2 mb-2">
                {specialities.map((spec, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {/* {spec} */}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center" data-testid="doctor-experience">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{experience}</span>
              </div>
              
              <div className="flex items-center" data-testid="doctor-fee">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{fees} consultation fee</span>
              </div>
              
              <div className="flex items-center">
                <p className="h-4 w-4 mr-2 text-blue-500">Speciality</p>
                <span className="text-gray-700">
                  {doctor.specialities.map((spec, index) => (
                  <span key={index}>
                    {spec.name}
                    {index < doctor.specialities.length - 1 && ', '}
                  </span>
              ))}
            </span>
            </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{doctor.location}</span>
              </div>
            </div>
            
            {/* <div className="mt-4 flex flex-wrap gap-2">
              {consultationMode.map((mode, index) => (
                <Badge key={index} className={mode === 'Video Consult' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}>
                  {mode}
                </Badge>
              ))}
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}