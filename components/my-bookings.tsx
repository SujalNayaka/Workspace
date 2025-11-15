'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

interface Booking {
  id: string;
  spaceName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  addOns: string[];
}

interface MyBookingsProps {
  onBack: () => void;
}

export default function MyBookings({ onBack }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('coworkingBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'upcoming') return <AlertCircle className="w-4 h-4" />;
    if (status === 'completed') return <CheckCircle className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> Back Home
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-8">Manage and view all your workspace bookings</p>

        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-4 animate-pulse h-32">
                <div className="bg-muted rounded h-4 w-2/3 mb-2"></div>
                <div className="bg-muted rounded h-4 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No bookings yet</h2>
            <p className="text-muted-foreground">Start by searching and booking a workspace</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="text-lg font-bold text-foreground">{booking.spaceName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {booking.duration}
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-accent">
                        <DollarSign className="w-4 h-4" />
                        ₹{booking.totalPrice}
                      </div>
                    </div>

                    {booking.addOns.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Add-ons:</p>
                        <div className="flex flex-wrap gap-2">
                          {booking.addOns.map(addon => (
                            <span key={addon} className="px-2 py-1 bg-secondary text-xs rounded-full text-foreground">
                              {addon}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                    {booking.status === 'upcoming' && (
                      <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-lg font-medium transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
