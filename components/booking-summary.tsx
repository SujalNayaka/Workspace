'use client';

import { useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface BookingSummaryProps {
  bookingData: any;
  onConfirm: (data: any) => void;
  onBack: () => void;
}

export default function BookingSummary({ bookingData, onConfirm, onBack }: BookingSummaryProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleConfirm = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    // Simulate API call
    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const qrString = `BOOKING_ID:${bookingId}`;

    onConfirm({
      ...bookingData,
      bookingId,
      qrCode: qrString,
    });
  };

  const endTime = bookingData.startTime
    ? `${String(parseInt(bookingData.startTime) + (bookingData.duration === '1h' ? 1 : 24)).padStart(2, '0')}:00`
    : '';

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Booking Summary</h1>

        {/* Smart Alert */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-accent">Peak Hour Booking</p>
            <p className="text-sm text-muted-foreground">You're booking during peak hours (10 AM - 5 PM). Higher demand = higher prices.</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Workspace</p>
              <p className="text-lg font-bold text-foreground">{bookingData.spaceName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="text-lg font-bold text-foreground">{new Date(bookingData.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Time</p>
              <p className="text-lg font-bold text-foreground">{bookingData.startTime} - {endTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Duration</p>
              <p className="text-lg font-bold text-foreground">
                {bookingData.duration === '1h' ? '1 Hour' : bookingData.duration === '1d' ? '1 Day' : '1 Month'}
              </p>
            </div>
          </div>

          {/* Add-ons */}
          {bookingData.addOns && bookingData.addOns.length > 0 && (
            <>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground mb-3">Add-ons</p>
                <div className="space-y-2">
                  {bookingData.addOns.map((addon: string, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{addon}</span>
                      <span className="font-medium text-foreground">
                        ₹{addon === 'conference' ? 300 : addon === 'projector' ? 150 : addon === 'parking' ? 50 : 40}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="bg-secondary rounded-xl p-6 mb-8 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Price</span>
            <span className="font-medium text-foreground">₹{bookingData.basePrice || 150}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Demand Surcharge (+15%)</span>
            <span className="font-medium text-foreground">₹{Math.round((bookingData.basePrice || 150) * 0.15)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Peak Hour Surcharge (+20%)</span>
            <span className="font-medium text-accent">₹{Math.round((bookingData.basePrice || 150) * 0.2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-bold text-foreground">Total Amount</span>
            <span className="font-bold text-accent text-xl">₹{bookingData.totalPrice || 0}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-8">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the <span className="text-primary hover:underline cursor-pointer">terms and conditions</span> and understand the cancellation policy
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors font-semibold text-foreground"
          >
            Edit Booking
          </button>
          <button
            onClick={handleConfirm}
            disabled={!agreedToTerms}
            className="flex-1 px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground text-accent-foreground font-bold transition-colors"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
