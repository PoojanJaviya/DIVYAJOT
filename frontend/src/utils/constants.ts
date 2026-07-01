export const CAUSES = [
  {
    id: 'child-rights',
    icon: '👶',
    title: 'Child Rights',
    slug: 'child-rights',
    description: 'Ensuring every child\'s right to safety, nutrition, education, and a childhood free from exploitation.',
    color: 'bg-teal-50',
    raised: 850000,
    target: 1000000,
    beneficiaries: 12400,
  },
  {
    id: 'women-empowerment',
    icon: '👩‍💼',
    title: 'Women Empowerment',
    slug: 'women-empowerment',
    description: 'Skill training, SHG formation, legal literacy, and entrepreneurship support for women.',
    color: 'bg-pink-50',
    raised: 620000,
    target: 900000,
    beneficiaries: 3200,
  },
  {
    id: 'old-age-support',
    icon: '👴',
    title: 'Old Age Support',
    slug: 'old-age-support',
    description: 'Monthly ration kits, medical check-ups, companionship visits, and senior citizen advocacy.',
    color: 'bg-amber-50',
    raised: 380000,
    target: 600000,
    beneficiaries: 820,
  },
  {
    id: 'education',
    icon: '📚',
    title: 'Education Support',
    slug: 'education',
    description: 'Scholarships, school supply kits, tuition centers, and digital literacy for rural students.',
    color: 'bg-blue-50',
    raised: 1210000,
    target: 1500000,
    beneficiaries: 5600,
  },
  {
    id: 'healthcare',
    icon: '🏥',
    title: 'Healthcare',
    slug: 'healthcare',
    description: 'Mobile health camps, free medicines, maternal care, and COVID relief to rural communities.',
    color: 'bg-green-50',
    raised: 940000,
    target: 1200000,
    beneficiaries: 18000,
  },
  {
    id: 'food-distribution',
    icon: '🍲',
    title: 'Food Distribution',
    slug: 'food-distribution',
    description: 'Daily Bhojan Seva, monthly grocery kits, mid-day meal support, and nutrition awareness.',
    color: 'bg-yellow-50',
    raised: 730000,
    target: 1000000,
    beneficiaries: 28000,
  },
  {
    id: 'disaster-relief',
    icon: '🆘',
    title: 'Disaster Relief',
    slug: 'disaster-relief',
    description: 'Rapid response to floods, droughts, and pandemics — providing relief kits and rehabilitation.',
    color: 'bg-red-50',
    raised: 560000,
    target: 800000,
    beneficiaries: 4200,
  },
  {
    id: 'animal-welfare',
    icon: '🐾',
    title: 'Animal Welfare',
    slug: 'animal-welfare',
    description: 'Street animal rescue, veterinary camps, sterilization drives, and community sensitization.',
    color: 'bg-purple-50',
    raised: 210000,
    target: 500000,
    beneficiaries: 1800,
  },
];

export const ACTIVITIES = [
  {
    id: '1', icon: '🍱', category: 'food', tag: 'Food Program',
    title: 'Bhojan Seva – Daily Community Kitchen',
    description: 'Free nutritious meals distributed to laborers, elderly, and homeless every evening at 7 PM.',
    date: 'Daily · Ongoing', beneficiaries: '120 / day',
  },
  {
    id: '2', icon: '🛒', category: 'food', tag: 'Food Program',
    title: 'Monthly Grocery Kit Distribution',
    description: 'Essential ration kits containing 15 kg staples distributed to 200 BPL families each month.',
    date: 'Monthly', beneficiaries: '200 families',
  },
  {
    id: '3', icon: '🧥', category: 'relief', tag: 'Winter Relief',
    title: 'Warmth Drive – Blankets & Sweaters',
    description: 'Winter clothing and blankets distributed to street dwellers and construction workers.',
    date: 'Dec–Feb Annual', beneficiaries: '1,200',
  },
  {
    id: '4', icon: '🩸', category: 'women', tag: 'Women',
    title: 'Sanitary Pad Distribution Drive',
    description: 'Free sanitary pads and menstrual hygiene awareness for adolescent girls and women.',
    date: 'Quarterly', beneficiaries: '1,500 women',
  },
  {
    id: '5', icon: '📖', category: 'education', tag: 'Education',
    title: 'Back to School – Stationery Kit Drive',
    description: 'Complete stationery and school supply kits provided to children before the new academic year.',
    date: 'June Annually', beneficiaries: '800 students',
  },
  {
    id: '6', icon: '🩺', category: 'health', tag: 'Healthcare',
    title: 'Free Medical Camp – Rural Outreach',
    description: 'Mobile health camps offering free consultations, diagnostics, and medicines to villages.',
    date: 'Bi-monthly', beneficiaries: '300+ / camp',
  },
];

export const TEAM = [
  { initials: '', name: '',  role: 'Founder & President',    color: 'bg-teal-500',   bio: '20+ years in social work and community development across Gujarat.' },
  { initials: '', name: '',    role: 'Executive Director',      color: 'bg-amber-400',  bio: 'Former UNICEF program officer with expertise in child welfare policy.' },
  { initials: '', name: '',    role: 'Head of Operations',      color: 'bg-purple-500', bio: 'MBA with 12 years managing large-scale humanitarian operations.' },
  { initials: '', name: '',   role: 'Head of Volunteer Programs', color: 'bg-rose-400', bio: 'Passionate coordinator managing 800+ volunteers across the state.' },
];

export const TESTIMONIALS = [
  {
    initials: 'RV', name: 'Ramesh Verma',    role: 'Scholarship Beneficiary', location: 'Rajkot',    rating: 5,
    message: 'Thanks to the scholarship program, my daughter is now studying engineering. I could never have afforded this on my own. DIVYAJOT changed our family\'s future.',
  },
  {
    initials: 'NK', name: 'Nisha Kapoor',    role: 'Monthly Donor',           location: 'Surat',     rating: 5,
    message: 'As a donor, I always worried about where my money goes. DIVYAJOT\'s transparency report and quarterly updates gave me complete confidence. I\'ve been donating monthly for 3 years.',
  },
  {
    initials: 'PT', name: 'Prakash Tadvi',   role: 'Beneficiary',             location: 'Dahod',     rating: 5,
    message: 'The medical camp reached our village when my mother was seriously unwell. The doctors came, gave medicines for free, and followed up the next month. This kind of care is rare.',
  },
];

export const STATS = [
  { value: 50000, suffix: '+', label: 'Beneficiaries Served',  sub: 'Across 8 cause areas'  },
  { value: 800,   suffix: '+', label: 'Active Volunteers',     sub: 'Nationwide network'    },
  { value: 120,   suffix: '+', label: 'Villages Covered',      sub: 'In 12 districts'       },
  { value: 350,   suffix: '+', label: 'Events Conducted',      sub: 'Since inception 2016'  },
];

export const NAV_LINKS = [
  { label: 'Home',         path: '/'            },
  { label: 'About',        path: '/about'       },
  { label: 'Our Causes',   path: '/causes'      },
  { label: 'Activities',   path: '/activities'  },
  { label: 'Impact',       path: '/impact'      },
  { label: 'Gallery',      path: '/gallery'     },
  { label: 'Contact',      path: '/contact'     },
];
