import React, { useState, type ChangeEvent } from 'react'; // Added ChangeEvent
import { 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  Calendar, 
  Loader2 
} from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { useNavigate } from 'react-router-dom';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BookingFlightPNR = () => {
  const navigate = useNavigate();
  
  // State Management
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [passportNumber, setPassportNumber] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  // OCR Logic
 const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileUploaded(true);
    setFileName(file.name);
    setIsScanning(true);

    try {
      // 1. Create and initialize the worker properly
      const worker = await createWorker('eng');
      
      // 2. Perform recognition
      const { data: { text } } = await worker.recognize(file);
      console.log("Extracted Text:", text); // Debugging: See what was scanned

      // 3. Improved Regex: Handles potential spaces or OCR artifacts
      // Most passports are Letter + 7-8 digits (e.g., A12345678)
      const passportRegex = /([A-Z]{1,2}[0-9]{6,9})/i; 
      const matches = text.replace(/\s/g, '').match(passportRegex);

      if (matches && matches[0]) {
        // Set the state and force it to uppercase
        setPassportNumber(matches[0].toUpperCase()); 
      } else {
        alert("Could not detect a clear passport number. Please enter manually.");
      }

      await worker.terminate();
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-24 py-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-8 px-4">
        
        {/* Stepper Navigation */}
        <div className="hidden sm:flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-primary font-medium">
            <div className="w-6 h-6 rounded-full border border-primary flex items-center justify-center">A</div>
            <span>Add Passenger<br/><span className="text-xs font-normal text-muted-foreground">Enter passenger info</span></span>
          </div>
          <ChevronRight className="w-4 h-4" />
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full border border-muted-foreground flex items-center justify-center">R</div>
            <span>Review Booking<br/><span className="text-xs font-normal">Confirm details</span></span>
          </div>
          <ChevronRight className="w-4 h-4" />
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full border border-muted-foreground flex items-center justify-center">C</div>
            <span>Confirmation<br/><span className="text-xs font-normal">Booking confirmed</span></span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Add Passenger Details</h1>
          <p className="text-muted-foreground">Enter passenger information and select add-ons</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Passenger Details</h2>
            <div className="flex items-center space-x-2">
              <Label htmlFor="expand-all" className="text-sm font-medium cursor-pointer">Expand All</Label>
              <Checkbox id="expand-all" />
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="adult-1" className="w-full">
            <AccordionItem value="adult-1" className="border rounded-lg bg-card">
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-t-lg transition-colors">
                <span className="font-semibold text-card-foreground uppercase">Adult 1: (12 + yrs)</span>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-6">
                
                {/* Unified OCR Upload Section */}
                <div className={`p-4 border rounded-md transition-all ${
                  fileUploaded ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-3">
                    {isScanning ? (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    ) : fileUploaded ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Upload className="w-5 h-5 text-blue-600" />
                    )}
                    <h3 className={`font-semibold text-sm uppercase ${fileUploaded ? 'text-green-700 dark:text-green-400' : 'text-blue-700 dark:text-blue-400'}`}>
                      {isScanning ? "Scanning Passport..." : "Auto-fill from Passport Image"}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="passport-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <Button variant="outline" className="bg-background" asChild>
                      <label htmlFor="passport-upload" className="cursor-pointer">Choose File</label>
                    </Button>
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {isScanning ? 'Processing image...' : fileName}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload a clear image of your passport. Supported formats: JPG, PNG, WEBP (Max 5MB)
                  </p>
                </div>

                {/* Personal Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase">Title *</Label>
                    <Select defaultValue="mr">
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">MR</SelectItem>
                        <SelectItem value="ms">MS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase">First Name *</Label>
                    <Input placeholder="Enter First Name" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase">Last Name *</Label>
                    <Input placeholder="Enter Last Name" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase">Date of Birth *</Label>
                    <div className="relative">
                      <Input placeholder="mm/dd/yyyy" />
                      <Calendar className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="border-l-4 border-l-green-600 bg-green-50/30 dark:bg-green-950/10 p-4 rounded-r-md grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-xs font-bold text-green-700 dark:text-green-500 uppercase">Contact Information</h3>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase">Email *</Label>
                    <Input defaultValue="fardin.cse25@gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase">Phone Number *</Label>
                    <Input defaultValue="+8801306317063" />
                  </div>
                </div>

                {/* Passport Info Section */}
                <div className="border-l-4 border-l-blue-600 bg-blue-50/30 dark:bg-blue-950/10 p-4 rounded-r-md space-y-4">
                  <h3 className="text-xs font-bold text-blue-700 dark:text-blue-500 uppercase">Passport Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase">Nationality *</Label>
                      <Select defaultValue="bd">
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="bd">BD - BANGLADESH</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase">Issuing Country</Label>
                      <Select defaultValue="bd">
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="bd">BANGLADESH (BD)</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase">Passport Number *</Label>
                      <Input 
                        placeholder="Enter Passport Number" 
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        className={isScanning ? "animate-pulse border-blue-400" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase">Expiry Date *</Label>
                      <div className="relative">
                        <Input placeholder="mm/dd/yyyy" />
                        <Calendar className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="save-traveller" defaultChecked className="data-[state=checked]:bg-green-600 border-green-600" />
                  <Label htmlFor="save-traveller" className="text-sm font-medium cursor-pointer">
                    Add this to My Travellers List <span className="text-muted-foreground font-normal">(Enable faster bookings)</span>
                  </Label>
                </div>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex items-center justify-between pt-6 border-t mt-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="text-foreground">
            Back to Flight Details
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingFlightPNR;