import logo from "./icetupalogo-removebg-preview.png";
import iceStupa from "./ice-stupa-india-himalayas-greg-white-10-1280x853-removebg-preview.png";
import iceStupa1 from "./ice-stupa-india-himalayas-greg-white-10-1280x853.jpg";
import village1 from "./_120693338_ladakhicestupa.jpg";
import village2 from "./spiti.jpg";
import village3 from "./sikkimn.jpeg";
import village4 from "./switawerland.jpeg";
import village5 from "./nepal.avif";
import village6 from "./bhutan.jpeg";
import village7 from "./chile.jpeg";
import village8 from "./licensed-image.jpeg";
import profile from "./istockphoto-1300972574-2048x2048.jpg";
import image1 from "./190520_r34279a.jpg";
import image2 from "./190520_r34279b.jpg";
import image3 from "./190520_r34279c.jpg";
import image4 from "./190520_r34279d.jpg";
import image5 from "./190520_r34279e.jpg";
import sonam from "./Sonam-Wangchuk-India-2.webp";
import image6 from "./bhutan.jpeg";
import hial from "./hial.jpg"
import lnp from "./lnp3.jpg"
import acre from "./acreofice.jpeg"

export const assets = {
  logo,
  iceStupa,
  iceStupa1,
  village1,
  profile,
  image1,
  image2,
  image3,
  image4,
  image5,
  sonam,
  image6,
};




export const projects = [
  {
    id: 'hial',
    name: 'HIAL - Himalayan Institute of Alternatives, Ladakh',
    description: 'Founded by Sonam Wangchuk, HIAL is the pioneer of Ice Stupa technology. These conical ice structures store winter water for spring use in Ladakh\'s arid high-altitude desert environment.',
    image: hial,
    imageAlt: 'Ice Stupa created by HIAL',
    website: 'https://hial.edu.in/',
    achievements: [
      'Built the first Ice Stupa in 2013-14',
      'Developed scalable ice stupa technology',
      'Creating community-led water conservation solutions',
      'Training locals in sustainable development'
    ]
  },
  {
    id: 'acreofice',
    name: 'Acre of Ice',
    description: 'Acre of Ice focuses on creating artificial glaciers that expand traditional techniques to address water security in mountain regions facing climate change impacts.',
    image: acre,
    imageAlt: 'Acre of Ice artificial glacier project',
    website: 'https://acresofice.com/',
    achievements: [
      'Developed horizontal glacier technology',
      'Created water storage systems serving multiple villages',
      'Research on optimal ice formation techniques',
      'Community engagement and participatory design'
    ]
  },
  {
    id: 'ladakh-nutrition',
    name: 'Ladakh Nutrition Project',
    description: 'Combining water conservation with food security, this project uses artificial glacier meltwater for sustainable agriculture in high-altitude regions to improve nutrition and food availability.',
    image: lnp,
    imageAlt: 'Ladakh Nutrition Project greenhouse using glacier water',
    website: 'https://lnp.org.in/',
    achievements: [
      'Extended growing season using glacier meltwater',
      'Built insulated greenhouses for year-round production',
      'Improved nutrition for 12+ villages',
      'Training programs on cold-desert farming techniques'
    ]
  }
];




