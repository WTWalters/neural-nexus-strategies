// src/stories/tokens/Animation.stories.tsx
import React from "react";
import { animation } from "../../styles/tokens/animation";

export default {
  title: "Tokens/Animation",
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Durations = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Animation Durations</h2>
    {Object.entries(animation.durations).map(([name, value]) => (
      <div key={name} className="mb-4">
        <div className="font-medium mb-2">
          {name}: {value}
        </div>
        <div
          className="w-12 h-12 bg-blue-500"
          style={{
            animation: `spin ${value} linear infinite`,
          }}
        />
      </div>
    ))}
  </div>
);

export const Easings = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Animation Easings</h2>
    {Object.entries(animation.easings).map(([name, value]) => (
      <div key={name} className="mb-4">
        <div className="font-medium mb-2">{name}</div>
        <div
          className="w-12 h-12 bg-blue-500"
          style={{
            animation: `slideRight 2s ${value} infinite`,
          }}
        />
      </div>
    ))}
  </div>
);
