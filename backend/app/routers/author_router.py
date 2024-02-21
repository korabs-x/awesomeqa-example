from datetime import datetime
from typing import Annotated, Union, Dict

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi_pagination import Page, Params, paginate

from app.models.author import Author


router = APIRouter(prefix="/authors", tags=["Authors"])

def get_authors_from_app_state(request: Request):
    """
        Retrieves the authors from the application state.

        Args:
            request (Request): The request object.

        Returns:
            List[Author]: The list of authors stored in the application state.
    """
    return request.app.state.authors

@router.get("/", response_model=Page[Author])
def get_all_authors(
    params: Params = Depends(),
    sort_order: Annotated[
        Union[str, None], Query(pattern="^newest|oldest$")
    ] = "newest",
    authors: Dict[str, Dict] = Depends(get_authors_from_app_state)
    ):
    """
        Retrieve all authors and sort them based on the given sort order.

        Args:
            params (Params): The parameters for pagination.
            sort_order (str, optional): The sort order for the authors. 
                                        Can be "newest" or "oldest". Defaults to "newest".
            authors (Dict[str, Dict]): The dictionary of authors retrieved from the app state.

        Returns:
            List[Dict]: The sorted and paginated list of authors.
    """

    sorted_authors = sorted(
        authors.values(),
        key=lambda x: datetime.strptime(x['timestamp_insert'], '%Y-%m-%d %H:%M:%S.%f').timestamp(),
        reverse=(sort_order.lower() == "newest")
    )
    return paginate(sorted_authors, params)

@router.get("/{author_id}", response_model=Author)
def get_author(author_id: str, authors: Dict[str, Dict] = Depends(get_authors_from_app_state)):
    """
        Retrieve the author with the given author_id from the authors dictionary.

        Args:
            author_id (str): The ID of the author to retrieve.
            authors (Dict[str, Dict]): The dictionary containing the authors.

        Returns:
            Dict: The author information if found.

        Raises:
            HTTPException: If the author is not found.
    """

    author = authors.get(author_id)
    if author:
        return author
    raise HTTPException(status_code=404, detail="Author not found")
