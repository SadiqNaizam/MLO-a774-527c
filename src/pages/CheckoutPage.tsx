import React from 'react';
import FixedBottomNavigation from '@/components/navigation/FixedBottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Home, ShoppingCart, User2, Utensils, CreditCard, Truck } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/restaurant-detail', label: 'Restaurants', icon: Utensils },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/user-profile', label: 'Profile', icon: User2 },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Placing order...');
    // navigate('/order-confirmation'); // Or similar
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-center">Checkout</h1>
      </header>

      {/* Using HTML form for structure; shadcn Form for full features needs react-hook-form */}
      <form onSubmit={handleSubmit} className="flex-grow p-4 pb-20 space-y-6 overflow-y-auto"> {/* pb-20 for FixedBottomNavigation */}
        <Accordion type="multiple" defaultValue={['delivery-address', 'payment-method']} className="w-full space-y-4">
          <AccordionItem value="delivery-address">
            <AccordionTrigger className="text-lg font-medium p-4 bg-white rounded-t-lg shadow">
                <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" /> Delivery Address
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-white rounded-b-lg shadow">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" defaultValue="John Doe" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="123-456-7890" defaultValue="123-456-7890" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" defaultValue="123 Main St" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" defaultValue="Anytown" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue="NY">
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" defaultValue="10001"/>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payment-method">
            <AccordionTrigger className="text-lg font-medium p-4 bg-white rounded-t-lg shadow">
                <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" /> Payment Method
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-white rounded-b-lg shadow">
              <RadioGroup defaultValue="credit-card" className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card">Credit/Debit Card</Label>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="•••" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your items before placing the order.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Placeholder summary - in a real app, this would be dynamic */}
            <div className="flex justify-between"><span>Margherita Pizza (x1)</span><span>$12.99</span></div>
            <div className="flex justify-between"><span>Coca-Cola (x2)</span><span>$5.00</span></div>
            <div className="flex justify-between border-t pt-2 mt-2"><span>Subtotal</span><span>$17.99</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>$5.00</span></div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total</span><span>$22.99</span></div>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2 mt-6">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            I agree to the <a href="#" className="underline">terms and conditions</a>.
          </Label>
        </div>

        <Button type="submit" size="lg" className="w-full mt-6">
          Place Order ($22.99)
        </Button>
      </form>

      <FixedBottomNavigation navItems={navItems} />
    </div>
  );
};

export default CheckoutPage;