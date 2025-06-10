import React from 'react';
import LocationDisplaySelector from '@/components/LocationDisplaySelector';
import RestaurantCard from '@/components/RestaurantCard';
import FixedBottomNavigation from '@/components/navigation/FixedBottomNavigation';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Home, ShoppingCart, User2, Search as SearchIcon, Utensils } from 'lucide-react';

const placeholderRestaurants = [
  { id: '1', name: 'Pizza Heaven', imageUrl: 'https://source.unsplash.com/random/400x300?pizza', cuisineTypes: ['Pizza', 'Italian'], rating: 4.5, deliveryTimeEstimate: '25-35 min' },
  { id: '2', name: 'Burger Joint', imageUrl: 'https://source.unsplash.com/random/400x300?burger', cuisineTypes: ['Burgers', 'American'], rating: 4.2, deliveryTimeEstimate: '20-30 min' },
  { id: '3', name: 'Sushi Central', imageUrl: 'https://source.unsplash.com/random/400x300?sushi', cuisineTypes: ['Sushi', 'Japanese'], rating: 4.8, deliveryTimeEstimate: '30-40 min' },
  { id: '4', name: 'Curry House', imageUrl: 'https://source.unsplash.com/random/400x300?curry', cuisineTypes: ['Indian', 'Curry'], rating: 4.6, deliveryTimeEstimate: '35-45 min' },
];

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/restaurant-detail', label: 'Restaurants', icon: Utensils }, // Example, link to a generic detail or first restaurant
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/user-profile', label: 'Profile', icon: User2 },
];

const MainDisplayPage = () => {
  console.log('MainDisplayPage loaded');

  const handleLocationChange = () => {
    console.log('Change location clicked');
    // Logic to change location, e.g., open a modal
  };

  const handleRestaurantClick = (id: string) => {
    console.log('Restaurant clicked:', id);
    // Navigate to restaurant detail page, e.g., navigate(`/restaurants/${id}`);
    // For now, can navigate to the generic /restaurant-detail
    // navigate('/restaurant-detail'); // Requires useNavigate from react-router-dom
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white shadow-sm p-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <LocationDisplaySelector
          currentLocation="New York, NY"
          onChangeLocationClick={handleLocationChange}
          className="w-full sm:w-auto"
        />
        <div className="relative w-full sm:w-auto sm:max-w-md flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="restaurant-search-main"
            type="search"
            placeholder="Search food, restaurants..."
            className="pl-10 w-full"
          />
          <Label htmlFor="restaurant-search-main" className="sr-only">Search food or restaurants</Label>
        </div>
      </header>

      <ScrollArea className="flex-grow p-4 pb-20"> {/* pb-20 for FixedBottomNavigation */}
        <section aria-labelledby="featured-restaurants-heading">
          <h2 id="featured-restaurants-heading" className="text-2xl font-semibold mb-4">Featured Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {placeholderRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={handleRestaurantClick}
              />
            ))}
          </div>
        </section>
      </ScrollArea>

      <FixedBottomNavigation navItems={navItems} />
    </div>
  );
};

export default MainDisplayPage;