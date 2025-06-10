import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationDisplaySelectorProps {
  currentLocation: string;
  onChangeLocationClick: () => void;
  className?: string;
}

const LocationDisplaySelector: React.FC<LocationDisplaySelectorProps> = ({
  currentLocation,
  onChangeLocationClick,
  className,
}) => {
  console.log("Rendering LocationDisplaySelector with location:", currentLocation);

  return (
    <Button
      variant="ghost"
      onClick={onChangeLocationClick}
      className={`flex items-center space-x-2 p-2 ${className}`}
      aria-label={`Change location, current location: ${currentLocation}`}
    >
      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
      <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-[200px]">
        {currentLocation || "Select Location"}
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </Button>
  );
};

export default LocationDisplaySelector;