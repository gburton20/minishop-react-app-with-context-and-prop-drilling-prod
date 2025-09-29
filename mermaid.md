    ```mermaid
    flowchart TD
        F1[Frontend UI] --> F2[Frontend Logic]
        F2 -- "HTTP Request (with JWT if needed)" --> B1[Backend API]
        F2 -- "Login Request" --> A1[Auth Service]
        A1 -- "JWT/Token" --> F2
        B1 -- "Validate Token" --> B2[Auth Middleware]
        B1 -- "Serialize/Deserialize Data" --> B3[Serializer]
        B1 -- "Serve Image URLs" --> M1[Media Service]
        B1 -- "ORM Query" --> B4[ORM Layer]
        B4 -- "Read/Write" --> D1[Database]
        B1 -- "Response (JSON, URLs)" --> F2
        F2 -- "Display Data, Images" --> F1
    ```