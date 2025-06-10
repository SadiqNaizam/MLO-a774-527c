import React, { useState } from 'react';
import MenuItemCard from '@/components/MenuItemCard';
import FixedBottomNavigation from '@/components/navigation/FixedBottomNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Home, ShoppingCart, User2, Star, Clock, Utensils, ChevronLeft } from 'lucide-react';

const placeholderMenuItems = [
  { id: 'item1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://source.unsplash.com/random/300x200?margherita-pizza' },
  { id: 'item2', name: 'Pepperoni Pizza', description: 'Pizza with pepperoni slices.', price: 14.99, imageUrl: 'https://source.unsplash.com/random/300x200?pepperoni-pizza' },
  { id: 'item3', name: 'Coca-Cola', description: 'Refreshing soft drink.', price: 2.50, imageUrl: 'https://source.unsplash.com/random/300x200?coca-cola' },
  { id: 'item4', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 5.00, imageUrl: 'https://source.unsplash.com/random/300x200?garlic-bread' },
];

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/restaurant-detail', label: 'Restaurants', icon: Utensils },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/user-profile', label: 'Profile', icon: User2 },
];

const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');
  const [showAddedToCartDialog, setShowAddedToCartDialog] = useState(false);
  const [lastAddedItemName, setLastAddedItemName] = useState('');

  const handleAddToCart = (itemId: string) => {
    const item = placeholderMenuItems.find(mi => mi.id === itemId);
    console.log('Add to cart clicked for item:', itemId);
    if (item) {
        setLastAddedItemName(item.name);
        setShowAddedToCartDialog(true);
    }
    // Actual cart logic would go here
  };

  // const navigate = useNavigate(); // requires import from react-router-dom

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow-sm flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="mr-2"> {/* Simple back navigation */}
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Pizza Heaven</h1> {/* Placeholder restaurant name */}
      </header>

      <ScrollArea className="flex-grow pb-20"> {/* pb-20 for FixedBottomNavigation */}
        {/* Restaurant Info Header */}
        <section className="p-4 bg-white">
          <div className="flex items-center mb-4">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src="https://source.unsplash.com/random/100x100?restaurant-logo" alt="Restaurant Logo" />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">Pizza Heaven</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" /> 4.5
                <span className="mx-2">|</span>
                <Clock className="h-4 w-4 mr-1" /> 25-35 min
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">Pizza</Badge>
            <Badge variant="secondary">Italian</Badge>
            <Badge variant="secondary">Fast Food</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Serving the best pizzas in town. Open daily from 11 AM to 11 PM.
          </p>
        </section>

        <Separator />

        {/* Menu Section */}
        <section className="p-4">
          <h3 className="text-xl font-semibold mb-4">Full Menu</h3>
          <div className="space-y-4">
            {placeholderMenuItems.map(item => (
              <MenuItemCard
                key={item.id}
                {...item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
        
        <AlertDialog open={showAddedToCartDialog} onOpenChange={setShowAddedToCartDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Item Added to Cart!</AlertDialogTitle>
              <AlertDialogDescription>
                {lastAddedItemName} has been successfully added to your cart.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowAddedToCartDialog(false)}>Continue Shopping</AlertDialogAction>
              {/* <AlertDialogAction onClick={() => navigate('/cart')}>View Cart</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </ScrollArea>

      <FixedBottomNavigation navItems={navItems} />
    </div>
  );
};

export default RestaurantDetailPage;