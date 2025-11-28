const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/insureconnect';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Provider Schema
const providerSchema = new mongoose.Schema({
  provider_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  website_link: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create index on price for faster filtering
providerSchema.index({ price: 1 });

const InsuranceProvider = mongoose.model('InsuranceProvider', providerSchema);

// Routes

// GET all providers (with optional price filtering)
app.get('/api/providers', async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    
    // Build query object
    let query = {};
    
    if (minPrice || maxPrice) {
      query.price = {};
      
      if (minPrice) {
        const min = parseFloat(minPrice);
        if (isNaN(min)) {
          return res.status(400).json({ error: 'Invalid minimum price' });
        }
        query.price.$gte = min;
      }
      
      if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (isNaN(max)) {
          return res.status(400).json({ error: 'Invalid maximum price' });
        }
        query.price.$lte = max;
      }
      
      // Validate that min <= max
      if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
        return res.status(400).json({ error: 'Minimum price cannot be greater than maximum price' });
      }
    }
    
    const providers = await InsuranceProvider.find(query).sort({ price: 1 });
    res.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Server error while fetching providers' });
  }
});

// POST - Add a new provider
app.post('/api/providers', async (req, res) => {
  try {
    const { provider_id, name, price, website_link } = req.body;
    
    // Validation
    if (!provider_id || !name || !price || !website_link) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }
    
    const newProvider = new InsuranceProvider({
      provider_id,
      name,
      price,
      website_link
    });
    
    await newProvider.save();
    res.status(201).json(newProvider);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Provider ID already exists' });
    } else {
      console.error('Error creating provider:', error);
      res.status(500).json({ error: 'Server error while creating provider' });
    }
  }
});

// GET single provider by ID
app.get('/api/providers/:id', async (req, res) => {
  try {
    const provider = await InsuranceProvider.findOne({ provider_id: req.params.id });
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    
    res.json(provider);
  } catch (error) {
    console.error('Error fetching provider:', error);
    res.status(500).json({ error: 'Server error while fetching provider' });
  }
});

// DELETE provider
app.delete('/api/providers/:id', async (req, res) => {
  try {
    const provider = await InsuranceProvider.findOneAndDelete({ provider_id: req.params.id });
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    
    res.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Error deleting provider:', error);
    res.status(500).json({ error: 'Server error while deleting provider' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'InsureConnect API is running' });
});

// Seed database with sample data (for development)
app.post('/api/seed', async (req, res) => {
  try {
    await InsuranceProvider.deleteMany({});
    
    const sampleProviders = [
      { provider_id: 'iso_001', name: 'ISO Insurance', price: 450, website_link: 'https://www.isoa.org' },
      { provider_id: 'sg_002', name: 'Student Guard', price: 600, website_link: 'https://www.studentguard.com' },
      { provider_id: 'icp_003', name: 'International Care Plus', price: 550, website_link: 'https://www.intlcareplus.com' },
      { provider_id: 'chs_004', name: 'Campus Health Shield', price: 480, website_link: 'https://www.campushealth.com' },
      { provider_id: 'gsi_005', name: 'Global Student Insurance', price: 520, website_link: 'https://www.globalstudent.com' },
      { provider_id: 'acn_006', name: 'Academic Care Network', price: 395, website_link: 'https://www.academiccare.com' },
      { provider_id: 'eyt_007', name: 'Student Secure', price: 105, website_link: 'http://www.internationalstudentinsurance.com' },
      { provider_id: 'fdu_008', name: 'Student Journey Lite', price: 150, website_link: 'https://www.imglobal.com/travel-medical-insurance/student-journey-lite' },
      { provider_id: 'uhi_031', name: 'Universal Health Insurance', price: 475, website_link: 'https://www.universalhealth.com' },
      { provider_id: 'psi_032', name: 'Premier Student Insurance', price: 425, website_link: 'https://www.premierstudent.com' },
      { provider_id: 'gci_009', name: 'Global Care International', price: 565, website_link: 'https://www.globalcare.com' },
      { provider_id: 'asi_010', name: 'American Student Insurance', price: 510, website_link: 'https://www.americanstudent.com' },
      { provider_id: 'ssi_011', name: 'Scholar Shield Insurance', price: 380, website_link: 'https://www.scholarshield.com' },
      { provider_id: 'esi_012', name: 'EduCare Student Insurance', price: 440, website_link: 'https://www.educareinsurance.com' },
      { provider_id: 'wsi_013', name: 'World Student Insurance', price: 495, website_link: 'https://www.worldstudent.com' },
      { provider_id: 'csi_014', name: 'Campus Shield Insurance', price: 365, website_link: 'https://www.campusshield.com' },
      { provider_id: 'isi_015', name: 'International Student Insurance', price: 420, website_link: 'https://www.internationalstudentinsurance.com' },
      { provider_id: 'tsi_016', name: 'Travel Student Insurance', price: 200, website_link: 'https://www.travelstudent.com' },
      { provider_id: 'hsi_017', name: 'Health Shield International', price: 530, website_link: 'https://www.healthshieldintl.com' },
      { provider_id: 'msi_018', name: 'Medicare Student Insurance', price: 340, website_link: 'https://www.medicarestudent.com' },
      { provider_id: 'vsi_019', name: 'Visa Student Insurance', price: 175, website_link: 'https://www.visastudent.com' },
      { provider_id: 'bsi_020', name: 'Budget Student Insurance', price: 120, website_link: 'https://www.budgetstudent.com' },
      { provider_id: 'psi_021', name: 'Premium Student Insurance', price: 580, website_link: 'https://www.premiumstudent.com' },
      { provider_id: 'cai_022', name: 'Campus Advantage Insurance', price: 460, website_link: 'https://www.campusadvantage.com' },
      { provider_id: 'gai_023', name: 'Global Advantage Insurance', price: 540, website_link: 'https://www.globaladvantage.com' },
      { provider_id: 'sai_024', name: 'Student Advantage Insurance', price: 405, website_link: 'https://www.studentadvantage.com' },
      { provider_id: 'cci_025', name: 'Comprehensive Care Insurance', price: 590, website_link: 'https://www.comprehensivecare.com' },
      { provider_id: 'fci_026', name: 'Full Coverage Insurance', price: 615, website_link: 'https://www.fullcoverage.com' },
      { provider_id: 'bci_027', name: 'Basic Care Insurance', price: 250, website_link: 'https://www.basiccare.com' },
      { provider_id: 'sci_028', name: 'Student Care Insurance', price: 320, website_link: 'https://www.studentcare.com' },
      { provider_id: 'ici_029', name: 'International Care Insurance', price: 500, website_link: 'https://www.internationalcare.com' },
      { provider_id: 'wci_030', name: 'World Care Insurance', price: 555, website_link: 'https://www.worldcare.com' }
      
    ];
    
    await InsuranceProvider.insertMany(sampleProviders);
    res.json({ message: 'Database seeded successfully', count: sampleProviders.length });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Error seeding database' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
