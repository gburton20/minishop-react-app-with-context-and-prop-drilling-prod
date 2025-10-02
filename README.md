# MiniShop React App with Context and Prop Drilling (Production)

This is the production repository for the minishop-react-app-with-context-and-prop-drilling. The app is a full stack Django/React web application designed to demonstrate both React Context API and prop drilling patterns for state management in a single-page application.

---

## Project Overview

MiniShop is a learning-focused e-commerce demo platform featuring product browsing, a shopping cart, and authentication. The frontend is built in React (using Vite) and the backend is powered by Django REST Framework, with Auth0 used for authentication.

Both **React context** and **prop drilling** techniques are showcased for passing state and data across components.

---

## Tech Stack

**Frontend:**
- React (latest) with Vite
- React Router DOM (routing)
- Auth0 React SDK (authentication)
- ESLint (linting)

**Backend:**
- Django 4.2+ (web framework)
- Django REST Framework (API)
- django-cors-headers (CORS)
- Pillow (image upload)
- SQLite (default DB; PostgreSQL supported)
- Auth0 JWT integration

**Other:**
- PostgreSQL support (via `psycopg2-binary`)
- Python Jose (JWT handling)

---

## Features

- Product browsing and filtering
- Shopping cart with real-time updates (via context and prop drilling)
- Auth0-powered login/logout and user profiles
- Product management for authenticated users
- Image upload for products
- Responsive/mobile-friendly design
- Cart persistence (local storage)
- API pagination for efficient data loading
- Real-time cart icon counter in navigation

---

## Repository Structure

```
minishop-react-app-with-context-and-prop-drilling-prod/
├── README.md
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── components/
│   │       ├── Home/
│   │       ├── Cart/
│   │       ├── Navbar/
│   │       └── Profile.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── backend/
    └── minishop_backend_project_directory/
        ├── manage.py
        ├── requirements.txt
        ├── db.sqlite3
        ├── media/product_images/
        ├── minishop_backend_app/
        │   ├── models.py
        │   ├── views.py
        │   ├── serializers.py
        │   ├── urls.py
        │   └── migrations/
        └── minishop_backend_project_settings/
            ├── settings.py
            ├── urls.py
            └── wsgi.py
```

---

## Getting Started

### Prerequisites

- **Python 3.8+**
- **Node.js 16+** and **npm**
- **Git**

### Clone the Repository

```bash
git clone https://github.com/gburton20/minishop-react-app-with-context-and-prop-drilling-prod.git
cd minishop-react-app-with-context-and-prop-drilling-prod
```

### Backend Setup (Django)

```bash
cd backend/minishop_backend_project_directory
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # Optional
python manage.py runserver
```
Backend API is available at `http://localhost:8000/`.

### Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173/`.

> **Note:** Keep both servers running for the complete app functionality.

---

## API Endpoints

- `GET /api/products/` — Retrieve products (paginated)
- `POST /api/products/` — Add product (auth required)
- `GET /api/profile/` — Get user profile data

**CORS:** Backend allows requests from React dev server by default.

**Authentication:**  
1. Auth0 login via React frontend  
2. JWT token sent to Django API  
3. Protected endpoints require valid Auth0 JWT  
4. Product/user data extracted from token

---

## Common Commands

| Action                 | Backend Command                   | Frontend Command |
| ---------------------- | --------------------------------- | ---------------- |
| Install dependencies   | `pip install -r requirements.txt` | `npm install`    |
| Run dev server         | `python manage.py runserver`      | `npm run dev`    |
| Run tests              | `python manage.py test`           | `npm test`       |
| Build for production   | N/A                               | `npm run build`  |
| Apply migrations       | `python manage.py migrate`        | N/A              |
| Create superuser       | `python manage.py createsuperuser`| N/A              |
| Lint code              | N/A                               | `npm run lint`   |

---

## Environment Configuration

### Backend (`settings.py`)
- `DEBUG`: True for development
- `SECRET_KEY`: Change for production
- `ALLOWED_HOSTS`: Set for deployment
- `CORS_ALLOWED_ORIGINS`: Add frontend dev URL

### Frontend (Auth0 in `src/main.jsx`)
```jsx
<Auth0Provider
  domain="your-auth0-domain"
  clientId="your-auth0-client-id"
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: "your-auth0-api-audience",
    scope: "openid profile email read:current_user update:current_user_metadata"
  }}
>
```

---

## Troubleshooting

**CORS:**  
- Ensure `django-cors-headers` is installed and configured  
- Check frontend URL in `CORS_ALLOWED_ORIGINS`

**Authentication:**  
- Confirm Auth0 domain/client ID in frontend  
- Use SPA settings in Auth0 dashboard  
- API audience must match Auth0 config

**Database:**  
- Run `python manage.py migrate` for DB setup  
- Delete `db.sqlite3` and re-run migrations for a reset

**Image Upload:**  
- Install `Pillow`  
- Check `MEDIA_ROOT` and `MEDIA_URL` in settings

**Ports:**  
- Backend: 8000, Frontend: 5173 (default)  
- Change ports if needed

---

## Context and Prop Drilling Demo

This app demonstrates both:
- **Prop Drilling:** Passing cart, auth, and handlers through multiple component layers (e.g., `App.jsx` → `Home.jsx` → `ProductCardsList.jsx` → `ProductCard.jsx`)
- **Context:** Using React context for state that is needed globally (especially for cart and auth)

Comparative examples in code highlight when to use context vs. prop drilling and their trade-offs.

---

## License

Open source under the [MIT License](LICENSE).

---

## Contact

**Developer:** George Burton  
**Repository:** [minishop-react-app-with-context-and-prop-drilling-prod](https://github.com/gburton20/minishop-react-app-with-context-and-prop-drilling-prod)

For questions or suggestions, please open an issue or contact the repository owner.

---