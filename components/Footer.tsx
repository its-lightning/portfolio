export default function Footer() {
  return (
    <footer className="text-center py-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Portfolio on the left */}
          <div className="flex items-center">
            <a 
              href="https://drive.google.com/file/d/1tREO2JFFs43YiHsRBONvKxD71OuiWHhA/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition"
            >
              {/* Folder icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>My Portfolio</span>
            </a>
          </div>
          
          {/* Copyright in the center */}
          <p className="text-gray-400">:D</p>
          
          {/* Contact icons on the right */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com/its-lightning" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
              aria-label="GitHub Profile"
            >
              {/* GitHub icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/manoj-srivatsava-47b953215/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
              aria-label="LinkedIn Profile"
            >
              {/* LinkedIn icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}