# Project Structure Tree Diagram

```
CS_DN_AjriyaMuhammadArkan_2206031826_SBD8/
│
├── install_backend.bat
├── package-lock.json
├── run_backend.bat
├── run_frontend.bat
├── seed.sql
│
├── backend/
│   ├── .gitignore
│   ├── create-db.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postman_collection.json
│   ├── README.md
│   ├── run-seed.js
│   ├── seed.sql
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── item.controller.js
│       │   ├── report.controller.js
│       │   ├── transaction.controller.js
│       │   └── user.controller.js
│       ├── database/
│       │   └── redis.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   ├── errorHandler.js
│       │   └── requestLogger.js
│       ├── models/
│       │   ├── item.model.js
│       │   ├── transaction.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── itemRoutes.js
│       │   ├── reportRoutes.js
│       │   ├── transactionRoutes.js
│       │   └── userRoutes.js
│       ├── services/
│       │   ├── item.service.js
│       │   ├── transaction.service.js
│       │   └── user.service.js
│       └── utils/
│           └── validators.js
│
├── CS_Resource/
│   ├── .DS_Store
│   ├── bikun-ui-2.png
│   ├── bikun-ui.png
│   ├── ft-e.png
│   └── unlock_me.zip
│   ├── EncryptDecrypt/
│   │   ├── LICENSE.txt
│   │   ├── NOTICE.txt
│   │   ├── readme.txt
│   │   ├── bin/
│   │   │   ├── decrypt.bat
│   │   │   ├── decrypt.sh
│   │   │   ├── digest.bat
│   │   │   ├── digest.sh
│   │   │   ├── encrypt.bat
│   │   │   ├── encrypt.sh
│   │   │   ├── listAlgorithms.bat
│   │   │   └── listAlgorithms.sh
│   │   └── lib/
│   │       ├── icu4j-3.4.4.jar
│   │       ├── jasypt-1.9.0-javadoc.jar
│   │       ├── jasypt-1.9.0-lite.jar
│   │       ├── jasypt-1.9.0-sources.jar
│   │       ├── jasypt-1.9.0.jar
│   │       ├── jasypt-acegisecurity-1.9.0-javadoc.jar
│   │       ├── jasypt-acegisecurity-1.9.0-sources.jar
│   │       ├── jasypt-acegisecurity-1.9.0.jar
│   │       ├── jasypt-hibernate3-1.9.0-javadoc.jar
│   │       ├── jasypt-hibernate3-1.9.0-sources.jar
│   │       ├── jasypt-hibernate3-1.9.0.jar
│   │       ├── jasypt-hibernate4-1.9.0-javadoc.jar
│   │       ├── jasypt-hibernate4-1.9.0-sources.jar
│   │       ├── jasypt-hibernate4-1.9.0.jar
│   │       ├── jasypt-spring2-1.9.0-javadoc.jar
│   │       ├── jasypt-spring2-1.9.0-sources.jar
│   │       ├── jasypt-spring2-1.9.0.jar
│   │       ├── jasypt-spring3-1.9.0-javadoc.jar
│   │       ├── jasypt-spring3-1.9.0-sources.jar
│   │       ├── jasypt-spring3-1.9.0.jar
│   │       ├── jasypt-spring31-1.9.0-javadoc.jar
│   │       ���── jasypt-spring31-1.9.0-sources.jar
│   │       ├── jasypt-spring31-1.9.0.jar
│   │       ├── jasypt-springsecurity2-1.9.0-javadoc.jar
│   │       ├── jasypt-springsecurity2-1.9.0-sources.jar
│   │       ├── jasypt-springsecurity2-1.9.0.jar
│   │       ├── jasypt-springsecurity3-1.9.0-javadoc.jar
│   │       ├── jasypt-springsecurity3-1.9.0-sources.jar
│   │       ├── jasypt-springsecurity3-1.9.0.jar
│   │       ├── jasypt-wicket13-1.9.0-javadoc.jar
│   │       ├── jasypt-wicket13-1.9.0-sources.jar
│   │       ├── jasypt-wicket13-1.9.0.jar
│   │       ├── jasypt-wicket15-1.9.0-javadoc.jar
│   │       ├── jasypt-wicket15-1.9.0-sources.jar
│   │       └── jasypt-wicket15-1.9.0.jar
│   ├── OpenPuff_release/
│   │   ├── libObfuscate.dll
│   │   ├── license.txt
│   │   ├── OpenPuff_Help_EN.pdf
│   │   ├── OpenPuff_Help_IT.pdf
│   │   ├── openpuff_pad.xml
│   │   ├── OpenPuff.exe
│   │   ├── OpenPuff.sh
│   │   ├── readme.txt
│   │   └── Uninstall.sh
│   └── PngExplorer/
│       ├── PngExplorer.class
│       └── readme.txt
│
└── frontend/
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── api/
        │   └── axios.js
        └── pages/
            ├── Items.jsx
            ├── Login.jsx
            └── Register.jsx
```

## Summary

| Directory/Folder | Description |
|-----------------|-------------|
| **backend/** | Node.js Express server with MVC architecture (controllers, models, routes, services) |
| **frontend/** | React + Vite frontend application with Tailwind CSS |
| **CS_Resource/** | Educational resources including encryption tools (Jasypt, OpenPuff) and steganography tools |
| **Config** | Database configuration (MySQL/Redis) |
| **Middleware** | Authentication, error handling, request logging |
| **API Endpoints** | Auth, Items, Transactions, Reports, Users |
