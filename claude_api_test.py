import anthropic


ANTHROPIC_API_KEY = "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"

def test_anthropic_api():
    try:
        # Initialize the Anthropic client
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)  # Ensure this is a string!

        # Create the message using the correct model
        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",  # Use an available model
            max_tokens=1024,
            messages=[
                {"role": "user", "content": "Hello, Claude"}
            ]
        )

        # Print the response
        print("Response from Claude:")
        print(message.content)

    except anthropic.AnthropicError as e:
        print("Anthropic API Error:")
        print(e)

if __name__ == "__main__":
    test_anthropic_api()
