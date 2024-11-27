# utils/interactive_test.py

from neural_nexus_helper import NeuralNexusHelper
import os
from dotenv import load_dotenv

def interactive_test():
    """Interactive testing function for Neural Nexus Helper"""
    # Load environment variables
    load_dotenv()

    # Initialize helper
    helper = NeuralNexusHelper(os.getenv('ANTHROPIC_API_KEY'))

    while True:
        print("\n=== Neural Nexus Helper Interactive Test ===")
        print("1. Ask development question")
        print("2. Check implementation")
        print("3. Exit")

        choice = input("\nEnter your choice (1-3): ")

        if choice == "1":
            question = input("\nEnter your development question: ")
            print("\nGetting response...\n")
            response = helper.ask_development_question(question)
            print("Response:", response)

        elif choice == "2":
            print("\nEnter the code to review (press Enter twice when done):")
            code_lines = []
            while True:
                line = input()
                if line:
                    code_lines.append(line)
                else:
                    break
            code = "\n".join(code_lines)

            component = input("Enter component name: ")
            print("\nChecking implementation...\n")
            feedback = helper.check_implementation(code, component)
            print("Feedback:", feedback)

        elif choice == "3":
            print("\nExiting...")
            break

        else:
            print("\nInvalid choice. Please try again.")

        input("\nPress Enter to continue...")

if __name__ == "__main__":
    interactive_test()
