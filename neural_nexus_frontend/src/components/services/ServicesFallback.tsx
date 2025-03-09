
// src/components/services/ServicesFallback.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { env } from '@/config/env';

export default function ServicesFallback() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);

  useEffect(() => {
    const attemptUrls = [
      '/api/services/',
      '/api/services/services/',
      `${env.NEXT_PUBLIC_API_URL}/api/services/`,
      `${env.NEXT_PUBLIC_API_URL}/api/services/services/`,
      `${env.NEXT_PUBLIC_API_URL}/services/`,
      `${env.NEXT_PUBLIC_API_URL}/services/services/`,
    ];

    const fetchAllEndpoints = async () => {
      setLoading(true);
      
      // Try all endpoints one by one
      for (const url of attemptUrls) {
        try {
          console.log(`Trying endpoint: ${url}`);
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`SUCCESS with ${url}:`, data);
            
            // Handle both paginated and direct array responses
            const serviceList = data.results || data;
            
            if (Array.isArray(serviceList) && serviceList.length > 0) {
              setServices(serviceList);
              setSuccessUrl(url);
              setError(null);
              setLoading(false);
              return; // Exit once successful
            }
          } else {
            console.log(`Failed with ${url}: ${response.status}`);
          }
        } catch (err) {
          console.log(`Error with ${url}:`, err);
        }
      }

      // If we get here, all attempts failed
      setError("Failed to fetch services from any endpoint");
      setLoading(false);
    };

    fetchAllEndpoints();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Testing multiple endpoints to find services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">Error loading services</h2>
        <p className="mb-4">{error}</p>
        <div className="space-y-2">
          <p className="font-bold">Debug Information:</p>
          <p>API URL: {env.NEXT_PUBLIC_API_URL}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="font-bold">Success! Found {services.length} services.</p>
        <p className="text-sm">Working endpoint: {successUrl}</p>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-bold">{service.name}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {service.package_type || 'No package type'} | {service.duration || 'No duration'}
            </p>
            <p className="mb-4">{service.description || 'No description'}</p>
            
            {service.features && service.features.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold text-sm mb-1">Features:</h4>
                <ul className="list-disc list-inside text-sm">
                  {service.features.slice(0, 3).map((feature: any) => (
                    <li key={feature.id}>{feature.name}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button size="sm" className="w-full">View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
