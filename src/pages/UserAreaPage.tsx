import React, { useState } from 'react';
import FixedBottomNavigation from '@/components/navigation/FixedBottomNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Home, ShoppingCart, User2 as UserIconLucide, Utensils, ClipboardList, Edit3, MapPin, CreditCardIcon, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/restaurant-detail', label: 'Restaurants', icon: Utensils },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/user-profile', label: 'Profile', icon: UserIconLucide },
];

const pastOrders = [
  { id: 'ORD001', date: '2023-10-26', status: 'Delivered', total: 25.99, items: 'Pizza, Coke' },
  { id: 'ORD002', date: '2023-10-20', status: 'Delivered', total: 15.50, items: 'Burger, Fries' },
  { id: 'ORD003', date: '2023-10-15', status: 'Cancelled', total: 30.00, items: 'Sushi Platter' },
];

const UserAreaPage = () => {
  console.log('UserAreaPage loaded');
  // const navigate = useNavigate();
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [userName, setUserName] = useState("Alex Johnson");
  const [userEmail, setUserEmail] = useState("alex.johnson@example.com");
  const [userPhone, setUserPhone] = useState("555-123-4567");

  const handleLogout = () => {
    console.log("User logged out");
    // navigate('/login'); // Assuming a login page exists
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="https://source.unsplash.com/random/100x100?person" alt={userName} />
            <AvatarFallback>{userName.substring(0,1)}J</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold">{userName}</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" />Logout</Button>
      </header>

      <ScrollArea className="flex-grow pb-20"> {/* pb-20 for FixedBottomNavigation */}
        <Tabs defaultValue="orders" className="p-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4">
            <TabsTrigger value="orders"><ClipboardList className="h-4 w-4 mr-1 inline-block"/>My Orders</TabsTrigger>
            <TabsTrigger value="profile"><UserIconLucide className="h-4 w-4 mr-1 inline-block"/>Profile</TabsTrigger>
            <TabsTrigger value="addresses"><MapPin className="h-4 w-4 mr-1 inline-block"/>Addresses</TabsTrigger>
            <TabsTrigger value="payment"><CreditCardIcon className="h-4 w-4 mr-1 inline-block"/>Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past and current orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {order.status}
                            </span>
                        </TableCell>
                        <TableCell className="truncate max-w-[100px] sm:max-w-[200px]">{order.items}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell><Button variant="outline" size="sm">View</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {pastOrders.length === 0 && <p className="text-center text-muted-foreground py-4">No orders yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your profile details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profileName">Full Name</Label>
                  <Input id="profileName" value={userName} onChange={(e) => setUserName(e.target.value)} disabled={!isProfileEditing} />
                </div>
                <div>
                  <Label htmlFor="profileEmail">Email Address</Label>
                  <Input id="profileEmail" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} disabled={!isProfileEditing} />
                </div>
                <div>
                  <Label htmlFor="profilePhone">Phone Number</Label>
                  <Input id="profilePhone" type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} disabled={!isProfileEditing} />
                </div>
              </CardContent>
              <CardFooter>
                {isProfileEditing ? (
                    <Button onClick={() => setIsProfileEditing(false)}>Save Changes</Button>
                ) : (
                    <Button variant="outline" onClick={() => setIsProfileEditing(true)}><Edit3 className="h-4 w-4 mr-2"/>Edit Profile</Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your delivery addresses.</CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild><Button variant="outline">Add New</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Add New Address</DialogTitle></DialogHeader>
                        <div className="space-y-2 py-2">
                            <Label htmlFor="new-address-street">Street</Label><Input id="new-address-street" placeholder="123 Main St"/>
                            <Label htmlFor="new-address-city">City</Label><Input id="new-address-city" placeholder="Anytown"/>
                        </div>
                        <DialogFooter><Button type="submit">Save Address</Button></DialogFooter>
                    </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {/* Placeholder for address list */}
                <div className="p-4 border rounded-md">
                    <p className="font-semibold">Home</p>
                    <p>123 Main St, Anytown, NY 10001</p>
                    <div className="mt-2 space-x-2">
                        <Button variant="link" size="sm" className="p-0 h-auto">Edit</Button>
                        <Button variant="link" size="sm" className="p-0 h-auto text-red-500">Delete</Button>
                    </div>
                </div>
                <p className="text-center text-muted-foreground py-4">No saved addresses yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your saved payment methods.</CardDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild><Button variant="outline">Add New</Button></DialogTrigger>
                        <DialogContent>
                             <DialogHeader><DialogTitle>Add New Payment Method</DialogTitle></DialogHeader>
                             {/* Payment form fields */}
                             <p className="py-4">Form for new payment method...</p>
                             <DialogFooter><Button type="submit">Save Payment</Button></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for payment methods list */}
                    <div className="p-4 border rounded-md">
                        <p className="font-semibold">Visa **** **** **** 1234</p>
                        <p>Expires 12/25</p>
                        <div className="mt-2 space-x-2">
                            <Button variant="link" size="sm" className="p-0 h-auto">Edit</Button>
                            <Button variant="link" size="sm" className="p-0 h-auto text-red-500">Delete</Button>
                        </div>
                    </div>
                    <p className="text-center text-muted-foreground py-4">No saved payment methods.</p>
                </CardContent>
             </Card>
          </TabsContent>

        </Tabs>
      </ScrollArea>

      <FixedBottomNavigation navItems={navItems} />
    </div>
  );
};

export default UserAreaPage;