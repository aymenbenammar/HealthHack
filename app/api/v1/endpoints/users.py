from fastapi import APIRouter, HTTPException, status

from app.schemas.user import UserCreate, UserOut, UserUpdate

router = APIRouter()

# In-memory store for demo purposes — replace with DB queries
_users: dict[int, dict] = {}
_next_id = 1


@router.get("/", response_model=list[UserOut])
async def list_users():
    return list(_users.values())


@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate):
    global _next_id
    from datetime import datetime

    user = {
        "id": _next_id,
        "email": payload.email,
        "full_name": payload.full_name,
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    _users[_next_id] = user
    _next_id += 1
    return user


@router.get("/{user_id}", response_model=UserOut)
async def get_user(user_id: int):
    user = _users.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.patch("/{user_id}", response_model=UserOut)
async def update_user(user_id: int, payload: UserUpdate):
    user = _users.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if payload.full_name is not None:
        user["full_name"] = payload.full_name
    if payload.email is not None:
        user["email"] = payload.email
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int):
    if user_id not in _users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    del _users[user_id]
