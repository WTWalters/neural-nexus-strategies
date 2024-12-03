import os
import json
import ast
import re
from typing import Dict, List, Any

def get_user_input(prompt: str, default: str = "") -> str:
    user_input = input(f"{prompt} [{default}]: ").strip()
    return user_input if user_input else default

def get_project_structure(path: str) -> Dict[str, Any]:
    structure = {}
    for root, dirs, files in os.walk(path):
        folder_name = os.path.relpath(root, path)
        relevant_files = [f for f in files if f.endswith(('.js', '.jsx', '.ts', '.tsx', '.py'))]
        if relevant_files:
            print(f"\nFolder: {folder_name}")
            description = get_user_input("Enter a brief description of this folder's purpose")
            structure[folder_name] = {
                "files": relevant_files,
                "description": description
            }
    return structure

def get_component_info(project_path: str) -> List[Dict[str, Any]]:
    components = []
    for root, _, files in os.walk(project_path):
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                with open(os.path.join(root, file), 'r') as f:
                    content = f.read()
                    component_matches = re.findall(r'(function|class)\s+(\w+)', content)
                    for _, component_name in component_matches:
                        props = re.findall(r'(\w+)\s*:\s*(\w+)', content)
                        state = re.findall(r'this\.state\s*=\s*{([^}]*)}', content)
                        print(f"\nComponent found: {component_name} in {file}")
                        description = get_user_input("Enter a brief description of this component's purpose")
                        components.append({
                            "name": component_name,
                            "file": os.path.relpath(os.path.join(root, file), project_path),
                            "props": props,
                            "state": state[0].split(',') if state else [],
                            "description": description
                        })
    return components

def get_api_endpoints(project_path: str) -> List[Dict[str, Any]]:
    endpoints = []
    for root, _, files in os.walk(project_path):
        for file in files:
            if file.endswith('.py'):
                with open(os.path.join(root, file), 'r') as f:
                    content = f.read()
                    tree = ast.parse(content)
                    for node in ast.walk(tree):
                        if isinstance(node, ast.FunctionDef):
                            decorators = [d.id for d in node.decorator_list if isinstance(d, ast.Name)]
                            if any(d in ['api_view', 'APIView'] for d in decorators):
                                print(f"\nAPI endpoint found: {node.name} in {file}")
                                description = get_user_input("Enter a brief description of this API endpoint's purpose")
                                endpoints.append({
                                    "name": node.name,
                                    "file": os.path.relpath(os.path.join(root, file), project_path),
                                    "methods": [d.args[0].s for d in node.decorator_list if isinstance(d, ast.Call) and d.func.id == 'api_view'],
                                    "parameters": [arg.arg for arg in node.args.args if arg.arg != 'self'],
                                    "description": description
                                })
    return endpoints

def get_dependencies(project_path: str) -> Dict[str, str]:
    package_json_path = os.path.join(project_path, 'package.json')
    if os.path.exists(package_json_path):
        with open(package_json_path, 'r') as f:
            package_data = json.load(f)
            return {
                **package_data.get('dependencies', {}),
                **package_data.get('devDependencies', {})
            }
    return {}

def generate_documentation(project_path: str) -> None:
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

    output_file = 'project_documentation.json'
    with open(output_file, 'w') as f:
        json.dump(documentation, f, indent=2)

    print(f"\nDocumentation generated successfully. Output saved to {output_file}")

if __name__ == "__main__":
    print("Welcome to the Project Documentation Generator!")
    project_path = get_user_input("Enter the path to your project", "./")
    generate_documentation(project_path)
