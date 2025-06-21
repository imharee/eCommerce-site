import { Mail } from 'lucide-react';

const NewsletterSignup = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto bg-black rounded-[20px] flex flex-col lg:flex-row items-center justify-between p-8 sm:p-16">
        <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:pr-8">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>
        <form className="w-full max-w-md flex-shrink-0">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-black placeholder:text-gray-600 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-white text-black font-bold py-4 mt-4 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup; 