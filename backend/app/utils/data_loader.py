import json

def load_tickets(filepath: str):
    try:
        with open(filepath, 'r') as file:
            data = json.load(file)
            return data.get("tickets", [])
    except FileNotFoundError:
        print(f"File not found: {filepath}")
        return []
    except json.JSONDecodeError:
        print(f"Invalid JSON in file: {filepath}")
        return []