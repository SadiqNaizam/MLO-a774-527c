import React, { useState } from 'react';
import FixedBottomNavigation from '@/components/navigation/FixedBottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Home, ShoppingCart, User2, Utensils, Trash2, Plus, Minus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'item1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100?margherita-pizza' },
  { id: 'item2', name: 'Coca-Cola', price: 2.50, quantity: 2, imageUrl: 'https://source.unsplash.com/random/100x100?coca-cola' },
];

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/restaurant-detail', label: 'Restaurants', icon: Utensils },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/user-profile', label: 'Profile', icon: User2 },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  // const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fee
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    console.log('Proceed to checkout');
    // navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-center">Your Cart</h1>
      </header>

      <ScrollArea className="flex-grow p-4 pb-20"> {/* pb-20 for FixedBottomNavigation */}
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">Your cart is empty.</p>
            <Button onClick={() => { /* navigate('/'); */ }} className="mt-4">Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-2/5">Item</TableHead>
                      <TableHead className="w-1/5 text-center">Quantity</TableHead>
                      <TableHead className="w-1/5 text-right">Price</TableHead>
                      <TableHead className="w-1/5 text-right">Total</TableHead>
                      <TableHead className="w-auto"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium flex items-center">
                          {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md mr-2 object-cover"/>}
                          {item.name}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}><Minus className="h-3 w-3"/></Button>
                            <Input type="number" value={item.quantity} readOnly className="w-10 h-7 text-center p-0" />
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}><Plus className="h-3 w-3"/></Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label="Remove item">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </ScrollArea>

      <FixedBottomNavigation navItems={navItems} />
    </div>
  );
};

export default CartPage;