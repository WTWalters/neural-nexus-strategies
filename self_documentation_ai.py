import os
import json
import ast
import re
from typing import Dict, List, Any
import logging
import markdown

import anthropic

ANTHROPIC_API_KEY = "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"

# Set up logging
logging.basicConfig(filename='documentation_generator.log', level=logging.ERROR, format='%(asctime)s %(levelname)s: %(message)s')

def get_llm_response(messages: List[Dict[str, str]], model: str = "anthropic") -> str:
    if model == "anthropic":
        try:
            response = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                messages=messages
            )
            return response.content[0].text
        except anthropic.AnthropicError as e:
            logging.error(f"Anthropic API Error: {e}")
            return "Error occurred during the request."
    else:
        raise ValueError("Invalid model specified. Currently supports 'anthropic'.")

def get_project_structure(path: str, model: str = "anthropic") -> Dict[str, Any]:
    structure = {}
    system_message = {
        "role": "system",
        "content": "You are a helpful assistant that analyzes codebases and generates documentation."
    }
    messages = [system_message]
    for root, dirs, files in os.walk(path):
        folder_name = os.path.relpath(root, path)
        relevant_files = [f for f in files if f.endswith(('.js', '.jsx', '.ts', '.tsx', '.py'))]
        if relevant_files:
            prompt = {
                "role": "user",
                "content": f"I'm analyzing a codebase and found a folder named '{folder_name}'. It contains the following files: {', '.join(relevant_files)}. Can you provide a brief description of this folder's purpose within the project?"
            }
            messages.append(prompt)
            try:
                response = get_llm_response(messages, model=model)
                messages.append({"role": "assistant", "content": response})
                structure[folder_name] = {
                    "files": relevant_files,
                    "description": response.strip()
                }
            except anthropic.AnthropicError as e:
                logging.error(f"Anthropic API Error: {e}")
                structure[folder_name] = {
                    "files": relevant_files,
                    "description": "Error occurred during the request."
                }
    return structure

def get_component_info(project_path: str) -> List[Dict[str, Any]]:
    # (existing implementation)
    pass

def get_api_endpoints(project_path: str) -> List[Dict[str, Any]]:
    # (existing implementation)
    pass

def get_dependencies(project_path: str) -> Dict[str, str]:
    # (existing implementation)
    pass

def generate_documentation(project_path: str, model: str = "anthropic") -> None:
    print("Analyzing project structure...")
    project_structure = get_project_structure(project_path)

    print("\nAnalyzing React components...")
    components = get_component_info(project_path)

    print("\nAnalyzing API endpoints...")
    api_endpoints = get_api_endpoints(project_path)

    print("\nGathering dependencies...")
    dependencies = get_dependencies(project_path)

    documentation = {
        "project_name": os.path.basename(os.path.normpath(project_path)),
        "structure": project_structure,
        "components": components,
        "api_endpoints": api_endpoints,
        "dependencies": dependencies
    }

    output_file = 'project_documentation.md'
    with open(output_file, 'w') as f:
        f.write(markdown.markdown(f"# {documentation['project_name']} Documentation\n\n"))

        f.write(markdown.markdown("## Project Structure\n\n"))
        for folder, info in documentation['structure'].items():
            f.write(markdown.markdown(f"### {folder}\n\n"))
            f.write(f"{info['description']}\n\n")
            f.write(markdown.markdown("**Files:**\n"))
            for file in info['files']:
                f.write(markdown.markdown(f"- {file}\n"))
            f.write("\n")

        # (existing implementation for other sections)

    print(f"\nDocumentation generated successfully. Output saved to {output_file}")

if __name__ == "__main__":
    print("Welcome to the Project Documentation Generator!")
    project_path = input("Enter the path to your project: ").strip() or "./"
    model = input("Choose a language model ('gemini' or 'anthropic'): ").strip() or "anthropic"
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    generate_documentation(project_path, model)
