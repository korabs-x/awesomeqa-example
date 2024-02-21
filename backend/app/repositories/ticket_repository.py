import json


class TicketRepository:
    """
        Repository class for managing tickets, messages, and authors.
    """

    def __init__(self, filepath: str):
        """
            Initializes the TicketRepository with the provided JSON file.

            Args:
                filepath (str): The path to the JSON file containing ticket data.
        """
        with open(filepath, encoding='utf-8') as json_file:
            self.data = json.load(json_file)

        self._messages = {
            message['id']: message for message in self.data["messages"]
        }
        self._authors = {
            message['author']['id']: message['author'] for message in self.data["messages"]
        }

        self._tickets = dict()
        for ticket in self.data["tickets"]:
            ticket['msg'] = self._messages[ticket.pop('msg_id')]
            self._tickets[ticket['id']] = ticket


    def get_tickets(self) -> list[dict]:
        """
            Retrieves all the tickets.

            Returns:
                list[dict]: A list of dictionaries representing the tickets.
        """
        return self._tickets

    def get_messages(self) -> dict:
        """
            Retrieves all the messages.

            Returns:
                dict: A dictionary representing the messages.
        """
        return self._messages

    def get_authors(self) -> dict:
        """
            Retrieves all the authors.

            Returns:
                dict: A dictionary representing the authors.
        """
        return self._authors
