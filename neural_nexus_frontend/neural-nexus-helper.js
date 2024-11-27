// neural-nexus-helper.js - For your JavaScript/React frontend project
import { Configuration, OpenAIApi } from "anthropic-sdk";

class NeuralNexusReactHelper {
    constructor(apiKey) {
        this.client = new Configuration({
            apiKey,
            baseURL: "https://api.anthropic.com/v1",
        });
    }

    async getComponentGuidance(componentName, questionType) {
        const prompt = `As the frontend developer for Neural Nexus Strategies website,
        I'm working on the ${componentName} component.
        ${questionType}

        Based on the project documentation, provide guidance focused on:
        - React/Next.js implementation details
        - Component structure
        - State management
        - API integration
        - UI/UX requirements`;

        const response = await this.client.messages.create({
            model: "claude-3-opus-20240229",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return response.content[0].text;
    }

    async checkReactImplementation(code, componentName) {
        const prompt = `Review this React implementation for ${componentName}:

        ${code}

        Based on the Neural Nexus project specs, verify:
        1. Component architecture
        2. State management
        3. API integration
        4. UI/UX requirements
        5. Performance considerations`;

        const response = await this.client.messages.create({
            model: "claude-3-opus-20240229",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return response.content[0].text;
    }
}

export default NeuralNexusReactHelper;
