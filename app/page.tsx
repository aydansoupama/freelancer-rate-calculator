"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

type ExperienceLevel = 'junior' | 'intermediate' | 'senior';

const marketTrends = {
  junior: { min: 35, max: 60 },
  intermediate: { min: 60, max: 100 },
  senior: { min: 100, max: 180 },
};

export default function Home() {
  const [experience, setExperience] = useState<ExperienceLevel>('junior');
  const [complexity, setComplexity] = useState<number>(1);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [suggestedRate, setSuggestedRate] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const setLimitedHoursPerWeek = (value: number) => {
    setHoursPerWeek(Math.min(Math.max(value, 1), 168));
  };

  const setLimitedWeeksPerYear = (value: number) => {
    setWeeksPerYear(Math.min(Math.max(value, 1), 52)); 
  };

  useEffect(() => {
    setIsClient(true);
    const baseRate = (marketTrends[experience].min + marketTrends[experience].max) / 2;
    const adjustedRate = baseRate * (1 + (complexity - 1) * 0.1);
    setSuggestedRate(adjustedRate);
  }, [experience, complexity]);

  const annualIncome = suggestedRate * hoursPerWeek * weeksPerYear;

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col from-purple-400 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="container max-w-4xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Freelance Developer Rate Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl shadow-xl border border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-medium text-white">Experience Level</Label>
                <Select onValueChange={(value: ExperienceLevel) => setExperience(value)} defaultValue={experience}>
                  <SelectTrigger id="experience" className="w-full bg-white bg-opacity-10 border-white border-opacity-20 text-white">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
                    <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="complexity" className="text-sm font-medium text-white">Project Complexity (1-5)</Label>
                <Slider
                  id="complexity"
                  min={1}
                  max={5}
                  step={1}
                  value={[complexity]}
                  onValueChange={(value) => setComplexity(value[0])}
                  className="py-4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek" className="text-sm font-medium text-white">Hours per Week</Label>
                <Input
                  type="number"
                  id="hoursPerWeek"
                  value={hoursPerWeek}
                  onChange={(e) => setLimitedHoursPerWeek(Number(e.target.value))}
                  className="w-full bg-white bg-opacity-10 border-white border-opacity-20 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weeksPerYear" className="text-sm font-medium text-white">Weeks per Year</Label>
                <Input
                  type="number"
                  id="weeksPerYear"
                  value={weeksPerYear}
                  onChange={(e) => setLimitedWeeksPerYear(Number(e.target.value))}
                  className="w-full bg-white bg-opacity-10 border-white border-opacity-20 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </CardContent>
          </Card>
  
          <div className="space-y-8">
            <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl shadow-xl border border-white border-opacity-20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Suggested Hourly Rate</h2>
                  <p className="text-4xl font-bold text-white">
                    {isClient ? `${suggestedRate.toFixed(2)} €/hour` : 'Calculating...'}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Estimated Annual Income</h2>
                  <p className="text-4xl font-bold text-white">
                    {isClient ? `${annualIncome.toFixed(2)} €` : 'Calculating...'}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-white">
                <p>These values are approximate and can vary depending on the region and specific domain</p>
              </CardFooter>
            </Card>
  
            <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl shadow-xl border border-white border-opacity-20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">Market Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-white"><span className="font-medium">Junior:</span> {marketTrends.junior.min}€ - {marketTrends.junior.max}€ / hour</p>
                <p className="text-white"><span className="font-medium">Intermediate:</span> {marketTrends.intermediate.min}€ - {marketTrends.intermediate.max}€ / hour</p>
                <p className="text-white"><span className="font-medium">Senior:</span> {marketTrends.senior.min}€ - {marketTrends.senior.max}€ / hour</p>
              </CardContent>
              <CardFooter className="text-xs text-white">
                <p>These values are approximate and can vary depending on the region and specific domain</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center text-white text-sm">
        Made with ❤️ by <a href="https://leyvei.fr" target="_blank" rel="noopener noreferrer" className="underline">Aydan SOUPAMA</a>. All rights reserved.
      </footer>
    </div>
  );
}