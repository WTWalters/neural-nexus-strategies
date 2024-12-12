// src/components/test/TrackingTest.tsx
"use client";

import { useState, useEffect } from "react";
import { tracking } from "@/lib/tracking";
import { DeviceInfo } from "@/lib/tracking/types";

export default function TrackingTest() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Initialize tracking and get device info
    async function initTest() {
      await tracking.initialize();
      const info = await tracking.deviceFingerprint.getDeviceInfo();
      setDeviceInfo(info);

      // Test event
      tracking.trackEvent("test_event", {
        testData: "Testing tracking system",
      });
    }

    initTest();
  }, []);

  return (
    <div className="p-6 m-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Tracking Test Results</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Device Information:</h3>
        {deviceInfo ? (
          <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
            {JSON.stringify(deviceInfo, null, 2)}
          </pre>
        ) : (
          <p>Loading device info...</p>
        )}
      </div>

      <div className="mb-4">
        <button
          onClick={() => {
            tracking.trackEvent("button_click", {
              buttonId: "test_button",
              timestamp: new Date().toISOString(),
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Track Event
        </button>
      </div>
    </div>
  );
}
