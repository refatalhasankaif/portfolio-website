// src/components/Footer.tsx
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200/70 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {year} Refat al hasan. All rights reserved.</p>
          <p className="text-gray-500">
            Built with <strong>React</strong> + <strong>Tailwind CSS</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;