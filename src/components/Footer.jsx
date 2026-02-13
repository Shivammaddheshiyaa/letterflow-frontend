export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              LetterFlow
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Send anonymous physical letters with honesty,
              care, and complete privacy.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>How it works</li>
              <li>Pricing</li>
              <li>Privacy</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>Terms</li>
              <li>Privacy Policy</li>
              <li>Content Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} LetterFlow. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Built with care and privacy in mind.
          </p>
        </div>

      </div>
    </footer>
  );
}
