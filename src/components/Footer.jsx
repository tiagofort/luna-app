import { Camera } from "lucide-react";
  
  const Footer = () => {
    return (
      <section style={{ backgroundColor: '#b86935', color: 'white' }}>
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            {["About", "Blog", "Team", "Pricing"].map((item) => (
              <div key={item} className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-white-500 hover:text-gray-900">
                  {item}
                </a>
              </div>
            ))}
          </nav>
          <div className="flex justify-center mt-8 space-x-6">
            <a href="#" className="text-white-400 hover:text-gray-500" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                    />
                </svg>
            </a>
          </div>
          <p className="mt-8 text-base leading-6 text-center text-white-400">
            Lunas Crystals and team thank you for your visit. Enjoy and stay connected with us on our social media. Stay tuned for news.
          </p>
        </div>
      </section>
    );
  };
  
  export default Footer;
  