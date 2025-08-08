# FusionCodeReview

**FusionCodeReview** is a full-stack developer tool that helps you perform static and AI-powered code reviews. Built with **Next.js** (frontend) and **ASP.NET Boilerplate (ABP)** (backend), the application enables developers to upload or paste code, analyze it using best practices or AI, and export/save the results. It also supports GitHub pull request integration.

---

## 🚀 Features

- **Static Code Review**  
  Analyze code using Boxfusion’s best practices.

- **AI Code Review**  
  Leverage AI to provide intelligent feedback and suggestions.

- **Save Review Results**  
  Persist review sessions for future reference.

- **Download Review Results**  
  Export review reports as PDF files.

- **Enhance Code with AI**  
  Automatically improve and refactor your code using AI.

- **Upload Code**  
  Support for uploading `.cs`, `.ts`, or `.js` files to review.

- **GitHub Pull Request Review**
  Automatically review pull requests by integrating with GitHub.

---


## 📁 Folder Structure

```
CodeReviewer/
│
├── backend/                      # ABP Boilerplate backend
│   ├── CodeReviewer.Application/
│   ├── CodeReviewer.Domain/
│   ├── CodeReviewer.EntityFrameworkCore/
│   └── CodeReviewer.Web.Host/
│
├── frontend/                     # Next.js frontend (with app/src structure)
│   ├── app/                      # Next.js pages and routes
│   │   ├── page.tsx              # Landing page
│   │   ├── review/               # Code review interface
│   │   └── saved-reviews/        # View saved reviews
│   ├── components/               # Shared components (Navbar, Inputs, etc.)
│   ├── providers/                # Context providers (Auth, Review state)
│   ├── styles/                   # CSS-in-JS styling (antd-style or similar)
│   └── utils/                    # Helper functions
│
└── shared/                       # Shared models or constants (optional)
```

---

## ⚙️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | Next.js 14, TypeScript, Ant Design   |
| Editor     | Monaco Editor                        |
| Backend    | ASP.NET Boilerplate (ABP), EF Core   |
| AI Engine  | Gemini API                           |
| PDF Export | jsPDF, autoTable                     |
| Storage    | JSON/local storage or SQL via EF     |
| Coming Soon | GitHub API integration               |

---

## 🛠 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
dotnet restore
dotnet run --project CodeReviewer.Web.Host
```

---

## ✅ To Do / Coming Soon
- [ ] Admin dashboard to view review stats  
- [ ] Code diff and version comparison  
- [ ] Multi-language support (Python, Java, etc.)

---

## 📄 License

This project is licensed under the MIT License.