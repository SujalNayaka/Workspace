'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Users, Clock, Lock } from 'lucide-react';

interface SpaceDetailsProps {
  spaceId: number;
  onBook: (data: any) => void;
  onBack: () => void;
  bookedSlots?: any[];
}

export default function SpaceDetails({ spaceId, onBook, onBack, bookedSlots = [] }: SpaceDetailsProps) {
  const [space, setSpace] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [duration, setDuration] = useState<'1h' | '1d' | '1m'>('1h');

  const addOnsData = [
    { id: 'projector', name: 'Projector', price: 150 },
    { id: 'parking', name: 'Parking', price: 50 },
    { id: 'locker', name: 'Locker', price: 40 },
    { id: 'conference', name: 'Conference Room', price: 300 },
  ];

  useEffect(() => {
    const mockSpace = {
      id: spaceId,
      name: 'TechHub Downtown',
      images: [
        '/modern-coworking-office.jpg',
        '/coworking-desks.jpg',
        '/modern-meeting-room.png',
      ],
      location: 'Downtown, Bangalore',
      capacity: 30,
      amenities: ['wifi', 'ac', 'projector', 'parking', 'conference', 'kitchen'],
      hourly: 25,
      daily: 150,
      monthly: 2500,
      description: 'Premium co-working space with high-speed internet, comfortable seating, and professional ambiance.',
      availableSlots: [
        '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
      ],
      nearby: [
        { name: 'Brew Coffee', distance: '0.2 km' },
        { name: 'Quick Bites', distance: '0.3 km' },
        { name: 'Fresh Juice Bar', distance: '0.4 km' },
      ]
    };
    setSpace(mockSpace);
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, [spaceId]);

  const isSlotBooked = (slot: string) => {
    return bookedSlots.some(
      booked => booked.spaceId === spaceId && 
                 booked.date === selectedDate && 
                 booked.startTime === slot
    );
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
    if (duration === '1h') basePrice = space.hourly;
    else if (duration === '1d') basePrice = space.daily;
    else basePrice = space.monthly;

    const demandMultiplier = 1.15; // 15% demand surge
    const peakHourSurcharge = selectedSlot && parseInt(selectedSlot) >= 10 && parseInt(selectedSlot) <= 17 ? 1.2 : 1;

    let addOnsCost = selectedAddOns.reduce((sum, id) => {
      const addOn = addOnsData.find(a => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);

    return Math.round(basePrice * demandMultiplier * peakHourSurcharge + addOnsCost);
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

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null); // Reset slot when date changes
              }}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground mb-2">Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {(['1h', '1d', '1m'] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setDuration(opt)}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    duration === opt
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary border border-border hover:bg-muted'
                  }`}
                >
                  {opt === '1h' ? '1h' : opt === '1d' ? '1 Day' : '1 Month'}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground mb-2">Time Slot</label>
            <div className="grid grid-cols-2 gap-2">
              {space.availableSlots.map(slot => {
                const booked = isSlotBooked(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => !booked && setSelectedSlot(slot)}
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
              <span className="text-foreground font-medium">₹{duration === '1h' ? space.hourly : duration === '1d' ? space.daily : space.monthly}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Demand Surge (+15%)</span>
              <span className="text-foreground font-medium">₹{Math.round((duration === '1h' ? space.hourly : duration === '1d' ? space.daily : space.monthly) * 0.15)}</span>
            </div>
            {selectedSlot && parseInt(selectedSlot) >= 10 && parseInt(selectedSlot) <= 17 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Peak Hour Surcharge (+20%)</span>
                <span className="text-accent font-medium">₹{Math.round((duration === '1h' ? space.hourly : duration === '1d' ? space.daily : space.monthly) * 0.2)}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-accent text-lg">₹{calculatePrice()}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!selectedDate || !selectedSlot) {
                alert('Please select date and time slot');
                return;
              }
              onBook({
                spaceName: space.name,
                date: selectedDate,
                startTime: selectedSlot,
                duration: duration,
                addOns: selectedAddOns,
                totalPrice: calculatePrice(),
              });
            }}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 rounded-lg transition-colors"
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}
