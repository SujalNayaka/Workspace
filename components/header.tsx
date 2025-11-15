'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Calendar, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  onMyBookings: () => void;
  onHome: () => void;
}

export default function Header({ onMyBookings, onHome }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onHome}
          className="text-2xl font-bold text-accent hover:text-accent/90 transition-colors"
        >
          Workspace
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">My Account</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onMyBookings}>
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
