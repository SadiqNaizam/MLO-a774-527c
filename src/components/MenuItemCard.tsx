import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast"; // For user feedback

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string) => void;
  className?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  className,
}) => {
  // const { toast } = useToast(); // Initialize toast for feedback
  console.log("Rendering MenuItemCard:", name);

  const handleAddToCart = () => {
    console.log("Adding to cart:", name, id);
    onAddToCart(id);
    // Example toast notification:
    // toast({
    //   title: `${name} added to cart!`,
    //   description: `Price: $${price.toFixed(2)}`,
    // });
  };

  return (
    <Card className={`w-full overflow-hidden flex flex-col sm:flex-row ${className}`}>
      {imageUrl && (
        <div className="sm:w-1/3 w-full flex-shrink-0">
          <AspectRatio ratio={4/3} className="bg-muted">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </div>
      )}
      <CardContent className={`p-4 flex flex-col justify-between flex-grow ${imageUrl ? 'sm:w-2/3 w-full' : 'w-full'}`}>
        <div>
          <h3 className="text-md font-semibold mb-1 truncate" title={name}>{name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2" title={description}>
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} aria-label={`Add ${name} to cart`}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;