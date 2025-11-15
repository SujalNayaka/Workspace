'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { CheckCircle2, Download, Share2 } from 'lucide-react';

interface BookingConfirmationProps {
  bookingData: any;
  onCheckIn: () => void;
  onBackToHome: () => void;
}

export default function BookingConfirmation({ bookingData, onCheckIn, onBackToHome }: BookingConfirmationProps) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(bookingData.qrCode)
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [bookingData.qrCode]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `booking-${bookingData.bookingId}.png`;
    link.click();
  };

  const handleShare = () => {
    const text = `I booked ${bookingData.spaceName} on ${bookingData.date} with SpaceHub! Booking ID: ${bookingData.bookingId}`;
    if (navigator.share) {
      navigator.share({ title: 'My SpaceHub Booking', text });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-bounce">
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">Get ready for a productive session</p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8 space-y-6">
          {/* Booking ID */}
          <div className="text-center bg-secondary rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">BOOKING ID</p>
            <p className="text-2xl font-bold text-primary font-mono">{bookingData.bookingId}</p>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase">Workspace</p>
              <p className="text-lg font-bold text-foreground">{bookingData.spaceName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase">Date</p>
              <p className="text-lg font-bold text-foreground">{new Date(bookingData.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase">Time</p>
              <p className="text-lg font-bold text-foreground">{bookingData.startTime} onwards</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase">Total Amount</p>
              <p className="text-lg font-bold text-accent">₹{bookingData.totalPrice}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="border-t border-border pt-6">
            <p className="text-center font-semibold text-foreground mb-4">Your Check-in Code</p>
            <div className="flex justify-center mb-4">
              {qrDataUrl && (
                <div className="bg-white p-4 rounded-lg">
                  <img src={qrDataUrl || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
                </div>
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground">Show this QR code at the entrance for seamless check-in</p>
          </div>

          {/* Add-ons Reminder */}
          {bookingData.addOns && bookingData.addOns.length > 0 && (
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="font-semibold text-accent mb-2">Your Add-ons</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {bookingData.addOns.map((addon: string, i: number) => (
                  <li key={i} className="capitalize">✓ {addon}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors font-semibold text-foreground"
          >
            <Download className="w-5 h-5" /> Download
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors font-semibold text-foreground"
          >
            <Share2 className="w-5 h-5" /> Share
          </button>
          <button
            onClick={onCheckIn}
            className="px-4 py-3 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-bold transition-colors"
          >
            Check In Now
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="w-full px-6 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors font-semibold text-foreground"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
