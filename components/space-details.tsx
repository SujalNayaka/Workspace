'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Users, Clock, Lock } from 'lucide-react';

interface SpaceDetailsProps {
  spaceId: number;
  onBook: (data: any) => void;
  onBack: () => void;
  bookedSlots?: any[];
}

const MOCK_SPACES_MAP: Record<number, any> = {
  1: { id: 1, name: 'TechHub Downtown', location: 'Koramangala, Bangalore', capacity: 30, amenities: ['wifi', 'ac', 'projector', 'parking'], hourly: 25, daily: 150, monthly: 2500 },
  2: { id: 2, name: 'Creative Studio', location: 'Indiranagar, Bangalore', capacity: 20, amenities: ['wifi', 'ac', 'conference', 'cafe'], hourly: 30, daily: 180, monthly: 3000 },
  3: { id: 3, name: 'Enterprise Office', location: 'Whitefield, Bangalore', capacity: 50, amenities: ['wifi', 'ac', 'projector', 'conference', 'parking'], hourly: 35, daily: 200, monthly: 3500 },
  4: { id: 4, name: 'StartupHub Koramangala', location: 'Koramangala, Bangalore', capacity: 40, amenities: ['wifi', 'ac', 'gym', 'cafe', 'kitchen'], hourly: 20, daily: 120, monthly: 2000 },
  5: { id: 5, name: 'Elite Workspace Indiranagar', location: 'Indiranagar, Bangalore', capacity: 35, amenities: ['wifi', 'ac', 'parking', 'conference', 'projector'], hourly: 28, daily: 170, monthly: 2800 },
  6: { id: 6, name: 'The Office Whitefield', location: 'Whitefield, Bangalore', capacity: 45, amenities: ['wifi', 'ac', 'gym', 'parking', 'cafe'], hourly: 22, daily: 130, monthly: 2200 },
  7: { id: 7, name: 'WorkHub Bandra', location: 'Bandra, Mumbai', capacity: 50, amenities: ['wifi', 'ac', 'conference', 'parking'], hourly: 35, daily: 210, monthly: 3500 },
  8: { id: 8, name: 'Studio Space Lower Parel', location: 'Lower Parel, Mumbai', capacity: 38, amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'gym'], hourly: 32, daily: 190, monthly: 3200 },
  9: { id: 9, name: 'Corporate Desk Powai', location: 'Powai, Mumbai', capacity: 55, amenities: ['wifi', 'ac', 'projector', 'conference', 'parking'], hourly: 38, daily: 220, monthly: 3800 },
  10: { id: 10, name: 'The Common Worli', location: 'Worli, Mumbai', capacity: 42, amenities: ['wifi', 'ac', 'cafe', 'parking', 'kitchen'], hourly: 30, daily: 180, monthly: 3000 },
  11: { id: 11, name: 'BusinessHub Dadar', location: 'Dadar, Mumbai', capacity: 36, amenities: ['wifi', 'ac', 'conference', 'parking', 'gym'], hourly: 28, daily: 170, monthly: 2900 },
  12: { id: 12, name: 'StartHub Andheri', location: 'Andheri, Mumbai', capacity: 30, amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'parking'], hourly: 26, daily: 155, monthly: 2600 },
  13: { id: 13, name: 'PrimeDesk Connaught Place', location: 'Connaught Place, Delhi', capacity: 60, amenities: ['wifi', 'ac', 'projector', 'conference', 'parking'], hourly: 40, daily: 240, monthly: 4000 },
  14: { id: 14, name: 'OfficeSpace Gurgaon', location: 'Gurgaon, Delhi', capacity: 45, amenities: ['wifi', 'ac', 'gym', 'parking', 'cafe'], hourly: 35, daily: 210, monthly: 3500 },
  15: { id: 15, name: 'CreativeHub Dwarka', location: 'Dwarka, Delhi', capacity: 40, amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'conference'], hourly: 28, daily: 170, monthly: 2900 },
  16: { id: 16, name: 'CorporateOffice Noida', location: 'Noida, Delhi', capacity: 35, amenities: ['wifi', 'ac', 'parking', 'gym', 'conference'], hourly: 24, daily: 145, monthly: 2500 },
  17: { id: 17, name: 'WorkSpace Sector 62', location: 'Sector 62, Noida', capacity: 32, amenities: ['wifi', 'ac', 'parking', 'cafe', 'kitchen'], hourly: 22, daily: 135, monthly: 2300 },
  18: { id: 18, name: 'StartupHQ Gurugram', location: 'Gurugram, Delhi', capacity: 44, amenities: ['wifi', 'ac', 'gym', 'conference', 'parking'], hourly: 32, daily: 190, monthly: 3200 },
  19: { id: 19, name: 'TechSpace Hitech City', location: 'Hitech City, Hyderabad', capacity: 40, amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'], hourly: 22, daily: 135, monthly: 2300 },
  20: { id: 20, name: 'OfficeHub Banjara Hills', location: 'Banjara Hills, Hyderabad', capacity: 38, amenities: ['wifi', 'ac', 'conference', 'gym', 'parking'], hourly: 25, daily: 150, monthly: 2600 },
  21: { id: 21, name: 'CreativeSpace Jubilee Hills', location: 'Jubilee Hills, Hyderabad', capacity: 35, amenities: ['wifi', 'ac', 'kitchen', 'cafe', 'conference'], hourly: 24, daily: 145, monthly: 2500 },
  22: { id: 22, name: 'WorkHub Gachibowli', location: 'Gachibowli, Hyderabad', capacity: 32, amenities: ['wifi', 'ac', 'parking', 'gym', 'cafe'], hourly: 20, daily: 125, monthly: 2200 },
  23: { id: 23, name: 'StartupSpace Kondapur', location: 'Kondapur, Hyderabad', capacity: 36, amenities: ['wifi', 'ac', 'projector', 'kitchen', 'parking'], hourly: 21, daily: 130, monthly: 2300 },
  24: { id: 24, name: 'OfficeHub Baner', location: 'Baner, Pune', capacity: 35, amenities: ['wifi', 'ac', 'conference', 'parking', 'cafe'], hourly: 20, daily: 125, monthly: 2200 },
  25: { id: 25, name: 'WorkSpace Hinjewadi', location: 'Hinjewadi, Pune', capacity: 32, amenities: ['wifi', 'ac', 'gym', 'parking', 'kitchen'], hourly: 18, daily: 110, monthly: 1950 },
  26: { id: 26, name: 'CreativeHub Wakad', location: 'Wakad, Pune', capacity: 38, amenities: ['wifi', 'ac', 'projector', 'cafe', 'conference'], hourly: 22, daily: 135, monthly: 2300 },
  27: { id: 27, name: 'BusinessDesk Viman Nagar', location: 'Viman Nagar, Pune', capacity: 30, amenities: ['wifi', 'ac', 'parking', 'cafe', 'gym'], hourly: 19, daily: 120, monthly: 2100 },
  28: { id: 28, name: 'StartupHub Koregaon Park', location: 'Koregaon Park, Pune', capacity: 36, amenities: ['wifi', 'ac', 'projector', 'kitchen', 'parking'], hourly: 21, daily: 130, monthly: 2300 },
  29: { id: 29, name: 'CorporateDesk Salt Lake', location: 'Salt Lake, Kolkata', capacity: 32, amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'], hourly: 18, daily: 110, monthly: 1900 },
  30: { id: 30, name: 'WorkHub Park Circus', location: 'Park Circus, Kolkata', capacity: 28, amenities: ['wifi', 'ac', 'conference', 'gym', 'kitchen'], hourly: 16, daily: 100, monthly: 1800 },
  31: { id: 31, name: 'CreativeSpace Alipore', location: 'Alipore, Kolkata', capacity: 30, amenities: ['wifi', 'ac', 'cafe', 'parking', 'projector'], hourly: 17, daily: 105, monthly: 1850 },
  32: { id: 32, name: 'OfficeHub Ballygunge', location: 'Ballygunge, Kolkata', capacity: 25, amenities: ['wifi', 'ac', 'kitchen', 'parking', 'conference'], hourly: 15, daily: 95, monthly: 1700 },
  33: { id: 33, name: 'StartHub Sector V', location: 'Sector V, Kolkata', capacity: 29, amenities: ['wifi', 'ac', 'gym', 'cafe', 'parking'], hourly: 16, daily: 100, monthly: 1800 },
  34: { id: 34, name: 'BusinessHub SG Highway', location: 'SG Highway, Ahmedabad', capacity: 33, amenities: ['wifi', 'ac', 'parking', 'conference', 'cafe'], hourly: 17, daily: 105, monthly: 1900 },
  35: { id: 35, name: 'WorkSpace Satellite', location: 'Satellite, Ahmedabad', capacity: 31, amenities: ['wifi', 'ac', 'gym', 'kitchen', 'parking'], hourly: 16, daily: 100, monthly: 1800 },
  36: { id: 36, name: 'CreativeOffice Vastrapur', location: 'Vastrapur, Ahmedabad', capacity: 36, amenities: ['wifi', 'ac', 'projector', 'cafe', 'conference'], hourly: 18, daily: 110, monthly: 2000 },
  37: { id: 37, name: 'OfficeHub Navrangpura', location: 'Navrangpura, Ahmedabad', capacity: 28, amenities: ['wifi', 'ac', 'parking', 'cafe', 'gym'], hourly: 15, daily: 95, monthly: 1700 },
  38: { id: 38, name: 'StartupHub Paldi', location: 'Paldi, Ahmedabad', capacity: 32, amenities: ['wifi', 'ac', 'kitchen', 'parking', 'conference'], hourly: 16, daily: 100, monthly: 1800 },
  39: { id: 39, name: 'BusinessDesk C-Scheme', location: 'C-Scheme, Jaipur', capacity: 32, amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'], hourly: 16, daily: 100, monthly: 1800 },
  40: { id: 40, name: 'WorkHub Malviya Nagar', location: 'Malviya Nagar, Jaipur', capacity: 29, amenities: ['wifi', 'ac', 'conference', 'gym', 'kitchen'], hourly: 15, daily: 95, monthly: 1700 },
  41: { id: 41, name: 'CreativeSpace Raja Park', location: 'Raja Park, Jaipur', capacity: 33, amenities: ['wifi', 'ac', 'cafe', 'parking', 'projector'], hourly: 17, daily: 105, monthly: 1900 },
  42: { id: 42, name: 'OfficeHub Sodala', location: 'Sodala, Jaipur', capacity: 26, amenities: ['wifi', 'ac', 'kitchen', 'parking', 'gym'], hourly: 14, daily: 90, monthly: 1600 },
  43: { id: 43, name: 'StartupDesk Vaishali Nagar', location: 'Vaishali Nagar, Jaipur', capacity: 30, amenities: ['wifi', 'ac', 'parking', 'cafe', 'conference'], hourly: 15, daily: 95, monthly: 1700 },
  44: { id: 44, name: 'CorporateHub Gomti Nagar', location: 'Gomti Nagar, Lucknow', capacity: 30, amenities: ['wifi', 'ac', 'parking', 'conference', 'cafe'], hourly: 14, daily: 85, monthly: 1500 },
  45: { id: 45, name: 'WorkSpace Hazratganj', location: 'Hazratganj, Lucknow', capacity: 27, amenities: ['wifi', 'ac', 'gym', 'kitchen', 'parking'], hourly: 13, daily: 80, monthly: 1450 },
  46: { id: 46, name: 'CreativeOffice Indira Nagar', location: 'Indira Nagar, Lucknow', capacity: 32, amenities: ['wifi', 'ac', 'projector', 'cafe', 'conference'], hourly: 15, daily: 90, monthly: 1600 },
  47: { id: 47, name: 'OfficeHub Aliganj', location: 'Aliganj, Lucknow', capacity: 24, amenities: ['wifi', 'ac', 'parking', 'cafe', 'gym'], hourly: 12, daily: 75, monthly: 1400 },
  48: { id: 48, name: 'StartupHub Balaganj', location: 'Balaganj, Lucknow', capacity: 28, amenities: ['wifi', 'ac', 'kitchen', 'parking', 'conference'], hourly: 13, daily: 80, monthly: 1450 },
  49: { id: 49, name: 'BusinessDesk Sector 17', location: 'Sector 17, Chandigarh', capacity: 34, amenities: ['wifi', 'ac', 'projector', 'parking', 'cafe'], hourly: 18, daily: 110, monthly: 1950 },
  50: { id: 50, name: 'WorkHub Sector 35', location: 'Sector 35, Chandigarh', capacity: 31, amenities: ['wifi', 'ac', 'conference', 'gym', 'kitchen'], hourly: 16, daily: 100, monthly: 1800 },
  51: { id: 51, name: 'CreativeSpace Sector 22', location: 'Sector 22, Chandigarh', capacity: 33, amenities: ['wifi', 'ac', 'cafe', 'parking', 'projector'], hourly: 17, daily: 105, monthly: 1900 },
  52: { id: 52, name: 'OfficeHub Sector 9', location: 'Sector 9, Chandigarh', capacity: 28, amenities: ['wifi', 'ac', 'kitchen', 'parking', 'gym'], hourly: 15, daily: 95, monthly: 1700 },
  53: { id: 53, name: 'StartupSpace Sector 43', location: 'Sector 43, Chandigarh', capacity: 30, amenities: ['wifi', 'ac', 'parking', 'cafe', 'conference'], hourly: 16, daily: 100, monthly: 1800 },
};

export default function SpaceDetails({ spaceId, onBook, onBack, bookedSlots = [] }: SpaceDetailsProps) {
  const [space, setSpace] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [toTime, setToTime] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [duration, setDuration] = useState<'1h' | '1d' | '1m'>('1h');
  
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('09:00');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('17:00');
  const [monthFromDate, setMonthFromDate] = useState('');
  const [monthToDate, setMonthToDate] = useState('');

  const addOnsData = [
    { id: 'projector', name: 'Projector', price: 150 },
    { id: 'parking', name: 'Parking', price: 50 },
    { id: 'locker', name: 'Locker', price: 40 },
    { id: 'conference', name: 'Conference Room', price: 300 },
  ];

  useEffect(() => {
    const mockSpace = MOCK_SPACES_MAP[spaceId] || MOCK_SPACES_MAP[1];
    setSpace({
      ...mockSpace,
      images: [
        '/modern-coworking-office.jpg',
        '/coworking-desks.jpg',
        '/modern-meeting-room.png',
      ],
      description: 'Premium co-working space with high-speed internet, comfortable seating, and professional ambiance.',
      availableSlots: [
        '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
      ],
      nearby: [
        { name: 'Brew Coffee', distance: '0.2 km' },
        { name: 'Quick Bites', distance: '0.3 km' },
        { name: 'Fresh Juice Bar', distance: '0.4 km' },
      ]
    });
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    setCheckInDate(today);
    setCheckOutDate(today);
    setMonthFromDate(today);
    // Set default month end date to 30 days later
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
    setMonthToDate(thirtyDaysLater.toISOString().split('T')[0]);
  }, [spaceId]);

  const isSlotBooked = (slot: string, date: string, endSlot?: string) => {
    const slotHour = parseInt(slot);
    const slotEndHour = endSlot ? parseInt(endSlot) : slotHour + 1;
    
    return bookedSlots.some(booked => {
      if (booked.spaceId !== spaceId || booked.date !== date) {
        return false;
      }
      
      const bookedStartHour = parseInt(booked.startTime);
      const bookedEndHour = parseInt(booked.endTime || (bookedStartHour + 1));
      
      // Check if there's any overlap between requested slot and booked slot
      return !(slotEndHour <= bookedStartHour || slotHour >= bookedEndHour);
    });
  };

  const isDateRangeBooked = (checkInDateStr: string, checkOutDateStr: string) => {
    const checkInDate = new Date(checkInDateStr);
    const checkOutDate = new Date(checkOutDateStr);
    
    return bookedSlots.some(booked => {
      if (booked.spaceId !== spaceId) return false;
      
      const bookedDate = new Date(booked.date);
      
      // Check if booking date falls within our requested range
      return bookedDate >= checkInDate && bookedDate <= checkOutDate;
    });
  };

  const isMonthRangeBooked = (fromDateStr: string, toDateStr: string) => {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
    
    return bookedSlots.some(booked => {
      if (booked.spaceId !== spaceId) return false;
      
      const bookedDate = new Date(booked.date);
      
      // Check if the booked date falls within the selected range
      return bookedDate >= fromDate && bookedDate <= toDate;
    });
  };

  const isPeakHour = (fromTime: string, toTime: string) => {
    const fromHour = parseInt(fromTime);
    const toHour = parseInt(toTime);
    // Peak hours are 12pm to 5pm (12:00 to 17:00)
    return fromHour >= 12 && toHour <= 17;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % space.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + space.images.length) % space.images.length);
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(a => a !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculatePrice = () => {
    let basePrice = 0;
    let peakHourMultiplier = 1;

    if (duration === '1h') {
      basePrice = space.hourly;
      if (selectedSlot && toTime && isPeakHour(selectedSlot, toTime)) {
        peakHourMultiplier = 1.2;
      }
    } else if (duration === '1d') {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const days = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      basePrice = space.daily * days;
    } else {
      const fromDate = new Date(monthFromDate);
      const toDate = new Date(monthToDate);
      const months = Math.max(1, Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
      basePrice = space.monthly * months;
    }

    const demandMultiplier = 1.15; // 15% demand surge
    let addOnsCost = selectedAddOns.reduce((sum, id) => {
      const addOn = addOnsData.find(a => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);

    return Math.round(basePrice * peakHourMultiplier * demandMultiplier + addOnsCost);
  };

  if (!space) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left: Images & Info */}
        <div className="md:col-span-2">
          {/* Image Carousel */}
          <div className="relative mb-6 rounded-xl overflow-hidden bg-muted">
            <img
              src={space.images[currentImageIndex] || "/placeholder.svg"}
              alt="Space"
              className="w-full h-80 object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {space.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">{space.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {space.location}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {space.capacity} people
            </div>
          </div>

          <p className="text-foreground mb-6">{space.description}</p>

          {/* Amenities */}
          <h3 className="font-bold text-lg text-foreground mb-3">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
            {space.amenities.map(amenity => (
              <div key={amenity} className="bg-card border border-border p-3 rounded-lg text-center">
                <span className="text-xl">{{
                  wifi: '📶',
                  ac: '❄️',
                  projector: '🎬',
                  parking: '🅿️',
                  conference: '🗣️',
                  kitchen: '🍽️',
                  gym: '💪',
                  cafe: '☕',
                }[amenity]}</span>
                <p className="text-xs font-medium text-foreground capitalize mt-1">{amenity}</p>
              </div>
            ))}
          </div>

          {/* Nearby Cafés */}
          <h3 className="font-bold text-lg text-foreground mb-3">Nearby Cafés</h3>
          <div className="space-y-2 mb-8">
            {space.nearby.map((cafe, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-card border border-border rounded-lg">
                <span className="font-medium text-foreground">☕ {cafe.name}</span>
                <span className="text-sm text-muted-foreground">{cafe.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking Panel */}
        <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg text-foreground mb-4">Book Now</h2>

          {/* Duration */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Duration Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['1h', '1d', '1m'] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    setDuration(opt);
                    setSelectedSlot(null);
                    setToTime(null);
                  }}
                  className={`py-2 rounded-lg font-medium transition-colors text-sm ${
                    duration === opt
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary border border-border hover:bg-muted'
                  }`}
                >
                  {opt === '1h' ? 'Hourly' : opt === '1d' ? 'Daily' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>

          {duration === '1h' && (
            <>
              {/* Hourly: Date + Time Slots */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedSlot(null);
                    setToTime(null);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">From Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {space.availableSlots.map(slot => {
                    const booked = isSlotBooked(slot, selectedDate, toTime);
                    return (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setToTime(null);
                        }}
                        disabled={booked}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                          booked
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 cursor-not-allowed opacity-60'
                            : selectedSlot === slot
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary border border-border hover:bg-muted'
                        }`}
                      >
                        {booked ? <Lock className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {bookedSlots.some(b => b.spaceId === spaceId && b.date === selectedDate) && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">Red slots are already booked</p>
                )}
              </div>

              {selectedSlot && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground mb-2">To Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {space.availableSlots.map(slot => {
                      const slotHour = parseInt(slot);
                      const fromHour = parseInt(selectedSlot);
                      if (slotHour <= fromHour) return null;
                      
                      const booked = isSlotBooked(selectedSlot, selectedDate, slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => !booked && setToTime(slot)}
                          disabled={booked}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                            booked
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 cursor-not-allowed opacity-60'
                              : toTime === slot
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary border border-border hover:bg-muted'
                          }`}
                        >
                          {booked ? <Lock className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedSlot && toTime && (
                <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs font-medium text-blue-800 dark:text-blue-300">
                    {isPeakHour(selectedSlot, toTime) 
                      ? '⚡ Peak hours (12pm-5pm): +20% surcharge applied'
                      : '✓ Non-peak hours: Regular pricing'}
                  </p>
                </div>
              )}
            </>
          )}

          {duration === '1d' && (
            <>
              {/* Daily: Check-in and Check-out */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Check-in Time</label>
                <input
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Check-out Time</label>
                <input
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              {isDateRangeBooked(checkInDate, checkOutDate) && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-800 dark:text-red-300 text-sm">
                  ⚠️ Some dates in this range are already booked
                </div>
              )}
            </>
          )}

          {duration === '1m' && (
            <>
              {/* Monthly: From Date to Date */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">From Date</label>
                <input
                  type="date"
                  value={monthFromDate}
                  onChange={(e) => setMonthFromDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  disabled={isMonthRangeBooked(monthFromDate, monthToDate)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">To Date</label>
                <input
                  type="date"
                  value={monthToDate}
                  onChange={(e) => setMonthToDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  disabled={isMonthRangeBooked(monthFromDate, monthToDate)}
                />
              </div>

              {isMonthRangeBooked(monthFromDate, monthToDate) && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-800 dark:text-red-300 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  ⚠️ These dates or part of this range are already booked for this workspace
                </div>
              )}
            </>
          )}

          {/* Add-ons */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground mb-2">Add-ons</label>
            <div className="space-y-2">
              {addOnsData.map(addon => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-colors text-sm ${
                    selectedAddOns.includes(addon.id)
                      ? 'bg-primary/10 border-primary'
                      : 'bg-secondary border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{addon.name}</span>
                    <span className="text-accent font-semibold">₹{addon.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-secondary rounded-lg p-4 mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Price</span>
              <span className="text-foreground font-medium">
                ₹{duration === '1h' ? space.hourly : duration === '1d' ? space.daily * Math.max(1, Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)) + 1) : space.monthly}
              </span>
            </div>
            {duration === '1h' && selectedSlot && toTime && isPeakHour(selectedSlot, toTime) && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Peak Hour Surcharge (+20%)</span>
                <span className="text-foreground font-medium">
                  ₹{Math.round(space.hourly * 0.2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Demand Surge (+15%)</span>
              <span className="text-foreground font-medium">
                ₹{Math.round((duration === '1h' ? space.hourly : duration === '1d' ? space.daily : space.monthly) * 0.15)}
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-accent text-lg">₹{calculatePrice()}</span>
            </div>
          </div>

          <button
            onClick={() => {
              let isValid = false;
              let bookingStartTime = '';
              let bookingEndTime = '';
              let bookingDate = '';

              if (duration === '1h') {
                isValid = !!selectedDate && !!selectedSlot && !!toTime;
                bookingStartTime = selectedSlot || '';
                bookingEndTime = toTime || '';
                bookingDate = selectedDate;
              } else if (duration === '1d') {
                isValid = !!checkInDate && !!checkOutDate;
                bookingStartTime = checkInTime;
                bookingEndTime = checkOutTime;
                bookingDate = checkInDate;
              } else {
                isValid = !!monthFromDate && !!monthToDate;
                bookingStartTime = '00:00';
                bookingEndTime = '23:59';
                bookingDate = monthFromDate;
              }

              if (!isValid) {
                alert('Please fill all required fields');
                return;
              }

              onBook({
                spaceName: space.name,
                spaceId: space.id,
                date: bookingDate,
                startTime: bookingStartTime,
                endTime: bookingEndTime,
                duration: duration,
                checkInDate: duration === '1d' ? checkInDate : undefined,
                checkOutDate: duration === '1d' ? checkOutDate : undefined,
                checkInTime: duration === '1d' ? checkInTime : undefined,
                checkOutTime: duration === '1d' ? checkOutTime : undefined,
                monthFromDate: duration === '1m' ? monthFromDate : undefined,
                monthToDate: duration === '1m' ? monthToDate : undefined,
                addOns: selectedAddOns,
                totalPrice: calculatePrice(),
              });
            }}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={duration === '1h' && (!selectedSlot || !toTime)}
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}
