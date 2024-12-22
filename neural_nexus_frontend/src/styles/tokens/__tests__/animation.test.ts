// src/styles/tokens/__tests__/animation.test.ts
// update
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
    it("should have standard easing tokens", () => {
      expect(animation.easings).toHaveProperty("linear");
      expect(animation.easings).toHaveProperty("easeOut");
      expect(animation.easings).toHaveProperty("easeIn");
      expect(animation.easings).toHaveProperty("easeInOut");
    });

    it("should have variant easing tokens", () => {
      expect(animation.easings).toHaveProperty("easeOutFast");
      expect(animation.easings).toHaveProperty("easeOutSlow");
      expect(animation.easings).toHaveProperty("easeInFast");
      expect(animation.easings).toHaveProperty("easeInSlow");
      expect(animation.easings).toHaveProperty("easeInOutFast");
      expect(animation.easings).toHaveProperty("easeInOutSlow");
    });
  });

  describe("presets", () => {
    it("should have all animation presets", () => {
      expect(animation.presets).toHaveProperty("fade");
      expect(animation.presets).toHaveProperty("slideUp");
      expect(animation.presets).toHaveProperty("slideDown");
      expect(animation.presets).toHaveProperty("scale");
    });

    it("should have in/out variants for each preset", () => {
      Object.entries(animation.presets).forEach(([_, preset]) => {
        expect(preset).toHaveProperty("in");
        expect(preset).toHaveProperty("out");
      });
    });
  });

  describe("components", () => {
    describe("button", () => {
      it("should have correct button animations", () => {
        expect(animation.components.button.hover).toEqual({
          duration: "fast",
          easing: "easeOut",
        });
        expect(animation.components.button.active).toEqual({
          duration: "fastest",
          easing: "easeOut",
        });
      });
    });

    describe("dialog", () => {
      it("should have correct dialog animations", () => {
        expect(animation.components.dialog.enter).toEqual({
          duration: "normal",
          easing: "easeOut",
          preset: "slideUp",
        });
        expect(animation.components.dialog.exit).toEqual({
          duration: "fast",
          easing: "easeIn",
          preset: "fade",
        });
      });
    });
  });
});
