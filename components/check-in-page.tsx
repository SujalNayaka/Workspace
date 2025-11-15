'use client';

import { useState, useRef } from 'react';
import { QrCode, CheckCircle2, AlertCircle } from 'lucide-react';

interface CheckInPageProps {
  onBack: () => void;
}

export default function CheckInPage({ onBack }: CheckInPageProps) {
  const [qrInput, setQrInput] = useState('');
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCheckIn = async () => {
    if (!qrInput.trim()) {
      setCheckInStatus('error');
      setMessage('Please enter or scan a QR code');
      return;
    }

    // Simulate API call to validate QR
    if (qrInput.startsWith('BOOKING_ID:')) {
      setCheckInStatus('success');
      setMessage('Check-in successful! Welcome to your workspace.');
      setTimeout(() => onBack(), 2000);
    } else {
      setCheckInStatus('error');
      setMessage('Invalid QR code. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, would use QR code reader library
      setQrInput('BOOKING_ID:ABC123XYZ');
      handleCheckIn();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <QrCode className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Check In</h1>
          <p className="text-muted-foreground">Scan or enter your QR code to check in</p>
        </div>

        {/* QR Input Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
          {/* Status Messages */}
          {checkInStatus === 'success' && (
            <div className="bg-accent/10 border border-accent rounded-lg p-4 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-accent">{message}</p>
            </div>
          )}
          {checkInStatus === 'error' && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-destructive">{message}</p>
            </div>
          )}

          {/* QR Input Field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">QR Code / Booking ID</label>
            <input
              type="text"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              placeholder="BOOKING_ID:ABC123XYZ"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              onKeyPress={(e) => e.key === 'Enter' && handleCheckIn()}
            />
          </div>

          {/* Buttons */}
          <button
            onClick={handleCheckIn}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-colors"
          >
            Check In
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border hover:bg-muted transition-colors font-semibold text-foreground"
          >
            📸 Scan QR Code
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <button
          onClick={onBack}
          className="w-full px-6 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors font-semibold text-foreground"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
