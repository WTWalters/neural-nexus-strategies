// src/styles/tokens/__tests__/animation.test.ts
import { animation } from "../animation";

describe("Animation Tokens", () => {
  describe("durations", () => {
    it("should have all required duration tokens", () => {
      expect(animation.durations).toHaveProperty("instant", "0ms");
      expect(animation.durations).toHaveProperty("fastest", "100ms");
      expect(animation.durations).toHaveProperty("fast", "200ms");
      expect(animation.durations).toHaveProperty("normal", "300ms");
      expect(animation.durations).toHaveProperty("slow", "400ms");
      expect(animation.durations).toHaveProperty("slowest", "500ms");
    });
  });

  describe("easings", () => {
    it("should have all required easing tokens", () => {
      expect(animation.easings).toHaveProperty("linear");
      expect(animation.easings).toHaveProperty("easeOut");
      expect(animation.easings).toHaveProperty("easeIn");
      expect(animation.easings).toHaveProperty("easeInOut");
    });

    it("should have correct easing variants", () => {
      expect(animation.easings).toHaveProperty("easeOutFast");
      expect(animation.easings).toHaveProperty("easeOutSlow");
      expect(animation.easings).toHaveProperty("easeInFast");
      expect(animation.easings).toHaveProperty("easeInSlow");
      expect(animation.easings).toHaveProperty("easeInOutFast");
      expect(animation.easings).toHaveProperty("easeInOutSlow");
    });
  });

  describe("presets", () => {
    it("should have all required animation presets", () => {
      expect(animation.presets).toHaveProperty("fade");
      expect(animation.presets).toHaveProperty("slideUp");
      expect(animation.presets).toHaveProperty("slideDown");
      expect(animation.presets).toHaveProperty("scale");
    });

    it("should have in/out variants for each preset", () => {
      Object.keys(animation.presets).forEach((preset) => {
        const presetObj =
          animation.presets[preset as keyof typeof animation.presets];
        expect(presetObj).toHaveProperty("in");
        expect(presetObj).toHaveProperty("out");
      });
    });
  });

  describe("components", () => {
    it("should have all required component animations", () => {
      expect(animation.components).toHaveProperty("button");
      expect(animation.components).toHaveProperty("dialog");
      expect(animation.components).toHaveProperty("tooltip");
      expect(animation.components).toHaveProperty("menu");
    });

    it("should have valid configuration for button", () => {
      const button = animation.components.button;
      expect(button.hover).toHaveProperty("duration", "fast");
      expect(button.hover).toHaveProperty("easing", "easeOut");
      expect(button.active).toHaveProperty("duration", "fastest");
      expect(button.active).toHaveProperty("easing", "easeOut");
    });

    it("should have valid configuration for dialog", () => {
      const dialog = animation.components.dialog;
      expect(dialog.enter).toHaveProperty("duration", "normal");
      expect(dialog.enter).toHaveProperty("easing", "easeOut");
      expect(dialog.enter).toHaveProperty("preset", "slideUp");
      expect(dialog.exit).toHaveProperty("duration", "fast");
      expect(dialog.exit).toHaveProperty("easing", "easeIn");
      expect(dialog.exit).toHaveProperty("preset", "fade");
    });
  });
});
