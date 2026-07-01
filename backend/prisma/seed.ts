import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database…');

  // Admin user
  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@2024!', 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@divyajotfoundation.org' },
    update: {},
    create: {
      name:       process.env.ADMIN_NAME || 'Super Admin',
      email:      process.env.ADMIN_EMAIL || 'admin@divyajotfoundation.org',
      password:   hashed,
      role:       Role.SUPER_ADMIN,
      isVerified: true,
      isActive:   true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Causes
  const causesData = [
    { name:'Child Rights',       slug:'child-rights',      icon:'👶', targetAmount:1000000, beneficiaryCount:12400 },
    { name:'Women Empowerment',  slug:'women-empowerment', icon:'👩‍💼',targetAmount:900000,  beneficiaryCount:3200  },
    { name:'Old Age Support',    slug:'old-age-support',   icon:'👴', targetAmount:600000,  beneficiaryCount:820   },
    { name:'Education Support',  slug:'education',         icon:'📚', targetAmount:1500000, beneficiaryCount:5600  },
    { name:'Healthcare',         slug:'healthcare',        icon:'🏥', targetAmount:1200000, beneficiaryCount:18000 },
    { name:'Food Distribution',  slug:'food-distribution', icon:'🍲', targetAmount:1000000, beneficiaryCount:28000 },
    { name:'Disaster Relief',    slug:'disaster-relief',   icon:'🆘', targetAmount:800000,  beneficiaryCount:4200  },
    { name:'Animal Welfare',     slug:'animal-welfare',    icon:'🐾', targetAmount:500000,  beneficiaryCount:1800  },
  ];

  for (const c of causesData) {
    await prisma.cause.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        ...c,
        description: `${c.name} program supporting communities across Gujarat.`,
        objectives:  ['Provide direct aid', 'Build long-term capacity', 'Ensure sustainable impact'],
        isActive:    true,
        isFeatured:  true,
      },
    });
  }
  console.log('✅ Causes seeded');

  // Impact metrics
  const metrics = [
    { label:'Beneficiaries Served', value:50247, suffix:'+', iconEmoji:'👥' },
    { label:'Active Volunteers',    value:820,   suffix:'+', iconEmoji:'🤝' },
    { label:'Villages Covered',     value:120,   suffix:'+', iconEmoji:'🏘️' },
    { label:'Events Conducted',     value:350,   suffix:'+', iconEmoji:'📅' },
  ];
  for (const m of metrics) {
    await prisma.impactMetric.create({ data: { ...m, isPublished: true } }).catch(() => {});
  }
  console.log('✅ Impact metrics seeded');

  // Testimonials
  const testimonials = [
    { name:'Ramesh Verma',  role:'Scholarship Beneficiary', location:'Rajkot',  rating:5, message:'Thanks to the scholarship program, my daughter is now studying engineering. DIVYAJOT changed our family\'s future.', isPublished:true, isFeatured:true },
    { name:'Nisha Kapoor',  role:'Monthly Donor',           location:'Surat',   rating:5, message:'DIVYAJOT\'s transparency report gave me complete confidence. I\'ve been donating monthly for 3 years.', isPublished:true, isFeatured:true },
    { name:'Prakash Tadvi', role:'Beneficiary',             location:'Dahod',   rating:5, message:'The medical camp reached our village when my mother was seriously unwell. The doctors came and gave free medicines.', isPublished:true, isFeatured:true },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }
  console.log('✅ Testimonials seeded');

  // Partners
  const partners = [
    { name:'Gujarat Govt.',  partnerType:'Government' },
    { name:'NABARD',         partnerType:'Financial'  },
    { name:'UNICEF India',   partnerType:'NGO'        },
    { name:'GiveIndia',      partnerType:'Platform'   },
    { name:'Rotary Club',    partnerType:'Community'  },
    { name:'CSR Partners',   partnerType:'Corporate'  },
  ];
  for (const p of partners) {
    await prisma.partner.create({ data: { ...p, isActive: true } }).catch(() => {});
  }
  console.log('✅ Partners seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log(`\n🔑 Admin login:\n   Email: ${admin.email}\n   Password: Admin@2024!`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
