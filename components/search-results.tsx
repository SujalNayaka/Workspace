'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, AlertCircle } from 'lucide-react';

interface SearchParams {
  location: string;
  date: string;
  amenities: string[];
}

interface Space {
  id: number;
  name: string;
  image: string;
  amenities: string[];
  hourly: number;
  daily: number;
  monthly: number;
  rating: number;
  noiseLevel: string;
  capacity: number;
}

interface SearchResultsProps {
  searchParams: SearchParams;
  onSelectSpace: (spaceId: number) => void;
  onBack: () => void;
}

export default function SearchResults({ searchParams, onSelectSpace, onBack }: SearchResultsProps) {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');

  useEffect(() => {
    // Simulate API call
    const mockSpaces: Space[] = [
      // BANGALORE (6 spaces)
      {
        id: 1,
        name: 'TechHub Downtown',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'projector', 'parking'],
        hourly: 25,
        daily: 150,
        monthly: 2500,
        rating: 4.8,
        noiseLevel: 'quiet',
        capacity: 30,
      },
      {
        id: 2,
        name: 'Creative Studio',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'conference', 'cafe'],
        hourly: 30,
        daily: 180,
        monthly: 3000,
        rating: 4.6,
        noiseLevel: 'medium',
        capacity: 20,
      },
      {
        id: 3,
        name: 'Enterprise Office',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'projector', 'conference', 'parking'],
        hourly: 35,
        daily: 200,
        monthly: 3500,
        rating: 4.9,
        noiseLevel: 'quiet',
        capacity: 50,
      },
      {
        id: 4,
        name: 'StartupHub Koramangala',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'gym', 'cafe', 'kitchen'],
        hourly: 20,
        daily: 120,
        monthly: 2000,
        rating: 4.7,
        noiseLevel: 'busy',
        capacity: 40,
      },
      {
        id: 5,
        name: 'Elite Workspace Indiranagar',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'parking', 'conference', 'projector'],
        hourly: 28,
        daily: 170,
        monthly: 2800,
        rating: 4.5,
        noiseLevel: 'quiet',
        capacity: 35,
      },
      {
        id: 6,
        name: 'The Office Whitefield',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'gym', 'parking', 'cafe'],
        hourly: 22,
        daily: 130,
        monthly: 2200,
        rating: 4.6,
        noiseLevel: 'medium',
        capacity: 45,
      },

      // MUMBAI (6 spaces)
      {
        id: 7,
        name: 'WorkHub Bandra',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'conference', 'parking'],
        hourly: 35,
        daily: 210,
        monthly: 3500,
        rating: 4.8,
        noiseLevel: 'quiet',
        capacity: 50,
      },
      {
        id: 8,
        name: 'Studio Space Lower Parel',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'gym'],
        hourly: 32,
        daily: 190,
        monthly: 3200,
        rating: 4.7,
        noiseLevel: 'medium',
        capacity: 38,
      },
      {
        id: 9,
        name: 'Corporate Desk Powai',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'projector', 'conference', 'parking'],
        hourly: 38,
        daily: 220,
        monthly: 3800,
        rating: 4.9,
        noiseLevel: 'quiet',
        capacity: 55,
      },
      {
        id: 10,
        name: 'The Common Worli',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'cafe', 'parking', 'kitchen'],
        hourly: 30,
        daily: 180,
        monthly: 3000,
        rating: 4.6,
        noiseLevel: 'medium',
        capacity: 42,
      },
      {
        id: 11,
        name: 'BusinessHub Dadar',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'conference', 'parking', 'gym'],
        hourly: 28,
        daily: 170,
        monthly: 2900,
        rating: 4.5,
        noiseLevel: 'busy',
        capacity: 36,
      },
      {
        id: 12,
        name: 'StartHub Andheri',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'parking'],
        hourly: 26,
        daily: 155,
        monthly: 2600,
        rating: 4.4,
        noiseLevel: 'busy',
        capacity: 30,
      },

      // DELHI (6 spaces)
      {
        id: 13,
        name: 'PrimeDesk Connaught Place',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'projector', 'conference', 'parking'],
        hourly: 40,
        daily: 240,
        monthly: 4000,
        rating: 4.9,
        noiseLevel: 'quiet',
        capacity: 60,
      },
      {
        id: 14,
        name: 'OfficeSpace Gurgaon',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'gym', 'parking', 'cafe'],
        hourly: 35,
        daily: 210,
        monthly: 3500,
        rating: 4.7,
        noiseLevel: 'medium',
        capacity: 45,
      },
      {
        id: 15,
        name: 'CreativeHub Dwarka',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'conference'],
        hourly: 28,
        daily: 170,
        monthly: 2900,
        rating: 4.6,
        noiseLevel: 'medium',
        capacity: 40,
      },
      {
        id: 16,
        name: 'CorporateOffice Noida',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'parking', 'gym', 'conference'],
        hourly: 24,
        daily: 145,
        monthly: 2500,
        rating: 4.5,
        noiseLevel: 'quiet',
        capacity: 35,
      },
      {
        id: 17,
        name: 'WorkSpace Sector 62',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'cafe', 'kitchen'],
        hourly: 22,
        daily: 135,
        monthly: 2300,
        rating: 4.4,
        noiseLevel: 'quiet',
        capacity: 32,
      },
      {
        id: 18,
        name: 'StartupHQ Gurugram',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'gym', 'conference', 'parking'],
        hourly: 32,
        daily: 190,
        monthly: 3200,
        rating: 4.6,
        noiseLevel: 'busy',
        capacity: 44,
      },

      // HYDERABAD (5 spaces)
      {
        id: 19,
        name: 'TechSpace Hitech City',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'],
        hourly: 22,
        daily: 135,
        monthly: 2300,
        rating: 4.7,
        noiseLevel: 'quiet',
        capacity: 40,
      },
      {
        id: 20,
        name: 'OfficeHub Banjara Hills',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'conference', 'gym', 'parking'],
        hourly: 25,
        daily: 150,
        monthly: 2600,
        rating: 4.6,
        noiseLevel: 'medium',
        capacity: 38,
      },
      {
        id: 21,
        name: 'CreativeSpace Jubilee Hills',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'conference'],
        hourly: 24,
        daily: 145,
        monthly: 2500,
        rating: 4.5,
        noiseLevel: 'medium',
        capacity: 35,
      },
      {
        id: 22,
        name: 'WorkHub Gachibowli',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'gym', 'cafe'],
        hourly: 20,
        daily: 125,
        monthly: 2200,
        rating: 4.4,
        noiseLevel: 'quiet',
        capacity: 32,
      },
      {
        id: 23,
        name: 'StartupSpace Kondapur',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'projector', 'kitchen', 'parking'],
        hourly: 21,
        daily: 130,
        monthly: 2300,
        rating: 4.5,
        noiseLevel: 'busy',
        capacity: 36,
      },

      // PUNE (5 spaces)
      {
        id: 24,
        name: 'OfficeHub Baner',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'conference', 'parking', 'cafe'],
        hourly: 20,
        daily: 125,
        monthly: 2200,
        rating: 4.6,
        noiseLevel: 'quiet',
        capacity: 35,
      },
      {
        id: 25,
        name: 'WorkSpace Hinjewadi',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'gym', 'parking', 'kitchen'],
        hourly: 18,
        daily: 110,
        monthly: 1950,
        rating: 4.5,
        noiseLevel: 'quiet',
        capacity: 32,
      },
      {
        id: 26,
        name: 'CreativeHub Wakad',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'projector', 'cafe', 'conference'],
        hourly: 22,
        daily: 135,
        monthly: 2300,
        rating: 4.7,
        noiseLevel: 'medium',
        capacity: 38,
      },
      {
        id: 27,
        name: 'BusinessDesk Viman Nagar',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'cafe', 'gym'],
        hourly: 19,
        daily: 120,
        monthly: 2100,
        rating: 4.4,
        noiseLevel: 'medium',
        capacity: 30,
      },
      {
        id: 28,
        name: 'StartupHub Koregaon Park',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'conference'],
        hourly: 21,
        daily: 130,
        monthly: 2300,
        rating: 4.6,
        noiseLevel: 'busy',
        capacity: 36,
      },

      // KOLKATA (5 spaces)
      {
        id: 29,
        name: 'CorporateDesk Salt Lake',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'],
        hourly: 18,
        daily: 110,
        monthly: 1900,
        rating: 4.5,
        noiseLevel: 'quiet',
        capacity: 32,
      },
      {
        id: 30,
        name: 'WorkHub Park Circus',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'conference', 'gym', 'kitchen'],
        hourly: 16,
        daily: 100,
        monthly: 1800,
        rating: 4.4,
        noiseLevel: 'medium',
        capacity: 28,
      },
      {
        id: 31,
        name: 'CreativeSpace Alipore',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'cafe', 'parking', 'projector'],
        hourly: 17,
        daily: 105,
        monthly: 1850,
        rating: 4.3,
        noiseLevel: 'medium',
        capacity: 30,
      },
      {
        id: 32,
        name: 'OfficeHub Ballygunge',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'conference'],
        hourly: 15,
        daily: 95,
        monthly: 1700,
        rating: 4.2,
        noiseLevel: 'quiet',
        capacity: 25,
      },
      {
        id: 33,
        name: 'StartHub Sector V',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'gym', 'cafe', 'parking'],
        hourly: 16,
        daily: 100,
        monthly: 1800,
        rating: 4.4,
        noiseLevel: 'busy',
        capacity: 29,
      },

      // AHMEDABAD (5 spaces)
      {
        id: 34,
        name: 'BusinessHub SG Highway',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'conference', 'cafe'],
        hourly: 17,
        daily: 105,
        monthly: 1900,
        rating: 4.5,
        noiseLevel: 'quiet',
        capacity: 33,
      },
      {
        id: 35,
        name: 'WorkSpace Satellite',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'gym', 'kitchen', 'parking'],
        hourly: 16,
        daily: 100,
        monthly: 1800,
        rating: 4.4,
        noiseLevel: 'quiet',
        capacity: 31,
      },
      {
        id: 36,
        name: 'CreativeOffice Vastrapur',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'projector', 'cafe', 'conference'],
        hourly: 18,
        daily: 110,
        monthly: 2000,
        rating: 4.6,
        noiseLevel: 'medium',
        capacity: 36,
      },
      {
        id: 37,
        name: 'OfficeHub Navrangpura',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'cafe', 'gym'],
        hourly: 15,
        daily: 95,
        monthly: 1700,
        rating: 4.3,
        noiseLevel: 'medium',
        capacity: 28,
      },
      {
        id: 38,
        name: 'StartupHub Paldi',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'conference'],
        hourly: 16,
        daily: 100,
        monthly: 1800,
        rating: 4.4,
        noiseLevel: 'busy',
        capacity: 32,
      },

      // JAIPUR (5 spaces)
      {
        id: 39,
        name: 'BusinessDesk C-Scheme',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'],
        hourly: 16,
        daily: 100,
        monthly: 1800,
        rating: 4.5,
        noiseLevel: 'quiet',
        capacity: 32,
      },
      {
        id: 40,
        name: 'WorkHub Malviya Nagar',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'conference', 'gym', 'kitchen'],
        hourly: 15,
        daily: 95,
        monthly: 1700,
        rating: 4.3,
        noiseLevel: 'medium',
        capacity: 29,
      },
      {
        id: 41,
        name: 'CreativeSpace Raja Park',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'cafe', 'parking', 'projector'],
        hourly: 17,
        daily: 105,
        monthly: 1900,
        rating: 4.4,
        noiseLevel: 'medium',
        capacity: 33,
      },
      {
        id: 42,
        name: 'OfficeHub Sodala',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'gym'],
        hourly: 14,
        daily: 90,
        monthly: 1600,
        rating: 4.2,
        noiseLevel: 'quiet',
        capacity: 26,
      },
      {
        id: 43,
        name: 'StartupDesk Vaishali Nagar',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'cafe', 'conference'],
        hourly: 15,
        daily: 95,
        monthly: 1700,
        rating: 4.3,
        noiseLevel: 'busy',
        capacity: 30,
      },

      // LUCKNOW (5 spaces)
      {
        id: 44,
        name: 'CorporateHub Gomti Nagar',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'conference', 'cafe'],
        hourly: 14,
        daily: 85,
        monthly: 1500,
        rating: 4.4,
        noiseLevel: 'quiet',
        capacity: 30,
      },
      {
        id: 45,
        name: 'WorkSpace Hazratganj',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'gym', 'kitchen', 'parking'],
        hourly: 13,
        daily: 80,
        monthly: 1450,
        rating: 4.2,
        noiseLevel: 'quiet',
        capacity: 27,
      },
      {
        id: 46,
        name: 'CreativeOffice Indira Nagar',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'projector', 'cafe', 'conference'],
        hourly: 15,
        daily: 90,
        monthly: 1600,
        rating: 4.5,
        noiseLevel: 'medium',
        capacity: 32,
      },
      {
        id: 47,
        name: 'OfficeHub Aliganj',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'cafe', 'gym'],
        hourly: 12,
        daily: 75,
        monthly: 1400,
        rating: 4.1,
        noiseLevel: 'medium',
        capacity: 24,
      },
      {
        id: 48,
        name: 'StartupHub Balaganj',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'conference'],
        hourly: 13,
        daily: 80,
        monthly: 1450,
        rating: 4.3,
        noiseLevel: 'busy',
        capacity: 28,
      },

      // CHANDIGARH (5 spaces)
      {
        id: 49,
        name: 'BusinessDesk Sector 17',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'],
        hourly: 18,
        daily: 110,
        monthly: 1950,
        rating: 4.6,
        noiseLevel: 'quiet',
        capacity: 34,
      },
      {
        id: 50,
        name: 'WorkHub Sector 35',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'conference', 'gym', 'kitchen'],
        hourly: 16,
        daily: 100,
        monthly: 1800,
        rating: 4.4,
        noiseLevel: 'medium',
        capacity: 31,
      },
      {
        id: 51,
        name: 'CreativeSpace Sector 22',
        image: '/creative-office-space.png',
        amenities: ['wifi', 'ac', 'cafe', 'parking', 'projector'],
        hourly: 17,
        daily: 105,
        monthly: 1900,
        rating: 4.5,
        noiseLevel: 'medium',
        capacity: 33,
      },
      {
        id: 52,
        name: 'OfficeHub Sector 9',
        image: '/professional-workspace.png',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'gym'],
        hourly: 15,
        daily: 95,
        monthly: 1700,
        rating: 4.3,
        noiseLevel: 'quiet',
        capacity: 28,
      },
      {
        id: 53,
        name: 'StartupSpace Sector 43',
        image: '/modern-coworking-space.png',
        amenities: ['wifi', 'ac', 'parking', 'cafe', 'conference'],
        hourly: 16,
        daily: 100,
        monthly: 1800,
        rating: 4.4,
        noiseLevel: 'busy',
        capacity: 30,
      },
    ];

    setTimeout(() => {
      setSpaces(mockSpaces);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  const noiseColors = {
    quiet: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    busy: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const sorted = [...spaces].sort((a, b) => 
    sortBy === 'price' ? a.hourly - b.hourly : b.rating - a.rating
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Workspaces in <span className="text-accent">{searchParams.location}</span>
          </h1>
          <p className="text-muted-foreground">
            Found {spaces.length} spaces • {searchParams.date}
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex gap-3 mb-6">
          {['price', 'rating'].map(option => (
            <button
              key={option}
              onClick={() => setSortBy(option as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === option
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:bg-muted'
              }`}
            >
              {option === 'price' ? '💰 Price' : '⭐ Rating'}
            </button>
          ))}
        </div>

        {/* Smart Alert */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-accent">High Demand Today</p>
            <p className="text-sm text-muted-foreground">Only 5-8 desks left during peak hours (10 AM - 5 PM)</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-4 animate-pulse h-80">
                <div className="bg-muted rounded h-40 mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-muted rounded h-4 w-2/3"></div>
                  <div className="bg-muted rounded h-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map(space => (
              <div
                key={space.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                onClick={() => onSelectSpace(space.id)}
              >
                <img
                  src={space.image || "/placeholder.svg"}
                  alt={space.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-2">{space.name}</h3>

                  {/* Amenities Icons */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {space.amenities.slice(0, 4).map(amenity => (
                      <span key={amenity} className="text-lg">
                        {{
                          wifi: '📶',
                          ac: '❄️',
                          projector: '🎬',
                          parking: '🅿️',
                          conference: '🗣️',
                          kitchen: '🍽️',
                          gym: '💪',
                          cafe: '☕',
                        }[amenity] || amenity}
                      </span>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="text-sm text-muted-foreground mb-3 space-y-1">
                    <p>₹{space.hourly}/hr • ₹{space.daily}/day • ₹{space.monthly}/mo</p>
                  </div>

                  {/* Rating & Noise */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{space.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <span className={`text-xs px-2 py-1 rounded-full ${noiseColors[space.noiseLevel as keyof typeof noiseColors]}`}>
                        {space.noiseLevel}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
