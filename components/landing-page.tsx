'use client';

import { useState, useRef } from 'react';
import { MapPin, Calendar, Mic, MicOff, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchParams {
  location: string;
  date: string;
  amenities: string[];
}

interface LandingPageProps {
  onSearch: (params: SearchParams) => void;
  onMyBookingsClick?: () => void;
}

const CITIES = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
];

const AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'ac', label: 'AC', icon: '❄️' },
  { id: 'projector', label: 'Projector', icon: '🎬' },
  { id: 'parking', label: 'Parking', icon: '🅿️' },
  { id: 'conference', label: 'Conference Room', icon: '🗣️' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍽️' },
  { id: 'gym', label: 'Gym', icon: '💪' },
  { id: 'cafe', label: 'Café', icon: '☕' },
];

export default function LandingPage({ onSearch, onMyBookingsClick }: LandingPageProps) {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId]
    );
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in your browser');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.start();
    setIsListening(true);

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const matchedCity = CITIES.find(city => city.toLowerCase().includes(transcript));
      if (matchedCity) {
        setLocation(matchedCity);
      }
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date) {
      alert('Please select a city and date');
      return;
    }
    onSearch({ location, date, amenities: selectedAmenities });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-background to-secondary">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={onMyBookingsClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors"
        >
          <User className="w-5 h-5" />
          My Account
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Find Your Perfect
            <span className="text-accent block">Workspace</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium co-working spaces tailored to your productivity needs, mood, and budget
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-card rounded-2xl shadow-lg p-8 mb-12 backdrop-blur-sm border border-border">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Location & Date Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">City</label>
                <div className="flex gap-2">
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={startVoiceSearch}
                    className="px-4 py-2 rounded-lg bg-secondary border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                    title="Voice search"
                  >
                    {isListening ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {AMENITIES.map(amenity => (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedAmenities.includes(amenity.id)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary border-border hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg">{amenity.icon}</span>
                    <div className="text-xs font-medium mt-1">{amenity.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Search Spaces
            </button>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: '⚡', title: 'Instant Booking', desc: 'Book in seconds' },
            { icon: '💰', title: 'Dynamic Pricing', desc: 'Pay only what you use' },
            { icon: '✅', title: 'QR Check-in', desc: 'Seamless entry' },
          ].map((feature, i) => (
            <div key={i} className="bg-card/50 backdrop-blur p-6 rounded-xl border border-border/50 text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
