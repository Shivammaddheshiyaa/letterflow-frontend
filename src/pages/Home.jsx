import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Function to scroll to How It Works section
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          
          {/* Heading - Made smaller */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight md:leading-tight lg:leading-tight max-w-2xl mx-auto lg:mx-0 mb-6">
            Send anonymous physical letters
            <span className="block mt-2 md:mt-3 text-blue-600">
              with honesty and care
            </span>
          </h1>

          {/* First paragraph with improved spacing */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
            Some thoughts are easier to write than to say.
            <span className="block mt-1">
              LetterFlow helps you express emotions through real,
              thoughtfully printed letters.
            </span>
          </p>

          {/* Second paragraph */}
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
            We review each message for safety, print it with care,
            and deliver it discreetly — ensuring your identity
            always remains private.
          </p>

          {/* CTA Button with better styling */}
          <div className="max-w-2xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/write")}
              className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Write a Letter
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="px-10 py-4 bg-white text-gray-700 text-lg font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow"
            >
              How It Works ↓
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Human Reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure & Private</span>
            </div>
          </div>

        </div>

        {/* Right Visual */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-lg">
            {/* Decorative background element */}
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
            
            {/* Main image */}
            <img
              src="/hero-letter.png"
              alt="Writing a letter"
              className="relative w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&auto=format&fit=crop";
              }}
            />
            
            {/* Floating stats card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Letters sent this month</p>
                  <p className="text-xl font-bold text-gray-900">1,247+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* How It Works Section - Added id for scrolling */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 sm:px-10 lg:px-16 py-16 sm:py-20 shadow-lg border border-gray-100">
          
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Simple & Secure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How does LetterFlow work?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From writing to delivery, we handle everything with privacy and care
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Write your letter
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Write your message freely and honestly. No account or personal details are required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Review & print
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our team reviews your letter for safety and prints it carefully on quality paper.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Deliver anonymously
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We deliver your letter without revealing your identity to the recipient.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Peace of mind
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your message reaches safely while your privacy remains fully protected.
              </p>
            </div>

          </div>

          {/* CTA at bottom of section */}
          <div className="text-center mt-16 pt-10 border-t border-gray-200">
            <button
              onClick={() => navigate("/write")}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Writing Your Letter
            </button>
            <p className="text-gray-500 text-sm mt-4">
               Pay only after writing
            </p>
          </div>
        </div>
      </section>

      {/* FAQ/Trust Section (Optional) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Is this really anonymous?</h4>
            <p className="text-gray-600 text-sm">Yes! We never share your identity with the recipient or third parties.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">How long does delivery take?</h4>
            <p className="text-gray-600 text-sm">Typically 5-7 business days in the US, 7-14 days internationally.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">What happens if my letter is rejected?</h4>
            <p className="text-gray-600 text-sm">You'll receive a full refund if your letter doesn't pass our safety review.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Can I track my letter?</h4>
            <p className="text-gray-600 text-sm">Yes, you'll receive a tracking number once your letter is dispatched.</p>
          </div>
        </div>
      </section>

    </main>
  );
}