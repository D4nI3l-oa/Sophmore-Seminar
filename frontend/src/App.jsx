import { useState, useEffect } from 'react';
import { DollarSign, Shield, Search, Filter, ExternalLink, TrendingDown, Users, Award, CheckCircle, Info } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/providers`);
      const data = await response.json();
      setProviders(data);
      setFilteredProviders(data);
    } catch (err) {
      setError('Failed to load providers');
      console.error(err);
    }
    setLoading(false);
  };

  const handleApplyFilter = async () => {
    setError('');
    
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (minPrice && isNaN(min)) {
      setError('Please enter a valid minimum price');
      return;
    }

    if (maxPrice && isNaN(max)) {
      setError('Please enter a valid maximum price');
      return;
    }

    if (minPrice && maxPrice && min > max) {
      setError('Minimum price cannot be greater than maximum price');
      return;
    }

    setLoading(true);
    try {
      let url = `${API_BASE_URL}/providers`;
      const params = new URLSearchParams();
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      setFilteredProviders(data);
    } catch (err) {
      setError('Failed to filter providers');
      console.error(err);
    }
    setLoading(false);
  };

  const handleClearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setError('');
    setFilteredProviders(providers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-lg shadow-lg">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-5xl font-bold">InsureConnect</h1>
                <p className="text-blue-100 text-sm mt-1">Your trusted insurance comparison platform</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-xl text-blue-50 leading-relaxed mb-4">
              Finding affordable health insurance as an international student just got easier. 
              Compare top insurance providers, filter by your budget, and make informed decisions in minutes.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Instant Comparison</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Budget-Friendly Options</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Save Time & Money</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{providers.length}+</div>
                <div className="text-gray-600">Insurance Providers</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">94%</div>
                <div className="text-gray-600">Time Saved</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">100%</div>
                <div className="text-gray-600">Student Trusted</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* How It Works */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            How InsureConnect Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Set Your Budget</h3>
              <p className="text-gray-600 text-sm">Enter your price range to find insurance plans that fit your budget</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Compare Options</h3>
              <p className="text-gray-600 text-sm">View all providers side-by-side with clear pricing information</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Choose & Enroll</h3>
              <p className="text-gray-600 text-sm">Click to visit the provider's website and complete your enrollment</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-lg">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Plan</h2>
              <p className="text-gray-600 text-sm">Filter by price to see options within your budget</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Minimum Price (per semester)
              </label>
              <input
                type="number"
                placeholder="e.g., 400"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Maximum Price (per semester)
              </label>
              <input
                type="number"
                placeholder="e.g., 600"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={handleApplyFilter}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Apply Filter
            </button>

            <button
              onClick={handleClearFilter}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Provider List Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Search className="w-8 h-8 text-blue-600" />
                Available Insurance Providers
              </h2>
              <p className="text-gray-600 mt-2">
                Showing <span className="font-semibold text-blue-600">{filteredProviders.length}</span> {filteredProviders.length === 1 ? 'provider' : 'providers'}
                {minPrice || maxPrice ? (
                  <span className="text-sm">
                    {' '}in your price range ({minPrice ? `$${minPrice}` : 'Any'} - {maxPrice ? `$${maxPrice}` : 'Any'})
                  </span>
                ) : ''}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">Loading providers...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest data</p>
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No providers found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any insurance providers matching your criteria. Try adjusting your price range.
              </p>
              <button
                onClick={handleClearFilter}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Clear Filters & See All Providers
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((provider) => (
                <div
                  key={provider._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100 transform hover:-translate-y-1 duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-green-700 text-xs font-semibold">VERIFIED</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                    {provider.name}
                  </h3>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wide">Price per semester</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        ${provider.price}
                      </span>
                      <span className="text-gray-500">/semester</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>International student coverage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>24/7 customer support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Easy enrollment process</span>
                    </div>
                  </div>

                  <a
                    href={provider.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-semibold transition-all w-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Visit Website
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Choose Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-12 border border-indigo-100">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose InsureConnect?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">Find the most affordable plans within your budget</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Easy Search</h3>
              <p className="text-gray-600 text-sm">Filter and compare providers in seconds</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Trusted Providers</h3>
              <p className="text-gray-600 text-sm">All providers are verified and student-approved</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Student First</h3>
              <p className="text-gray-600 text-sm">Built by students, for students</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">InsureConnect</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Making health insurance simple and affordable for international students. 
                Compare, choose, and enroll with confidence.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Always updated</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Insurance Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 InsureConnect. Helping international students find affordable insurance.
            </p>
            <p className="text-gray-500 text-sm">
              Built with ❤️ by students, for students | React • Node.js • MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