// Sample location data - replace with your actual data
export const locationData = [
  {
    id: "ladakh",
    name: "Ladakh Region",
    country: "India",
    elevation: "3,500m",
    established: "2014",
    waterCapacity: "1.2M gallons",
    beneficiaries: "4,200+",
    imageUrl: village1,
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    country: "India",
    elevation: "4,270m",
    established: "2016",
    waterCapacity: "850K gallons",
    beneficiaries: "2,800+",
    imageUrl: village2,
  },
  {
    id: "sikkim",
    name: "North Sikkim",
    country: "India",
    elevation: "3,800m",
    established: "2017",
    waterCapacity: "980K gallons",
    beneficiaries: "3,100+",
    imageUrl: village3,
  },
  {
    id: "switzerland",
    name: "Engadin St. Moritz",
    country: "Switzerland",
    elevation: "2,100m",
    established: "2016",
    waterCapacity: "1.5M gallons",
    beneficiaries: "5,200+",
    imageUrl: village4,
  },
  {
    id: "nepal",
    name: "Dho Tarap",
    country: "Nepal",
    elevation: "4,100m",
    established: "2018",
    waterCapacity: "750K gallons",
    beneficiaries: "1,900+",
    imageUrl: village5,
  },
  {
    id: "bhutan",
    name: "Thimphu District",
    country: "Bhutan",
    elevation: "3,200m",
    established: "2019",
    waterCapacity: "680K gallons",
    beneficiaries: "1,500+",
    imageUrl: village6,
  },
  {
    id: "chile",
    name: "Atacama Region",
    country: "Chile",
    elevation: "3,900m",
    established: "2020",
    waterCapacity: "620K gallons",
    beneficiaries: "1,800+",
    imageUrl: village7,
  },
  {
    id: "peru",
    name: "Cusco Region",
    country: "Peru",
    elevation: "3,700m",
    established: "2021",
    waterCapacity: "540K gallons",
    beneficiaries: "1,600+",
    imageUrl: village8,
  },
];

// Sample team data for the About Us section with descriptions and social media links
export const teamData = [
  {
    id: "jigmat_dorjey",
    name: "Jigmat Dorjey",
    country: "India",
    education: "Master's in Environmental Science",
    specialties: [
      "Sustainable Development",
      "Water Resource Management",
      "Climate Change",
    ],
    imageUrl: profile, // replace with actual path to the profile image
    description:
      "Jigmat is a passionate environmentalist with a focus on sustainable development and water resource management. With a background in Environmental Science, he works towards creating solutions that protect the environment while promoting sustainable living.",
    socialMedia: [
      { type: "linkedin", url: "https://linkedin.com/in/jigmatdorjey" },
      { type: "github", url: "https://github.com/synthcipher" },
      { type: "instagram", url: "https://www.instagram.com/jigma__t?igsh=OTFxazd6NDRqNWhw" }
    ]
  },
  {
    id: "abhay_kumar",
    name: "Abhay Kumar",
    country: "India",
    education: "Bachelor's in Computer Science",
    specialties: ["Software Engineering", "Data Analysis", "AI Development"],
    imageUrl: profile, // replace with actual path to the profile image
    description:
      "Abhay is a talented software engineer with a strong foundation in computer science. He is skilled in AI development and data analysis, helping businesses harness the power of data for decision-making and technological advancements.",
    socialMedia: [
      { type: "linkedin", url: "https://linkedin.com/in/abhaykumar" },
      { type: "github", url: "https://github.com/abhay-kumar" },
      { type: "instagram", url: "https://instagram.com/abhay_tech" }
    ]
  },
  {
    id: "baptista",
    name: "Baptista",
    country: "Brazil",
    education: "PhD in Electrical Engineering",
    specialties: ["Robotics", "Embedded Systems", "IoT"],
    imageUrl: profile, // replace with actual path to the profile image
    description:
      "Baptista is a robotics enthusiast and expert in embedded systems. With a PhD in Electrical Engineering, he designs innovative solutions in the IoT space and has been involved in creating advanced robotic systems for various industries.",
    socialMedia: [
      { type: "linkedin", url: "https://linkedin.com/in/baptistarobotics" },
      { type: "github", url: "https://github.com/baptista-iot" },
      { type: "instagram", url: "https://instagram.com/baptista_robotics" }
    ]
  },
  {
    id: "artuno",
    name: "Artuno",
    country: "Italy",
    education: "Master's in Mechanical Engineering",
    specialties: ["Mechanical Design", "3D Modeling", "Prototype Development"],
    imageUrl: profile, // replace with actual path to the profile image
    description:
      "Artuno is a mechanical engineer with expertise in design and prototyping. He specializes in 3D modeling and mechanical design, creating cutting-edge prototypes for engineering solutions in various fields.",
    socialMedia: [
      { type: "linkedin", url: "https://linkedin.com/in/artuno-design" },
      { type: "github", url: "https://github.com/artuno3d" },
      { type: "instagram", url: "https://instagram.com/artuno_designs" }
    ]
  },
];
