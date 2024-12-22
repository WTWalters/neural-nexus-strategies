// src/stories/tokens/Animation.stories.tsx
//update
// src/styles/tokens/Animation.stories.tsx
import React from "react";
import { animation } from "./animation";

export default {
  title: "Design System/Animation",
  parameters: {
    layout: "centered",
  },
};

export const Durations = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold mb-6">Animation Durations</h2>
    <div className="grid grid-cols-2 gap-6">
      {Object.entries(animation.durations).map(([name, duration]) => (
        <div key={name} className="p-4 border rounded-lg">
          <div className="font-medium mb-2">{name}</div>
          <div className="text-sm text-gray-600 mb-4">{duration}</div>
          <div
            className="w-12 h-12 bg-blue-500 rounded"
            style={{
              animation: `spin ${duration} linear infinite`,
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

export const Easings = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold mb-6">Animation Easings</h2>
    <div className="grid grid-cols-2 gap-6">
      {Object.entries(animation.easings).map(([name, value]) => (
        <div key={name} className="p-4 border rounded-lg">
          <div className="font-medium mb-2">{name}</div>
          <div className="text-sm text-gray-600 mb-4 font-mono">{value}</div>
          <div
            className="w-12 h-12 bg-blue-500 rounded"
            style={{
              animation: `slideRight 2s ${value} infinite`,
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

export const Presets = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold mb-6">Animation Presets</h2>
    <div className="grid grid-cols-2 gap-6">
      {Object.entries(animation.presets).map(([name, preset]) => (
        <div key={name} className="p-4 border rounded-lg">
          <div className="font-medium mb-4">{name}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-2">In:</div>
              <div
                className="w-12 h-12 bg-blue-500 rounded"
                style={{
                  animation: `${name}In 2s ${animation.easings.easeOut} infinite`,
                }}
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Out:</div>
              <div
                className="w-12 h-12 bg-blue-500 rounded"
                style={{
                  animation: `${name}Out 2s ${animation.easings.easeIn} infinite`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
