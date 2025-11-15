'use client';

import { useState, useEffect } from 'react';
import LandingPage from '@/components/landing-page';
import SearchResults from '@/components/search-results';
import SpaceDetails from '@/components/space-details';
import BookingSummary from '@/components/booking-summary';
import BookingConfirmation from '@/components/booking-confirmation';
import CheckInPage from '@/components/check-in-page';
import MyBookings from '@/components/my-bookings';
import Header from '@/components/header';
import { ThemeToggle } from '@/components/theme-toggle';

type PageState = 'landing' | 'search' | 'details' | 'summary' | 'confirmation' | 'checkin' | 'mybookings';

interface SearchParams {
  location: string;
  date: string;
  amenities: string[];
}

interface BookingState {
  spaceId?: number;
  spaceName?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  addOns?: string[];
  totalPrice?: number;
  bookingId?: string;
  qrCode?: string;
  monthFromDate?: string;
  monthToDate?: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [searchParams, setSearchParams] = useState<SearchParams>({ location: '', date: '', amenities: [] });
  const [bookingData, setBookingData] = useState<BookingState>({});
  const [isDark, setIsDark] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Show header only when not on landing page
    setShowHeader(currentPage !== 'landing');
  }, [currentPage]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setCurrentPage('search');
  };

  const handleSelectSpace = (spaceId: number) => {
    setBookingData({ ...bookingData, spaceId });
    setCurrentPage('details');
  };

  const handleBooking = (data: Partial<BookingState>) => {
    setBookingData({ ...bookingData, ...data });
    setCurrentPage('summary');
  };

  const handleConfirmBooking = async (data: BookingState) => {
    const bookingId = 'BK' + Date.now();
    const bookingWithId = {
      ...data,
      bookingId,
      status: 'upcoming' as const,
    };

    // Save to bookings list
    const savedBookings = localStorage.getItem('coworkingBookings');
    const bookings = savedBookings ? JSON.parse(savedBookings) : [];
    bookings.push({
      id: bookingId,
      ...bookingWithId,
    });
    localStorage.setItem('coworkingBookings', JSON.stringify(bookings));

    const bookedSlots = localStorage.getItem('bookedSlots');
    const slots = bookedSlots ? JSON.parse(bookedSlots) : [];
    
    if (data.duration === '1m') {
      const fromDate = new Date(data.monthFromDate!);
      const toDate = new Date(data.monthToDate!);
      
      // Create a slot entry for each day in the monthly booking range
      for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
        slots.push({
          spaceId: data.spaceId,
          date: d.toISOString().split('T')[0],
          startTime: '00:00',
          endTime: '23:59',
          bookingId,
        });
      }
    } else {
      const startHour = parseInt(data.startTime!);
      const endHour = data.duration === '1h' 
        ? startHour + 1 
        : data.duration === '1d'
        ? startHour + 24
        : startHour; // For monthly, just store start time

      slots.push({
        spaceId: data.spaceId,
        date: data.date,
        startTime: data.startTime,
        endTime: String(endHour).padStart(2, '0') + ':00',
        bookingId,
      });
    }
    
    localStorage.setItem('bookedSlots', JSON.stringify(slots));

    setBookingData(bookingWithId);
    setCurrentPage('confirmation');
  };

  const handleCheckIn = () => {
    setCurrentPage('checkin');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setBookingData({});
  };

  const handleMyBookings = () => {
    setCurrentPage('mybookings');
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {showHeader && (
          <Header onMyBookings={handleMyBookings} onHome={handleBackToLanding} />
        )}

        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        {currentPage === 'landing' && (
          <LandingPage onSearch={handleSearch} />
        )}
        {currentPage === 'search' && (
          <SearchResults 
            searchParams={searchParams} 
            onSelectSpace={handleSelectSpace}
            onBack={handleBackToLanding}
          />
        )}
        {currentPage === 'details' && (
          <SpaceDetails 
            spaceId={bookingData.spaceId!}
            onBook={handleBooking}
            onBack={() => setCurrentPage('search')}
            bookedSlots={localStorage.getItem('bookedSlots') ? JSON.parse(localStorage.getItem('bookedSlots')!) : []}
          />
        )}
        {currentPage === 'summary' && (
          <BookingSummary 
            bookingData={bookingData}
            onConfirm={handleConfirmBooking}
            onBack={() => setCurrentPage('details')}
          />
        )}
        {currentPage === 'confirmation' && (
          <BookingConfirmation 
            bookingData={bookingData}
            onCheckIn={handleCheckIn}
            onBackToHome={handleBackToLanding}
          />
        )}
        {currentPage === 'checkin' && (
          <CheckInPage 
            onBack={handleBackToLanding}
          />
        )}
        {currentPage === 'mybookings' && (
          <MyBookings onBack={handleBackToLanding} />
        )}
      </div>
    </div>
  );
}
