import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  rating: number; // e.g., 4.5
  deliveryTimeEstimate: string; // e.g., "25-35 min"
  onClick: (id: string) => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTimeEstimate,
  onClick,
  className,
}) => {
  console.log("Rendering RestaurantCard:", name);

  return (
    <Card
      className={`w-full overflow-hidden transition-all hover:shadow-lg cursor-pointer ${className}`}
      onClick={() => onClick(id)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(id)}
      aria-label={`View details for ${name}`}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={`Image of ${name}`}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate" title={name}>{name}</h3>
        {cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {cuisineTypes.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{deliveryTimeEstimate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;